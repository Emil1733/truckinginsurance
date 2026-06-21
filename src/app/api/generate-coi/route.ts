import { NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_5B5fnRpr_FS4adEP65rrL9j2qLomXXbkC');

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const file = formData.get('file') as File;
    const brokerName = formData.get('brokerName') as string;
    const brokerAddress = formData.get('brokerAddress') as string;
    const dotNumber = formData.get('dotNumber') as string;
    const email = formData.get('email') as string;
    const companyName = formData.get('companyName') as string;

    if (!file || !brokerName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Convert uploaded file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json({ error: 'Only valid PDF files are supported by the generation engine.' }, { status: 400 });
    }
    
    // Load the PDF
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Embed the standard font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helveticaRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Coordinate system: Bottom-Left is (0,0). Standard ACORD is 612x792 points.
    // We draw a white rectangle to "erase" the existing holder
    // Adjusted to fit inside the borders (leaving the border lines intact)
    firstPage.drawRectangle({
      x: 38,
      y: 45,
      width: 200,
      height: 55,
      color: rgb(1, 1, 1),
    });

    // Draw the new Broker Name
    firstPage.drawText(brokerName.toUpperCase(), {
      x: 42,
      y: 95,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    // Draw the new Broker Address
    // Simple wrapping for the address by splitting on commas or just placing it below
    const addressLines = brokerAddress.split(',').map(s => s.trim());
    let currentY = 82;
    addressLines.forEach(line => {
      firstPage.drawText(line, {
        x: 40,
        y: currentY,
        size: 9,
        font: helveticaRegular,
        color: rgb(0, 0, 0),
      });
      currentY -= 12;
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    let fileUrl = 'Not Uploaded (Check Supabase Keys)';

    // ---------------------------------------------------------
    // Log the lead to Supabase (Background Task)
    // ---------------------------------------------------------
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (SUPABASE_URL && SUPABASE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
      
      // 1. Upload original Master COI to Supabase Storage
      const storageFileName = `master-cois/${dotNumber}-${Date.now()}.pdf`;
      
      try {
        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('coi-uploads')
          .upload(storageFileName, arrayBuffer, {
            contentType: 'application/pdf',
            upsert: false
          });

        if (uploadError) {
          console.error('Supabase Storage Upload Error (Ensure "coi-uploads" bucket exists):', uploadError);
        } else if (uploadData) {
          const { data: publicUrlData } = supabase.storage.from('coi-uploads').getPublicUrl(storageFileName);
          fileUrl = publicUrlData.publicUrl;
        }
      } catch (e) {
        console.error('Exception during Supabase storage upload:', e);
      }

      // 2. Insert Lead into Database with the File URL
      const notesStr = `COI GENERATED AUTOMATICALLY\nCompany: ${companyName}\nBroker: ${brokerName}\nMaster COI File: ${fileUrl}`;
      supabase.from('leads').insert([{ 
        dot_number: dotNumber, 
        email: email, 
        source: 'automated_coi_generator',
        status: 'new',
        notes: notesStr
      }]).then(({ error }) => {
        if (error) console.error('Error logging automated COI lead:', error);
      });
    }

    // ---------------------------------------------------------
    // Email Automation via Resend
    // ---------------------------------------------------------
    try {
      const pdfBuffer = Buffer.from(pdfBytes);

      // 1. Email the Trucker with the attached PDF
      await resend.emails.send({
        from: 'Truck Coverage Experts <info@truckcoverageexperts.com>', // MUST BE VERIFIED IN RESEND
        to: email,
        subject: `Your Certificate of Insurance for ${brokerName}`,
        html: `
          <h3>Your Certificate of Insurance is ready.</h3>
          <p>Hi there,</p>
          <p>As requested, attached is the updated Certificate of Insurance for <strong>${brokerName}</strong>.</p>
          <br/>
          <p>Stay safe out there,</p>
          <p><strong>Truck Coverage Experts</strong></p>
        `,
        attachments: [
          {
            filename: `COI_${brokerName.replace(/\s+/g, '_')}.pdf`,
            content: pdfBuffer,
          }
        ]
      });

      // 2. Send an Alert to the Sales Team
      // We will send this to a placeholder agency email, update this to your actual sales email!
      await resend.emails.send({
        from: 'COI Bot <info@truckcoverageexperts.com>', // MUST BE VERIFIED IN RESEND
        to: 'hello@truckcoverageexperts.com', // Change this to the email address that receives alerts
        subject: `🚨 HOT LEAD: ${companyName} generated a COI`,
        html: `
          <h2>New High-Intent COI Lead</h2>
          <p><strong>Company:</strong> ${companyName}</p>
          <p><strong>DOT:</strong> ${dotNumber}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Broker Needed:</strong> ${brokerName}</p>
          <hr/>
          <h3>Action Required:</h3>
          <p>Click the link below to view their Master Policy. Find their Expiration Date and add it to the CRM pipeline to steal this account at renewal.</p>
          <p><a href="${fileUrl || '#'}">View Master Policy Document</a></p>
        `
      });
    } catch (emailErr) {
      console.error('Failed to send Resend emails:', emailErr);
    }

    // Return the PDF as a downloadable file
    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="COI_${brokerName.replace(/\s+/g, '_')}.pdf"`,
      },
    });

  } catch (error) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF.' }, { status: 500 });
  }
}
