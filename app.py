import streamlit as st
import yfinance as yf
import plotly.graph_objects as go
import plotly.express as px
import pandas as pd
from datetime import date

st.set_page_config(
    page_title="Desempenho de Ações 2025",
    page_icon="📈",
    layout="wide",
)

st.title("📈 Desempenho de Ações Brasileiras em 2025")
st.markdown("Análise comparativa de **Petrobras (PETR4)**, **Itaú (ITUB4)** e **Vale (VALE3)**")

TICKERS = {
    "Petrobras (PETR4)": "PETR4.SA",
    "Itaú (ITUB4)": "ITUB4.SA",
    "Vale (VALE3)": "VALE3.SA",
}
COLORS = {
    "Petrobras (PETR4)": "#009B3A",
    "Itaú (ITUB4)": "#003087",
    "Vale (VALE3)": "#0099CC",
}

START = "2025-01-01"
END = date.today().isoformat()


@st.cache_data(ttl=3600)
def load_data():
    frames = {}
    for name, ticker in TICKERS.items():
        df = yf.download(ticker, start=START, end=END, auto_adjust=True, progress=False)
        if not df.empty:
            df.index = pd.to_datetime(df.index)
            frames[name] = df
    return frames


with st.spinner("Carregando dados do Yahoo Finance..."):
    data = load_data()

if not data:
    st.error("Não foi possível carregar os dados. Verifique sua conexão.")
    st.stop()

# ── Metrics panel ──────────────────────────────────────────────────────────────
st.subheader("Resumo")
cols = st.columns(len(data))
for col, (name, df) in zip(cols, data.items()):
    close = df["Close"].squeeze()
    current = float(close.iloc[-1])
    start_price = float(close.iloc[0])
    ytd_pct = (current - start_price) / start_price * 100
    high_52 = float(close.max())
    low_52 = float(close.min())
    delta_color = "normal"
    col.metric(
        label=name,
        value=f"R$ {current:.2f}",
        delta=f"{ytd_pct:+.2f}% no ano",
        delta_color=delta_color,
    )
    col.caption(f"Máx 2025: R$ {high_52:.2f} | Mín 2025: R$ {low_52:.2f}")

st.divider()

# ── Normalized performance chart ───────────────────────────────────────────────
st.subheader("Retorno Acumulado em 2025 (%)")
st.caption("Base 0% em 1º de janeiro de 2025 — permite comparar o desempenho relativo")

fig_norm = go.Figure()
for name, df in data.items():
    close = df["Close"].squeeze()
    norm = (close / close.iloc[0] - 1) * 100
    fig_norm.add_trace(go.Scatter(
        x=norm.index,
        y=norm.values,
        name=name,
        line=dict(color=COLORS[name], width=2.5),
        hovertemplate="%{x|%d/%m/%Y}<br>Retorno: %{y:.2f}%<extra>" + name + "</extra>",
    ))

fig_norm.add_hline(y=0, line_dash="dot", line_color="gray", opacity=0.5)
fig_norm.update_layout(
    yaxis_title="Retorno (%)",
    xaxis_title="",
    hovermode="x unified",
    legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="left", x=0),
    height=420,
)
st.plotly_chart(fig_norm, use_container_width=True)

# ── Absolute price chart ───────────────────────────────────────────────────────
st.subheader("Cotação em Reais (R$)")

tabs = st.tabs(list(data.keys()))
for tab, (name, df) in zip(tabs, data.items()):
    with tab:
        close = df["Close"].squeeze()
        fig_price = go.Figure()
        fig_price.add_trace(go.Scatter(
            x=close.index,
            y=close.values,
            name=name,
            fill="tozeroy",
            line=dict(color=COLORS[name], width=2),
            hovertemplate="%{x|%d/%m/%Y}<br>Preço: R$ %{y:.2f}<extra></extra>",
        ))
        fig_price.update_layout(
            yaxis_title="Preço (R$)",
            xaxis_title="",
            height=350,
            showlegend=False,
        )
        st.plotly_chart(fig_price, use_container_width=True)

# ── Volume chart ───────────────────────────────────────────────────────────────
st.subheader("Volume Negociado")

fig_vol = go.Figure()
for name, df in data.items():
    volume = df["Volume"].squeeze()
    fig_vol.add_trace(go.Bar(
        x=volume.index,
        y=volume.values,
        name=name,
        marker_color=COLORS[name],
        opacity=0.75,
        hovertemplate="%{x|%d/%m/%Y}<br>Volume: %{y:,.0f}<extra>" + name + "</extra>",
    ))

fig_vol.update_layout(
    barmode="group",
    yaxis_title="Volume",
    xaxis_title="",
    hovermode="x unified",
    legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="left", x=0),
    height=380,
)
st.plotly_chart(fig_vol, use_container_width=True)

st.caption("Dados: Yahoo Finance · Atualizado a cada 1 hora · Preços em BRL")
