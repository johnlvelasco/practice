// Objects that represent a map, grenade, and team.
function Map(name, icon) {    
    this.name = name;
    this.icon = icon;
}
function Grenade(name, icon) {    
    this.name = name;
    this.icon = icon;
}
function Team(name, icon) {
    this.name = name;
    this.icon = icon;
}
function Execute(name, map, grenade, team) { 
    this.name = name;
    this.map = map;
    this.grenade = grenade;
    this.team = team;
}
const maps = [
    new Map("Mirage", null), 
    new Map("Inferno", null), 
    new Map("Nuke", null), 
    new Map("Overpass", null), 
    new Map("Vertigo", null), 
    new Map("Anubis", null), 
    new Map("Ancient", null),
    //new Map("Train", null), 
    //new Map("Dust II", null)
]; 
const grenades = [
    new Grenade("Fire", null), 
    new Grenade("Smoke", null), 
    new Grenade("Flash", null), 
    new Grenade("High Explosive", null) 
];
const teams = [ 
    new Team("Terrorists", null), 
    new Team("Counter Terrorists", null)
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

function AddExecute(execute) { 
    //switch to Add/Edit View 
    
}

/* Need to do
    1. make AddExecute function with an Execute parameter
    2. Add Execute button switches to new View
    3. Add Home button that switches to home view. 

*/


