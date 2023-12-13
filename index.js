// Objects that represent a map, grenade, and team.
function Map(name, url) {    
    this.name = name;
    this.url = url;
}
function Grenade(name, url) {    
    this.name = name;
    this.url = url;
}
function Team(name, url) {
    this.name = name;
    this.url = url;
}
function Execute(desc, map, grenade, team, media) { 
    this.desc = desc;
    this.map = map;
    this.grenade = grenade;
    this.team = team;
    this.media = media; 
}
const maps = [ //https://drive.google.com/uc?export=view&id=
    new Map("Mirage", "https://drive.google.com/uc?export=view&id=1qlJNaJEZj_rj8xwiXrQGH_7Y7rayrJTI"), 
    new Map("Inferno", "https://drive.google.com/uc?export=view&id=1usryoJ7KAdMRpHdkKqAVEKRhU0YibGM2"), 
    new Map("Nuke", "https://drive.google.com/uc?export=view&id=1mKDjSV4YJ6fEKYK6tUNp6Ar0Aoap6ADm"), 
    new Map("Overpass", "https://drive.google.com/uc?export=view&id=1CvCYBAiSLGmAlKDEGmUzGXO1_Xf_1xXv"), 
    new Map("Vertigo", "https://drive.google.com/uc?export=view&id=1ddbazvH-munOgZDkiFQN_9-bdIELst6j"), 
    new Map("Anubis", "https://drive.google.com/uc?export=view&id=1cUSEIxQrv4BMZky5ZZbjF7I4EN83Z8zl"), 
    new Map("Ancient", "https://drive.google.com/uc?export=view&id=1JfMXst3hhjNptRtk2AniDApBLKkDCvE2"),
    new Map("Train", "https://drive.google.com/uc?export=view&id=1t9BSNdX8s5Nr0Ks0x6He9FF_VZBkU4Uj"), 
    new Map("Dust II", "https://drive.google.com/uc?export=view&id=1AsUQVduzn4pve7Z_ks6mlq-CD-IGLMlE"), 
    new Map("Cache", "https://drive.google.com/uc?export=view&id=1ZtB2pF-vrpn7FrwrmCu6KjCqxlNLiGgr")
]; 
const grenades = [
    new Grenade("Molotov", "https://drive.google.com/uc?export=view&id=1682IVXdw5F1e8lJapv1MOvyQvE0zvlK6"), 
    new Grenade("Smoke", "https://drive.google.com/uc?export=view&id=1vCEtYK1nZ-D73_5C67D_jFyauSm4N1Fw"), 
    new Grenade("Flash", "https://drive.google.com/uc?export=view&id=12Ouf7-Jq0FQn5aTq5Sk-ekr1CyZittl6"), 
    new Grenade("High Explosive", "https://drive.google.com/uc?export=view&id=1SSvFzCPqMxDc-G0EVWgi2H-qgsltS61r"), 
    new Grenade("Incendiary", "https://drive.google.com/uc?export=view&id=1ZtB2pF-vrpn7FrwrmCu6KjCqxlNLiGgr")
];
const teams = [ 
    new Team("Terrorists", "https://drive.google.com/uc?export=view&id=1F0wXoOJzG0xFfA6ZcBV-lL-fpTRMzJYD"), 
    new Team("Counter Terrorists", "https://drive.google.com/uc?export=view&id=1b5hLEJ13MWdPHBJ9jF5XlBnSTD22Uuvl")
] 

/* Load Filters */
loadFilters(maps, "map"); 
loadFilters(grenades, "grenade"); 
loadFilters(teams, "team");
function loadFilters(arr, label) {
    for (let i = 0; i < arr.length; i++) {
        html = `
            <input type="checkbox" id="cb-${arr[i].name}">
            <label for="cb-${arr[i].name}">${arr[i].name}</label>
            <br/>
        `;
        document.getElementById(`filter-${label}`).innerHTML += html;
    }
}
function toHome() { 
    document.location.href = "index.html";
}

function toAddExecute() { 
    document.location.href = "addExecute.html";
}