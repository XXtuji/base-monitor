# Serenity Ultimate Framework

This site combines the three referenced Serenity repositories into a local US equity research terminal.

## Sources Studied

- `haskaomni/serenity`: local dashboard, X/cashtag corpus, price timeline, `serenity-stock-scorer`.
- `haskaomni/serenity-skill`: `serenity-alpha`, `gf-dma-health-index`, `bayesian-intrinsic-growth-valuation`, `tam-adj-peg`.
- `muxuuu/serenity-skill`: supply-chain bottleneck workflow, evidence ladder, market source playbook, risk boundary, scorecard script.

## Engines Implemented

1. **Supply-chain bottleneck scorecard**
   - Factors: demand inflection, architecture coupling, chokepoint severity, supplier concentration, expansion difficulty, evidence quality, valuation disconnect, catalyst timing.
   - Penalties: dilution/financing, governance, geopolitics, liquidity, hype risk, accounting quality, cyclicality, alternative design risk.

2. **Serenity Alpha**
   - Maps `news -> observed demand -> revenue/profit transmission -> business purity -> market-cap elasticity -> validation path`.
   - Mega-caps can be high quality but score lower on small-cap elasticity and market neglect.

3. **GF-DMA Health Index**
   - Uses live Yahoo chart data for 20/50/100/200DMA, trend speed, price-to-DMA divergence, escape ratio, RSI, volatility, and drawdown.
   - Uses static revision/fundamental-speed assumptions until connected to a fundamentals provider.

4. **Bayesian intrinsic growth valuation**
   - Tracks H0-H5 revenue CAGR hypotheses:
     H0 contraction, H1 mature growth, H2 steady growth, H3 high-cycle growth, H4 structural breakout, H5 platform expansion.
   - Compares weighted intrinsic growth with market-implied growth assumptions.

5. **TAM-Adj-PEG**
   - Calculates `Forward PE / (EPS CAGR x TAM Runway Factor x Quality Factor)`.
   - Marks loss-making or distorted earnings names as milestone/option-style rather than ordinary PEG ideas.

6. **Serenity corpus/theme signal**
   - Approximates whether the ticker matches Serenity-style recurring themes: AI infrastructure, optical/photonics, memory, semicap, power/grid, robotics, software/platforms.

## Evidence Standard

Strong evidence should come from SEC filings, company IR, earnings calls, official announcements, project/regulatory records, patents, standards, or hard technical documents.

Medium evidence can come from reputable financial media, trade publications, specialist research, company product pages, or public customer/supplier cross-checks.

Weak evidence is only a lead: social posts, forum discussion, screenshots, price action, or unsourced channel checks.

## Current Limitation

The terminal uses live Yahoo price data, but the fundamental valuation assumptions are seeded locally. For final security-specific conclusions, verify current PE, forward PE, consensus growth, estimate revisions, filings, customer concentration, cash flow, and financing risk from primary sources.
