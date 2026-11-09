/** 生活記録表（24時間軸＋気分・疲労感グラフ）の縮小イメージ。サンプル値で描画。 */

const HOURS = [0, 6, 12, 18, 24] as const;

// x: 0〜24時 → 0〜240 / y: 気分・疲労感 0〜100% → 60〜0
const toPoints = (values: readonly number[]) =>
  values
    .map((v, i) => `${(i * 240) / (values.length - 1)},${60 - v * 0.6}`)
    .join(" ");

const MOOD = [40, 35, 55, 70, 60, 65, 75, 55, 50] as const;
const FATIGUE = [30, 25, 45, 50, 65, 60, 55, 70, 60] as const;

export function RecordSheetPreview() {
  return (
    <div className="w-64 rounded-2xl bg-white p-3 text-[#2F3437] shadow-xl ring-1 ring-[#A8DAB5]">
      <p className="text-[11px] font-semibold">生活記録表（イメージ）</p>

      <svg
        viewBox="-4 -4 248 68"
        className="mt-2 w-full overflow-visible rounded-lg bg-[#A8DAB5]/15"
        role="img"
        aria-label="24時間の時間軸に気分と疲労感の推移を描いたサンプルグラフ"
      >
        {[0, 15, 30, 45, 60].map((y) => (
          <line
            key={y}
            x1="0"
            x2="240"
            y1={y}
            y2={y}
            stroke="#A8DAB5"
            strokeWidth="0.5"
          />
        ))}
        <polyline
          points={toPoints(MOOD)}
          fill="none"
          stroke="#3E7A52"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <polyline
          points={toPoints(FATIGUE)}
          fill="none"
          stroke="#E0A458"
          strokeWidth="2"
          strokeDasharray="4 3"
          strokeLinejoin="round"
        />
      </svg>

      <div className="mt-1 flex justify-between text-[9px] text-[#2F3437]/60">
        {HOURS.map((h) => (
          <span key={h}>{h}時</span>
        ))}
      </div>

      <div className="mt-2 flex gap-3 text-[10px]">
        <span className="flex items-center gap-1">
          <i className="h-0.5 w-4 bg-[#3E7A52]" />
          気分
        </span>
        <span className="flex items-center gap-1">
          <i className="h-0.5 w-4 border-t-2 border-dashed border-[#E0A458]" />
          疲労感
        </span>
      </div>
    </div>
  );
}
