# Design

## Product Context

The app is a product dashboard for researching US stocks through price behavior and a Serenity-inspired evidence framework.

## Visual Theme

Scene: a focused evening research desk with market data on one monitor and notes on another, calm lighting, no casino energy. The UI uses a restrained light workspace so dense numbers stay readable for long sessions.

## Color Palette

Use OKLCH custom properties only.

- `--bg`: pure white app background.
- `--panel`: neutral raised surface for controls and data regions.
- `--panel-2`: slightly tinted secondary surface for sidebars and rows.
- `--ink`: near-black text with a subtle green cast.
- `--muted`: readable secondary text.
- `--line`: structural borders.
- `--primary`: deep petrol green for active state and primary controls.
- `--accent`: saturated coral for alerts and research attention.
- `--good`: green for positive market change.
- `--bad`: red for negative market change.
- `--warn`: amber for watch items.

## Typography

System sans stack for all UI. Use a compact scale: 12, 13, 14, 16, 20, 24, 30. Use tabular numeric rendering for prices, percentages, ranks, and scores.

## Layout

App-shell structure with a sticky top bar, a left watchlist, central chart/research workspace, and right evidence panel. Collapse to one column on mobile with the watchlist above chart and evidence below.

## Components

- Icon buttons for refresh and timeframe controls.
- Segmented controls for range and list filters.
- Dense list rows with fixed ticker column, price, change, and score.
- Canvas price chart with crosshair tooltip and volume bars.
- Score bars with explicit labels, not color alone.
- Checklist rows for evidence, risk, and falsification.
- Skeleton states for data loading and inline error states for failed tickers.

## Motion

Use short 150-200ms state transitions for hover, selection, and loading replacements. Respect `prefers-reduced-motion`.
