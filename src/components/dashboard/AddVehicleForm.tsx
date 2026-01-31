"use client";

import { useState } from "react";
import { addVehicle, type VehicleData } from "@/actions/fleet";
import { Loader2, Plus, Truck } from "lucide-react";

export function AddVehicleForm() {
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<VehicleData>({
    unit_number: "",
    vin: "",
    make: "",
    model: "",
    year: new Date().getFullYear(),
    type: "Tractor",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    await addVehicle(formData);
    
    // Reset form after success
    setFormData({
        unit_number: "",
        vin: "",
        make: "",
        model: "",
        year: new Date().getFullYear(),
        type: "Tractor",
    });
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-industrial-400 mb-1">Unit Number</label>
        <input
          name="unit_number"
          required
          placeholder="e.g. TR-101"
          value={formData.unit_number}
          onChange={handleChange}
          className="w-full bg-industrial-950 border border-industrial-700 rounded p-2 text-white text-sm focus:ring-1 focus:ring-display-yellow outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-industrial-400 mb-1">VIN (17 Char)</label>
        <input
          name="vin"
          required
          maxLength={17}
          placeholder="1M8GDM... (Last 6 ok)"
          value={formData.vin}
          onChange={handleChange}
          className="w-full bg-industrial-950 border border-industrial-700 rounded p-2 text-white text-sm font-mono uppercase focus:ring-1 focus:ring-display-yellow outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
            <label className="block text-xs font-medium text-industrial-400 mb-1">Year</label>
            <input
            name="year"
            type="number"
            required
            min="1980"
            max={new Date().getFullYear() + 1}
            value={formData.year}
            onChange={handleChange}
            className="w-full bg-industrial-950 border border-industrial-700 rounded p-2 text-white text-sm focus:ring-1 focus:ring-display-yellow outline-none"
            />
        </div>
        <div>
            <label className="block text-xs font-medium text-industrial-400 mb-1">Type</label>
            <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-industrial-950 border border-industrial-700 rounded p-2 text-white text-sm focus:ring-1 focus:ring-display-yellow outline-none"
            >
                <option value="Tractor">Tractor</option>
                <option value="Trailer">Trailer</option>
                <option value="Box Truck">Box Truck</option>
                <option value="Pickup">Pickup</option>
            </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
            <label className="block text-xs font-medium text-industrial-400 mb-1">Make</label>
            <input
            name="make"
            required
            placeholder="Volvo"
            value={formData.make}
            onChange={handleChange}
            className="w-full bg-industrial-950 border border-industrial-700 rounded p-2 text-white text-sm focus:ring-1 focus:ring-display-yellow outline-none"
            />
        </div>
        <div>
            <label className="block text-xs font-medium text-industrial-400 mb-1">Model</label>
            <input
            name="model"
            required
            placeholder="VNL 860"
            value={formData.model}
            onChange={handleChange}
            className="w-full bg-industrial-950 border border-industrial-700 rounded p-2 text-white text-sm focus:ring-1 focus:ring-display-yellow outline-none"
            />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-industrial-800 hover:bg-industrial-700 text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2 mt-4 text-sm border border-industrial-700"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
        Add to Fleet
      </button>
    </form>
  );
}
