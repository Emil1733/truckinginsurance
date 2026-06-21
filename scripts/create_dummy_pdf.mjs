import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';

async function createDummy() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]);
  page.drawText('Dummy Master COI Document', { x: 50, y: 700, size: 24, color: rgb(0,0,0) });
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('C:\\Users\\tevat\\truckinsurancesite\\web\\dummy.pdf', pdfBytes);
  console.log('Dummy PDF created successfully.');
}
createDummy();
