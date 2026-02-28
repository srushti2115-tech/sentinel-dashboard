interface RiskScoreGaugeProps {
  score: number;
}

export default function RiskScoreGauge({ score }: RiskScoreGaugeProps) {
  const angle = (score / 100) * 180;
  const color =
    score > 70 ? "hsl(0, 72%, 55%)" : score > 40 ? "hsl(38, 92%, 55%)" : "hsl(152, 69%, 45%)";
  const label = score > 70 ? "High Risk" : score > 40 ? "Medium Risk" : "Low Risk";

  const r = 80;
  const cx = 100;
  const cy = 95;
  const startAngle = Math.PI;
  const endAngle = Math.PI - (angle * Math.PI) / 180;

  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy - r * Math.sin(startAngle);
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy - r * Math.sin(endAngle);

  const largeArc = angle > 180 ? 1 : 0;

  return (
    <div className="glass-card p-5 flex flex-col items-center">
      <h3 className="text-sm font-semibold text-foreground mb-4 self-start">Risk Score Gauge</h3>
      <svg viewBox="0 0 200 120" className="w-48 h-auto">
        {/* Background arc */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="hsl(222, 30%, 18%)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Value arc */}
        <path
          d={`M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 6px ${color})`,
            transition: "all 0.5s ease",
          }}
        />
        <text x={cx} y={cy - 10} textAnchor="middle" fill={color} fontSize="28" fontWeight="700">
          {score}
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fill="hsl(215, 20%, 55%)" fontSize="11">
          {label}
        </text>
      </svg>
    </div>
  );
}
