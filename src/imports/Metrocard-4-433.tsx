import svgPaths from "./svg-kh0493yybz";
import img141 from "../asset/e12181a4018c6b1e9630c99e7dc1161d6762f53c.png";

export default function Metrocard() {
  return (
    <div className="bg-white relative size-full" data-name="METROCARD">
      <div className="absolute h-[991px] left-[-59px] top-0 w-[558px]" data-name="-14 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img141} />
      </div>
      <div className="absolute h-[1036px] left-[-72px] top-[991px] w-[583px]" data-name="-14 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img141} />
      </div>
      <div className="absolute h-[169px] left-[7px] overflow-clip top-[93px] w-[366.344px]" data-name="MetroCard 1">
        <div className="absolute contents inset-0" data-name="layer1">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 366.344 169">
            <g id="g1113">
              <path d={svgPaths.p74db580} fill="var(--fill-0, #005DAA)" id="path1017" />
              <path d={svgPaths.p21d55800} fill="var(--fill-0, #005DAA)" id="path1019" />
              <path d={svgPaths.p36d44b70} fill="var(--fill-0, #005DAA)" id="path1021" />
              <path d={svgPaths.p10e65a80} fill="var(--fill-0, #005DAA)" id="path1023" />
              <path d={svgPaths.p2b577d80} fill="var(--fill-0, #005DAA)" id="path1025" />
              <path d={svgPaths.p17804900} fill="var(--fill-0, #005DAA)" id="path1027" />
              <path d={svgPaths.p3dd28430} fill="var(--fill-0, #0060A8)" id="path1029" />
              <path d={svgPaths.p35339800} fill="var(--fill-0, #005DAA)" id="path1031" />
              <path d={svgPaths.pf0aa200} fill="var(--fill-0, #005DAA)" id="path1033" />
              <path d={svgPaths.p1b2dbbf2} fill="var(--fill-0, #005DAA)" id="path1035" />
              <path d={svgPaths.p200e5d00} fill="var(--fill-0, #E8A714)" id="path1107" />
            </g>
          </svg>
        </div>
      </div>
      <div className="absolute font-['Source_Code_Pro',sans-serif] font-semibold leading-[normal] left-[21px] text-[#005daa] text-[14px] top-[284px] w-[339px] whitespace-pre-wrap" style={{ fontFeatureSettings: "'cv02'" }}>
        <p className="mb-0">{`Archive numérique consacrée aux Metrocards new-yorkaises et à leurs multiples variations graphiques jusqu’en 2025. Pensé comme un hommage à un objet banal devenu iconique, le projet rassemble éditions spéciales, évolutions formelles et usages visuels dans une logique à la fois documentaire et curatoriale. La Metrocard y apparaît moins comme un simple support de transport que comme un fragment de mémoire urbaine, de culture populaire `}</p>
        <p>et de design imprimé.</p>
      </div>
    </div>
  );
}