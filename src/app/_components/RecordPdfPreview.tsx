/** 出力されるA4横向き1枚PDF（生活記録表）の縮小イメージ。罫線のみを SVG で再現。 */

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

// 上段：7日 × 24時間の記録グリッド
const GRID = { x: 75, y: 55, w: 640, rowH: 36, rows: 7 } as const;
const gridBottom = GRID.y + GRID.rowH * GRID.rows;

// 右下：気分・疲労感チェック用グラフ
const CHART = { x: 622, y: 344, w: 180, h: 182 } as const;

export function RecordPdfPreview() {
  return (
    <div className="w-80 rounded-2xl bg-white p-3 text-[#2F3437] shadow-xl ring-1 ring-[#A8DAB5]">
      <p className="text-[11px] font-semibold">
        自動生成されるPDF（A4横・1枚／イメージ）
      </p>
      <svg
        viewBox="0 0 842 595"
        className="mt-2 w-full rounded-md bg-white shadow-sm ring-1 ring-[#2F3437]/15"
        role="img"
        aria-label="A4横向き1枚の生活記録表PDFの縮小イメージ"
        fill="none"
        stroke="#2F3437"
        strokeWidth="1.2"
      >
        {/* 記録グリッド（行線＋2時間ごとの縦点線） */}
        {range(GRID.rows + 1).map((i) => (
          <line
            key={`r${i}`}
            x1={GRID.x}
            x2={GRID.x + GRID.w}
            y1={GRID.y + i * GRID.rowH}
            y2={GRID.y + i * GRID.rowH}
          />
        ))}
        {range(13).map((i) => (
          <line
            key={`c${i}`}
            x1={GRID.x + (i * GRID.w) / 12}
            x2={GRID.x + (i * GRID.w) / 12}
            y1={GRID.y}
            y2={gridBottom}
            strokeDasharray={i % 12 === 0 ? undefined : "2 3"}
            strokeWidth={i % 12 === 0 ? 1.2 : 0.8}
          />
        ))}
        {/* 1日の気分・睡眠欄 */}
        <rect x="726" y={GRID.y} width="50" height={gridBottom - GRID.y} />
        <rect x="766" y={GRID.y} width="40" height={gridBottom - GRID.y} />
        {range(GRID.rows).map((i) => (
          <line
            key={`s${i}`}
            x1="766"
            x2="806"
            y1={GRID.y + (i + 1) * GRID.rowH}
            y2={GRID.y + i * GRID.rowH}
            strokeWidth="0.8"
          />
        ))}

        {/* 今週の目標・出来事欄 */}
        <rect x="35" y="310" width="558" height="180" rx="22" />
        <line x1="340" x2="340" y1="342" y2="490" strokeWidth="0.8" />
        <rect
          x="155"
          y="310"
          width="425"
          height="32"
          rx="8"
          stroke="#3E7A52"
          strokeWidth="2.5"
        />

        {/* 気づきメモ欄 */}
        <rect x="35" y="500" width="558" height="52" rx="14" />

        {/* 気分・疲労感グラフ */}
        {range(11).map((i) => (
          <line
            key={`g${i}`}
            x1={CHART.x}
            x2={CHART.x + CHART.w}
            y1={CHART.y + (i * CHART.h) / 10}
            y2={CHART.y + (i * CHART.h) / 10}
            strokeWidth="0.6"
          />
        ))}
        {range(8).map((i) => (
          <line
            key={`v${i}`}
            x1={CHART.x + (i * CHART.w) / 7}
            x2={CHART.x + (i * CHART.w) / 7}
            y1={CHART.y}
            y2={CHART.y + CHART.h}
            strokeWidth="0.6"
          />
        ))}
        <rect x={CHART.x} y={CHART.y} width={CHART.w} height={CHART.h} />
        {/* 記入例：気分○と疲労感△ */}
        <circle cx="648" cy="440" r="5" stroke="#3E7A52" strokeWidth="2" />
        <circle cx="674" cy="415" r="5" stroke="#3E7A52" strokeWidth="2" />
        <circle cx="700" cy="425" r="5" stroke="#3E7A52" strokeWidth="2" />
        <path
          d="M648 466 l5 -9 l5 9 z M674 480 l5 -9 l5 9 z M700 455 l5 -9 l5 9 z"
          stroke="#D9534F"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
