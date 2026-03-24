import svgPaths from "./svg-al9mhoo9xr";
import imgRectangle from "../asset/50b5c918903711ef9a064617d0185e52eb9646e4.png";
import imgRectangle1 from "../asset/73f4e6def7f9b67eb2ef64a46e1bda0624ee73fd.png";
type SplashProps = {
  className?: string;
  property1?: "v" | "Frame 2" | "Frame 6" | "Frame 8" | "Group";
};

function Splash({ className, property1 = "v" }: SplashProps) {
  const isFrame2 = property1 === "Frame 2";
  const isFrame8 = property1 === "Frame 8";
  const isGroup = property1 === "Group";
  const isV = property1 === "v";
  return (
    <div className={className || isFrame8 ? "h-[98px] relative w-[254px]" : property1 === "Frame 6" ? "h-[99.75px] relative w-[366.25px]" : isGroup ? "h-[108.819px] relative w-[168.172px]" : isV ? "h-[93px] relative w-[337px]" : isFrame2 ? "relative w-[291.65px]" : undefined}>
      {isGroup && (
        <>
          <div className={isGroup ? "absolute inset-[-0.2%_-0.37%_0.2%_83.92%]" : undefined} data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isGroup ? "0 0 27.6719 108.819" : undefined}>
              <path d={isGroup ? svgPaths.p2dfce800 : undefined} fill="var(--fill-0, black)" id="Vector" />
            </svg>
          </div>
          <div className={isGroup ? "absolute inset-[2.76%_-16.9%_42.18%_92.82%]" : undefined} data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isGroup ? "0 0 40.4878 59.9148" : undefined}>
              <path d={isGroup ? svgPaths.p21fbf680 : undefined} fill="var(--fill-0, black)" id="Vector" />
            </svg>
          </div>
          <div className={isGroup ? "absolute inset-[14.78%_39.45%_37.55%_50.26%]" : undefined} data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isGroup ? "0 0 17.3098 51.8711" : undefined}>
              <path d={isGroup ? svgPaths.p1c1e7900 : undefined} fill="var(--fill-0, black)" id="Vector" />
            </svg>
          </div>
          <div className={isGroup ? "absolute inset-[21.86%_-50.26%_52.22%_117.59%]" : undefined} data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isGroup ? "0 0 54.9309 28.2052" : undefined}>
              <path d={isGroup ? svgPaths.pccc5700 : undefined} fill="var(--fill-0, black)" id="Vector" />
            </svg>
          </div>
          <div className={isGroup ? "absolute inset-[30.11%_30%_44.45%_60.89%]" : undefined} data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isGroup ? "0 0 15.3147 27.6807" : undefined}>
              <path d={isGroup ? svgPaths.p3c23a400 : undefined} fill="var(--fill-0, black)" id="Vector" />
            </svg>
          </div>
          <div className={isGroup ? "absolute inset-[8.68%_13.42%_50.49%_80.81%]" : undefined} data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isGroup ? "0 0 9.7137 44.4252" : undefined}>
              <path d={isGroup ? svgPaths.p30de580 : undefined} fill="var(--fill-0, black)" id="Vector" />
            </svg>
          </div>
          <div className={isGroup ? "absolute inset-[26.42%_19.93%_49.91%_70.75%]" : undefined} data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isGroup ? "0 0 15.6605 25.7549" : undefined}>
              <path d={isGroup ? svgPaths.p1a95b400 : undefined} fill="var(--fill-0, black)" id="Vector" />
            </svg>
          </div>
          <div className={isGroup ? "absolute inset-[26.08%_-17.28%_70.59%_114%]" : undefined} data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isGroup ? "0 0 5.5141 3.63078" : undefined}>
              <path d={isGroup ? svgPaths.p4866e80 : undefined} fill="var(--fill-0, black)" id="Vector" />
            </svg>
          </div>
        </>
      )}
      {["Frame 6", "Frame 8"].includes(property1) && (
        <div className={`absolute ${isFrame8 ? "inset-[0.51%_-0.1%_21.39%_16.24%]" : "inset-[12.03%_12.22%_11.47%_1.91%]"}`} data-name="Group">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isFrame8 ? "0 0 213 76.537" : "0 0 314.5 76.3074"}>
            <g id="Group">
              <path d={isFrame8 ? svgPaths.p2f648a00 : svgPaths.p3b675180} fill="var(--fill-0, black)" id="Vector" />
              <path d={isFrame8 ? svgPaths.p35b5b480 : svgPaths.p2f2a4600} fill="var(--fill-0, black)" id="Vector_2" />
              {isFrame8 && (
                <>
                  <path d={svgPaths.p3e6d5500} fill="var(--fill-0, black)" id="Vector_3" />
                  <path d={svgPaths.pe7c3c80} fill="var(--fill-0, black)" id="Vector_4" />
                  <path d={svgPaths.p1cd71200} fill="var(--fill-0, black)" id="Vector_5" />
                  <path d={svgPaths.p2ad8bf00} fill="var(--fill-0, black)" id="Vector_6" />
                  <path d={svgPaths.p28557f40} fill="var(--fill-0, black)" id="Vector_7" />
                  <path d={svgPaths.p3f902f00} fill="var(--fill-0, black)" id="Vector_8" />
                  <path d={svgPaths.p3b35d490} fill="var(--fill-0, black)" id="Vector_9" />
                </>
              )}
            </g>
          </svg>
        </div>
      )}
      {isFrame2 && (
        <div className="content-stretch flex flex-col items-start p-[2.5px] relative w-full">
          <div className="h-[101.725px] relative shrink-0 w-full" data-name="Rectangle">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle} />
            </div>
          </div>
        </div>
      )}
      {isV && (
        <div className="absolute h-[105.592px] left-[-50px] top-0 w-[332px]" data-name="Rectangle">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle1} />
          </div>
        </div>
      )}
      <div className="absolute inset-[1.81%_21.67%_28.57%_75.01%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5739 35.9797">
          <path d={svgPaths.p1ac83700} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

export default function SplashScreen() {
  return (
    <div className="bg-background relative size-full" data-name="SPLASH SCREEN">
      <Splash className="absolute h-[93px] left-[80px] top-[431px] w-[337px]" />
    </div>
  );
}