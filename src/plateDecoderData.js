// PlateDex 5.2 — regional plate-code decoder helpers.
// Only countries with a verified, machine-readable rule are decoded automatically.
// Other regional countries fall back to a controlled region selector in the Add/Edit form.
// Montenegro source: Ministry of the Interior registration regulation (registration areas/codes), gov.me.
// Germany/Austria detailed code maps: openpotato/kfz-kennzeichen CSV datasets.

const norm=s=>(s||"").toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Z0-9]+/g," ").trim();
const compact=s=>norm(s).replace(/\s+/g,"");

const montenegro={
  AN:"Andrijevica",BR:"Bar",BA:"Berane",BP:"Bijelo Polje",BD:"Budva",GS:"Gusinje",DG:"Danilovgrad",
  ZB:"Žabljak",KL:"Kolašin",KO:"Kotor",MK:"Mojkovac",NK:"Nikšić",PT:"Petnjica",PL:"Plav",
  PZ:"Plužine",PV:"Pljevlja",PG:"Podgorica",RO:"Rožaje",TV:"Tivat",TU:"Tuzi",TZ:"Tuzi",UL:"Ulcinj",
  HN:"Herceg-Novi",CT:"Cetinje",SN:"Šavnik",ZT:"Zeta"
};

const turkiyeNames=["Adana","Adıyaman","Afyonkarahisar","Ağrı","Amasya","Ankara","Antalya","Artvin","Aydın","Balıkesir","Bilecik","Bingöl","Bitlis","Bolu","Burdur","Bursa","Çanakkale","Çankırı","Çorum","Denizli","Diyarbakır","Edirne","Elazığ","Erzincan","Erzurum","Eskişehir","Gaziantep","Giresun","Gümüşhane","Hakkari","Hatay","Isparta","Mersin","İstanbul","İzmir","Kars","Kastamonu","Kayseri","Kırklareli","Kırşehir","Kocaeli","Konya","Kütahya","Malatya","Manisa","Kahramanmaraş","Mardin","Muğla","Muş","Nevşehir","Niğde","Ordu","Rize","Sakarya","Samsun","Siirt","Sinop","Sivas","Tekirdağ","Tokat","Trabzon","Tunceli","Şanlıurfa","Uşak","Van","Yozgat","Zonguldak","Aksaray","Bayburt","Karaman","Kırıkkale","Batman","Şırnak","Bartın","Ardahan","Iğdır","Yalova","Karabük","Kilis","Osmaniye","Düzce"];
const turkiye=Object.fromEntries(turkiyeNames.map((name,i)=>[String(i+1).padStart(2,"0"),name]));

const romania={
  AB:"Alba",AR:"Arad",AG:"Argeș",BC:"Bacău",BH:"Bihor",BN:"Bistrița-Năsăud",BT:"Botoșani",BV:"Brașov",BR:"Brăila",B:"București",BZ:"Buzău",CS:"Caraș-Severin",CL:"Călărași",CJ:"Cluj",CT:"Constanța",CV:"Covasna",DB:"Dâmbovița",DJ:"Dolj",GL:"Galați",GR:"Giurgiu",GJ:"Gorj",HR:"Harghita",HD:"Hunedoara",IL:"Ialomița",IS:"Iași",IF:"Ilfov",MM:"Maramureș",MH:"Mehedinți",MS:"Mureș",NT:"Neamț",OT:"Olt",PH:"Prahova",SJ:"Sălaj",SM:"Satu Mare",SB:"Sibiu",SV:"Suceava",TR:"Teleorman",TM:"Timiș",TL:"Tulcea",VS:"Vaslui",VL:"Vâlcea",VN:"Vrancea"
};

const croatia={
  BM:"Beli Manastir",BJ:"Bjelovar",CK:"Čakovec",DA:"Daruvar",DE:"Delnice",DJ:"Đakovo",DU:"Dubrovnik",GS:"Gospić",IM:"Imotski",KA:"Karlovac",KC:"Koprivnica",KR:"Krapina",KZ:"Križevci",KT:"Kutina",MA:"Makarska",NA:"Našice",NG:"Nova Gradiška",OG:"Ogulin",OS:"Osijek",PZ:"Požega",PU:"Pula",RI:"Rijeka",SK:"Sisak",SL:"Slatina",SB:"Slavonski Brod",ST:"Split",SI:"Šibenik",VZ:"Varaždin",VK:"Vinkovci",VT:"Virovitica",VU:"Vukovar",ZD:"Zadar",ZG:"Zagreb",ZU:"Županja"
};

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

function parseCsvLine(line){
  const out=[];let cur="",quoted=false;
  for(let i=0;i<line.length;i++){
    const ch=line[i];
    if(ch==='"'){
      if(quoted&&line[i+1]==='"'){cur+='"';i++;}else quoted=!quoted;
    }else if(ch===','&&!quoted){out.push(cur);cur="";}else cur+=ch;
  }
  out.push(cur);return out;
}

export async function loadExternalPlateDecoderMaps(){
  const out={};
  await Promise.all(Object.entries(externalSources).map(async([country,url])=>{
    try{
      const r=await fetch(url,{cache:"force-cache"});if(!r.ok)throw new Error(String(r.status));
      const rows=(await r.text()).split(/\r?\n/).slice(1).filter(Boolean).map(parseCsvLine);
      const map={};
      for(const row of rows){const code=(row[1]||"").trim(),name=(row[2]||"").trim();if(code&&name)map[norm(code).replace(/\s/g,"")]=name;}
      if(Object.keys(map).length)out[country]={kind:"prefix",codes:map,note:"The leading registration-district code identifies the area."};
    }catch(err){console.warn(`PlateDex: could not load decoder map for ${country}`,err)}
  }));
  return out;
}

export function decoderFor(country,external={}){return external[country]||staticPlateDecoders[country]||null;}

function longestPrefix(codes,text){
  const keys=Object.keys(codes).sort((a,b)=>b.length-a.length);
  return keys.find(k=>text.startsWith(norm(k).replace(/\s/g,"")))||null;
}

export function decodePlateRegion(country,plate,external={}){
  const d=decoderFor(country,external);if(!d||!plate)return null;
  const n=norm(plate),c=compact(plate);
  if(d.kind==="numeric-prefix"){
    const m=n.match(/^(\d{2})/);return m?d.codes[m[1]]||null:null;
  }
  if(d.kind==="irish"){
    const parts=n.split(/\s+/).filter(Boolean);
    const m=n.match(/^\d{2,3}\s*([A-Z]{1,2})(?:\s|\d|$)/);
    const code=m?.[1]||parts.find((x,i)=>i>0&&d.codes[x]);return code?d.codes[code]||null:null;
  }
  const key=longestPrefix(d.codes,c);return key?d.codes[key]||null:null;
}

export function plateCodeEntries(country,external={}){
  const d=decoderFor(country,external);if(!d)return[];
  return Object.entries(d.codes).map(([code,region])=>({code,region})).sort((a,b)=>a.code.localeCompare(b.code,undefined,{numeric:true}));
}
