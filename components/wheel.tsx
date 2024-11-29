// wheel.tsx
import React, { useRef, useEffect, useState } from "react";
import { useKeenSlider, KeenSliderOptions } from "keen-slider/react";

interface WheelProps {
  onValueChange: (value: number) => void;
  perspective?: "center" | "top" | "bottom";
  length: number;
  loop?: boolean;
  initIdx?: number;
  setValue?: (index: number, adjustedIndex: number) => any;
  width?: number;
  label?: string;
}

const Wheel: React.FC<WheelProps> = ({
  onValueChange,
  perspective = "center",
  length: slides,
  loop = false,
  initIdx = 0,
  setValue,
  width,
  label,
}) => {
  const wheelSize = 20;
  const slideDegree = 360 / wheelSize;
  const slidesPerView = loop ? 9 : 1;

  const size = useRef(0);

  const [sliderState, setSliderState] = useState<any>(null);

  const options: KeenSliderOptions = {
    slides: {
      origin: loop ? "center" : "auto",
      number: slides,
      perView: slidesPerView,
    },
    vertical: true,
    initial: initIdx,
    loop,
    dragSpeed: (val: number) => {
      const height = size.current;
      return (
        val *
        (height / ((height / 2) * Math.tan(slideDegree * (Math.PI / 180))) / slidesPerView)
      );
    },
    created: (s) => {
      size.current = s.size || 0;
    },
    updated: (s) => {
      size.current = s.size || 0;
    },
    detailsChanged: (s) => {
      setSliderState(s.track.details);
      const currentSlide = s.track.details.abs;
      const value = setValue ? setValue(currentSlide, s.track.details.rel) : currentSlide;
      onValueChange(value);
    },
    rubberband: !loop,
    mode: "free-snap",
  };

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(options);

  const [radius, setRadius] = useState(0);

  useEffect(() => {
    if (slider.current) {
      setRadius((slider.current.size || 0) / 2);
    }
  }, [slider]);

  const slideValues = () => {
    if (!sliderState) return [];
    const offset = loop ? 1 / 2 - 1 / slidesPerView / 2 : 0;
    const values: { style: React.CSSProperties; value: any }[] = [];

    for (let i = 0; i < slides; i++) {
      const distance = sliderState.slides[i]?.distance || 0;
      const adjustedDistance = (distance - offset) * slidesPerView;
      const rotate =
        Math.abs(adjustedDistance) > wheelSize / 2
          ? 180
          : adjustedDistance * (360 / wheelSize) * -1;

      const style: React.CSSProperties = {
        transform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
        WebkitTransform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
      };

      const value = setValue
        ? setValue(i, sliderState.abs + Math.round(adjustedDistance))
        : i;

      values.push({ style, value });
    }
    return values;
  };

  return (
    <div
      className={`wheel keen-slider wheel--perspective-${perspective}`}
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
        <div className="wheel__slides" style={{ width: width ? `${width}px` : "100%" }}>
          {slideValues().map(({ style, value }, idx) => (
            <div className="wheel__slide" style={style} key={idx}>
              <span>{value}</span>
            </div>
          ))}
        </div>
        {label && (
          <div
            className="wheel__label"
            style={{
              transform: `translateZ(${radius}px)`,
              WebkitTransform: `translateZ(${radius}px)`,
            }}
          >
            {label}
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
