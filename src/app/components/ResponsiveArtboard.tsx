import { useEffect, useRef, useState, type ReactNode } from "react";

interface ResponsiveArtboardProps {
  baseWidth: number;
  baseHeight: number;
  children: ReactNode;
  className?: string;
}

export default function ResponsiveArtboard({
  baseWidth,
  baseHeight,
  children,
  className = "",
}: ResponsiveArtboardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const updateScale = () => {
      const nextScale = Math.min(1, element.clientWidth / baseWidth);
      setScale(Number.isFinite(nextScale) && nextScale > 0 ? nextScale : 1);
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(element);

    window.addEventListener("resize", updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, [baseWidth]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ maxWidth: `${baseWidth}px`, width: "100%" }}
    >
      <div
        className="relative w-full"
        style={{ height: `${baseHeight * scale}px` }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: `${baseWidth}px`,
            height: `${baseHeight}px`,
            transform: `scale(${scale})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}