"use client";

interface Fabrics {
  material: string;
  percentage: string;
}

import { use, useState } from "react";

export default function MaterialForm() {

  const goodFabrics = ["cotton", "linen", "wool"];
  const badFabrics = ["polyester", "viscose", "rayon", "elastene"];

  const [material, setMaterial] = useState("");
  const [percentage, setPercentage] = useState("");
  const [fabricList, setFabricList] = useState<Fabrics[]>([]);
  const [counter, setCounter] = useState(0);
  const [goodScore, setGoodScore] = useState(0);
  const [badScore, setBadScore] = useState(0);

  const handleFabrics = () => {
    if (material.length > 0 && percentage.length > 0) {
      const newFabrics: Fabrics = {
        material: material,
        percentage: percentage,
      };

      setFabricList((prev) => [...prev, newFabrics]);

      setCounter((prev) => prev + parseInt(percentage));

      if(goodFabrics.includes(material)) {
        setGoodScore(prev => prev + parseInt(percentage))
      }
      if(badFabrics.includes(material)) {
        setBadScore(prev => prev + parseInt(percentage))
      }

      // clean
      setMaterial("");
      setPercentage("");
    }
  };

  return (
    <div className="grid gap-4">
      <div className="flex gap-4 justify-center">
        <p>Add a Material</p>
        <label>Material</label>
        <input
          onChange={(e) => setMaterial(e.target.value)}
          value={material}
          type="text"
          name="material"
          placeholder="cotton"
          className="border-2"
        />

        <label>Percentage</label>
        <input
          onChange={(e) => setPercentage(e.target.value)}
          value={percentage}
          type="text"
          name="percentage"
          placeholder="86"
          className="border-2"
        />
        <button className="bg-amber-300" onClick={handleFabrics}>
          Add +
        </button>
      </div>

      <div className="flex w-3xl m-auto p-4 gap-2 justify-center">
        {fabricList.map((fabric, index) => (
          <div key={index}>
            {fabric.material} {fabric.percentage}
          </div>
        ))}
      </div>

      <div className="grid justify-center">
        <p>All: {counter}</p>
        <p>Good Score: {goodScore}</p>
        <p>Bad Score: {badScore}</p>
      </div>

      <div className="grid justify-center">
        { goodScore >= 70 ? 
        <p>High Quality</p> 
        : "" }

        { goodScore >= 50 && goodScore < 70 ? 
        <p>Medium Quality</p> 
        : "" }

        { goodScore < 50 && goodScore > 0 ? 
        <p>Low Quality</p> 
        : "" }

      </div>
    </div>
  );
}
