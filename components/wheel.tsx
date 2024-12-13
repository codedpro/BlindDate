import React, { useRef, useEffect, useState } from "react";
import { useKeenSlider, KeenSliderInstance, KeenSliderOptions } from "keen-slider/react";

interface WheelProps {
  state: any; // Replace with the actual type of the state if possible
  setState: (state: any) => void; // Replace with the actual function signature for setting state
  perspective?: string;
  length: number;
  loop?: boolean;
  initIdx?: number;
  setValue?: (index: number, value: number) => any;
  width: number;
  label?: string;
  minValue?: number; // Minimum value for the range
  maxValue?: number; // Maximum value for the range
}

const Wheel: React.FC<WheelProps> = (props) => {
  const sliderState = props.state;
  const setSliderState = props.setState;

  const perspective = props.perspective || "center";
  const wheelSize = 20;
  const slides = props.length;
  const slideDegree = 360 / wheelSize;
  const slidesPerView = props.loop ? 9 : 1;
  const size = useRef(0);

  // Calculate value range
  const minValue = props.minValue || 0;
  const maxValue = props.maxValue || slides - 1;
  const range = maxValue - minValue + 1;

  const options = useRef<KeenSliderOptions>({
    slides: {
      number: slides,
      origin: props.loop ? "center" : "auto",
      perView: slidesPerView,
    },
    vertical: true,
    initial: props.initIdx || 0,
    loop: props.loop,
    dragSpeed: (val: number) => {
      const height = size.current;
      return (
        val *
        (height / ((height / 2) * Math.tan(slideDegree * (Math.PI / 180))) /
          slidesPerView)
      );
    },
    created: (s: KeenSliderInstance) => {
      size.current = s.size;
    },
    updated: (s: KeenSliderInstance) => {
      size.current = s.size;
    },
    detailsChanged: (s: KeenSliderInstance) => {
      setSliderState(s.track.details);
    },
    rubberband: !props.loop,
    mode: "free-snap",
  });

  const [sliderRef, slider] = useKeenSlider(options.current);
  const [radius, setRadius] = useState<number>(0);

  useEffect(() => {
    if (slider.current) setRadius(slider.current.size / 2);
  }, [slider]);

  function slideValues() {
    if (!sliderState) return [];
    const offset = props.loop ? 1 / 2 - 1 / slidesPerView / 2 : 0;

    const values = [];
    for (let i = 0; i < slides; i++) {
      const distance = sliderState
        ? (sliderState.slides[i].distance - offset) * slidesPerView
        : 0;
      const rotate =
        Math.abs(distance) > wheelSize / 2
          ? 180
          : distance * (360 / wheelSize) * -1;
      const style = {
        transform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
        WebkitTransform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
      };

      // Corrected value calculation for unique mapping
      const value = minValue + ((i + (props.initIdx || 0)) % range);
      values.push({ style, value });
    }
    return values;
  }

  return (
    <div
      dir="ltr"
      className={"wheel keen-slider wheel--perspective-" + perspective}
      ref={sliderRef}
    >
      <div
        className="wheel__shadow-top"
        style={{
          transform: `translateZ(${radius}px)`,
          WebkitTransform: `translateZ(${radius}px)`,
        }}
      />
      <div className="wheel__inner">
        <div className="wheel__slides" style={{ width: props.width + "px" }}>
          {slideValues().map(({ style, value }, idx) => (
            <div className="wheel__slide" style={style} key={idx}>
              <span>{value}</span>
            </div>
          ))}
        </div>
        {props.label && (
          <div
            className="wheel__label"
            style={{
              transform: `translateZ(${radius}px)`,
              WebkitTransform: `translateZ(${radius}px)`,
            }}
          >
            {props.label}
          </div>
        )}
      </div>
      <div
        className="wheel__shadow-bottom"
        style={{
          transform: `translateZ(${radius}px)`,
          WebkitTransform: `translateZ(${radius}px)`,
        }}
      />
    </div>
  );
};

export default Wheel;
