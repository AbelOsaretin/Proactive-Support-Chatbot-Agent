import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

const Waveform = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="48"
    height="24"
    viewBox="0 0 48 24"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("stroke-current", className)}
    {...props}
  >
    <style>
      {`
      .wave-line {
        stroke-width: 2;
        stroke-linecap: round;
        animation: wave 1.5s infinite ease-in-out;
      }
      .wave-line:nth-child(1) { animation-delay: -0.3s; }
      .wave-line:nth-child(2) { animation-delay: -0.15s; }
      .wave-line:nth-child(4) { animation-delay: -0.15s; }
      .wave-line:nth-child(5) { animation-delay: -0.3s; }

      @keyframes wave {
        0%, 100% {
          stroke-dasharray: 2 10;
          stroke-dashoffset: 0;
          transform: translateY(0);
        }
        50% {
          stroke-dasharray: 10 2;
          stroke-dashoffset: -6;
          transform: translateY(-8px);
        }
      }
    `}
    </style>
    <g fill="none" fillRule="evenodd">
      <line className="wave-line" x1="4" y1="20" x2="4" y2="4" stroke="hsl(var(--primary))"></line>
      <line className="wave-line" x1="12" y1="20" x2="12" y2="4" stroke="hsl(var(--primary))"></line>
      <line className="wave-line" x1="20" y1="20" x2="20" y2="4" stroke="hsl(var(--accent))"></line>
      <line className="wave-line" x1="28" y1="20" x2="28" y2="4" stroke="hsl(var(--accent))"></line>
      <line className="wave-line" x1="36" y1="20" x2="36" y2="4" stroke="hsl(var(--primary))"></line>
      <line className="wave-line" x1="44" y1="20" x2="44" y2="4" stroke="hsl(var(--primary))"></line>
    </g>
  </svg>
);

export default Waveform;
