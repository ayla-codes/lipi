import React, { useRef, useEffect, useState } from "react";
import { useSprings, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import "./SvgAnimate.css";

const SvgAnimate = ({ pathList }) => {
  const [ref, inView] = useInView({ triggerOnce: true });

  const pathRefs = useRef([]);
  const paths = [
    "M10.5 3C102.1 4.2 131 3.5 134 3",
    "M2 120.5C24.4 136.9 40.5 150.5 56.5 131.5V5",
    "M115 5C113.189 158.684 114.245 193.662 115 191.94",
    "M54 153C138 206.2 162 221.5 163.5 222.5",
    "M111.5 105C38.5 63 23 53.5 19 54C15 54.5 2.5 58.5 5 68.5C7.5 78.5 15 83.5 15 83.5C15 83.5 23 87 29.5 88.5C36 90 38.5 83.5 38.5 83.5V63.802",
  ];

  const springs = useSprings(
    pathList.length,
    pathList.map((_, index) => ({
      strokeDashoffset: inView
        ? 0
        : pathRefs.current[index]
        ? pathRefs.current[index].getTotalLength()
        : 1000,
      config: { duration: 1000 },
      delay: index * 1200,
      immediate: !inView,
    }))
  );

  useEffect(() => {
    pathRefs.current.forEach((path) => {
      if (path) {
        path.style.strokeDasharray = path.getTotalLength();
        path.style.strokeDashoffset = path.getTotalLength();
      }
    });
  }, []);

  return (
    <div className="svgLineAnimation" ref={ref}>
      <svg
        width="220"
        height="200"
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {springs.map((animationProps, index) => (
          <animated.path
            key={index}
            ref={(el) => (pathRefs.current[index] = el)}
            d={pathList[index]}
            stroke="white"
            strokeWidth="6"
            fill="none"
            style={animationProps}
          />
        ))}
      </svg>
    </div>
  );
};

export default SvgAnimate;
