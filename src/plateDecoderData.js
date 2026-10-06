// PlateDex 5.2.1 — regional plate-code decoder helpers.
// Local verified maps are used first. PlateDex also tries to load the MIT-licensed
// PlateGeo global rule database at runtime for additional regional regex rules.

const norm=s=>(s||"").toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Z0-9]+/g," ").trim();
const compact=s=>norm(s).replace(/\s+/g,"");

const montenegro={AN:"Andrijevica",BR:"Bar",BA:"Berane",BP:"Bijelo Polje",BD:"Budva",GS:"Gusinje",DG:"Danilovgrad",ZB:"Žabljak",KL:"Kolašin",KO:"Kotor",MK:"Mojkovac",NK:"Nikšić",PT:"Petnjica",PL:"Plav",PZ:"Plužine",PV:"Pljevlja",PG:"Podgorica",RO:"Rožaje",TV:"Tivat",TU:"Tuzi",TZ:"Tuzi",UL:"Ulcinj",HN:"Herceg-Novi",CT:"Cetinje",SN:"Šavnik",ZT:"Zeta"};
const turkiyeNames=["Adana","Adıyaman","Afyonkarahisar","Ağrı","Amasya","Ankara","Antalya","Artvin","Aydın","Balıkesir","Bilecik","Bingöl","Bitlis","Bolu","Burdur","Bursa","Çanakkale","Çankırı","Çorum","Denizli","Diyarbakır","Edirne","Elazığ","Erzincan","Erzurum","Eskişehir","Gaziantep","Giresun","Gümüşhane","Hakkari","Hatay","Isparta","Mersin","İstanbul","İzmir","Kars","Kastamonu","Kayseri","Kırklareli","Kırşehir","Kocaeli","Konya","Kütahya","Malatya","Manisa","Kahramanmaraş","Mardin","Muğla","Muş","Nevşehir","Niğde","Ordu","Rize","Sakarya","Samsun","Siirt","Sinop","Sivas","Tekirdağ","Tokat","Trabzon","Tunceli","Şanlıurfa","Uşak","Van","Yozgat","Zonguldak","Aksaray","Bayburt","Karaman","Kırıkkale","Batman","Şırnak","Bartın","Ardahan","Iğdır","Yalova","Karabük","Kilis","Osmaniye","Düzce"];
const turkiye=Object.fromEntries(turkiyeNames.map((name,i)=>[String(i+1).padStart(2,"0"),name]));
const romania={AB:"Alba",AR:"Arad",AG:"Argeș",BC:"Bacău",BH:"Bihor",BN:"Bistrița-Năsăud",BT:"Botoșani",BV:"Brașov",BR:"Brăila",B:"București",BZ:"Buzău",CS:"Caraș-Severin",CL:"Călărași",CJ:"Cluj",CT:"Constanța",CV:"Covasna",DB:"Dâmbovița",DJ:"Dolj",GL:"Galați",GR:"Giurgiu",GJ:"Gorj",HR:"Harghita",HD:"Hunedoara",IL:"Ialomița",IS:"Iași",IF:"Ilfov",MM:"Maramureș",MH:"Mehedinți",MS:"Mureș",NT:"Neamț",OT:"Olt",PH:"Prahova",SJ:"Sălaj",SM:"Satu Mare",SB:"Sibiu",SV:"Suceava",TR:"Teleorman",TM:"Timiș",TL:"Tulcea",VS:"Vaslui",VL:"Vâlcea",VN:"Vrancea"};
const croatia={BM:"Beli Manastir",BJ:"Bjelovar",CK:"Čakovec",DA:"Daruvar",DE:"Delnice",DJ:"Đakovo",DU:"Dubrovnik",GS:"Gospić",IM:"Imotski",KA:"Karlovac",KC:"Koprivnica",KR:"Krapina",KZ:"Križevci",KT:"Kutina",MA:"Makarska",NA:"Našice",NG:"Nova Gradiška",OG:"Ogulin",OS:"Osijek",PZ:"Požega",PU:"Pula",RI:"Rijeka",SK:"Sisak",SL:"Slatina",SB:"Slavonski Brod",ST:"Split",SI:"Šibenik",VZ:"Varaždin",VK:"Vinkovci",VT:"Virovitica",VU:"Vukovar",ZD:"Zadar",ZG:"Zagreb",ZU:"Županja"};
const slovenia={CE:"Celje",KP:"Koper",KR:"Kranj",KK:"Krško",LJ:"Ljubljana",MB:"Maribor",MS:"Murska Sobota",GO:"Nova Gorica",NM:"Novo mesto",PO:"Postojna",SG:"Slovenj Gradec"};
const switzerland={AG:"Aargau",AI:"Appenzell Innerrhoden",AR:"Appenzell Ausserrhoden",BE:"Bern",BL:"Basel-Landschaft",BS:"Basel-Stadt",FR:"Fribourg",GE:"Geneva",GL:"Glarus",GR:"Graubünden",JU:"Jura",LU:"Lucerne",NE:"Neuchâtel",NW:"Nidwalden",OW:"Obwalden",SG:"St. Gallen",SH:"Schaffhausen",SO:"Solothurn",SZ:"Schwyz",TG:"Thurgau",TI:"Ticino",UR:"Uri",VD:"Vaud",VS:"Valais",ZG:"Zug",ZH:"Zürich"};
const ireland={D:"Dublin",C:"Cork",CE:"Clare",CN:"Cavan",CW:"Carlow",DL:"Donegal",G:"Galway",KY:"Kerry",KE:"Kildare",KK:"Kilkenny",LS:"Laois",LM:"Leitrim",LK:"Limerick",LD:"Longford",LH:"Louth",MO:"Mayo",MH:"Meath",MN:"Monaghan",OY:"Offaly",RN:"Roscommon",SO:"Sligo",T:"Tipperary",W:"Waterford",WH:"Westmeath",WX:"Wexford",WW:"Wicklow"};

export const staticPlateDecoders={
  Montenegro:{kind:"prefix",codes:montenegro,note:"The registration-area code is at the start of the plate."},
  "Türkiye":{kind:"numeric-prefix",codes:turkiye,note:"The first two digits identify the province."},
  Romania:{kind:"prefix",codes:romania,note:"The leading county code identifies the registration area."},
  Croatia:{kind:"prefix",codes:croatia,note:"The leading registration-area letters identify the area."},
  Slovenia:{kind:"prefix",codes:slovenia,note:"The leading registration-area letters identify the area."},
  Switzerland:{kind:"prefix",codes:switzerland,note:"The leading canton abbreviation identifies the canton."},
  Ireland:{kind:"irish",codes:ireland,note:"The county/city code follows the year part of the registration."}
};

const externalSources={
  Germany:"https://raw.githubusercontent.com/openpotato/kfz-kennzeichen/main/src/de/kennzeichen.csv",
  Austria:"https://raw.githubusercontent.com/openpotato/kfz-kennzeichen/main/src/at/kennzeichen.csv"
};
const plateGeoUrls=[
  "https://raw.githubusercontent.com/Apex-Shift/Plategeo/main/plates_global.json",
  "https://raw.githubusercontent.com/Apex-Shift/Plategeo/main/data/plates_global.json"
];

function parseCsvLine(line){const out=[];let cur="",quoted=false;for(let i=0;i<line.length;i++){const ch=line[i];if(ch==='"'){if(quoted&&line[i+1]==='"'){cur+='"';i++;}else quoted=!quoted}else if(ch===','&&!quoted){out.push(cur);cur=""}else cur+=ch}out.push(cur);return out}
function cleanCountry(s){return String(s||"").replace(/[\u{1F1E6}-\u{1F1FF}]{2}/gu,"").replace(/[🏳️🚗]/gu,"").trim().replace(/^Turkey$/i,"Türkiye").replace(/^Czech Republic$/i,"Czechia").replace(/^USA$/i,"United States").replace(/^UK$/i,"United Kingdom")}
function flattenRuleObjects(value,out=[]){if(Array.isArray(value)){for(const v of value)flattenRuleObjects(v,out);return out}if(value&&typeof value==='object'){if((value.pattern||value.regex)&&value.country)out.push(value);for(const v of Object.values(value))if(v&&typeof v==='object')flattenRuleObjects(v,out)}return out}
function jsRegex(pattern){try{let p=String(pattern||"").replace(/\\A/g,"^").replace(/\\[zZ]/g,"$").replace(/\(\?P<[^>]+>/g,"(");return new RegExp(p,"i")}catch{return null}}

async function loadPlateGeoDecoders(){
  let json=null;for(const url of plateGeoUrls){try{const r=await fetch(url,{cache:"force-cache"});if(r.ok){json=await r.json();break}}catch{}}
  if(!json)return{};
  const grouped={};
  for(const row of flattenRuleObjects(json)){
    const country=cleanCountry(row.country),region=row.region||row.area||row.province||row.state||row.wilaya||row.department,pattern=row.pattern||row.regex;
    if(!country||!region||!pattern)continue;const regex=jsRegex(pattern);if(!regex)continue;
    (grouped[country]??=[]).push({regex,pattern:String(pattern),region:String(region),code:String(row.code||row.prefix||row.region_code||"").trim()||null});
  }
  return Object.fromEntries(Object.entries(grouped).filter(([,rules])=>rules.length).map(([country,rules])=>[country,{kind:"regex-rules",rules,note:"PlateDex matches the plate against regional rules from the global PlateGeo rule database."}]));
}

export async function loadExternalPlateDecoderMaps(){
  const out={};
  await Promise.all(Object.entries(externalSources).map(async([country,url])=>{try{const r=await fetch(url,{cache:"force-cache"});if(!r.ok)throw new Error(String(r.status));const rows=(await r.text()).split(/\r?\n/).slice(1).filter(Boolean).map(parseCsvLine);const map={};for(const row of rows){const code=(row[1]||"").trim(),name=(row[2]||"").trim();if(code&&name)map[norm(code).replace(/\s/g,"")]=name}if(Object.keys(map).length)out[country]={kind:"prefix",codes:map,note:"The leading registration-district code identifies the area."}}catch(err){console.warn(`PlateDex: could not load decoder map for ${country}`,err)}}));
  try{const global=await loadPlateGeoDecoders();for(const [country,d] of Object.entries(global))if(!out[country]&&!staticPlateDecoders[country])out[country]=d}catch(err){console.warn("PlateDex: global decoder rules unavailable",err)}
  return out;
}

export function decoderFor(country,external={}){return external[country]||staticPlateDecoders[country]||null}
function longestPrefix(codes,text){const keys=Object.keys(codes).sort((a,b)=>b.length-a.length);return keys.find(k=>text.startsWith(norm(k).replace(/\s/g,"")))||null}
export function decodePlateRegion(country,plate,external={}){
  const d=decoderFor(country,external);if(!d||!plate)return null;const raw=String(plate).trim().toUpperCase(),n=norm(plate),c=compact(plate);
  if(d.kind==="regex-rules"){for(const rule of d.rules||[]){try{rule.regex.lastIndex=0;if(rule.regex.test(raw)||rule.regex.test(c)||rule.regex.test(n))return rule.region}catch{}}return null}
  if(d.kind==="numeric-prefix"){const m=n.match(/^(\d{2})/);return m?d.codes[m[1]]||null:null}
  if(d.kind==="irish"){const parts=n.split(/\s+/).filter(Boolean);const m=n.match(/^\d{2,3}\s*([A-Z]{1,2})(?:\s|\d|$)/);const code=m?.[1]||parts.find((x,i)=>i>0&&d.codes[x]);return code?d.codes[code]||null:null}
  const key=longestPrefix(d.codes,c);return key?d.codes[key]||null:null;
}
export function plateCodeEntries(country,external={}){
  const d=decoderFor(country,external);if(!d)return[];
  if(d.codes)return Object.entries(d.codes).map(([code,region])=>({code,region})).sort((a,b)=>a.code.localeCompare(b.code,undefined,{numeric:true}));
  if(d.kind==="regex-rules")return (d.rules||[]).filter(x=>x.code).map(x=>({code:x.code,region:x.region})).filter((x,i,a)=>a.findIndex(y=>y.code===x.code&&y.region===x.region)===i).sort((a,b)=>a.code.localeCompare(b.code,undefined,{numeric:true}));
  return[];
}
