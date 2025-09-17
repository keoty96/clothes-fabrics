"use client";

interface Fabrics {
  material: string;
  percentage: string;
  className: string;
}

import { useState } from "react";

export default function MaterialForm() {
  const goodFabrics = ["cotton", "linen", "wool"];
  const badFabrics = ["polyester", "viscose", "rayon", "elastene"];
  const fabricsClasses = ["sriracha", "belacan", "thousand-island", "mustard", "soy-sauce", "ketchup", "satay", "kewpie"];

  const [material, setMaterial] = useState("");
  const [percentage, setPercentage] = useState("");
  const [fabricList, setFabricList] = useState<Fabrics[]>([]);
  const [counter, setCounter] = useState(0);
  const [goodScore, setGoodScore] = useState(0);
  const [badScore, setBadScore] = useState(0);

  const handleFabrics = () => {
    if (material.length > 0 && percentage.length > 0) {
      const randomIndex = Math.floor(Math.random() * fabricsClasses.length);

      const newFabrics: Fabrics = {
        material: material,
        percentage: percentage,
        className: fabricsClasses[randomIndex]
      };

      setFabricList((prev) => [...prev, newFabrics]);

      setCounter((prev) => prev + parseInt(percentage));

      if (goodFabrics.includes(material)) {
        setGoodScore((prev) => prev + parseInt(percentage));
      }
      if (badFabrics.includes(material)) {
        setBadScore((prev) => prev + parseInt(percentage));
      }

      // clean
      setMaterial("");
      setPercentage("");
    }
  };

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-8 justify-center items-center">
        <p className="text-2xl">Add a Material</p>
        <div className="flex gap-4 justify-center items-center">
          <label>Material</label>
          <input
            onChange={(e) => setMaterial(e.target.value)}
            value={material}
            type="text"
            name="material"
            placeholder="cotton"
            className="border-3 bg-amber-100 text-amber-900 p-2 rounded-xl font-semibold focus:outline-current disabled:opacity-50"
            disabled={counter >= 100 ? true : false}
          />

          <label>Percentage</label>
          <input
            onChange={(e) => setPercentage(e.target.value)}
            value={percentage}
            type="text"
            name="percentage"
            placeholder="86"
            className="border-3 bg-amber-100 text-amber-900 p-2 rounded-xl font-semibold focus:outline-current disabled:opacity-50"
            disabled={counter >= 100 ? true : false}
          />
          <button className="bg-pink-900 text-lime-200 font-semibold p-2 pl-5 pr-5 rounded cursor-pointer" onClick={handleFabrics}>
            Add +
          </button>
        </div>
      </div>

      <div className="flex w-3xl m-auto p-4 gap-2 justify-center">
        {fabricList.map((fabric, index) => (
          <div className={`${fabric.className}`} key={index}>
            {fabric.material} - {fabric.percentage}%
          </div>
        ))}
      </div>

      {/* <div className="grid justify-center">
        <p>All: {counter}</p>
        <p>Good Score: {goodScore}</p>
        <p>Bad Score: {badScore}</p>
      </div> */}

      <div className="grid justify-center">
        {goodScore >= 70 && badScore < 70 ? <p>High Quality</p> : ""}

        {goodScore >= 50 && goodScore < 70 && badScore >= 70 ? <p>Medium Quality</p> : ""}

        {goodScore < 50 && badScore >= 50 ? <p>Low Quality</p> : ""}
      </div>
    </div>
  );
}
