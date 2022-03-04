
var beach_airport = ["BEACHES/AIRPORT AREA",
"Del Rey",
"L.A.International Airport",
"Mar Vista",
"Marina Peninsula",
"Playa del Rey",
"Playa Vista",
"Venice",
"Westchester/LAX"];

var CRESCENTA = ["La Tuna Canyon",
"Lakeview Terrace",
"Shadow Hills",
"Sunland",
"Tujunga"];

var Harbor_Area = [
"Harbor City",
"Harbor Gateway",
"Harbor Pines",
"San Pedro",
"Terminal Island",
"Wilmington"];

var Hollywood_Area = [
"Cahuenga Pass",
"East Hollywood",
"Hollywood",
"Hollywood Hills",
"Little Armenia",
"Los Feliz",
"Thai Town"
];

var South_LA = [
"Adams-Normandie",
"Arlington Park",
"Baldwin Hills",
"Berkeley Square",
"Central-Alameda",
"Century Palms/Cove",
"Crenshaw",
"Crenshaw Manor",
"Exposition Park",
"Figueroa Park Square",
"Florence-Firestone",
"Gramercy Park",
"Harvard Park",
"Historic West Adams",
"Hyde Park",
"Jefferson Park",
"King Estates",
"Kinney Heights",
"Leimert Park",
"Manchester Square",
"South Park",
"University Expo Park West",
"University Park",
"Vermont Knolls",
"Vermont Square",
"Vermont Vista",
"Vernon Central",
"View Heights",
"Watts",
"West Adams",
"West Adams Heights",
"West Adams Terrace",
"West Vernon"
];

var Westside_LA = [
"Alsace",
"Bel Air",
"Beverly Crest",
"Beverly Glen",
"Beverlywood",
"Brentwood",
"Cadillac-Corning",
"Castle Heights",
"Century City",
"Cheviot Hills",
"Crestview",
"Mandeville Canyon",
"Pacific Palisades",
"Palisades Highlands",
"Palms",
"Rancho Park",
"Regent Square",
"Reynier Village",
"Sawtelle",
"South Robertson",
"Topanga State Park",
"West Los Angeles",
"Westside Village",
"Westwood"];

var Central_City = [
    "Angelino Heights",
"Arlington Heights",
"Boyle Heights",
"Brookside",
"Byzantine-Latino Quarter",
"Cahuega Pass",
"Carthay",
"Central City East",
"Chinatown/Historic LA",
"Cloverdale/Cochran",
"Country Club Heights",
"Country Club Park",
"Downtown LA",
"Echo Park",
"Elysian Park",
"Faircrest Heights",
"Fairfax",
"Franklin Village",
"Fremont Place",
"Green Meadows",
"Griffith Park",
"Hancock Park",
"Harvard Heights",
"Historic Filipinotown",
"Koreatown",
"La Brea Hancock",
"Lafayette Square",
"Larchmont Village",
"Little Bangladesh",
"Little Tokyo",
"Longwood",
"Maplewood-St. Andrews",
"Melrose",
"Melrose Hill",
"Mid-City",
"Mid-City West",
"Mid-Wilshire",
"Miracle Mile",
"Olympic Park",
"Park La Brea",
"Picfair Village",
"Pico Park",
"Pico Union",
"Rampart Village",
"Redondo Sycamore",
"Silver Lake",
"South Carthay",
"St. Andrews Square",
"St. Elmo Village",
"Sugar Hill",
"Sycamore Square",
"Temple-Beaudry",
"Victoria Park",
"Wellington Square",
"Western Heights",
"Western Wilton",
"Westlake",
"Wholesale District",
"Wilshire Center",
"Wilshire Park",
"Wilshire Vista",
"Wilshire Vista Heights",
"Windsor Square",
"Windsor Village"
];

var NORTHEAST_LA = [
"Atwater Village",
"Cypress Park",
"Eagle Rock",
"El Sereno",
"Elysian Valley",
"Glassell Park",
"Hermon",
"Highland Park",
"Lincoln Heights",
"Montecito Heights",
"Monterey Hills",
"Mt. Washington",
"Sycamore Grove",
"University Hills"
]

var San_Fernando_Valley = [
    "Arleta",
"Canoga Park",
"Chatsworth",
"Encino",
"Granada Hills",
"Hansen Dam Rec Area",
"Hidden Village",
"Lake Balboa",
"Mission Hills",
"North Hills",
"North Hollywood",
"Northridge",
"Pacoima",
"Panorama City",
"Porter Ranch",
"Reseda",
"Reseda Ranch",
"Sherman Oaks",
"Studio City",
"Sun Valley",
"Sylmar",
"Tarzana",
"Toluca Lake",
"Toluca Terrace",
"Toluca Woods",
"Valley Glen",
"Valley Village",
"Van Nuys",
"West Hills",
"West Toluca Lake",
"Winnetka",
"Woodland Hills"
];
    

function region(places){
    if (beach_airport.includes(places)) {
        return "beach_airport";
    } else if (CRESCENTA.includes(places)) {
        return "Crescenta";
    } else if (Harbor_Area.includes(places)) {
        return "Harbor Area";
    } else if (South_LA.includes(places)) {
        return "South LA";
    } else if (Hollywood_Area.includes(places)) {
        return "Hollywood Area";
    } else if (Westside_LA.includes(places)) {
        return "Westside LA";
    } else if (Central_City.includes(places)) {
        return "Central City";
    } else if (NORTHEAST_LA.includes(places)) {
        return "Northeast LA";
    } else if (San_Fernando_Valley.includes(places)) {
        return "San Fernando Valley"
    }

    return "Regions not found!!!!!";
}

function in_region(places, region) {
    if (region === "beach_airport") {
        return (beach_airport.includes(places));
    } else if (region === "Crescenta") {
        return (CRESCENTA.includes(places));
    } else if (region === "Harbor Area") {
        return (Harbor_Area.includes(places));
    } else if (region === "South LA") {
        return (South_LA.includes(places));
    } else if (region === "Hollywood Area") {
        return (Hollywood_Area.includes(places));
    } else if (region === "Westside LA") {
        return (Westside_LA.includes(places));
    } else if (region === "Central City") {
        return (Central_City.includes(places));
    } else if (region === "Northeast LA") {
        return (NORTHEAST_LA.includes(places));
    } else if (region === "San Fernando Valley") {
        return (San_Fernando_Valley.includes(places));
    }   
    return "Places not founded!"
}

