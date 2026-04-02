# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
pip install -r requirements.txt

# Run the app
streamlit run app.py
```

## Architecture

Single-file Streamlit dashboard (`app.py`) for Brazilian stock market analysis.

**Data flow:**
1. `load_data()` — fetches 2025 YTD data from Yahoo Finance via `yfinance`, cached for 1 hour with `@st.cache_data(ttl=3600)`
2. Data is stored as a dict `{display_name: DataFrame}` where each DataFrame has OHLCV columns
3. Four sequential chart sections render using Plotly: metrics panel → normalized return chart → per-stock price tabs → grouped volume bars

**Key constants:**
- `TICKERS` — maps display names to Yahoo Finance symbols (`.SA` suffix = B3/São Paulo exchange)
- `COLORS` — brand colors per company, used consistently across all charts
- `START = "2025-01-01"`, `END = date.today()` — data window

**UI language:** Brazilian Portuguese throughout.

## GitHub

Repositório: https://github.com/IgorSantosPedro/brazilian-stock-dashboard

**Sincronização automática:** O Claude Code está configurado com um hook `PostToolUse` que faz commit e push automaticamente para o GitHub após cada edição de arquivo (`Edit` ou `Write`). As mensagens de commit seguem o formato `Auto-update: YYYY-MM-DD HH:MM:SS`.

Para operações manuais:
```bash
git add .
git commit -m "mensagem"
git push origin main
```
