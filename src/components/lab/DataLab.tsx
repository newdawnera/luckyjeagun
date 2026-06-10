"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  metrics,
  months,
  channels,
  formatValue,
  type MetricKey,
  type MetricAccent,
} from "@/lib/labData";

const accentVar: Record<MetricAccent, string> = {
  violet: "var(--neon-violet)",
  cyan: "var(--neon-cyan)",
  pink: "var(--neon-pink)",
};

type ChartType = "line" | "area" | "bars" | "candles";
const chartTypes: { key: ChartType; label: string }[] = [
  { key: "area", label: "Area" },
  { key: "line", label: "Line" },
  { key: "bars", label: "Bars" },
  { key: "candles", label: "Candles" },
];

const CANDLE_UP = "rgb(52 211 153)";
const CANDLE_DOWN = "rgb(236 72 153)";

// Chart geometry (viewBox units).
const VW = 720;
const VH = 300;
const PAD = { l: 46, r: 18, t: 20, b: 30 };
const innerW = VW - PAD.l - PAD.r;
const innerH = VH - PAD.t - PAD.b;

export function DataLab() {
  const [metricKey, setMetricKey] = React.useState<MetricKey>("signups");
  const [chartType, setChartType] = React.useState<ChartType>("area");
  const [active, setActive] = React.useState<number | null>(null);
  const [activeChannel, setActiveChannel] = React.useState<number | null>(null);
  const svgRef = React.useRef<SVGSVGElement | null>(null);

  const m = metrics[metricKey];
  const color = `rgb(${accentVar[m.accent]})`;
  const fill = `rgb(${accentVar[m.accent]} / 0.16)`;
  const n = m.values.length;
  const step = innerW / (n - 1);

  // Deterministic OHLC for candlestick view, derived from the series.
  const candles = React.useMemo(() => {
    const vals = m.values;
    return vals.map((v, i) => {
      const open = i === 0 ? vals[0] * 0.96 : vals[i - 1];
      const close = v;
      const hi = Math.max(open, close);
      const lo = Math.min(open, close);
      const spread = hi - lo || close * 0.05;
      const high = Math.round(hi + spread * (0.3 + Math.abs(Math.sin(i * 1.7)) * 0.5));
      const low = Math.max(
        0,
        Math.round(lo - spread * (0.3 + Math.abs(Math.cos(i * 2.3)) * 0.5)),
      );
      return { open, close, high, low, up: close >= open, i };
    });
  }, [m]);

  const dataMax =
    chartType === "candles" ? Math.max(...candles.map((c) => c.high)) : Math.max(...m.values);
  const niceMax = dataMax * 1.12;

  const x = (i: number) => PAD.l + (i * innerW) / (n - 1);
  const y = (v: number) => PAD.t + (1 - v / niceMax) * innerH;
  const baseline = y(0);

  const points = m.values.map((v, i) => ({ x: x(i), y: y(v), v, i }));
  const linePath = "M " + points.map((p) => `${p.x},${p.y}`).join(" L ");
  const areaPath =
    `M ${points[0].x},${baseline} L ` +
    points.map((p) => `${p.x},${p.y}`).join(" L ") +
    ` L ${points[n - 1].x},${baseline} Z`;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => ({
    yy: PAD.t + (1 - f) * innerH,
    label: Math.round(niceMax * f),
  }));

  // Derived stats.
  const first = m.values[0];
  const last = m.values[n - 1];
  const growth = Math.round(((last - first) / first) * 100);
  const peakIdx = m.values.indexOf(Math.max(...m.values));
  const avg = Math.round(m.values.reduce((a, b) => a + b, 0) / n);
  const topChannel = [...channels].sort((a, b) => b.value - a.value)[0];

  function handleMove(e: React.MouseEvent) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const idx = Math.min(n - 1, Math.max(0, Math.round(ratio * (n - 1))));
    setActive(idx);
  }

  const ap = active !== null ? points[active] : null;
  const ac = active !== null ? candles[active] : null;
  const isCandle = chartType === "candles";
  const tipW = isCandle ? 150 : 124;
  const tipH = isCandle ? 64 : 46;
  const tipX = ap ? Math.min(Math.max(ap.x - tipW / 2, PAD.l), VW - PAD.r - tipW) : 0;

  const kpis = [
    { label: "Latest", value: formatValue(last, m) },
    { label: "Growth", value: `${growth >= 0 ? "+" : ""}${growth}%` },
    { label: "Peak month", value: months[peakIdx] },
    { label: "Monthly avg", value: formatValue(avg, m) },
  ];

  const bodyW = Math.min(30, step * 0.5);
  const barW = Math.min(34, step * 0.55);

  return (
    <div className="space-y-8">
      {/* Metric selector */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(metrics) as MetricKey[]).map((k) => {
          const isActive = k === metricKey;
          const c = accentVar[metrics[k].accent];
          return (
            <button
              key={k}
              type="button"
              onClick={() => {
                setMetricKey(k);
                setActive(null);
              }}
              className="rounded-full border px-4 py-2 text-sm font-medium transition"
              style={
                isActive
                  ? {
                      backgroundColor: `rgb(${c} / 0.16)`,
                      borderColor: `rgb(${c} / 0.5)`,
                      color: `rgb(${c})`,
                    }
                  : {
                      backgroundColor: "transparent",
                      borderColor: "rgb(var(--glass-border))",
                      color: "rgb(var(--fg-muted))",
                    }
              }
            >
              {metrics[k].label}
            </button>
          );
        })}
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="glass rounded-2xl p-4">
            <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">
              {k.label}
            </p>
            <p className="mt-1 text-2xl font-bold text-fg">{k.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="glass rounded-3xl p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-fg">{m.label}</h3>
            <p className="text-xs text-fg-muted">{m.blurb}</p>
          </div>
          {/* Chart-type switcher */}
          <div className="inline-flex rounded-full border border-[rgb(var(--glass-border))] p-1">
            {chartTypes.map((ct) => {
              const on = ct.key === chartType;
              return (
                <button
                  key={ct.key}
                  type="button"
                  onClick={() => setChartType(ct.key)}
                  className="rounded-full px-3 py-1.5 text-xs font-medium transition"
                  style={
                    on
                      ? { backgroundColor: `rgb(${accentVar[m.accent]} / 0.18)`, color }
                      : { color: "rgb(var(--fg-muted))" }
                  }
                >
                  {ct.label}
                </button>
              );
            })}
          </div>
        </div>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${VW} ${VH}`}
          className="w-full"
          role="img"
          aria-label={`${m.label} over twelve months, ${chartType} chart`}
          onMouseMove={handleMove}
          onMouseLeave={() => setActive(null)}
        >
          {yTicks.map((t, i) => (
            <g key={i}>
              <line
                x1={PAD.l}
                x2={VW - PAD.r}
                y1={t.yy}
                y2={t.yy}
                stroke="rgb(var(--fg) / 0.08)"
                strokeWidth={1}
              />
              <text
                x={PAD.l - 8}
                y={t.yy + 4}
                textAnchor="end"
                style={{ fontSize: 11, fill: "rgb(var(--fg-muted))" }}
              >
                {t.label}
              </text>
            </g>
          ))}

          {/* Area */}
          {chartType === "area" && (
            <>
              <path d={areaPath} style={{ fill }} />
              <path
                d={linePath}
                fill="none"
                style={{ stroke: color }}
                strokeWidth={2.5}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </>
          )}

          {/* Line */}
          {chartType === "line" && (
            <path
              d={linePath}
              fill="none"
              style={{ stroke: color }}
              strokeWidth={2.5}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          )}

          {/* Points for line + area */}
          {(chartType === "line" || chartType === "area") &&
            points.map((p) => (
              <circle
                key={p.i}
                cx={p.x}
                cy={p.y}
                r={active === p.i ? 5 : 3}
                style={{
                  fill: active === p.i ? color : "rgb(var(--bg))",
                  stroke: color,
                }}
                strokeWidth={2}
              />
            ))}

          {/* Bars */}
          {chartType === "bars" &&
            points.map((p) => (
              <rect
                key={p.i}
                x={p.x - barW / 2}
                y={p.y}
                width={barW}
                height={Math.max(0, baseline - p.y)}
                rx={4}
                style={{
                  fill: color,
                  opacity: active === null || active === p.i ? 0.85 : 0.4,
                }}
              />
            ))}

          {/* Candles */}
          {chartType === "candles" &&
            candles.map((c) => {
              const cx = x(c.i);
              const top = y(Math.max(c.open, c.close));
              const bot = y(Math.min(c.open, c.close));
              const h = Math.max(1.5, bot - top);
              const col = c.up ? CANDLE_UP : CANDLE_DOWN;
              return (
                <g
                  key={c.i}
                  style={{ opacity: active === null || active === c.i ? 1 : 0.4 }}
                >
                  <line
                    x1={cx}
                    x2={cx}
                    y1={y(c.high)}
                    y2={y(c.low)}
                    stroke={col}
                    strokeWidth={1.5}
                  />
                  <rect
                    x={cx - bodyW / 2}
                    y={top}
                    width={bodyW}
                    height={h}
                    rx={2}
                    fill={col}
                  />
                </g>
              );
            })}

          {/* x-axis month labels */}
          {months.map((mo, i) => (
            <text
              key={mo}
              x={x(i)}
              y={VH - 8}
              textAnchor="middle"
              style={{ fontSize: 11, fill: "rgb(var(--fg-muted))" }}
            >
              {mo}
            </text>
          ))}

          {/* Hover guide + tooltip */}
          {ap && (
            <g>
              <line
                x1={ap.x}
                x2={ap.x}
                y1={PAD.t}
                y2={baseline}
                stroke={color}
                strokeWidth={1}
                strokeDasharray="3 3"
                opacity={0.6}
              />
              <rect
                x={tipX}
                y={PAD.t}
                width={tipW}
                height={tipH}
                rx={10}
                style={{ fill: "rgb(var(--bg))", stroke: color }}
                strokeWidth={1}
              />
              <text
                x={tipX + 12}
                y={PAD.t + 19}
                style={{ fontSize: 12, fill: "rgb(var(--fg-muted))" }}
              >
                {months[ap.i]}
              </text>
              <text
                x={tipX + 12}
                y={PAD.t + 37}
                style={{ fontSize: 15, fontWeight: 700, fill: "rgb(var(--fg))" }}
              >
                {formatValue(isCandle && ac ? ac.close : ap.v, m)}
              </text>
              {isCandle && ac && (
                <text
                  x={tipX + 12}
                  y={PAD.t + 55}
                  style={{ fontSize: 11, fill: "rgb(var(--fg-muted))" }}
                >
                  H {formatValue(ac.high, m)} · L {formatValue(ac.low, m)}
                </text>
              )}
            </g>
          )}
        </svg>
        <p className="mt-2 text-center text-xs text-fg-muted sm:hidden">
          Tap and drag across the chart to inspect values.
        </p>
      </div>

      {/* Channel breakdown + analyst note */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-fg">Acquisition channels</h3>
          <p className="mt-1 text-xs text-fg-muted">Share of new users by source.</p>
          <div className="mt-5 space-y-3">
            {channels.map((ch, i) => (
              <div
                key={ch.name}
                onMouseEnter={() => setActiveChannel(i)}
                onMouseLeave={() => setActiveChannel(null)}
                className="flex items-center gap-3"
              >
                <span className="w-28 shrink-0 text-sm text-fg-muted">{ch.name}</span>
                <span className="relative h-3 flex-1 overflow-hidden rounded-full bg-[rgb(var(--fg)/0.06)]">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full transition-all"
                    style={{
                      width: `${ch.value}%`,
                      backgroundColor: `rgb(var(--neon-violet) / ${activeChannel === i ? 1 : 0.7})`,
                    }}
                  />
                </span>
                <span className="w-10 shrink-0 text-right text-sm font-semibold text-fg">
                  {ch.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          key={metricKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass gradient-border rounded-3xl p-6"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color }}>
            Analyst&apos;s note
          </p>
          <p className="mt-4 text-base leading-relaxed text-fg">
            {m.label} {growth >= 0 ? "climbed" : "fell"} {Math.abs(growth)}% over the
            year, from {formatValue(first, m)} in {months[0]} to {formatValue(last, m)} in{" "}
            {months[n - 1]}, peaking in {months[peakIdx]}.
          </p>
          <p className="mt-3 text-base leading-relaxed text-fg-muted">
            {topChannel.name} drove the largest share of acquisition at{" "}
            {topChannel.value}% — the most efficient lever to lean on next.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
