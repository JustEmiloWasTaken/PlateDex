// PlateDex 5.2.2 — representative current ordinary-passenger plate layouts for all 195 countries.
// A = letter, 0 = digit, {REG} = geographic registration code/mark.
// Some countries issue several legal layouts; in those cases the showcase uses a representative/common series.

const F=(mask,note="Representative current ordinary passenger format")=>({mask,note});

export const plateFormats={
"Afghanistan":F("00 A 0000"),"Albania":F("AA 000 AA"),"Algeria":F("00000 000 00","Final two digits are the wilaya code in the ordinary series."),"Andorra":F("A0000"),"Angola":F("AA-00-00-AA"),
"Antigua and Barbuda":F("A 0000"),"Argentina":F("AA 000 AA"),"Armenia":F("00 AA 000"),"Australia":F("VARIES BY STATE","Plate layout is issued by the state or territory."),"Austria":F("{REG} 000 AA"),
"Azerbaijan":F("00-AA-000"),"Bahamas":F("{REG} 0000","Island/issuing-area series vary."),"Bahrain":F("000000"),"Bangladesh":F("{REG} A 00-0000","The plate includes the issuing metro/district name or code."),"Barbados":F("{REG} 0000"),
"Belarus":F("0000 AA-0"),"Belgium":F("1-AAA-000"),"Belize":F("{REG}-00000"),"Benin":F("AB 0000 RB"),"Bhutan":F("{REG}-0-A0000"),
"Bolivia":F("0000 AAA"),"Bosnia and Herzegovina":F("A00-A-000"),"Botswana":F("B 000 AAA"),"Brazil":F("AAA0A00"),"Brunei":F("{REG} 0000"),
"Bulgaria":F("{REG} 0000 AA"),"Burkina Faso":F("{REG} AA 0000"),"Burundi":F("A 0000"),"Cabo Verde":F("{REG}-00-AA"),"Cambodia":F("{REG} 1AA-0000"),
"Cameroon":F("{REG} 000 AA"),"Canada":F("VARIES BY PROVINCE","Plate layout is issued by the province or territory."),"Central African Republic":F("{REG} 0000 A"),"Chad":F("{REG} A 0000"),"Chile":F("AAAA00"),
"China":F("{REG}A·00000","The first character identifies the province-level jurisdiction; the following letter identifies a local vehicle-management area."),"Colombia":F("ABC 123"),"Comoros":F("0000 AB"),"Congo":F("{REG} 000 AB"),"Costa Rica":F("ABC-123"),
"Côte d'Ivoire":F("0000 AB {REG}"),"Croatia":F("{REG} 0000-AA"),"Cuba":F("A00000"),"Cyprus":F("ABC 000"),"Czechia":F("{REG}00 0000","The first character of the registration block historically/administratively identifies the registration area family."),
"Democratic Republic of the Congo":F("{REG} 0000 AB"),"Denmark":F("AA 00 000"),"Djibouti":F("D 0000"),"Dominica":F("AB 000"),"Dominican Republic":F("A000000"),
"Ecuador":F("{REG}BC-0000"),"Egypt":F("{REG} ABC 1234"),"El Salvador":F("P000-000"),"Equatorial Guinea":F("{REG} 0000 A"),"Eritrea":F("ER 0 0000"),
"Estonia":F("000 ABC"),"Eswatini":F("{REG} 000 AA"),"Ethiopia":F("{REG}-A00000"),"Fiji":F("ABC 123"),"Finland":F("ABC-123"),
"France":F("AA-000-AA"),"Gabon":F("AB 000 AA"),"Gambia":F("{REG} 0000"),"Georgia":F("AA-000-AA"),"Germany":F("{REG} AA 0000"),
"Ghana":F("{REG} 0000-00"),"Greece":F("{REG}A-0000"),"Grenada":F("P 0000"),"Guatemala":F("P000ABC"),"Guinea":F("{REG} 0000 A"),
"Guinea-Bissau":F("{REG} 0000"),"Guyana":F("PAB 0000"),"Haiti":F("AA 00000"),"Honduras":F("HAA 0000"),"Hungary":F("AA AA-000"),
"Iceland":F("AB C00"),"India":F("{REG} 00 AA 0000","State/UT code is followed by the registering-office number."),"Indonesia":F("{REG} 0000 AA"),"Iran":F("00 A 000 · {REG}"),"Iraq":F("{REG} A 00000"),
"Ireland":F("000-{REG}-00000"),"Israel":F("000-00-000"),"Italy":F("AA 000 AA"),"Jamaica":F("0000 AB"),"Japan":F("{REG} 000 A 00-00","The upper line names the issuing transport office; the lower line carries class/kana/serial."),
"Jordan":F("00-00000"),"Kazakhstan":F("000 AAA {REG}"),"Kenya":F("KAA 000A"),"Kiribati":F("K 0000"),"Kuwait":F("00 00000"),
"Kyrgyzstan":F("{REG} 000 AAA"),"Laos":F("{REG} AA 0000"),"Latvia":F("AB-0000"),"Lebanon":F("{REG} 000000"),"Lesotho":F("A 0000"),
"Liberia":F("A 0000"),"Libya":F("{REG}-000000"),"Liechtenstein":F("FL 00000"),"Lithuania":F("ABC 000"),"Luxembourg":F("AA 0000"),
"Madagascar":F("0000 {REG}"),"Malawi":F("{REG} 0000"),"Malaysia":F("{REG} 0000"),"Maldives":F("A0 0000"),"Mali":F("{REG} 0000 MD"),
"Malta":F("ABC 000"),"Marshall Islands":F("0000"),"Mauritania":F("{REG} 0000 AA"),"Mauritius":F("0000 AB 00"),"Mexico":F("VARIES BY STATE","Ordinary passenger plate layouts are issued by the states and can differ substantially."),
"Micronesia":F("VARIES BY STATE","Each state issues its own plate design/series."),"Moldova":F("ABC 000"),"Monaco":F("000A"),"Mongolia":F("0000 {REG}"),"Montenegro":F("{REG} AA 000"),
"Morocco":F("00000 | A | {REG}"),"Mozambique":F("{REG}-00-00"),"Myanmar":F("{REG}/0000"),"Namibia":F("{REG} 0000 A"),"Nauru":F("RN 000"),
"Nepal":F("{REG} 00 A 0000"),"Netherlands":F("A-000-AA","The Netherlands uses a sequence of national sidecodes; the exact active layout changes over time."),"New Zealand":F("ABC123"),"Nicaragua":F("{REG} 000000"),"Niger":F("{REG} A 0000"),
"Nigeria":F("{REG} 000 AA"),"North Korea":F("{REG}-0000"),"North Macedonia":F("{REG} 0000 AA"),"Norway":F("{REG} 00000"),"Oman":F("00 0000"),
"Pakistan":F("VARIES BY PROVINCE","Passenger plate layout and regional coding are province/territory specific."),"Palau":F("{REG} 000"),"Palestine":F("{REG}-0000-00"),"Panama":F("AA0000"),"Papua New Guinea":F("{REG} 0000"),
"Paraguay":F("AAAA 000"),"Peru":F("{REG}BC-123"),"Philippines":F("{REG}BC 1234"),"Poland":F("{REG} 00000"),"Portugal":F("AA-00-AA"),
"Qatar":F("000000"),"Romania":F("{REG} 00 AAA"),"Russia":F("A000AA {REG}"),"Rwanda":F("RAB 000A"),"Saint Kitts and Nevis":F("{REG} 0000"),
"Saint Lucia":F("PJ 000"),"Saint Vincent and the Grenadines":F("P 0000"),"Samoa":F("00000"),"San Marino":F("A0000"),"Sao Tome and Principe":F("STP-00-00"),
"Saudi Arabia":F("ABC 1234"),"Senegal":F("{REG}-0000-BB"),"Serbia":F("{REG} 000-AA"),"Seychelles":F("S 0000"),"Sierra Leone":F("AB 0000"),
"Singapore":F("SAA 0000 A"),"Slovakia":F("AA-000AA"),"Slovenia":F("{REG} AA-000"),"Solomon Islands":F("0000"),"Somalia":F("SO 0000"),
"South Africa":F("VARIES BY PROVINCE","Passenger plate format is province-specific."),"South Korea":F("000가0000"),"South Sudan":F("SSD 0000 A"),"Spain":F("0000 AAA"),"Sri Lanka":F("ABC-0000"),
"Sudan":F("{REG} 0000"),"Suriname":F("AB 00-00"),"Sweden":F("ABC 00A"),"Switzerland":F("{REG} 000000"),"Syria":F("000000"),
"Tajikistan":F("0000 AB {REG}"),"Tanzania":F("T 000 ABC"),"Thailand":F("{REG} 0AA 0000","Province name is also displayed on the plate."),"Timor-Leste":F("00-000 TL"),"Togo":F("TG 0000 AA"),
"Tonga":F("A 0000"),"Trinidad and Tobago":F("PAB 0000"),"Tunisia":F("000 TUN 0000"),"Türkiye":F("{REG} AA 0000"),"Turkmenistan":F("{REG} AA 0000"),
"Tuvalu":F("TV 000"),"Uganda":F("UAA 000A"),"Ukraine":F("{REG} 0000 AA"),"United Arab Emirates":F("VARIES BY EMIRATE","Each emirate issues its own ordinary passenger plate series."),"United Kingdom":F("AA00 AAA"),
"United States":F("VARIES BY STATE","Passenger plate layout is state/DC specific."),"Uruguay":F("{REG} ABC 1234"),"Uzbekistan":F("{REG} A 000 AA"),"Vanuatu":F("0000"),"Vatican City":F("SCV 00000"),
"Venezuela":F("AA0A00A"),"Vietnam":F("{REG}A-000.00"),"Yemen":F("{REG} 00000"),"Zambia":F("{REG} 0000"),"Zimbabwe":F("ABC 0000")
};

export function plateFormatFor(country){
  return plateFormats[country]||F("CURRENT PASSENGER SERIES","PlateDex has no single fixed mask for this country's ordinary passenger series yet.");
}

export function showcaseMask(country,selectedCode){
  const f=plateFormatFor(country);const code=selectedCode||exampleRegionCode[country]||"REG";
  return {...f,display:f.mask.replaceAll("{REG}",code),hasRegion:f.mask.includes("{REG}"),code};
}

export const exampleRegionCode={
  Montenegro:"PG",Norway:"AA",Germany:"B",Austria:"W",Poland:"WA",Romania:"B",Croatia:"ZG",Slovenia:"LJ",Switzerland:"ZH",Ireland:"D",Türkiye:"34",India:"DL",China:"京",Russia:"77",Ukraine:"AA",Serbia:"BG","North Macedonia":"SK",Bulgaria:"C",Greece:"Ι",Vietnam:"29",Indonesia:"B",Iran:"11",Ecuador:"P",Peru:"A",Philippines:"N",Nigeria:"LAG",Ghana:"GR",Morocco:"1",Algeria:"16",Belarus:"7"
};

export function formatParts(display,selectedCode){
  const code=(selectedCode||"").toUpperCase();
  return String(display).split(/(\s+|[-·|./])/).filter(Boolean).map((text,i)=>({
    text,key:`${i}-${text}`,highlight:!!code&&text.toUpperCase()===code,
    kind:/^A+$/.test(text)?"letters":/^0+$/.test(text)?"digits":"literal"
  }));
}
