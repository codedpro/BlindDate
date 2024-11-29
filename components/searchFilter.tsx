"use client";

import React, { useEffect } from "react";

const SearchFilter: React.FC = () => {
  useEffect(() => {
    const slider = document.querySelector(".range-slider") as HTMLElement | null;
    if (!slider) return;

    const progress = slider.querySelector(".progress") as HTMLDivElement | null;
    const minPriceInput = slider.querySelector(".min-price") as HTMLInputElement | null;
    const maxPriceInput = slider.querySelector(".max-price") as HTMLInputElement | null;
    const minInput = slider.querySelector(".min-input") as HTMLInputElement | null;
    const maxInput = slider.querySelector(".max-input") as HTMLInputElement | null;

    if (!progress || !minPriceInput || !maxPriceInput || !minInput || !maxInput) return;

    const updateProgress = () => {
      const minValue = parseInt(minInput.value, 10);
      const maxValue = parseInt(maxInput.value, 10);

      const range = parseInt(maxInput.max, 10) - parseInt(minInput.min, 10);
      const valueRange = maxValue - minValue;
      const width = (valueRange / range) * 100;
      const minOffset = ((minValue - parseInt(minInput.min, 10)) / range) * 100;

      progress.style.width = `${width}%`;
      progress.style.left = `${minOffset}%`;

      minPriceInput.value = minValue.toString();
      maxPriceInput.value = maxValue.toString();
    };

    const updateRange = (event: Event) => {
      const input = event.target as HTMLInputElement;

      let min = parseInt(minPriceInput.value, 10);
      let max = parseInt(maxPriceInput.value, 10);

      if (input === minPriceInput && min > max) {
        max = min;
        maxPriceInput.value = max.toString();
      } else if (input === maxPriceInput && max < min) {
        min = max;
        minPriceInput.value = min.toString();
      }

      minInput.value = min.toString();
      maxInput.value = max.toString();

      updateProgress();
    };

    const handleMinInput = () => {
      if (parseInt(minInput.value, 10) >= parseInt(maxInput.value, 10)) {
        maxInput.value = minInput.value;
      }
      updateProgress();
    };

    const handleMaxInput = () => {
      if (parseInt(maxInput.value, 10) <= parseInt(minInput.value, 10)) {
        minInput.value = maxInput.value;
      }
      updateProgress();
    };

    minPriceInput.addEventListener("input", updateRange);
    maxPriceInput.addEventListener("input", updateRange);
    minInput.addEventListener("input", handleMinInput);
    maxInput.addEventListener("input", handleMaxInput);

    updateProgress();

    return () => {
      minPriceInput.removeEventListener("input", updateRange);
      maxPriceInput.removeEventListener("input", updateRange);
      minInput.removeEventListener("input", handleMinInput);
      maxInput.removeEventListener("input", handleMaxInput);
    };
  }, []);

  return (
    <div className="filter-container">
      <h3>Filter by Price</h3>

      <div className="range-slider">
        <input type="number" className="min-price" defaultValue="25" min="1" max="100" />
        <input type="number" className="max-price" defaultValue="75" min="1" max="100" />

        <div className="range">
          <input type="range" className="min-input" defaultValue="25" min="1" max="100" />
          <input type="range" className="max-input" defaultValue="75" min="1" max="100" />

          <div className="slider">
            <div className="progress"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
