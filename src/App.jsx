import { useState, useEffect, useRef } from "react";

const SUPABASE_URL = "https://csqbwawnlectjlmttnfy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzcWJ3YXdubGVjdGpsbXR0bmZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyNzIxNjIsImV4cCI6MjA5Nzg0ODE2Mn0.2H1_XAMclqzVSHa8OPC_KzSBSlY7RSLEGdZVNCogiz0";

async function loadFromSupabase(){
  const res=await fetch(`${SUPABASE_URL}/rest/v1/wealth_data?id=eq.main&select=accounts`,{
    headers:{"apikey":SUPABASE_ANON_KEY,"Authorization":`Bearer ${SUPABASE_ANON_KEY}`}
  });
  const data=await res.json();
  if(data&&data[0]&&Array.isArray(data[0].accounts)&&data[0].accounts.length>0) return data[0].accounts;
  return null;
}

async function saveToSupabase(accounts){
  await fetch(`${SUPABASE_URL}/rest/v1/wealth_data?id=eq.main`,{
    method:"PATCH",
    headers:{"apikey":SUPABASE_ANON_KEY,"Authorization":`Bearer ${SUPABASE_ANON_KEY}`,"Content-Type":"application/json","Prefer":"return=minimal"},
    body:JSON.stringify({accounts,updated_at:new Date().toISOString()})
  });
}

const T = {
  bg:       "#050A05",
  surface:  "#111811",
  surface2: "#1A2E18",
  surface3: "#223322",
  border:   "#1A2E18",
  primary:  "#3D7A5F",
  accent:   "#A8D8B9",
  highlight:"#F4A261",
  gain:     "#95D5B2",
  loss:     "#F87171",
  text:     "#E8F5E9",
  muted:    "#5A7A62",
  dim:      "#2A3D2A",
};

const SEED_ACCOUNTS = [
  {
    id:"agbf", name:"AGBF", label:"Trading Fund",
    accent:T.accent, openingBalance:204000.00, units:1016.0585,
    entries:[
      {date:"2026-04-14",amount:0,        type:"opening",      note:"Opening balance",  total:204000.00,units:null},
      {date:"2026-04-14",amount:32.14,    type:"performance",  note:"Interest",          total:204032.14,units:null},
      {date:"2026-04-15",amount:314.40,   type:"performance",  note:"",                  total:204346.54,units:null},
      {date:"2026-04-16",amount:253.97,   type:"performance",  note:"",                  total:204600.51,units:null},
      {date:"2026-04-17",amount:-562.36,  type:"performance",  note:"",                  total:204038.15,units:null},
      {date:"2026-04-20",amount:563.86,   type:"performance",  note:"",                  total:204602.01,units:null},
      {date:"2026-04-21",amount:-284.53,  type:"performance",  note:"",                  total:204317.48,units:null},
      {date:"2026-04-22",amount:-406.41,  type:"performance",  note:"",                  total:203911.07,units:null},
      {date:"2026-04-23",amount:-1205.59, type:"performance",  note:"",                  total:202705.48,units:null},
      {date:"2026-04-24",amount:257.67,   type:"performance",  note:"",                  total:202963.15,units:null},
      {date:"2026-04-28",amount:-825.34,  type:"performance",  note:"",                  total:202137.81,units:null},
      {date:"2026-04-29",amount:-57.73,   type:"performance",  note:"",                  total:202080.08,units:null},
      {date:"2026-04-30",amount:1957.97,  type:"performance",  note:"",                  total:204038.05,units:null},
      {date:"2026-05-04",amount:1400.00,  type:"contribution", note:"Contribution",      total:205438.05,units:null},
      {date:"2026-05-04",amount:59.54,    type:"performance",  note:"",                  total:205497.59,units:null},
      {date:"2026-05-05",amount:304.95,   type:"performance",  note:"",                  total:205802.54,units:null},
      {date:"2026-05-06",amount:1161.99,  type:"performance",  note:"",                  total:206964.53,units:null},
      {date:"2026-05-07",amount:-429.98,  type:"performance",  note:"",                  total:206534.55,units:null},
      {date:"2026-05-08",amount:-164.89,  type:"performance",  note:"",                  total:206369.66,units:null},
      {date:"2026-05-11",amount:213.33,   type:"performance",  note:"",                  total:206582.99,units:null},
      {date:"2026-05-12",amount:-949.07,  type:"performance",  note:"",                  total:205633.92,units:null},
      {date:"2026-05-13",amount:15.63,    type:"performance",  note:"",                  total:205649.55,units:null},
      {date:"2026-05-14",amount:495.89,   type:"performance",  note:"",                  total:206145.44,units:null},
      {date:"2026-05-15",amount:-1276.63, type:"performance",  note:"",                  total:204868.81,units:null},
      {date:"2026-05-18",amount:-258.54,  type:"performance",  note:"",                  total:204610.27,units:null},
      {date:"2026-05-19",amount:-267.01,  type:"performance",  note:"",                  total:204343.26,units:null},
      {date:"2026-05-20",amount:-563.69,  type:"performance",  note:"",                  total:203779.57,units:null},
      {date:"2026-05-21",amount:701.03,   type:"performance",  note:"",                  total:204480.60,units:null},
      {date:"2026-05-22",amount:-735.03,  type:"performance",  note:"",                  total:203745.57,units:null},
      {date:"2026-05-25",amount:790.23,   type:"performance",  note:"",                  total:204535.80,units:null},
      {date:"2026-05-26",amount:452.39,   type:"performance",  note:"",                  total:204988.19,units:null},
      {date:"2026-05-27",amount:-331.60,  type:"performance",  note:"",                  total:204656.59,units:null},
      {date:"2026-05-28",amount:-1603.58, type:"performance",  note:"",                  total:203053.01,units:null},
      {date:"2026-05-29",amount:-40.46,   type:"performance",  note:"",                  total:203012.55,units:null},
      {date:"2026-06-01",amount:1400.00,  type:"contribution", note:"Contribution",      total:204412.55,units:null},
      {date:"2026-06-01",amount:379.12,   type:"performance",  note:"",                  total:204791.67,units:null},
      {date:"2026-06-02",amount:-74.88,   type:"performance",  note:"",                  total:204716.79,units:null},
      {date:"2026-06-03",amount:128.43,   type:"performance",  note:"",                  total:204845.22,units:null},
      {date:"2026-06-04",amount:-936.00,  type:"performance",  note:"",                  total:203909.22,units:null},
      {date:"2026-06-05",amount:295.78,   type:"performance",  note:"",                  total:204205.00,units:null},
      {date:"2026-06-08",amount:-1174.87, type:"performance",  note:"",                  total:203030.13,units:null},
      {date:"2026-06-09",amount:580.07,   type:"performance",  note:"",                  total:203610.20,units:null},
      {date:"2026-06-10",amount:-1093.49, type:"performance",  note:"",                  total:202516.71,units:null},
      {date:"2026-06-11",amount:-104.65,  type:"performance",  note:"",                  total:202412.06,units:null},
      {date:"2026-06-12",amount:1195.80,  type:"performance",  note:"",                  total:203607.86,units:null},
      {date:"2026-06-15",amount:1258.49,  type:"performance",  note:"",                  total:204866.35,units:null},
      {date:"2026-06-17",amount:154.64,   type:"performance",  note:"",                  total:205020.99,units:null},
      {date:"2026-06-18",amount:67.88,    type:"performance",  note:"",                  total:205088.87,units:null},
      {date:"2026-06-19",amount:-192.75,  type:"performance",  note:"",                  total:204896.12,units:1016.0585},
      {date:"2026-06-22",amount:-175.37,  type:"performance",  note:"",                  total:204720.75,units:null},
    ],
  },
  {
    id:"agtf", name:"AGTF", label:"Growth Fund (TFSA)",
    accent:T.primary, openingBalance:46000.00, units:2106.8681,
    entries:[
      {date:"2026-04-15",amount:0,       type:"opening",     note:"Opening balance",    total:46000.00,units:null},
      {date:"2026-04-15",amount:7.25,    type:"performance", note:"Interest",            total:46007.25,units:null},
      {date:"2026-04-16",amount:59.06,   type:"performance", note:"",                    total:46066.31,units:null},
      {date:"2026-04-17",amount:-119.39, type:"performance", note:"",                    total:45946.92,units:null},
      {date:"2026-04-20",amount:129.10,  type:"performance", note:"",                    total:46076.02,units:null},
      {date:"2026-04-21",amount:-63.50,  type:"performance", note:"",                    total:46012.52,units:null},
      {date:"2026-04-22",amount:-93.23,  type:"performance", note:"",                    total:45919.29,units:null},
      {date:"2026-04-23",amount:-270.63, type:"performance", note:"",                    total:45648.66,units:null},
      {date:"2026-04-24",amount:61.38,   type:"performance", note:"",                    total:45710.04,units:null},
      {date:"2026-04-28",amount:-184.15, type:"performance", note:"",                    total:45525.89,units:null},
      {date:"2026-04-29",amount:-14.13,  type:"performance", note:"",                    total:45511.76,units:null},
      {date:"2026-04-30",amount:434.11,  type:"performance", note:"",                    total:45945.87,units:null},
      {date:"2026-05-04",amount:15.18,   type:"performance", note:"",                    total:45961.05,units:null},
      {date:"2026-05-05",amount:65.61,   type:"performance", note:"",                    total:46026.66,units:null},
      {date:"2026-05-06",amount:239.49,  type:"performance", note:"incl R18.48 admin",   total:46266.15,units:null},
      {date:"2026-05-07",amount:-92.14,  type:"performance", note:"",                    total:46174.01,units:null},
      {date:"2026-05-08",amount:-33.95,  type:"performance", note:"",                    total:46140.06,units:null},
      {date:"2026-05-11",amount:44.70,   type:"performance", note:"",                    total:46184.76,units:null},
      {date:"2026-05-12",amount:-211.06, type:"performance", note:"",                    total:45973.70,units:null},
      {date:"2026-05-13",amount:7.17,    type:"performance", note:"",                    total:45980.87,units:null},
      {date:"2026-05-14",amount:108.38,  type:"performance", note:"",                    total:46089.25,units:null},
      {date:"2026-05-15",amount:-273.27, type:"performance", note:"",                    total:45815.98,units:null},
      {date:"2026-05-18",amount:-61.78,  type:"performance", note:"",                    total:45754.20,units:null},
      {date:"2026-05-19",amount:-58.40,  type:"performance", note:"",                    total:45695.80,units:null},
      {date:"2026-05-20",amount:-123.78, type:"performance", note:"",                    total:45572.02,units:null},
      {date:"2026-05-21",amount:156.67,  type:"performance", note:"",                    total:45728.69,units:null},
      {date:"2026-05-22",amount:-156.45, type:"performance", note:"",                    total:45572.24,units:null},
      {date:"2026-05-25",amount:172.68,  type:"performance", note:"",                    total:45744.92,units:null},
      {date:"2026-05-26",amount:95.94,   type:"performance", note:"",                    total:45840.86,units:null},
      {date:"2026-05-27",amount:-73.16,  type:"performance", note:"",                    total:45767.70,units:null},
      {date:"2026-05-28",amount:-354.03, type:"performance", note:"",                    total:45413.67,units:null},
      {date:"2026-05-29",amount:-6.74,   type:"performance", note:"",                    total:45406.93,units:null},
      {date:"2026-06-01",amount:86.87,   type:"performance", note:"",                    total:45493.80,units:null},
      {date:"2026-06-02",amount:-17.08,  type:"performance", note:"incl R35.81 admin",   total:45476.72,units:null},
      {date:"2026-06-03",amount:-9.24,   type:"performance", note:"",                    total:45467.48,units:null},
      {date:"2026-06-04",amount:-204.16, type:"performance", note:"",                    total:45263.32,units:null},
      {date:"2026-06-05",amount:71.21,   type:"performance", note:"",                    total:45334.53,units:null},
      {date:"2026-06-08",amount:-261.25, type:"performance", note:"",                    total:45073.28,units:null},
      {date:"2026-06-09",amount:126.62,  type:"performance", note:"",                    total:45199.90,units:null},
      {date:"2026-06-10",amount:-236.81, type:"performance", note:"",                    total:44963.09,units:null},
      {date:"2026-06-11",amount:-23.38,  type:"performance", note:"",                    total:44939.71,units:null},
      {date:"2026-06-12",amount:264.41,  type:"performance", note:"",                    total:45204.12,units:null},
      {date:"2026-06-15",amount:274.52,  type:"performance", note:"",                    total:45478.64,units:null},
      {date:"2026-06-17",amount:35.61,   type:"performance", note:"",                    total:45514.25,units:null},
      {date:"2026-06-18",amount:15.80,   type:"performance", note:"",                    total:45530.05,units:null},
      {date:"2026-06-19",amount:-32.02,  type:"performance", note:"",                    total:45498.03,units:2106.8681},
      {date:"2026-06-22",amount:-39.19,  type:"performance", note:"",                    total:45458.84,units:null},
    ],
  },
  {
    id:"tfsa", name:"Capitec TFSA", label:"Tax-Free Savings",
    accent:T.highlight, openingBalance:36000.00, units:null,
    entries:[
      {date:"2025-03-12",amount:0,      type:"opening",     note:"Opening + Contribution",total:36000.00,units:null},
      {date:"2025-04-07",amount:195.73, type:"performance", note:"Interest",               total:36195.73,units:null},
      {date:"2025-05-07",amount:218.66, type:"performance", note:"Interest",               total:36414.39,units:null},
      {date:"2025-06-07",amount:227.32, type:"performance", note:"Interest",               total:36641.71,units:null},
      {date:"2025-07-07",amount:221.36, type:"performance", note:"Interest",               total:36863.07,units:null},
      {date:"2025-08-07",amount:230.12, type:"performance", note:"Interest",               total:37093.19,units:null},
      {date:"2025-09-07",amount:231.55, type:"performance", note:"Interest",               total:37324.74,units:null},
      {date:"2025-10-07",amount:225.48, type:"performance", note:"Interest",               total:37550.22,units:null},
      {date:"2025-11-07",amount:234.41, type:"performance", note:"Interest",               total:37784.63,units:null},
      {date:"2025-12-07",amount:228.26, type:"performance", note:"Interest",               total:38012.89,units:null},
      {date:"2026-01-07",amount:237.29, type:"performance", note:"Interest",               total:38250.18,units:null},
      {date:"2026-02-07",amount:238.78, type:"performance", note:"Interest",               total:38488.96,units:null},
      {date:"2026-03-07",amount:217.01, type:"performance", note:"Interest",               total:38705.97,units:null},
      {date:"2026-04-07",amount:241.62, type:"performance", note:"Interest",               total:38947.59,units:null},
      {date:"2026-05-07",amount:235.29, type:"performance", note:"Interest",               total:39182.88,units:null},
      {date:"2026-06-07",amount:244.60, type:"performance", note:"Interest",               total:39427.48,units:null},
    ],
  },
  {
    id:"car", name:"Car Transition", label:"Capitec Car Fund",
    accent:T.muted, openingBalance:246125.07, units:null,
    entries:[
      {date:"2026-05-11",amount:0,     type:"opening",     note:"Transfer from other accounts",total:246125.07,units:null},
      {date:"2026-06-22",amount:47.10, type:"performance", note:"Interest",                    total:246172.17,units:null},
    ],
  },
];

const TFSA_LIFETIME_LIMIT = 500000;
const ANNUAL_LIMITS = { 2025:36000, 2026:46000 };
const TFSA_CONTRIBUTIONS = [
  { year:2025, account:"Capitec TFSA", amount:36000 },
  { year:2026, account:"AGTF",         amount:46000 },
];
const MILESTONES = [250000,500000,750000,1000000];
const TYPE_META = {
  performance: { label:"Performance", color:T.accent },
  contribution:{ label:"Contribution", color:T.gain },
  interest:    { label:"Interest",     color:T.highlight },
  opening:     { label:"Opening",      color:T.dim },
  other:       { label:"Other",        color:T.muted },
};

function fmt(n,sign=false){
  const abs="R"+Math.abs(n).toLocaleString("en-ZA",{minimumFractionDigits:2,maximumFractionDigits:2});
  if(sign) return (n>=0?"+":"-")+abs;
  return (n<0?"-":"")+abs;
}
function fmtU(n){ return Number(n).toLocaleString("en-ZA",{minimumFractionDigits:4,maximumFractionDigits:4}); }

function daysAgoVal(days,entries){
  const cut=new Date(); cut.setDate(cut.getDate()-days);
  const f=[...entries].reverse().find(e=>new Date(e.date)<=cut);
  return f?f.total:entries[0].total;
}
function getCurrentUnits(a){
  const e=[...a.entries].reverse().find(x=>x.units!=null);
  return e?e.units:(a.units||null);
}
function getUnitPrice(a){
  const u=getCurrentUnits(a); if(!u) return null;
  return a.entries[a.entries.length-1].total/u;
}

function Sparkline({entries}){
  const vals=entries.map(e=>e.total);
  const mn=Math.min(...vals),mx=Math.max(...vals),rng=mx-mn||1;
  const W=88,H=28;
  const pts=vals.map((v,i)=>`${(i/(vals.length-1))*W},${H-((v-mn)/rng)*H}`).join(" ");
  const up=vals[vals.length-1]>=vals[0];
  return(
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <polyline points={pts} fill="none" stroke={up?T.gain:T.loss} strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx={W} cy={H-((vals[vals.length-1]-mn)/rng)*H} r="2.5" fill={up?T.gain:T.loss}/>
    </svg>
  );
}

export default function App(){
  const [accounts,setAccounts]=useState(SEED_ACCOUNTS);
  const [loaded,setLoaded]=useState(false);
  const [syncing,setSyncing]=useState(false);
  const [syncErr,setSyncErr]=useState("");
  const isFirst=useRef(true);
  const [tab,setTab]=useState("overview");
  const [logId,setLogId]=useState(null);

  // Load from Supabase on mount
  useEffect(()=>{
    loadFromSupabase().then(data=>{
      if(data) setAccounts(data);
      setLoaded(true);
    }).catch(()=>{ setSyncErr("Could not load data — check your connection."); setLoaded(true); });
  },[]);

  // Save to Supabase whenever accounts change (skip the initial seed render)
  useEffect(()=>{
    if(!loaded) return;
    if(isFirst.current){ isFirst.current=false; return; }
    setSyncing(true); setSyncErr("");
    saveToSupabase(accounts)
      .then(()=>setSyncing(false))
      .catch(()=>{ setSyncing(false); setSyncErr("Save failed — check your connection."); });
  },[accounts,loaded]);
  const [form,setForm]=useState({date:new Date().toISOString().slice(0,10),amount:"",type:"performance",note:"",units:""});
  const [err,setErr]=useState("");

  const totals=accounts.map(a=>a.entries[a.entries.length-1].total);
  const grand=totals.reduce((s,v)=>s+v,0);
  const grand7=accounts.reduce((s,a)=>s+daysAgoVal(7,a.entries),0);
  const grand30=accounts.reduce((s,a)=>s+daysAgoVal(30,a.entries),0);
  const ch7=grand-grand7, ch30=grand-grand30;

  const capitalInvested=accounts.reduce((s,a)=>{
    const c=a.entries.filter(e=>e.type==="contribution").reduce((x,e)=>x+e.amount,0);
    return s+a.openingBalance+c;
  },0);

  function trueGain(a){
    const c=a.entries.filter(e=>e.type==="contribution").reduce((s,e)=>s+e.amount,0);
    return a.entries[a.entries.length-1].total-a.openingBalance-c;
  }

  const nextM=MILESTONES.find(m=>m>grand)||MILESTONES[MILESTONES.length-1];
  const prevM=MILESTONES.filter(m=>m<=grand).pop()||0;
  const milePct=((grand-prevM)/(nextM-prevM))*100;

  const tfsaTotal=TFSA_CONTRIBUTIONS.reduce((s,c)=>s+c.amount,0);
  const tfsaRemain=TFSA_LIFETIME_LIMIT-tfsaTotal;
  const curYear=new Date().getFullYear();
  const annualLim=ANNUAL_LIMITS[curYear]||36000;
  const thisYrContr=TFSA_CONTRIBUTIONS.filter(c=>c.year===curYear).reduce((s,c)=>s+c.amount,0);
  const annualRemain=Math.max(0,annualLim-thisYrContr);

  function submitEntry(){
    const amt=parseFloat(form.amount);
    if(!form.date) return setErr("Date required");
    if(isNaN(amt)||amt===0) return setErr("Enter a non-zero amount — use negative for a loss or withdrawal");
    setErr("");
    setAccounts(prev=>prev.map(a=>{
      if(a.id!==logId) return a;
      const last=a.entries[a.entries.length-1];
      const newTot=parseFloat((last.total+amt).toFixed(2));
      let newUnits=null;
      const curU=getCurrentUnits(a);
      if(form.type==="contribution"&&curU){
        const price=last.total/curU;
        newUnits=parseFloat((curU+amt/price).toFixed(4));
      } else if(form.units&&!isNaN(parseFloat(form.units))){
        newUnits=parseFloat(parseFloat(form.units).toFixed(4));
      }
      const entry={date:form.date,amount:amt,type:form.type,note:form.note,total:newTot,units:newUnits};
      const sorted=[...a.entries,entry].sort((x,y)=>x.date.localeCompare(y.date));
      return {...a,entries:sorted,units:newUnits!=null?newUnits:a.units};
    }));
    setForm({date:new Date().toISOString().slice(0,10),amount:"",type:"performance",note:"",units:""});
  }

  const card={background:T.surface,borderRadius:12,padding:"14px 16px",border:`1px solid ${T.border}`};
  const inp={background:T.surface2,border:`1px solid ${T.dim}`,borderRadius:8,color:T.text,padding:"9px 12px",fontSize:13,width:"100%",boxSizing:"border-box",outline:"none"};
  const TABS=["overview","accounts","units","tfsa","log","milestones"];

  return(
    <div style={{minHeight:"100vh",background:T.bg,color:T.text,fontFamily:"'Inter','Segoe UI',system-ui,sans-serif"}}>

      {/* HEADER */}
      <div style={{background:"#020602",borderBottom:`1px solid ${T.border}`,padding:"20px 16px 0"}}>
        <div style={{maxWidth:640,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
            <div>
              <div style={{fontSize:10,letterSpacing:"0.2em",color:T.muted,textTransform:"uppercase",marginBottom:3}}>Total Wealth</div>
              <div style={{fontSize:34,fontWeight:800,letterSpacing:"-0.02em",color:T.accent}}>{fmt(grand)}</div>
            </div>

          </div>

          <div style={{display:"flex",gap:8,margin:"12px 0 16px"}}>
            {[{label:"7 days",ch:ch7},{label:"30 days",ch:ch30}].map(({label,ch})=>(
              <div key={label} style={{flex:1,background:T.surface,borderRadius:10,padding:"10px 14px",border:`1px solid ${ch>=0?T.gain+"30":T.loss+"30"}`}}>
                <div style={{fontSize:10,color:T.muted,marginBottom:3}}>{label}</div>
                <div style={{fontSize:14,fontWeight:700,color:ch>=0?T.gain:T.loss}}>{fmt(ch,true)}</div>
                <div style={{fontSize:11,color:ch>=0?T.gain:T.loss,opacity:0.7}}>{((ch/(grand-ch))*100).toFixed(2)}%</div>
              </div>
            ))}
          </div>

          <div style={{display:"flex",borderTop:`1px solid ${T.border}`,overflowX:"auto"}}>
            {TABS.map(t=>(
              <button key={t} onClick={()=>{setTab(t);setLogId(null);}} style={{
                flex:"0 0 auto",padding:"11px 12px",background:"none",border:"none",cursor:"pointer",
                fontSize:11,fontWeight:700,letterSpacing:"0.07em",textTransform:"capitalize",
                color:tab===t?T.accent:T.muted,
                borderBottom:tab===t?`2px solid ${T.accent}`:"2px solid transparent",
                whiteSpace:"nowrap",
              }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{maxWidth:640,margin:"0 auto",padding:"18px 16px"}}>

        {/* OVERVIEW */}
        {tab==="overview"&&(
          <div>
            <div style={{marginBottom:18}}>
              <div style={{fontSize:10,letterSpacing:"0.15em",color:T.muted,textTransform:"uppercase",marginBottom:10}}>Portfolio Allocation</div>
              <div style={{display:"flex",height:7,borderRadius:4,overflow:"hidden",gap:2,marginBottom:14}}>
                {accounts.map((a,i)=><div key={a.id} style={{flex:totals[i]/grand,background:a.accent}}/>)}
              </div>
              {accounts.map((a,i)=>(
                <div key={a.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:9}}>
                  <div style={{width:8,height:8,borderRadius:2,background:a.accent,flexShrink:0}}/>
                  <div style={{flex:1,fontSize:13,color:T.text}}>{a.name} <span style={{color:T.muted,fontSize:11}}>({a.label})</span></div>
                  <div style={{fontSize:12,color:T.muted,fontWeight:600}}>{((totals[i]/grand)*100).toFixed(1)}%</div>
                  <div style={{fontSize:13,color:T.accent,minWidth:110,textAlign:"right"}}>{fmt(totals[i])}</div>
                </div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[
                {label:"Capital invested",    value:fmt(capitalInvested)},
                {label:"AGBF true P&L",       value:(()=>{const g=trueGain(accounts.find(a=>a.id==="agbf")); return <span style={{color:g>=0?T.gain:T.loss}}>{fmt(g,true)}</span>;})()},
                {label:"Total interest/growth",value:fmt(accounts.reduce((s,a)=>s+a.entries.filter(e=>e.type==="performance"||e.type==="interest").reduce((x,e)=>x+e.amount,0),0))},
                {label:"Return on capital",    value:(()=>{const r=((grand-capitalInvested)/capitalInvested)*100; return <span style={{color:r>=0?T.gain:T.loss}}>{r.toFixed(2)}%</span>;})()},
              ].map(({label,value},i)=>(
                <div key={i} style={card}>
                  <div style={{fontSize:10,color:T.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:5}}>{label}</div>
                  <div style={{fontSize:15,fontWeight:700}}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACCOUNTS */}
        {tab==="accounts"&&(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {accounts.map((a,i)=>{
              const cur=totals[i],c7=cur-daysAgoVal(7,a.entries),c30=cur-daysAgoVal(30,a.entries),tg=trueGain(a);
              const contribs=a.entries.filter(e=>e.type==="contribution").reduce((s,e)=>s+e.amount,0);
              return(
                <div key={a.id} style={{...card,border:`1px solid ${a.accent}35`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                    <div>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
                        <div style={{width:8,height:8,borderRadius:"50%",background:a.accent}}/>
                        <span style={{fontSize:14,fontWeight:700,color:T.text}}>{a.name}</span>
                        <span style={{fontSize:11,color:T.muted}}>{a.label}</span>
                      </div>
                      <div style={{fontSize:22,fontWeight:800,letterSpacing:"-0.01em",color:T.accent}}>{fmt(cur)}</div>
                    </div>
                    <Sparkline entries={a.entries}/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:contribs>0?8:0}}>
                    {[{label:"7-day",val:c7},{label:"30-day",val:c30},{label:"True P&L",val:tg}].map(({label,val})=>(
                      <div key={label} style={{background:T.surface2,borderRadius:8,padding:"8px 10px"}}>
                        <div style={{fontSize:10,color:T.muted,marginBottom:3}}>{label}</div>
                        <div style={{fontSize:12,fontWeight:700,color:val>=0?T.gain:T.loss}}>{fmt(val,true)}</div>
                      </div>
                    ))}
                  </div>
                  {contribs>0&&(
                    <div style={{fontSize:11,color:T.muted,background:T.surface2,borderRadius:8,padding:"6px 10px"}}>
                      💰 {fmt(contribs)} contributed · excluded from P&L
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* UNITS */}
        {tab==="units"&&(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{fontSize:10,color:T.muted,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:2}}>Unit price = current balance ÷ units held</div>
            {accounts.filter(a=>a.units!=null).map(a=>{
              const cur=a.entries[a.entries.length-1].total;
              const units=getCurrentUnits(a);
              const price=getUnitPrice(a);
              const snapshots=a.entries.filter(e=>e.units!=null);
              const firstSnap=snapshots[0];
              const openPrice=firstSnap?firstSnap.total/firstSnap.units:a.openingBalance/a.units;
              const priceChg=price-openPrice;
              return(
                <div key={a.id} style={{...card,border:`1px solid ${a.accent}35`}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:a.accent}}/>
                    <span style={{fontSize:14,fontWeight:700,color:T.text}}>{a.name}</span>
                    <span style={{fontSize:11,color:T.muted}}>{a.label}</span>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                    {[
                      {label:"Units held",                        value:fmtU(units)},
                      {label:"Current price per unit",            value:fmt(price)},
                      {label:"Current balance",                   value:fmt(cur)},
                      {label:"Price change vs first snapshot",    value:<span style={{color:priceChg>=0?T.gain:T.loss}}>{fmt(priceChg,true)}</span>},
                    ].map(({label,value},i)=>(
                      <div key={i} style={{background:T.surface2,borderRadius:8,padding:"10px 12px"}}>
                        <div style={{fontSize:10,color:T.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.08em"}}>{label}</div>
                        <div style={{fontSize:14,fontWeight:700}}>{value}</div>
                      </div>
                    ))}
                  </div>
                  {snapshots.length>0&&(
                    <div>
                      <div style={{fontSize:10,color:T.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>Unit snapshots</div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,marginBottom:4,padding:"0 4px"}}>
                        {["Date","Units","Price/unit"].map(h=>(
                          <div key={h} style={{fontSize:9,color:T.muted,textTransform:"uppercase",letterSpacing:"0.1em"}}>{h}</div>
                        ))}
                      </div>
                      {snapshots.map((e,i)=>{
                        const p=e.total/e.units;
                        const prev=snapshots[i-1];
                        const prevP=prev?prev.total/prev.units:null;
                        const chg=prevP!=null?p-prevP:null;
                        return(
                          <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,padding:"8px 4px",borderTop:`1px solid ${T.border}`}}>
                            <span style={{fontSize:12,color:T.muted}}>{e.date}</span>
                            <span style={{fontSize:12,color:T.text}}>{fmtU(e.units)}</span>
                            <span style={{fontSize:12}}>
                              <span style={{color:T.highlight}}>{fmt(p)}</span>
                              {chg!=null&&<span style={{fontSize:10,color:chg>=0?T.gain:T.loss,marginLeft:4}}>({fmt(chg,true)})</span>}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            <div style={{...card,background:`${T.primary}18`,border:`1px solid ${T.primary}50`}}>
              <div style={{fontSize:12,color:T.accent,lineHeight:1.7}}>
                💡 Log a <span style={{color:T.gain,fontWeight:700}}>Contribution</span> and units are auto-calculated at the current price. For performance entries, optionally record the unit count to update the price.
              </div>
            </div>
          </div>
        )}

        {/* TFSA */}
        {tab==="tfsa"&&(
          <div>
            <div style={{...card,border:`1px solid ${T.highlight}40`,marginBottom:12}}>
              <div style={{fontSize:10,color:T.muted,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:6}}>TFSA Lifetime Limit</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:10}}>
                <div>
                  <div style={{fontSize:28,fontWeight:800,color:T.accent}}>{fmt(tfsaRemain)}</div>
                  <div style={{fontSize:12,color:T.muted}}>remaining of {fmt(TFSA_LIFETIME_LIMIT)} lifetime</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:14,fontWeight:700,color:T.highlight}}>{fmt(tfsaTotal)}</div>
                  <div style={{fontSize:11,color:T.muted}}>contributed to date</div>
                </div>
              </div>
              <div style={{background:T.surface2,borderRadius:999,height:10,overflow:"hidden",marginBottom:6}}>
                <div style={{height:"100%",width:`${(tfsaTotal/TFSA_LIFETIME_LIMIT)*100}%`,background:`linear-gradient(90deg,${T.primary},${T.accent})`,borderRadius:999}}/>
              </div>
              <div style={{fontSize:11,color:T.muted}}>{((tfsaTotal/TFSA_LIFETIME_LIMIT)*100).toFixed(1)}% of R500,000 lifetime limit used</div>
            </div>

            <div style={{...card,marginBottom:12}}>
              <div style={{fontSize:10,color:T.muted,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:8}}>{curYear} Annual Limit (R{(annualLim/1000).toFixed(0)}k)</div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                <div>
                  <div style={{fontSize:22,fontWeight:800,color:annualRemain>0?T.gain:T.loss}}>{fmt(annualRemain)}</div>
                  <div style={{fontSize:11,color:T.muted}}>can still contribute this year</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:14,fontWeight:700,color:T.text}}>{fmt(thisYrContr)}</div>
                  <div style={{fontSize:11,color:T.muted}}>contributed in {curYear}</div>
                </div>
              </div>
              <div style={{background:T.surface2,borderRadius:999,height:8,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${Math.min(100,(thisYrContr/annualLim)*100)}%`,background:annualRemain>0?T.gain:T.loss,borderRadius:999}}/>
              </div>
            </div>

            <div style={{fontSize:10,color:T.muted,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:10}}>Contribution history</div>
            {TFSA_CONTRIBUTIONS.map((c,i)=>(
              <div key={i} style={{...card,display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div>
                  <div style={{fontSize:13,fontWeight:600,color:T.text}}>{c.year} — {c.account}</div>
                  <div style={{fontSize:11,color:T.muted}}>Annual limit was {fmt(ANNUAL_LIMITS[c.year]||36000)}</div>
                </div>
                <div style={{fontSize:15,fontWeight:700,color:T.highlight}}>{fmt(c.amount)}</div>
              </div>
            ))}

            <div style={{...card,background:`${T.primary}18`,border:`1px solid ${T.primary}50`,marginTop:4}}>
              <div style={{fontSize:12,color:T.accent,lineHeight:1.7}}>
                ⚠️ <span style={{color:T.text,fontWeight:600}}>Note:</span> Both Capitec TFSA and AGTF are TFSA-wrapper accounts and count toward your lifetime limit. SARS imposes a <span style={{color:T.loss,fontWeight:600}}>40% penalty tax</span> on any excess contributions.
              </div>
            </div>
          </div>
        )}

        {/* LOG */}
        {tab==="log"&&(
          <div>
            {!logId?(
              <div>
                <div style={{fontSize:10,color:T.muted,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:12}}>Select account</div>
                {accounts.map((a,i)=>(
                  <button key={a.id} onClick={()=>setLogId(a.id)} style={{...card,border:`1px solid ${a.accent}30`,cursor:"pointer",display:"flex",alignItems:"center",gap:12,width:"100%",textAlign:"left",marginBottom:10}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:a.accent,flexShrink:0}}/>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:600,color:T.text}}>{a.name} <span style={{color:T.muted,fontSize:11}}>— {a.label}</span></div>
                      <div style={{fontSize:12,color:T.muted,marginTop:2}}>{a.entries.length-1} entries · {fmt(totals[i])}</div>
                    </div>
                    <div style={{color:T.dim,fontSize:18}}>›</div>
                  </button>
                ))}
              </div>
            ):(()=>{
              const a=accounts.find(x=>x.id===logId);
              const recent=[...a.entries].reverse().slice(0,12);
              const hasUnits=a.units!=null;
              const curU=getCurrentUnits(a);
              const curP=getUnitPrice(a);
              return(
                <div>
                  <button onClick={()=>setLogId(null)} style={{background:"none",border:"none",color:T.muted,cursor:"pointer",fontSize:13,marginBottom:14,padding:0}}>← Back</button>
                  <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,marginBottom:14}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:a.accent}}/>
                    <span style={{fontSize:14,fontWeight:700,color:T.text}}>{a.name}</span>
                    <span style={{fontSize:12,color:T.muted}}>bal: {fmt(a.entries[a.entries.length-1].total)}</span>
                    {hasUnits&&curU&&curP&&<span style={{fontSize:12,color:T.highlight}}>{fmtU(curU)} units @ {fmt(curP)}</span>}
                  </div>

                  <div style={{...card,marginBottom:18}}>
                    <div style={{fontSize:11,color:T.accent,fontWeight:700,marginBottom:12,textTransform:"uppercase",letterSpacing:"0.1em"}}>Add Movement</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
                      <div>
                        <div style={{fontSize:11,color:T.muted,marginBottom:4}}>Date</div>
                        <input type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))} style={inp}/>
                      </div>
                      <div>
                        <div style={{fontSize:11,color:T.muted,marginBottom:4}}>Amount</div>
                        <div style={{position:"relative"}}>
                          <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:T.muted,fontSize:13,pointerEvents:"none"}}>R</span>
                          <input type="number" step="0.01" placeholder="-250.00 or 380.00" value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))} style={{...inp,paddingLeft:22}}/>
                        </div>
                        <div style={{fontSize:10,color:T.muted,marginTop:3}}>Negative = loss or withdrawal</div>
                      </div>
                    </div>

                    <div style={{marginBottom:10}}>
                      <div style={{fontSize:11,color:T.muted,marginBottom:6}}>Type</div>
                      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                        {Object.entries(TYPE_META).filter(([k])=>k!=="opening").map(([k,v])=>(
                          <button key={k} onClick={()=>setForm(f=>({...f,type:k}))} style={{
                            padding:"6px 12px",borderRadius:20,fontSize:11,fontWeight:600,cursor:"pointer",
                            border:`1px solid ${form.type===k?v.color:T.dim}`,
                            background:form.type===k?`${v.color}18`:"transparent",
                            color:form.type===k?v.color:T.muted,
                          }}>{v.label}</button>
                        ))}
                      </div>
                    </div>

                    <div style={{marginBottom:10}}>
                      <div style={{fontSize:11,color:T.muted,marginBottom:4}}>Note (optional)</div>
                      <input type="text" placeholder="e.g. Interest, Monthly contribution" value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))} style={inp}/>
                    </div>

                    {hasUnits&&form.type!=="contribution"&&(
                      <div style={{marginBottom:10}}>
                        <div style={{fontSize:11,color:T.muted,marginBottom:4}}>Unit count after entry (optional)</div>
                        <input type="number" step="0.0001" placeholder={curU?fmtU(curU):""} value={form.units} onChange={e=>setForm(f=>({...f,units:e.target.value}))} style={inp}/>
                      </div>
                    )}
                    {hasUnits&&form.type==="contribution"&&curU&&curP&&(
                      <div style={{fontSize:11,color:T.gain,background:`${T.primary}20`,borderRadius:8,padding:"8px 12px",marginBottom:10}}>
                        ✓ Units auto-calculated at {fmt(curP)}/unit
                        {form.amount&&!isNaN(parseFloat(form.amount))&&parseFloat(form.amount)>0&&(
                          <span style={{color:T.accent}}> → +{fmtU(parseFloat(form.amount)/curP)} units</span>
                        )}
                      </div>
                    )}

                    {err&&<div style={{fontSize:12,color:T.loss,marginBottom:8,padding:"8px 12px",background:"rgba(248,113,113,0.08)",borderRadius:8}}>{err}</div>}
                    <button onClick={submitEntry} style={{background:T.primary,border:`1px solid ${T.accent}40`,borderRadius:8,color:T.text,padding:"12px 16px",fontSize:13,fontWeight:800,cursor:"pointer",width:"100%",letterSpacing:"0.05em"}}>
                      ADD ENTRY
                    </button>
                  </div>

                  <div style={{fontSize:10,color:T.muted,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:10}}>Recent entries</div>
                  {recent.map((e,i)=>(
                    <div key={i} style={{...card,padding:"10px 14px",display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                      <div style={{width:6,height:6,borderRadius:"50%",background:TYPE_META[e.type]?.color||T.muted,flexShrink:0}}/>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                          <span style={{fontSize:12,color:T.muted}}>{e.date}</span>
                          <span style={{fontSize:12,fontWeight:700,color:e.amount>=0?T.gain:T.loss}}>{fmt(e.amount,true)}</span>
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between",marginTop:2}}>
                          <span style={{fontSize:11,color:TYPE_META[e.type]?.color||T.muted}}>{TYPE_META[e.type]?.label||e.type}{e.note?` · ${e.note}`:""}</span>
                          <span style={{fontSize:11,color:T.dim}}>bal: {fmt(e.total)}{e.units?` · ${fmtU(e.units)}u`:""}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}

        {/* MILESTONES */}
        {tab==="milestones"&&(
          <div>
            <div style={{...card,border:`1px solid ${T.accent}40`,marginBottom:14}}>
              <div style={{fontSize:10,color:T.muted,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:6}}>Next milestone</div>
              <div style={{fontSize:26,fontWeight:800,color:T.accent,marginBottom:4}}>{fmt(nextM)}</div>
              <div style={{fontSize:13,color:T.muted,marginBottom:14}}>{fmt(nextM-grand)} remaining · {milePct.toFixed(1)}% there</div>
              <div style={{background:T.surface2,borderRadius:999,height:8,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${milePct}%`,background:`linear-gradient(90deg,${T.primary},${T.accent})`,borderRadius:999}}/>
              </div>
            </div>

            <div style={{fontSize:10,color:T.muted,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:10}}>All milestones</div>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
              {MILESTONES.map(m=>{
                const done=grand>=m;
                const idx=MILESTONES.indexOf(m);
                const from=idx===0?0:MILESTONES[idx-1];
                const pct=done?100:Math.max(0,((grand-from)/(m-from))*100);
                return(
                  <div key={m} style={{...card,border:`1px solid ${done?T.gain+"40":T.border}`,background:done?`${T.primary}15`:T.surface,display:"flex",alignItems:"center",gap:12}}>
                    <div style={{fontSize:16,color:done?T.gain:T.dim}}>{done?"✓":"○"}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:700,color:done?T.gain:T.text}}>{fmt(m)}</div>
                      {!done&&<div style={{fontSize:11,color:T.muted}}>{fmt(m-grand)} to go</div>}
                    </div>
                    <div style={{fontSize:12,fontWeight:700,color:done?T.gain:T.highlight}}>{done?"Achieved":`${pct.toFixed(0)}%`}</div>
                  </div>
                );
              })}
            </div>

            <div style={card}>
              <div style={{fontSize:10,color:T.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>30-day run rate</div>
              <div style={{fontSize:13,color:T.text,lineHeight:1.7}}>
                At your 30-day pace of <span style={{color:ch30>=0?T.gain:T.loss,fontWeight:700}}>{fmt(ch30,true)}</span>, you'd reach {fmt(nextM)} in approximately{" "}
                <span style={{color:T.highlight,fontWeight:700}}>{ch30>0?Math.ceil((nextM-grand)/ch30):"∞"} months</span>.
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{textAlign:"center",padding:"14px 0 28px",fontSize:10,letterSpacing:"0.1em"}}>
        {syncErr&&<div style={{color:T.loss,marginBottom:6}}>{syncErr}</div>}
        <div style={{color:syncing?T.highlight:T.dim}}>{syncing?"⟳ SYNCING...":"WEALTH DASHBOARD · SYNCED"}</div>
        <button onClick={()=>{if(window.confirm("Reset to original seed data? This cannot be undone.")){saveToSupabase(SEED_ACCOUNTS).then(()=>setAccounts(SEED_ACCOUNTS));}}} style={{display:"block",margin:"8px auto 0",background:"none",border:`1px solid ${T.dim}`,borderRadius:6,color:T.dim,fontSize:9,padding:"4px 10px",cursor:"pointer",letterSpacing:"0.1em"}}>RESET DATA</button>
      </div>
    </div>
  );
}
