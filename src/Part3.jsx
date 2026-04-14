
/* ═══════════════════════ HOME PAGE ══════════════════════════════════════════ */
function HomePage({ events, contribs, expenses, totC, totP, totE, bal, isTreasurer }) {
  return (
    <div style={Z.page}>
      {/* HERO */}
      <div style={Z.hero}>
        <div style={Z.heroPat} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, opacity: 0.18, pointerEvents: "none" }}>
          <FortSVG width={480} />
        </div>
        <div style={{ position: "relative", zIndex: 2, flex: 1 }}>
          <div style={{ fontSize: 10, color: "#d4a01288", textTransform: "uppercase", letterSpacing: 3, marginBottom: 8 }}>✦ जय भवानी · जय शिवाजी ✦</div>
          <div style={{ fontFamily: "'Cinzel Decorative',serif", color: "#e8d5a0", fontSize: 21, fontWeight: 700, lineHeight: 1.2, marginBottom: 4 }}>शिवतेज</div>
          <div style={{ fontFamily: "'Cinzel',serif", color: "#d4a01288", fontSize: 11, letterSpacing: 1.5, marginBottom: 10 }}>ART · CULTURAL · SPORT</div>
          <div style={{ fontSize: 11, color: "#5a3a18", lineHeight: 1.8 }}>💰 Finance Manager · 📅 Events · 🎨 Gallery</div>
          {isTreasurer && <div style={{ ...Z.tBadgeLg, marginTop: 10 }}><Ic n="shield" s={11} c="#d4a012" /> Full Access · खजिनदार</div>}
        </div>
        <div style={{ position: "relative", zIndex: 2, flexShrink: 0 }}>
          <RajmudraSVG size={78} />
        </div>
      </div>

      {/* Lotus divider */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "6px 0 16px", opacity: 0.35 }}>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,transparent,#d4a012)" }} />
        <LotusSVG size={20} color="#d4a012" />
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#d4a012,transparent)" }} />
      </div>

      {/* STATS */}
      <div style={Z.g2}>
        <StatCard v={\`₹\${N(totC)}\`} l="एकूण जमा"   s={\`\${contribs.filter(c => c.status === "paid").length} वर्गण्या\`} top="#2d9e6b"/>
        <StatCard v={\`₹\${N(totP)}\`} l="बाकी रक्कम" s={\`\${contribs.filter(c => c.status === "pending").length} प्रलंबित\`} top="#d4a012"/>
      </div>
      <div style={Z.g2}>
        <StatCard v={\`₹\${N(totE)}\`}               l="एकूण खर्च"            s={\`\${expenses.length} नोंदी\`}            top="#c1121f"/>
        <StatCard v={\`₹\${N(Math.abs(bal))}\`}      l={bal >= 0 ? "शिल्लक" : "तूट"} s={bal >= 0 ? "उपलब्ध" : "अतिरिक्त खर्च"}      top={bal >= 0 ? "#1e6b3c" : "#8a1212"}/>
      </div>

      {/* EVENTS PROGRESS */}
      <SH title="आगामी कार्यक्रम · Upcoming Events" />
      {events.filter(e => e.status === "upcoming").map(ev => {
        const col = contribs.filter(c => c.eventId === ev.id && c.status === "paid").reduce((s, c) => s + c.amount, 0);
        const pct = Math.min(100, Math.round((col / ev.budget) * 100));
        const cm = CAT_META[ev.category] || CAT_META.other;
        return (
          <div key={ev.id} style={Z.pCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div style={{ flex: 1, marginRight: 8 }}>
                <div style={{ color: "#e8d5a0", fontWeight: 600, fontSize: 13, fontFamily: "'Cinzel',serif" }}>{cm.emoji} {ev.name}</div>
                <div style={{ color: "#4a3218", fontSize: 11, marginTop: 2 }}>📅 {ev.date} · बजेट ₹{N(ev.budget)}</div>
              </div>
              <div style={{ ...Z.pctBadge, background: pct >= 75 ? "#0a2212" : pct >= 40 ? "#1e1600" : "#28080a", color: pct >= 75 ? "#2d9e6b" : pct >= 40 ? "#d4a012" : "#c1121f" }}>{pct}%</div>
            </div>
            <div style={Z.bar}>
              <div style={{ ...Z.fill, width: \`\${pct}%\`,background:pct>=75?"linear-gradient(90deg,#1e5a30,#2d9e6b)":pct>=40?"linear-gradient(90deg,#7a5800,#d4a012)":"linear-gradient(90deg,#7a0808,#c1121f)"}}/>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11 }}>
              <span style={{ color: "#2d9e6b" }}>₹{N(col)} जमा</span>
              <span style={{ color: "#d4a012" }}>₹{N(ev.budget - col)} बाकी</span>
            </div>
          </div>
        );
      })}

      {/* RECENT ACTIVITY */}
      <SH title="अलीकडील नोंदी · Recent Activity" />
      {[...expenses.slice(-3).map(x => ({ ...x, _t: "exp" })), ...contribs.filter(c => c.status === "paid").slice(-3).map(c => ({ ...c, _t: "con" }))]
        .sort((a, b) => (b.date || "").localeCompare(a.date || "")).slice(0, 7).map((item, i) => (
          <div key={i} style={Z.actRow}>
            <div style={{ ...Z.actDot, background: item._t === "exp" ? "#380808" : "#083018" }}>{item._t === "exp" ? "↑" : "+"}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#d4c080", fontSize: 13, fontWeight: 500 }}>{item.title ||\`\${item.memberName} वर्गणी\`}</div>
              <div style={{ color: "#3a2410", fontSize: 11 }}>{item.date || "—"}</div>
            </div>
            <div style={{ color: item._t === "exp" ? "#c1121f" : "#2d9e6b", fontWeight: 700, fontSize: 13 }}>
              {item._t === "exp" ? "-" : "+"}₹{N(item.amount)}
            </div>
          </div>
        ))}

      <div style={{ textAlign: "center", marginTop: 28, opacity: 0.25 }}>
        <LotusSVG size={44} color="#d4a012" />
      </div>
    </div>
  );
}

function StatCard({ v, l, s, top }) {
  return (
    <div style={{ ...Z.sCard, borderTopColor: top }}>
      <div style={{ color: top, fontWeight: 700, fontSize: 19, fontFamily: "'Cinzel',serif" }}>{v}</div>
      <div style={{ color: "#9a7040", fontSize: 11, marginTop: 4 }}>{l}</div>
      <div style={{ color: "#3a2410", fontSize: 11, marginTop: 2 }}>{s}</div>
    </div>
  );
}

/* ════════════════════════ EVENTS PAGE ═══════════════════════════════════════ */
function EventsPage({ events, contribs, expenses, isTreasurer, mut }) {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [form, setF] = useState({ name: "", date: "", budget: "", category: "cultural", description: "" });

  const doAdd = () => {
    if (!form.name || !form.date || !form.budget) return;
    mut.addEvent({ id: "e" + Date.now(), name: form.name, date: form.date, budget: +form.budget, category: form.category, status: "upcoming", description: form.description });
    setF({ name: "", date: "", budget: "", category: "cultural", description: "" }); setShowForm(false);
  };

  const shown = events.filter(e => filter === "all" || e.status === filter);

  return (
    <div style={Z.page}>
      <PH title="कार्यक्रम · Events" action={isTreasurer ? () => setShowForm(!showForm) : null} al="+ नवीन" />
      {showForm && (
        <FB title="नवीन कार्यक्रम तयार करा" onClose={() => setShowForm(false)} onSave={doAdd} sl="तयार करा">
          <FInp l="कार्यक्रमाचे नाव *" v={form.name} s={v => setF({ ...form, name: v })} />
          <FInp l="दिनांक *" v={form.date} s={v => setF({ ...form, date: v })} t="date" />
          <FInp l="बजेट (₹) *" v={form.budget} s={v => setF({ ...form, budget: v })} t="number" />
          <FSel l="प्रकार" v={form.category} s={v => setF({ ...form, category: v })} opts={Object.keys(CAT_META)} labels={Object.keys(CAT_META).map(k => CAT_META[k].emoji + " " + CAT_META[k].label)} />
          <FInp l="वर्णन" v={form.description} s={v => setF({ ...form, description: v })} />
        </FB>
      )}
      <div style={Z.fRow}>
        {["all", "upcoming", "completed"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ ...Z.fBtn, ...(filter === f ? Z.fOn : {}) }}>{f === "all" ? "सर्व" : f === "upcoming" ? "आगामी" : "पूर्ण"}</button>
        ))}
      </div>
      {shown.length === 0 && <Empty text="कोणतेही कार्यक्रम सापडले नाहीत." />}
      {shown.map(ev => {
        const col = contribs.filter(c => c.eventId === ev.id && c.status === "paid").reduce((s, c) => s + c.amount, 0);
        const pend = contribs.filter(c => c.eventId === ev.id && c.status === "pending").reduce((s, c) => s + c.amount, 0);
        const sp = expenses.filter(x => x.eventId === ev.id).reduce((s, x) => s + x.amount, 0);
        const pct = Math.min(100, Math.round((col / ev.budget) * 100));
        const cm = CAT_META[ev.category] || CAT_META.other;
        return (
          <div key={ev.id} style={Z.card}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ ...Z.catB, background: cm.bg }}>{cm.emoji} {cm.label}</div>
              <div style={{ ...Z.catB, background: ev.status === "upcoming" ? "#0a2212" : "#221408", color: ev.status === "upcoming" ? "#2d9e6b" : "#d4a012" }}>{ev.status === "upcoming" ? "आगामी" : "पूर्ण"}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ opacity: 0.6, flexShrink: 0 }}><TalwarSVG size={11} color="#d4a012" /></div>
              <div style={{ fontFamily: "'Cinzel',serif", color: "#e8d5a0", fontWeight: 700, fontSize: 15, lineHeight: 1.3 }}>{ev.name}</div>
            </div>
            <div style={{ color: "#4a3218", fontSize: 12, marginBottom: 12 }}>📅 {ev.date}{ev.description ? " · " + ev.description : ""}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, marginBottom: 12 }}>
              <BC l="बजेट" v={\`₹\${N(ev.budget)}\`} c="#d4c080"/>
              <BC l="जमा" v={\`₹\${N(col)}\`}        c="#2d9e6b"/>
              <BC l="बाकी" v={\`₹\${N(pend)}\`}       c="#d4a012"/>
              <BC l="खर्च" v={\`₹\${N(sp)}\`}         c="#c1121f"/>
              <BC l="शिल्लक" v={\`₹\${N(col - sp)}\`}     c={col - sp >= 0 ? "#2d9e6b" : "#c1121f"}/>
              <BC l="प्रगती" v={\`\${pct}%\`}           c="#d4a012"/>
            </div>
            <div style={Z.bar}><div style={{ ...Z.fill, width: \`\${pct}%\`,background:pct>=75?"linear-gradient(90deg,#1e5a30,#2d9e6b)":pct>=40?"linear-gradient(90deg,#7a5800,#d4a012)":"linear-gradient(90deg,#7a0808,#c1121f)"}}/></div>
            {isTreasurer && <button onClick={() => mut.delEvent(ev.id)} style={Z.delBtn}>🗑 हटवा</button>}
          </div>
        );
      })}
    </div>
  );
}

function BC({ l, v, c }) {
  return (
    <div style={{ background: "#080600", borderRadius: 8, padding: 8, textAlign: "center", border: "1px solid #141006" }}>
      <div style={{ color: c, fontWeight: 700, fontSize: 14 }}>{v}</div>
      <div style={{ color: "#3a2410", fontSize: 9, marginTop: 2 }}>{l}</div>
    </div>
  );
}

/* ════════════════════════ FUNDS PAGE ════════════════════════════════════════ */
function FundsPage({ events, contribs, totC, totP, isTreasurer, mut }) {
  const [showForm, setShowForm] = useState(false);
  const [selEv, setSelEv] = useState("all");
  const [form, setF] = useState({ memberName: "", eventId: "", amount: "" });

  const doAdd = () => {
    if (!form.memberName || !form.eventId || !form.amount) return;
    mut.addContrib({ id: "c" + Date.now(), memberName: form.memberName, eventId: form.eventId, amount: +form.amount, date: null, status: "pending" });
    setF({ memberName: "", eventId: "", amount: "" }); setShowForm(false);
  };

  const visible = contribs.filter(c => selEv === "all" || c.eventId === selEv);
  const vP = visible.filter(c => c.status === "paid").reduce((s, c) => s + c.amount, 0);
  const vN = visible.filter(c => c.status === "pending").reduce((s, c) => s + c.amount, 0);
  const rate = vP + vN ? Math.round(vP / (vP + vN) * 100) : 0;

  return (
    <div style={Z.page}>
      <PH title="वर्गणी · Funds" action={isTreasurer ? () => setShowForm(!showForm) : null} al="+ जोडा" />
      <div style={Z.g3}>
        <MiniStat l="जमा" v={\`₹\${N(totC)}\`} c="#2d9e6b"/>
        <MiniStat l="बाकी" v={\`₹\${N(totP)}\`} c="#d4a012"/>
        <MiniStat l="दर" v={\`\${rate}%\`}     c="#d4c080"/>
      </div>
      <div style={{ ...Z.card, padding: "14px 16px", marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: "#2d9e6b", fontSize: 12, fontWeight: 600 }}>✓ ₹{N(totC)} जमा</span>
          <span style={{ color: "#d4a012", fontSize: 12, fontWeight: 600 }}>⏳ ₹{N(totP)} बाकी</span>
        </div>
        <div style={{ height: 10, background: "#181006", borderRadius: 5, overflow: "hidden" }}>
          <div style={{ width: \`\${rate}%\`,height:"100%",background:"linear-gradient(90deg,#1e5a30,#2d9e6b)",borderRadius:5,transition:"width 0.7s"}}/>
        </div>
        <div style={{ color: "#3a2410", fontSize: 11, marginTop: 6, textAlign: "center" }}>{rate}% वर्गणी जमा झाली</div>
      </div>
      {showForm && isTreasurer && (
        <FB title="वर्गणी नोंदवा" onClose={() => setShowForm(false)} onSave={doAdd} sl="नोंदवा">
          <FInp l="सदस्याचे नाव *" v={form.memberName} s={v => setF({ ...form, memberName: v })} />
          <FSel l="कार्यक्रम *" v={form.eventId} s={v => setF({ ...form, eventId: v })} opts={events.map(e => e.id)} labels={events.map(e => e.name)} />
          <FInp l="रक्कम (₹) *" v={form.amount} s={v => setF({ ...form, amount: v })} t="number" />
        </FB>
      )}
      <select style={{ ...Z.inp, marginBottom: 12 }} value={selEv} onChange={e => setSelEv(e.target.value)}>
        <option value="all">सर्व कार्यक्रम</option>
        {events.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
      </select>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, marginBottom: 10, padding: "0 2px" }}>
        <span style={{ color: "#2d9e6b" }}>✓ {visible.filter(c => c.status === "paid").length} भरले · ₹{N(vP)}</span>
        <span style={{ color: "#d4a012" }}>⏳ {visible.filter(c => c.status === "pending").length} बाकी · ₹{N(vN)}</span>
      </div>
      {visible.length === 0 && <Empty text="कोणत्याही वर्गण्या नाहीत." />}
      {visible.map(c => {
        const ev = events.find(e => e.id === c.eventId);
        return (
          <div key={c.id} style={Z.cCard}>
            <div style={Z.cAv}>{(c.memberName || "?").split(" ").map(n => n[0]).join("").slice(0, 2)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#e8d5a0", fontWeight: 600, fontSize: 14 }}>{c.memberName}</div>
              <div style={{ color: "#4a3218", fontSize: 12 }}>{ev?.name}</div>
              {c.date && <div style={{ color: "#3a2410", fontSize: 11 }}>भरले: {c.date}</div>}
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#e8d5a0", fontWeight: 700, fontSize: 16 }}>₹{N(c.amount)}</div>
              <div style={{ ...Z.pill, background: c.status === "paid" ? "#082212" : "#1c1200", color: c.status === "paid" ? "#2d9e6b" : "#d4a012" }}>
                {c.status === "paid" ? "✓ भरले" : "⏳ बाकी"}
              </div>
              {isTreasurer && c.status === "pending" && <button onClick={() => mut.markPaid(c.id)} style={Z.payBtn}>भरले नोंदवा</button>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MiniStat({ l, v, c }) {
  return (
    <div style={{ background: "#0c0900", border: "1px solid #141006", borderRadius: 12, padding: "12px 6px", textAlign: "center" }}>
      <div style={{ color: c, fontWeight: 700, fontSize: 15 }}>{v}</div>
      <div style={{ color: "#3a2410", fontSize: 10, marginTop: 3 }}>{l}</div>
    </div>
  );
}

/* ════════════════════════ EXPENSE PAGE ══════════════════════════════════════ */
function ExpensePage({ events, expenses, totE, isTreasurer, mut }) {
  const [showForm, setShowForm] = useState(false);
  const [selEv, setSelEv] = useState("all");
  const [form, setF] = useState({ eventId: "", title: "", amount: "", date: "", category: "decor", note: "" });

  const doAdd = () => {
    if (!form.eventId || !form.title || !form.amount || !form.date) return;
    mut.addExpense({ id: "x" + Date.now(), eventId: form.eventId, title: form.title, amount: +form.amount, date: form.date, category: form.category, note: form.note });
    setF({ eventId: "", title: "", amount: "", date: "", category: "decor", note: "" }); setShowForm(false);
  };

  const shown = expenses.filter(x => selEv === "all" || x.eventId === selEv);

  return (
    <div style={Z.page}>
      <PH title="खर्च · Expenses" action={isTreasurer ? () => setShowForm(!showForm) : null} al="+ खर्च जोडा" />
      <div style={{ ...Z.card, textAlign: "center", borderColor: "#5a080844", marginBottom: 16, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", opacity: 0.07 }}>
          <ShieldSVG size={80} color="#c1121f" />
        </div>
        <div style={{ color: "#c1121f", fontWeight: 700, fontSize: 26, fontFamily: "'Cinzel',serif" }}>₹{N(totE)}</div>
        <div style={{ color: "#4a3218", fontSize: 12, marginTop: 4 }}>एकूण खर्च · {expenses.length} नोंदी</div>
      </div>
      <SH title="कार्यक्रमानुसार खर्च" />
      {events.map(ev => {
        const t = expenses.filter(x => x.eventId === ev.id).reduce((s, x) => s + x.amount, 0);
        if (!t) return null;
        const pct = Math.round((t / totE) * 100);
        return (
          <div key={ev.id} style={{ ...Z.card, padding: "12px 14px", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: "#d4c080", flex: 1, fontSize: 13, fontWeight: 600 }}>{ev.name}</span>
              <span style={{ color: "#c1121f", fontWeight: 700 }}>₹{N(t)}</span>
            </div>
            <div style={Z.bar}><div style={{ ...Z.fill, width: \`\${pct}%\`,background:"linear-gradient(90deg,#7a0808,#c1121f)"}}/></div>
          </div>
        );
      })}
      {isTreasurer ? (
        <>
          <SH title="तपशीलवार नोंदी" />
          {showForm && (
            <FB title="खर्च नोंदवा" onClose={() => setShowForm(false)} onSave={doAdd} sl="सेव्ह करा">
              <FSel l="कार्यक्रम *" v={form.eventId} s={v => setF({ ...form, eventId: v })} opts={events.map(e => e.id)} labels={events.map(e => e.name)} />
              <FInp l="खर्चाचे नाव *" v={form.title} s={v => setF({ ...form, title: v })} />
              <FInp l="रक्कम (₹) *" v={form.amount} s={v => setF({ ...form, amount: v })} t="number" />
              <FInp l="दिनांक *" v={form.date} s={v => setF({ ...form, date: v })} t="date" />
              <FSel l="प्रकार" v={form.category} s={v => setF({ ...form, category: v })} opts={Object.keys(EXP_CATS)} labels={Object.keys(EXP_CATS).map(k => EXP_CATS[k] + " " + k)} />
              <FInp l="टीप" v={form.note} s={v => setF({ ...form, note: v })} />
            </FB>
          )}
          <select style={{ ...Z.inp, margin: "8px 0 12px" }} value={selEv} onChange={e => setSelEv(e.target.value)}>
            <option value="all">सर्व कार्यक्रम</option>
            {events.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
          {shown.map(x => {
            const ev = events.find(e => e.id === x.eventId);
            return (
              <div key={x.id} style={Z.expCard}>
                <div style={Z.expIc}>{EXP_CATS[x.category] || "✦"}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#d4c080", fontWeight: 600, fontSize: 14 }}>{x.title}</div>
                  <div style={{ color: "#4a3218", fontSize: 11 }}>{ev?.name} · {x.date}</div>
                  {x.note && <div style={{ color: "#3a2410", fontSize: 11 }}>📝 {x.note}</div>}
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#c1121f", fontWeight: 700, fontSize: 15 }}>₹{N(x.amount)}</div>
                  <button onClick={() => mut.delExpense(x.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 0", display: "block", marginTop: 4 }}><Ic n="trash" s={14} c="#4a1010" /></button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div style={Z.notice}><Ic n="lock" s={14} c="#4a3218" /> तपशीलवार खर्च फक्त खजिनदारांना दिसतो.</div>
      )}
    </div>
  );
}

/* ════════════════════════ GALLERY PAGE ══════════════════════════════════════ */
const GEMOJIS = ["🎭", "🏆", "⚔️", "🛡", "🪔", "🎨", "🎉", "🥁", "🌺", "👑", "🤝", "🎯", "🏅", "🎶", "🙏", "🦅", "🌈", "🎤", "🪘", "🎊", "🔱", "⚡", "🌸", "🎪", "✨"];
const GCOLS = ["#8b0000", "#b45309", "#1e6b3c", "#1e3a6b", "#6b1e3a", "#4a3a00", "#1a4a4a", "#5a2e00", "#2e005a", "#004a2a"];

function GalleryPage({ events, gallery, isTreasurer, mut }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setF] = useState({ eventId: "", title: "", emoji: "🎭", color: "#8b0000" });

  const doAdd = () => {
    if (!form.eventId || !form.title) return;
    mut.addGallery({ id: "g" + Date.now(), eventId: form.eventId, title: form.title, emoji: form.emoji, color: form.color, date: today() });
    setF({ eventId: "", title: "", emoji: "🎭", color: "#8b0000" }); setShowForm(false);
  };

  return (
    <div style={Z.page}>
      <PH title="स्मृती दालन · Gallery" action={isTreasurer ? () => setShowForm(!showForm) : null} al="+ जोडा" />
      <div style={{ textAlign: "center", marginBottom: 14, opacity: 0.5 }}>
        <LotusSVG size={34} color="#d4a012" />
      </div>
      {showForm && isTreasurer && (
        <FB title="दालनात जोडा" onClose={()=>setShowForm(false)} onSave={doAdd} sl="जोडा">
          <FSel l="कार्यक्रम *"  v={form.eventId} s={v=>setF({...form,eventId:v})} opts={events.map(e=>e.id)} labels={events.map(e=>e.name)}/>
          <FInp l="शीर्षक *"    v={form.title}   s={v=>setF({...form,title:v})}/>
          <div style={{color:"#4a3218",fontSize:12,marginBottom:6}}>चिह्न निवडा</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:14}}>
            {GEMOJIS.map(em=>(
              <button key={em} onClick={()=>setF({...form,emoji:em})} style={{background:form.emoji===em?"#1c1008":"#0a0800",border:\`2px solid \${form.emoji===em?"#d4a012":"#141006"}\`,borderRadius:8,padding:"4px 7px",fontSize:17,cursor:"pointer"}}>{em}</button>
            ))}
          </div>
          <div style={{color:"#4a3218",fontSize:12,marginBottom:6}}>रंग निवडा</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:14}}>
            {GCOLS.map(col=>(
              <button key={col} onClick={()=>setF({...form,color:col})} style={{width:26,height:26,borderRadius:"50%",background:col,cursor:"pointer",border:\`3px solid \${form.color===col?"#e8d5a0":"transparent"}\`}}/>
            ))}
          </div>
        </FB>
  )
}
{ gallery.length === 0 && <Empty text="अद्याप कोणत्याही स्मृती नाहीत. खजिनदार येथे कार्यक्रमाच्या आठवणी जोडू शकतात! 🎭" /> }
{
  events.map(ev => {
    const items = gallery.filter(g => g.eventId === ev.id);
    if (!items.length) return null;
    return (
      <div key={ev.id} style={{ marginBottom: 24 }}>
        <SH title={ev.name} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {items.map(g => (
            <div key={g.id} style={{ background: g.color + "1e", borderRadius: 14, padding: "14px 8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: \`1px solid \${g.color}50\`,minHeight:112,position:"relative"}}>
          <div style={{ fontSize: 36 }}>{g.emoji}</div>
          <div style={{ color: "#d4c080", fontWeight: 600, fontSize: 10, textAlign: "center", marginTop: 8, lineHeight: 1.3 }}>{g.title}</div>
          <div style={{ color: "#3a2410", fontSize: 9, marginTop: 4 }}>{g.date}</div>
          {isTreasurer && (
            <button onClick={() => mut.delGallery(g.id)} style={{ position: "absolute", top: 5, right: 5, background: "#14100866", border: "none", borderRadius: 6, cursor: "pointer", padding: 3, display: "flex" }}>
              <Ic n="trash" s={11} c="#5a1010" />
            </button>
          )}
        </div>
              ))}
      </div>
          </div >
        );
})}
    </div >
  );
}

/* ═════════════════════ SHARED PRIMITIVES ════════════════════════════════════ */
function SH({ title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "16px 0 10px" }}>
      <div style={{ width: 3, height: 14, background: "linear-gradient(#d4a012,#8b5e00)", borderRadius: 2, flexShrink: 0 }} />
      <div style={{ color: "#d4a012", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2 }}>{title}</div>
    </div>
  );
}
function PH({ title, action, al }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
      <h2 style={{ fontFamily: "'Cinzel',serif", color: "#e8d5a0", fontSize: 19, fontWeight: 700, margin: 0, letterSpacing: 0.5 }}>{title}</h2>
      {action && <button onClick={action} style={Z.goldBtnSm}>{al}</button>}
    </div>
  );
}
function Empty({ text }) {
  return <div style={{ color: "#2a1c0a", textAlign: "center", padding: "40px 20px", fontSize: 13, lineHeight: 1.7 }}>{text}</div>;
}
function FB({ title, children, onClose, onSave, sl }) {
  return (
    <div style={Z.fBox}>
      <div style={{ fontFamily: "'Cinzel',serif", color: "#d4a012", fontSize: 15, marginBottom: 14, letterSpacing: 0.5 }}>{title}</div>
      {children}
      <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
        <button onClick={onClose} style={Z.cancelBtn}>रद्द करा</button>
        <button onClick={onSave} style={Z.goldBtn}>{sl}</button>
      </div>
    </div>
  );
}
function FInp({ l, v, s, t = "text" }) {
  return (<><label style={Z.lbl}>{l}</label><input style={Z.inp} type={t} value={v} onChange={e => s(e.target.value)} placeholder={l.replace(" *", "")} /></>);
}
function FSel({ l, v, s, opts, labels }) {
  return (
    <><label style={Z.lbl}>{l}</label>
      <select style={Z.inp} value={v} onChange={e => s(e.target.value)}>
        <option value="">निवडा…</option>
        {opts.map((o, i) => <option key={o} value={o}>{labels?.[i] ?? o}</option>)}
      </select></>
  );
}

/* ═══════════════════════════ STYLES ═════════════════════════════════════════ */
const Z = {
  shell: { display: "flex", flexDirection: "column", width: "100%", height: "100%", position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "#060400", fontFamily: "'Lato',sans-serif", overflow: "hidden" },
  main: { flex: 1, overflowY: "auto", overflowX: "hidden", background: "#060400", WebkitOverflowScrolling: "touch" },
  page: { padding: "16px", paddingBottom: "calc(80px + env(safe-area-inset-bottom, 0px))", boxSizing: "border-box", width: "100%" },
  hdr: { background: "linear-gradient(135deg,#100800,#1c1000)", borderBottom: "2px solid #2a1a06", padding: "11px 16px", paddingTop: "calc(11px + env(safe-area-inset-top, 0px))", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 },
  hdrL: { display: "flex", alignItems: "center", gap: 10 },
  hdrR: { display: "flex", alignItems: "center", gap: 8 },
  brand: { fontFamily: "'Cinzel Decorative',serif", color: "#e8d5a0", fontSize: 17, fontWeight: 700, lineHeight: 1, letterSpacing: 2 },
  brandSub: { color: "#d4a01250", fontSize: 9, marginTop: 2, letterSpacing: 1 },
  tChip: { background: "#1a1000", color: "#d4a012", fontSize: 10, padding: "4px 10px", borderRadius: 20, border: "1px solid #d4a01244", display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" },
  loginChip: { background: "#1a1000", color: "#d4a012", fontSize: 10, padding: "6px 12px", borderRadius: 20, border: "1px solid #d4a01244", display: "flex", alignItems: "center", gap: 5, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'Lato',sans-serif" },
  iconBtn: { background: "none", border: "none", cursor: "pointer", padding: 4 },
  nav: { background: "linear-gradient(0deg,#100800,#0c0600)", borderTop: "2px solid #2a1a06", display: "flex", padding: "8px 0", paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))", flexShrink: 0 },
  navBtn: { flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "6px 4px", minHeight: 48, justifyContent: "center", WebkitTapHighlightColor: "transparent" },
  navOn: {},
  hero: { borderRadius: 16, padding: "18px 16px", marginBottom: 4, display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden", background: "linear-gradient(135deg,#140a00,#201400)", border: "1px solid #2a1a08", minHeight: 140 },
  heroPat: { position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 75% 25%, #d4a01214 0%, transparent 50%), radial-gradient(circle at 15% 75%, #8b000012 0%, transparent 45%)", pointerEvents: "none" },
  tBadgeLg: { background: "#1a1000", color: "#d4a012", fontSize: 10, padding: "4px 12px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 4, border: "1px solid #d4a01233" },
  card: { background: "#0e0900", borderRadius: 16, padding: 16, marginBottom: 12, border: "1px solid #1e1408" },
  sCard: { background: "#0e0900", borderRadius: 14, padding: 14, border: "1px solid #1e1408", borderTop: "3px solid #d4a012" },
  pCard: { background: "#0e0900", borderRadius: 14, padding: 14, marginBottom: 10, border: "1px solid #1e1408" },
  g2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 },
  g3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 },
  pctBadge: { fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 20, flexShrink: 0, marginLeft: 6 },
  bar: { height: 7, background: "#1a1006", borderRadius: 4, overflow: "hidden" },
  fill: { height: "100%", borderRadius: 4, transition: "width 0.7s ease" },
  actRow: { display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #0e0900" },
  actDot: { width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0 },
  catB: { fontSize: 10, color: "#4a3218", padding: "3px 10px", borderRadius: 20, fontWeight: 600 },
  cCard: { background: "#0e0900", borderRadius: 14, padding: 14, marginBottom: 10, border: "1px solid #1e1408", display: "flex", alignItems: "flex-start", gap: 12 },
  cAv: { width: 40, height: 40, borderRadius: "50%", background: "#1a1000", border: "2px solid #d4a01244", display: "flex", alignItems: "center", justifyContent: "center", color: "#d4a012", fontWeight: 700, fontSize: 12, flexShrink: 0 },
  pill: { fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 10, marginTop: 4, display: "inline-block" },
  payBtn: { background: "#082212", color: "#2d9e6b", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", marginTop: 6, display: "block", minHeight: 36, WebkitTapHighlightColor: "transparent" },
  expCard: { background: "#0e0900", borderRadius: 14, padding: 14, marginBottom: 10, border: "1px solid #1e1408", display: "flex", alignItems: "center", gap: 12 },
  expIc: { width: 42, height: 42, borderRadius: 12, background: "#1a1000", border: "1px solid #2a1a08", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 },
  delBtn: { background: "none", border: "1px solid #380808", borderRadius: 8, color: "#c1121f", fontSize: 12, padding: "8px 14px", cursor: "pointer", marginTop: 10, display: "inline-block", minHeight: 36, WebkitTapHighlightColor: "transparent" },
  fRow: { display: "flex", gap: 8, marginBottom: 14 },
  fBtn: { background: "#0e0900", border: "1px solid #1e1408", borderRadius: 20, padding: "6px 14px", color: "#3a2410", fontSize: 12, cursor: "pointer" },
  fOn: { background: "#1a1000", borderColor: "#d4a012", color: "#d4a012" },
  notice: { background: "#0e0c06", border: "1px solid #d4a01218", borderRadius: 12, padding: "12px 14px", color: "#4a3218", fontSize: 12, marginTop: 12, display: "flex", alignItems: "center", gap: 8, lineHeight: 1.5 },
  overlay: { position: "fixed", inset: 0, background: "#000000cc", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100, backdropFilter: "blur(6px)" },
  modal: { background: "#0e0900", borderRadius: "22px 22px 0 0", padding: "0 20px", paddingBottom: "calc(36px + env(safe-area-inset-bottom, 0px))", width: "100%", border: "1px solid #2a1a08", position: "relative" },
  modalTopBorder: { height: 5, background: "linear-gradient(90deg,#8b0000,#d4a012,#ff6b35,#d4a012,#8b0000)", borderRadius: "22px 22px 0 0", margin: "0 -1px", marginBottom: 20 },
  modalClose: { position: "absolute", top: 18, right: 18, background: "none", border: "none", cursor: "pointer", padding: 6 },
  errBox: { background: "#280608", border: "1px solid #c1121f44", borderRadius: 10, padding: "10px 12px", color: "#c1121f", fontSize: 13, marginBottom: 12 },
  lbl: { color: "#5a3a18", fontSize: 12, marginBottom: 4, display: "block" },
  inp: { width: "100%", background: "#080600", border: "1px solid #1e1408", borderRadius: 10, padding: "13px 14px", color: "#d4c080", fontSize: 16, marginBottom: 12, outline: "none", boxSizing: "border-box", fontFamily: "'Lato',sans-serif", WebkitAppearance: "none", appearance: "none" },
  eyeBtn: { position: "absolute", right: 12, top: "50%", transform: "translateY(-70%)", background: "none", border: "none", cursor: "pointer", padding: 4 },
  goldBtn: { flex: 1, background: "linear-gradient(135deg,#d4a012,#9a6e08)", color: "#040200", border: "none", borderRadius: 10, padding: "14px", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "'Cinzel',serif", letterSpacing: 0.5, minHeight: 48, WebkitTapHighlightColor: "transparent" },
  goldBtnSm: { background: "linear-gradient(135deg,#d4a012,#9a6e08)", color: "#040200", border: "none", borderRadius: 20, padding: "9px 16px", fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "'Cinzel',serif", minHeight: 38, WebkitTapHighlightColor: "transparent" },
  cancelBtn: { flex: 1, background: "#14100a", color: "#5a3a18", border: "1px solid #1e1408", borderRadius: 10, padding: "12px", fontWeight: 600, cursor: "pointer" },
  fBox: { background: "#0e0900", borderRadius: 16, padding: 18, marginBottom: 16, border: "1px solid #d4a01222" },
  toast: { position: "fixed", bottom: "calc(72px + env(safe-area-inset-bottom, 0px))", left: "50%", transform: "translateX(-50%)", padding: "10px 20px", borderRadius: 24, color: "#d4c080", fontWeight: 600, fontSize: 13, boxShadow: "0 8px 28px #00000099", zIndex: 200, whiteSpace: "nowrap", border: "1px solid", display: "flex", alignItems: "center", gap: 6 },
};
