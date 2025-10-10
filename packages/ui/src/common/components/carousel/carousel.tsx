import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";

interface CarouselProps {
  children: ReactNode[]; // Accept multiple children as slides
}

export const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0); // Store the max height
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]); // References to all slides
  const slideCount = React.Children.count(children);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
  });

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slideCount - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slideCount - 1 ? 0 : prevIndex + 1,
    );
  };

  // Calculate the maximum height among all children
  useEffect(() => {
    const heights = slideRefs.current.map((ref) =>
      ref ? ref.offsetHeight : 0,
    );
    setMaxHeight(Math.max(...heights));
  }, [children]);

  return (
    <div className="relative w-full">
      <div
        {...handlers}
        className="relative w-full overflow-hidden"
        style={{ height: maxHeight }}
      >
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className="flex w-full flex-none items-center justify-center"
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: slideCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`size-3 rounded-full ${
              currentIndex === index
                ? "border-2 border-border-neutral-secondary"
                : "bg-fg-neutral-tertiary"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
