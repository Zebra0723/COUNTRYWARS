# COUNTRY WARS – battle two nations
import streamlit as st, pandas as pd, random, os
from datetime import datetime
st.set_page_config(page_title="Country Wars", layout="centered")

DATA="cw_leaderboard.csv"; PASSWORD="vortexmaster2025"
rating=["Economy","Culture","Nature","Food","Tech","People"]

countries=[{"name":n} for n in
 ("USA","Japan","Italy","France","Greece","Australia","Brazil","Canada","Kenya","Iceland")]

ss=st.session_state
if "nations" not in ss: ss.nations=countries.copy()
if "war"    not in ss: ss.war=random.sample(ss.nations,2)
if "hist"   not in ss: ss.hist=[]

def pick(): ss.war=random.sample(ss.nations,2)
def load(): return pd.read_csv(DATA) if os.path.exists(DATA) else \
    pd.DataFrame(columns=["A","B","Winner","Score A","Score B","Time",*rating])
def save(d): d.to_csv(DATA,index=False)

st.title("🌍 Country Wars")

with st.sidebar.expander("➕ Add Country"):
    n=st.text_input("Country")
    if st.button("Add") and n: ss.nations.append({"name":n}); st.success(f"{n} added!")

cA,cB=ss.war
st.subheader(f"🔵 {cA['name']}  vs  🟣 {cB['name']}")

rA,rB={},{}
for f in rating:
    l,r=st.columns(2)
    rA[f]=l.slider(f"{f} – {cA['name']}",1,10,5)
    rB[f]=r.slider(f"{f} – {cB['name']}",1,10,5)

if st.button("Submit"):
    sA,sB=sum(rA.values()),sum(rB.values())
    win=cA['name'] if sA>sB else cB['name'] if sB>sA else "Tie"
    row={"A":cA['name'],"B":cB['name'],"Winner":win,"Score A":sA,"Score B":sB,
         "Time":datetime.now().strftime("%Y-%m-%d %H:%M")}
    row.update({f:rA[f] if sA>=sB else rB[f] for f in rating})
    save(pd.concat([load(),pd.DataFrame([row])],ignore_index=True))
    ss.hist.append(f"{cA['name']} vs {cB['name']} – Winner {win} ({sA}-{sB})")
    st.success(f"Winner: {win}"); pick(); st.experimental_rerun()

st.markdown("---"); st.subheader("🏆 Latest 20 Battles")
st.dataframe(load().tail(20).iloc[::-1], use_container_width=True)
with st.expander("📜 History"): [st.write(x) for x in ss.hist[::-1]]

with st.expander("🔥 Reset"):
    if st.text_input("Password",type="password")==PASSWORD and st.button("Wipe"):
        if os.path.exists(DATA): os.remove(DATA); ss.hist.clear(); st.warning("Reset!"); st.experimental_rerun()
