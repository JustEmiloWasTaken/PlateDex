// PlateDex 5.2.2 — regional plate-code decoder helpers.
// Every country has an explicit decoding mode in Platepedia. Verified local maps
// are preferred, with CORS-friendly public rule sources used as an optional
// extension for additional serial-decodable regional systems.

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
const chinaProvince={"京":"Beijing","津":"Tianjin","冀":"Hebei","晋":"Shanxi","蒙":"Inner Mongolia","辽":"Liaoning","吉":"Jilin","黑":"Heilongjiang","沪":"Shanghai","苏":"Jiangsu","浙":"Zhejiang","皖":"Anhui","闽":"Fujian","赣":"Jiangxi","鲁":"Shandong","豫":"Henan","鄂":"Hubei","湘":"Hunan","粤":"Guangdong","桂":"Guangxi","琼":"Hainan","渝":"Chongqing","川":"Sichuan","贵":"Guizhou","云":"Yunnan","藏":"Tibet","陕":"Shaanxi","甘":"Gansu","青":"Qinghai","宁":"Ningxia","新":"Xinjiang"};
const indiaState={AN:"Andaman and Nicobar Islands",AP:"Andhra Pradesh",AR:"Arunachal Pradesh",AS:"Assam",BR:"Bihar",CH:"Chandigarh",CG:"Chhattisgarh",DD:"Dadra and Nagar Haveli and Daman and Diu",DL:"Delhi",GA:"Goa",GJ:"Gujarat",HR:"Haryana",HP:"Himachal Pradesh",JK:"Jammu and Kashmir",JH:"Jharkhand",KA:"Karnataka",KL:"Kerala",LA:"Ladakh",LD:"Lakshadweep",MP:"Madhya Pradesh",MH:"Maharashtra",MN:"Manipur",ML:"Meghalaya",MZ:"Mizoram",NL:"Nagaland",OD:"Odisha",PY:"Puducherry",PB:"Punjab",RJ:"Rajasthan",SK:"Sikkim",TN:"Tamil Nadu",TS:"Telangana",TR:"Tripura",UP:"Uttar Pradesh",UK:"Uttarakhand",WB:"West Bengal"};
const belarus={"1":"Brest Region","2":"Vitebsk Region","3":"Gomel Region","4":"Grodno Region","5":"Minsk Region","6":"Mogilev Region","7":"Minsk City"};

export const staticPlateDecoders={
  Montenegro:{kind:"prefix",codes:montenegro,note:"The registration-area code is at the start of the plate."},
  "Türkiye":{kind:"numeric-prefix",codes:turkiye,note:"The first two digits identify the province."},
  Romania:{kind:"prefix",codes:romania,note:"The leading county code identifies the registration area."},
  Croatia:{kind:"prefix",codes:croatia,note:"The leading registration-area letters identify the area."},
  Slovenia:{kind:"prefix",codes:slovenia,note:"The leading registration-area letters identify the area."},
  Switzerland:{kind:"prefix",codes:switzerland,note:"The leading canton abbreviation identifies the canton."},
  Ireland:{kind:"irish",codes:ireland,note:"The county/city code follows the year part of the registration."},
  China:{kind:"unicode-prefix",codes:chinaProvince,note:"The first character identifies the province-level jurisdiction."},
  India:{kind:"prefix",codes:indiaState,note:"The first two letters identify the state or union territory."},
  Belarus:{kind:"suffix",codes:belarus,note:"The final regional digit identifies the registration region/city."}
};

const externalSources={
  Germany:[
    "https://cdn.jsdelivr.net/gh/openpotato/kfz-kennzeichen@main/src/de/kennzeichen.csv",
    "https://raw.githubusercontent.com/openpotato/kfz-kennzeichen/main/src/de/kennzeichen.csv"
  ],
  Austria:[
    "https://cdn.jsdelivr.net/gh/openpotato/kfz-kennzeichen@main/src/at/kennzeichen.csv",
    "https://raw.githubusercontent.com/openpotato/kfz-kennzeichen/main/src/at/kennzeichen.csv"
  ]
};
const plateGeoUrls=[
  "https://cdn.jsdelivr.net/gh/Apex-Shift/Plategeo@main/plates_global.json",
  "https://cdn.jsdelivr.net/gh/Apex-Shift/Plategeo@main/data/plates_global.json",
  "https://raw.githubusercontent.com/Apex-Shift/Plategeo/main/plates_global.json",
  "https://raw.githubusercontent.com/Apex-Shift/Plategeo/main/data/plates_global.json"
];

const issuerVisibleCountries=new Set(["Australia","Canada","Mexico","Micronesia","Pakistan","Palau","South Africa","United Arab Emirates","United States"]);
const printedRegionCountries=new Set(["Bangladesh","Japan","Thailand"]);

function parseCsvLine(line){const out=[];let cur="",quoted=false;for(let i=0;i<line.length;i++){const ch=line[i];if(ch==='"'){if(quoted&&line[i+1]==='"'){cur+='"';i++;}else quoted=!quoted}else if(ch===','&&!quoted){out.push(cur);cur=""}else cur+=ch}out.push(cur);return out}
function cleanCountry(s){return String(s||"").replace(/[\u{1F1E6}-\u{1F1FF}]{2}/gu,"").replace(/[🏳️🚗]/gu,"").trim().replace(/^Turkey$/i,"Türkiye").replace(/^Czech Republic$/i,"Czechia").replace(/^USA$/i,"United States").replace(/^UK$/i,"United Kingdom").replace(/^DR Congo$/i,"Democratic Republic of the Congo").replace(/^Republic of the Congo$/i,"Congo")}
function firstValue(obj,keys){for(const k of keys){const v=obj?.[k];if(v!=null&&String(v).trim())return v}return null}
function walkRules(value,ctx={},out=[]){
  if(Array.isArray(value)){for(const v of value)walkRules(v,ctx,out);return out}
  if(!value||typeof value!=="object")return out;
  const next={
    country:cleanCountry(firstValue(value,["country","country_name","nation"])||ctx.country),
    region:firstValue(value,["region","area","province","state","wilaya","department","district","office","governorate","canton"])||ctx.region
  };
  const pattern=firstValue(value,["pattern","regex","regexp"]);
  if(pattern&&next.country&&next.region)out.push({...value,country:next.country,region:next.region,pattern});
  for(const v of Object.values(value))if(v&&typeof v==="object")walkRules(v,next,out);
  return out;
}
function jsRegex(pattern){try{let p=String(pattern||"").replace(/\\A/g,"^").replace(/\\[zZ]/g,"$").replace(/\(\?P<[^>]+>/g,"(");return new RegExp(p,"i")}catch{return null}}
function inferCode(row){
  const explicit=firstValue(row,["code","prefix","region_code","area_code","plate_code","district_code"]);if(explicit)return String(explicit).trim();
  const p=String(row.pattern||row.regex||"");
  const prefix=p.match(/^\^?\\?b?\(?\[?([A-Z0-9]{1,4})\]?/i);if(prefix&&/^[A-Z0-9]{1,4}$/i.test(prefix[1]))return prefix[1].toUpperCase();
  return null;
}
async function fetchFirst(urls,type="text"){
  for(const url of urls){try{const r=await fetch(url,{cache:"force-cache"});if(!r.ok)continue;return type==="json"?await r.json():await r.text()}catch{}}
  return null;
}

async function loadPlateGeoDecoders(){
  const json=await fetchFirst(plateGeoUrls,"json");if(!json)return{};
  const grouped={};
  for(const row of walkRules(json)){
    const country=cleanCountry(row.country),region=row.region,pattern=row.pattern||row.regex;if(!country||!region||!pattern)continue;
    const regex=jsRegex(pattern);if(!regex)continue;
    (grouped[country]??=[]).push({regex,pattern:String(pattern),region:String(region),code:inferCode(row)});
  }
  return Object.fromEntries(Object.entries(grouped).filter(([,rules])=>rules.length).map(([country,rules])=>[country,{kind:"regex-rules",rules,note:"PlateDex matches the registration against regional rules from the PlateGeo rule database."}]));
}

export async function loadExternalPlateDecoderMaps(){
  const out={};
  await Promise.all(Object.entries(externalSources).map(async([country,urls])=>{try{const text=await fetchFirst(urls,"text");if(!text)return;const rows=text.split(/\r?\n/).slice(1).filter(Boolean).map(parseCsvLine);const map={};for(const row of rows){const code=(row[1]||"").trim(),name=(row[2]||"").trim();if(code&&name)map[norm(code).replace(/\s/g,"")]=name}if(Object.keys(map).length)out[country]={kind:"prefix",codes:map,note:"The leading registration-district code identifies the area."}}catch(err){console.warn(`PlateDex: could not load decoder map for ${country}`,err)}}));
  try{const global=await loadPlateGeoDecoders();for(const [country,d] of Object.entries(global))if(!out[country]&&!staticPlateDecoders[country])out[country]=d}catch(err){console.warn("PlateDex: global decoder rules unavailable",err)}
  return out;
}

export function decoderFor(country,external={}){return external[country]||staticPlateDecoders[country]||null}
function longestPrefix(codes,text){const keys=Object.keys(codes).sort((a,b)=>b.length-a.length);return keys.find(k=>text.startsWith(norm(k).replace(/\s/g,"")))||null}
function longestSuffix(codes,text){const keys=Object.keys(codes).sort((a,b)=>b.length-a.length);return keys.find(k=>text.endsWith(norm(k).replace(/\s/g,"")))||null}
export function decodePlateRegion(country,plate,external={}){
  const d=decoderFor(country,external);if(!d||!plate)return null;const raw=String(plate).trim().toUpperCase(),n=norm(plate),c=compact(plate);
  if(d.kind==="regex-rules"){for(const rule of d.rules||[]){try{rule.regex.lastIndex=0;if(rule.regex.test(raw)||rule.regex.test(c)||rule.regex.test(n))return rule.region}catch{}}return null}
  if(d.kind==="numeric-prefix"){const m=n.match(/^(\d{2})/);return m?d.codes[m[1]]||null:null}
  if(d.kind==="unicode-prefix"){const first=String(plate).trim().charAt(0);return d.codes[first]||null}
  if(d.kind==="suffix"){const key=longestSuffix(d.codes,c);return key?d.codes[key]||null:null}
  if(d.kind==="irish"){const parts=n.split(/\s+/).filter(Boolean);const m=n.match(/^\d{2,3}\s*([A-Z]{1,2})(?:\s|\d|$)/);const code=m?.[1]||parts.find((x,i)=>i>0&&d.codes[x]);return code?d.codes[code]||null:null}
  const key=longestPrefix(d.codes,c);return key?d.codes[key]||null:null;
}
export function plateCodeEntries(country,external={}){
  const d=decoderFor(country,external);if(!d)return[];
  if(d.codes)return Object.entries(d.codes).map(([code,region])=>({code,region})).sort((a,b)=>a.code.localeCompare(b.code,undefined,{numeric:true}));
  if(d.kind==="regex-rules")return (d.rules||[]).filter(x=>x.code).map(x=>({code:x.code,region:x.region})).filter((x,i,a)=>a.findIndex(y=>y.code===x.code&&y.region===x.region)===i).sort((a,b)=>a.code.localeCompare(b.code,undefined,{numeric:true}));
  return[];
}

export function decoderCoverage(country,regionalIdentification,external={}){
  if(!regionalIdentification)return{mode:"none",label:"Not applicable",note:"The current ordinary passenger registration does not encode a geographic origin."};
  const decoder=decoderFor(country,external);
  if(decoder)return{mode:"serial",label:"Automatic from plate",note:decoder.note||"PlateDex decodes the regional identifier from the registration."};
  if(issuerVisibleCountries.has(country))return{mode:"issuer",label:"Issuer visible on plate",note:"The state/province/issuer is identified by the plate design or printed issuer name rather than a reliable code in the typed serial, so PlateDex uses the registration-area selector."};
  if(printedRegionCountries.has(country))return{mode:"printed",label:"Region printed on plate",note:"The geographic area is printed separately on the physical plate rather than being reliably recoverable from the typed serial alone, so PlateDex uses the registration-area selector."};
  return{mode:"selector",label:"Regional area selector",note:"This system is geographic, but PlateDex does not guess a code when the typed serial cannot be decoded reliably. Choose the registration area shown on the plate."};
}
