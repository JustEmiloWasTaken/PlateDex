import React,{useEffect,useMemo,useState} from "react";
import {createRoot} from "react-dom/client";
import {createClient} from "@supabase/supabase-js";
import {Plus,LogOut,Shield,Users,Search,Share2,Copy,Trash2,Edit3,X,Eye,EyeOff} from "lucide-react";
import "./styles.css";

const supabase=createClient(import.meta.env.VITE_SUPABASE_URL,import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
const flags={Denmark:"🇩🇰",Norway:"🇳🇴",Sweden:"🇸🇪",Finland:"🇫🇮",Germany:"🇩🇪",Netherlands:"🇳🇱",Belgium:"🇧🇪",France:"🇫🇷",Spain:"🇪🇸",Italy:"🇮🇹","United Kingdom":"🇬🇧",Ireland:"🇮🇪","United States":"🇺🇸",Canada:"🇨🇦",Iceland:"🇮🇸","Faroe Islands":"🇫🇴",Greenland:"🇬🇱",China:"🇨🇳",Japan:"🇯🇵","South Korea":"🇰🇷",Taiwan:"🇹🇼","Hong Kong":"🇭🇰",Australia:"🇦🇺","New Zealand":"🇳🇿",Poland:"🇵🇱",Austria:"🇦🇹",Switzerland:"🇨🇭",Czechia:"🇨🇿",Slovakia:"🇸🇰",Estonia:"🇪🇪",Latvia:"🇱🇻",Lithuania:"🇱🇹",Portugal:"🇵🇹",Greece:"🇬🇷",Turkey:"🇹🇷",Brazil:"🇧🇷",Mexico:"🇲🇽","South Africa":"🇿🇦",India:"🇮🇳",Singapore:"🇸🇬",Thailand:"🇹🇭",Ukraine:"🇺🇦",Russia:"🇷🇺"};
const rc=r=>(r||"Common").toLowerCase();

class AppErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state={error:null}; }
  static getDerivedStateFromError(error){ return {error}; }
  componentDidCatch(error,info){ console.error("PlateDex render error",error,info); }
  render(){
    if(this.state.error) return <div className="center"><div className="errorbox"><h2>PlateDex could not load this page</h2><p>The app ran into an unexpected error.</p><pre>{this.state.error?.message||"Unknown error"}</pre><button className="primary" onClick={()=>location.reload()}>Reload</button></div></div>;
    return this.props.children;
  }
}

function App(){
 const [session,setSession]=useState(null),[authLoading,setAuthLoading]=useState(true);
 const [profile,setProfile]=useState(null),[profileLoading,setProfileLoading]=useState(false),[profileError,setProfileError]=useState("");
 const share=location.pathname.startsWith("/share/")?location.pathname.split("/")[2]:null;

 useEffect(()=>{
   let mounted=true;
   supabase.auth.getSession().then(({data,error})=>{
     if(!mounted)return;
     if(error){console.error("getSession error",error);setProfileError(error.message||"Could not restore session");}
     setSession(data?.session||null);setAuthLoading(false);
   }).catch(error=>{if(mounted){console.error(error);setProfileError(error.message||"Could not restore session");setAuthLoading(false);}});
   const {data:{subscription}}=supabase.auth.onAuthStateChange((_,s)=>{if(mounted)setSession(s||null);});
   return()=>{mounted=false;subscription.unsubscribe();};
 },[]);

 useEffect(()=>{
   let mounted=true;
   async function loadProfile(){
     if(!session){setProfile(null);setProfileLoading(false);return;}
     setProfileLoading(true);setProfileError("");
     const {data,error}=await supabase.from("profiles").select("*").eq("id",session.user.id).maybeSingle();
     if(!mounted)return;
     if(error){console.error("profile query error",error);setProfile(null);setProfileError(error.message||"Could not load your profile");}
     else if(!data){setProfile(null);setProfileError("Your account is signed in, but no PlateDex profile exists yet. An administrator needs to create your profile.");}
     else setProfile(data);
     setProfileLoading(false);
   }
   loadProfile();
   return()=>{mounted=false;};
 },[session]);

 if(share)return <AppErrorBoundary><SharePage token={share}/></AppErrorBoundary>;
 if(authLoading||profileLoading)return <div className="center">Loading PlateDex…</div>;
 if(!session)return <AppErrorBoundary><Login/></AppErrorBoundary>;
 if(!profile)return <AppErrorBoundary><ProfileProblem message={profileError}/></AppErrorBoundary>;
 return <AppErrorBoundary><Dashboard profile={profile}/></AppErrorBoundary>;
}

function ProfileProblem({message}){
 return <div className="center"><div className="errorbox"><h2>Profile setup needed</h2><p>{message||"Your PlateDex profile could not be loaded."}</p><div className="modalactions"><button onClick={()=>location.reload()}>Try again</button><button className="primary" onClick={()=>supabase.auth.signOut()}>Sign out</button></div></div></div>;
}

function Login(){
 const [email,setEmail]=useState(""),[password,setPassword]=useState(""),[error,setError]=useState(""),[busy,setBusy]=useState(false);
 async function go(e){e.preventDefault();setBusy(true);setError("");const {error}=await supabase.auth.signInWithPassword({email,password});if(error)setError(error.message);setBusy(false)}
 return <div className="login"><div className="loginbox"><div className="brand">Plate<span>Dex</span></div><p>Private license plate collection</p><form onSubmit={go}><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>{error&&<div className="error">{error}</div>}<button className="primary" disabled={busy}>{busy?"Signing in…":"Sign in"}</button></form></div></div>
}

function Dashboard({profile}){
 const [tab,setTab]=useState("collection"),[owner,setOwner]=useState(profile);
 const admin=!!profile?.is_admin;
 const openUser=u=>{setOwner(u);setTab("collection")};
 return <div className="app"><header><div className="brand">Plate<span>Dex</span></div><nav>
 <button className={tab==="collection"?"active":""} onClick={()=>{setOwner(profile);setTab("collection")}}>Collection</button>
 <button className={tab==="add"?"active":""} onClick={()=>setTab("add")}><Plus size={16}/> Add plate</button>
 {admin&&<button className={tab==="users"?"active":""} onClick={()=>setTab("users")}><Users size={16}/> Users</button>}
 <button className={tab==="shares"?"active":""} onClick={()=>setTab("shares")}><Share2 size={16}/> Shares</button>
 </nav><div className="account">{profile.display_name}{admin&&<Shield size={15}/>}<button onClick={()=>supabase.auth.signOut()}><LogOut size={16}/></button></div></header>
 <main>{tab==="collection"&&<Collection owner={owner} admin={admin} onAdd={()=>setTab("add")}/>}
 {tab==="add"&&<Editor ownerId={owner.id} onDone={()=>{setOwner(owner);setTab("collection")}}/>}
 {tab==="users"&&admin&&<UsersPanel onOpen={openUser}/>}
 {tab==="shares"&&<Shares/>}</main></div>
}

function Collection({owner,admin,onAdd}){
 const [plates,setPlates]=useState([]),[q,setQ]=useState(""),[showMap,setShowMap]=useState(true),[edit,setEdit]=useState(null);
 async function load(){const {data}=await supabase.from("plates").select("*").eq("user_id",owner.id).order("created_at",{ascending:false});setPlates(data||[])}
 useEffect(()=>{load()},[owner.id]);
 const list=useMemo(()=>plates.filter(p=>[p.plate,p.origin_country,p.origin_region,p.spotted_city,p.spotted_region,p.spotted_country,p.label,p.notes].join(" ").toLowerCase().includes(q.toLowerCase())),[plates,q]);
 async function del(p){if(!confirm("Delete "+p.plate+"?"))return;await supabase.from("plates").delete().eq("id",p.id);load()}
 return <section><div className="head"><div><h1>{owner.display_name}'s Collection</h1><p>{plates.length} plates</p></div><div className="actions"><button onClick={()=>setShowMap(!showMap)}>{showMap?<EyeOff size={16}/>:<Eye size={16}/>} {showMap?"Hide map":"Show map"}</button><button className="primary" onClick={onAdd}><Plus size={16}/> Add plate</button></div></div>
 <div className="search"><Search size={17}/><input placeholder="Search country, city, plate, label…" value={q} onChange={e=>setQ(e.target.value)}/></div>
 {showMap&&<div className="map">Map area — coordinates are stored with each plate and can be rendered here in the next UI pass.</div>}
 {list.length?<div className="grid">{list.map(p=><Card key={p.id} p={p} edit={()=>setEdit(p)} del={()=>del(p)}/>)}</div>:<div className="empty">🚗<h2>No plates found</h2><p>Add your first plate to start the collection.</p></div>}
 {edit&&<Editor ownerId={owner.id} existing={edit} onDone={()=>{setEdit(null);load()}}/>}</section>
}

function Card({p,edit,del}){
 const [url,setUrl]=useState(null);
 useEffect(()=>{if(p.photo_path)supabase.storage.from("plate-photos").createSignedUrl(p.photo_path,3600).then(({data})=>setUrl(data?.signedUrl||null))},[p.photo_path]);
 return <article className={"card "+rc(p.rarity)}>{url?<img src={url} className="photo"/>:<div className="photo no">No photo</div>}<div className="body"><div className="title"><span>{flags[p.origin_country]||"🌐"}</span><b>{p.plate}</b><i>{p.rarity}</i></div><div className="meta">{[p.origin_country,p.origin_region].filter(Boolean).join(" · ")}</div><div className="meta">{[p.spotted_city,p.spotted_region,p.spotted_country].filter(Boolean).join(", ")||"Spotted location not set"}</div>{p.label&&<span className="tag">{p.label}</span>}{p.notes&&<p>{p.notes}</p>}<div className="cardbuttons"><button onClick={edit}><Edit3 size={14}/> Edit</button><button className="danger" onClick={del}><Trash2 size={14}/> Delete</button></div></div></article>
}

function Editor({ownerId,existing,onDone}){
 const [f,setF]=useState(existing||{plate:"",origin_country:"",origin_region:"",spotted_city:"",spotted_region:"",spotted_country:"",spotted_date:"",rarity:"Common",label:"",notes:"",latitude:"",longitude:"",photo_path:null}),[file,setFile]=useState(null),[preview,setPreview]=useState(null),[error,setError]=useState(""),[busy,setBusy]=useState(false);
 const set=(k,v)=>setF(x=>({...x,[k]:v}));
 async function save(e){e.preventDefault();setBusy(true);setError("");try{let path=f.photo_path||null;if(file){const ext=(file.name.split(".").pop()||"jpg").toLowerCase();path=ownerId+"/"+crypto.randomUUID()+"."+ext;const r=await supabase.storage.from("plate-photos").upload(path,file,{contentType:file.type});if(r.error)throw r.error}
 const payload={plate:f.plate,origin_country:f.origin_country,origin_region:f.origin_region,spotted_city:f.spotted_city,spotted_region:f.spotted_region,spotted_country:f.spotted_country,spotted_date:f.spotted_date||null,rarity:f.rarity,label:f.label||null,notes:f.notes||null,latitude:f.latitude===""?null:Number(f.latitude),longitude:f.longitude===""?null:Number(f.longitude),photo_path:path,user_id:ownerId};
 const r=existing?await supabase.from("plates").update(payload).eq("id",existing.id):await supabase.from("plates").insert(payload);if(r.error)throw r.error;onDone()}catch(e){setError(e.message||"Could not save")}finally{setBusy(false)}}
 return <div className="backdrop"><div className="modal"><div className="modalhead"><h2>{existing?"Edit plate":"Add plate"}</h2><button onClick={onDone}><X/></button></div><form onSubmit={save} className="form"><label>Photo<input type="file" accept="image/*" onChange={e=>{const x=e.target.files?.[0];setFile(x);if(x)setPreview(URL.createObjectURL(x))}}/>{preview&&<img className="preview" src={preview}/>}</label>
 <label>License plate<input required value={f.plate} onChange={e=>set("plate",e.target.value)}/></label><label>Origin country<input list="countries" value={f.origin_country||""} onChange={e=>set("origin_country",e.target.value)}/></label><datalist id="countries">{Object.keys(flags).map(x=><option key={x}>{x}</option>)}</datalist>
 <label>Origin region/state/province<input value={f.origin_region||""} onChange={e=>set("origin_region",e.target.value)}/></label><label>Spotted city<input value={f.spotted_city||""} onChange={e=>set("spotted_city",e.target.value)}/></label><label>Spotted region<input value={f.spotted_region||""} onChange={e=>set("spotted_region",e.target.value)}/></label><label>Spotted country<input value={f.spotted_country||""} onChange={e=>set("spotted_country",e.target.value)}/></label><label>Date<input type="date" value={f.spotted_date||""} onChange={e=>set("spotted_date",e.target.value)}/></label><label>Rarity<select value={f.rarity} onChange={e=>set("rarity",e.target.value)}><option>Common</option><option>Rare</option><option>Epic</option><option>Legendary</option></select></label><label>Label<input placeholder="Diplomat, Temporary…" value={f.label||""} onChange={e=>set("label",e.target.value)}/></label><label>Latitude<input type="number" step="any" value={f.latitude??""} onChange={e=>set("latitude",e.target.value)}/></label><label>Longitude<input type="number" step="any" value={f.longitude??""} onChange={e=>set("longitude",e.target.value)}/></label><label className="wide">Notes<textarea value={f.notes||""} onChange={e=>set("notes",e.target.value)}/></label>
 {error&&<div className="error wide">{error}</div>}<div className="modalactions wide"><button type="button" onClick={onDone}>Cancel</button><button className="primary" disabled={busy}>{busy?"Saving…":"Save plate"}</button></div></form></div></div>
}

function UsersPanel({onOpen}){
 const [users,setUsers]=useState([]);
 useEffect(()=>{supabase.from("profiles").select("*").order("display_name").then(({data})=>setUsers(data||[]))},[]);
 return <section><div className="head"><div><h1>Users</h1><p>Admin access — open any collection.</p></div></div><div className="users">{users.map(u=><button className="user" key={u.id} onClick={()=>onOpen(u)}><span>{u.display_name?.[0]?.toUpperCase()||"P"}</span><div><b>{u.display_name}</b><small>{u.is_admin?"Administrator":"Member"}</small></div></button>)}</div></section>
}

function Shares(){
 const [rows,setRows]=useState([]);
 async function load(){const {data}=await supabase.from("shares").select("*").order("created_at",{ascending:false});setRows(data||[])}useEffect(()=>{load()},[]);
 async function add(){await supabase.from("shares").insert({title:"PlateDex Collection"});load()}async function toggle(x){await supabase.from("shares").update({enabled:!x.enabled}).eq("id",x.id);load()}async function remove(x){await supabase.from("shares").delete().eq("id",x.id);load()}
 return <section><div className="head"><div><h1>Share links</h1><p>Read-only public links. Private notes are not shared.</p></div><button className="primary" onClick={add}><Plus size={16}/> Create share link</button></div><div className="shares">{rows.map(x=>{const link=location.origin+"/share/"+x.token;return <div className="share" key={x.id}><div><b>{x.title}</b><small>{x.enabled?"Active":"Disabled"}</small></div><code>{link}</code><div className="rowbuttons"><button onClick={()=>navigator.clipboard.writeText(link)}><Copy size={15}/></button><button onClick={()=>toggle(x)}>{x.enabled?"Disable":"Enable"}</button><button className="danger" onClick={()=>remove(x)}><Trash2 size={15}/></button></div></div>})}</div></section>
}

function SharePage({token}){
 const [data,setData]=useState(undefined);
 useEffect(()=>{supabase.rpc("get_public_share",{p_token:token}).then(({data})=>setData(data))},[token]);
 if(data===undefined)return <div className="center">Loading shared collection…</div>;
 if(data===null)return <div className="center"><h2>Share link not found</h2><p>This link is disabled or does not exist.</p></div>;
 return <div className="sharepage"><header><div className="brand">Plate<span>Dex</span></div><span>Shared by {data.owner}</span></header><main><h1>{data.title}</h1><p>{data.plates.length} plates</p><div className="grid">{data.plates.map(p=><article className={"card "+rc(p.rarity)} key={p.id}><div className="photo no">Shared preview</div><div className="body"><div className="title"><span>{flags[p.origin_country]||"🌐"}</span><b>{p.plate}</b><i>{p.rarity}</i></div><div className="meta">{[p.origin_country,p.origin_region].filter(Boolean).join(" · ")}</div><div className="meta">{[p.spotted_city,p.spotted_region,p.spotted_country].filter(Boolean).join(", ")}</div>{p.label&&<span className="tag">{p.label}</span>}</div></article>)}</div></main></div>
}

createRoot(document.getElementById("root")).render(<App/>);
