"use client";

import { useEffect } from "react";

const SearchFilter = () => {
  useEffect(() => {
    const slider = document.querySelector(".range-slider") as HTMLElement;
    const progress = slider.querySelector(".progress") as HTMLElement;
    const minPriceInput = slider.querySelector(".min-price") as HTMLInputElement;
    const maxPriceInput = slider.querySelector(".max-price") as HTMLInputElement;
    const minInput = slider.querySelector(".min-input") as HTMLInputElement;
    const maxInput = slider.querySelector(".max-input") as HTMLInputElement;

    const updateProgress = () => {
      const minValue = parseInt(minInput.value);
      const maxValue = parseInt(maxInput.value);

      // get the total range of the slider
      const range = maxInput.max ? parseInt(maxInput.max) - parseInt(minInput.min) : 0;
      // get the selected value range of the progress
      const valueRange = maxValue - minValue;
      // calculate the width percentage
      const width = (valueRange / range) * 100;
      // calculate the min thumb offset
      const minOffset = ((minValue - parseInt(minInput.min)) / range) * 100;

      // update the progress width
      progress.style.width = `${width}%`;
      // update the progress left position
      progress.style.left = `${minOffset}%`;

      // update the number inputs
      minPriceInput.value = minValue.toString();
      maxPriceInput.value = maxValue.toString();
    };

    const updateRange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      console.log("update Range");

      let min = parseInt(minPriceInput.value);
      let max = parseInt(maxPriceInput.value);

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

    minPriceInput.addEventListener("input", updateRange);
    maxPriceInput.addEventListener("input", updateRange);

    minInput.addEventListener("input", (e: Event) => {
      const minVal = parseInt(minInput.value);
      if (minVal >= parseInt(maxInput.value)) {
        maxInput.value = minInput.value;
      }
      updateProgress();
      updateRange(e);
    });

    maxInput.addEventListener("input", (e: Event) => {
      const maxVal = parseInt(maxInput.value);
      if (maxVal <= parseInt(minInput.value)) {
        minInput.value = maxInput.value;
      }
      updateProgress();
      updateRange(e);
    });

    updateProgress();
  }, []);

  return (
    <div className="filter-container">
      <h3>Filter by Price</h3>

      <div className="range-slider">
        <input type="number" className="min-price" value="25" min="1" max="100" />
        <input type="number" className="max-price" value="75" min="1" max="100" />

        <div className="range">
          <input type="range" className="min-input" value="25" min="1" max="100" />
          <input type="range" className="max-input" value="75" min="1" max="100" />

          <div className="slider">
            <div className="progress"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
