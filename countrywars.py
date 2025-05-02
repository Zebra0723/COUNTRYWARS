# COUNTRY WARS – manual country chooser
import streamlit as st, pandas as pd, os
from datetime import datetime
st.set_page_config(page_title="Country Wars", layout="centered")

DATA = "cw_leaderboard.csv"
PASSWORD = "vortexmaster2025"
rating = ["Economy", "Culture", "Nature", "Food", "Tech", "People"]

default = ["USA", "Japan", "Italy", "France", "Greece", "Australia", "Brazil", "Canada", "Kenya", "Iceland"]
if "nations" not in st.session_state:
    st.session_state.nations = default.copy()

def load():
    return pd.read_csv(DATA) if os.path.exists(DATA) else pd.DataFrame(columns=["A","B","Winner","Score A","Score B","Time",*rating])

def save(d): d.to_csv(DATA, index=False)

st.title("🌍 Country Wars")

# Add country
with st.sidebar.expander("➕ Add Country"):
    name = st.text_input("Country name")
    if st.button("Add") and name:
        st.session_state.nations.append(name)
        st.success(f"{name} added!")

# Select battle
col1, col2 = st.columns(2)
cA = col1.selectbox("🔵 Country A", st.session_state.nations, key="ca")
cB = col2.selectbox("🟣 Country B", st.session_state.nations, key="cb")

if cA == cB:
    st.warning("Pick two different countries!"); st.stop()

st.subheader(f"{cA} vs {cB}")

rA, rB = {}, {}
for f in rating:
    l, r = st.columns(2)
    rA[f] = l.slider(f"{f} – {cA}", 1, 10, 5)
    rB[f] = r.slider(f"{f} – {cB}", 1, 10, 5)

if st.button("Submit Battle"):
    sA, sB = sum(rA.values()), sum(rB.values())
    win = cA if sA > sB else cB if sB > sA else "Tie"
    row = {"A": cA, "B": cB, "Winner": win, "Score A": sA, "Score B": sB,
           "Time": datetime.now().strftime("%Y-%m-%d %H:%M")}
    row.update(rA if sA >= sB else rB)
    df = pd.concat([load(), pd.DataFrame([row])], ignore_index=True)
    save(df); st.success(f"{win} wins!")

st.markdown("---")
st.subheader("🏆 Leaderboard")
st.dataframe(load().tail(20).iloc[::-1], use_container_width=True)

with st.expander("🔥 Reset"):
    if st.text_input("Password", type="password") == PASSWORD and st.button("Wipe"):
        os.remove(DATA) if os.path.exists(DATA) else None
        st.warning("Reset complete.")
        st.experimental_rerun()
