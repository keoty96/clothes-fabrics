"use client";

interface Fabrics {
  material: string;
  percentage: string;
}

import { useState } from "react";

export default function MaterialForm() {
  const [material, setMaterial] = useState("");
  const [percentage, setPercentage] = useState("");
  const [fabricList, setFabricList] = useState<Fabrics[]>([]);

  const handleFabrics = () => {
    if (material.length > 0 && percentage.length > 0) {
      const newFabrics: Fabrics = {
        material: material,
        percentage: percentage,
      };

      setFabricList((prev) => [...prev, newFabrics]);

      // clean
      setMaterial("");
      setPercentage("");
    }
  };

  return (
    <div className="flex gap-4">
      <p>Add a Material</p>

      <label>Material</label>
      <input
        onChange={(e) => setMaterial(e.target.value)}
        value={material}
        type="text"
        name="material"
        placeholder="cotton"
      />

      <label>Percentage</label>
      <input
        onChange={(e) => setPercentage(e.target.value)}
        value={percentage}
        type="text"
        name="percentage"
        placeholder="86"
      />

      <button onClick={handleFabrics}>Add +</button>

      {fabricList.map((fabric, index) => (
        <div key={index}>
          {fabric.material} {fabric.percentage}
        </div>
      ))}
    </div>
  );
}
