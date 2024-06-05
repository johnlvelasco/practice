//upload new code to file system
//ensure on F12 menu that "Disable Cache" is checked.

/* Itinerary: 
    2 Search algorithm for Index & Admin page. 
    1 Draft protocol for media storage
        - Folder: execute_{id}
        - Media: {variable}_{id} 
        - 30MB per media. 
    3 Editing an Execute actually changes it 
    4 Filters
*/


indexSection = `
    <section class="indexSection">
        <div class="search-bar filter-title">
            <label>Search</label>
            <input type="text" class="search" placeholder="CT Smoke Mirage">
            <br/>
        </div>
`; 

function row(value) { 
    execute = { 
        description: value["Description"], 
        grenade: value["Grenade"].toLowerCase(), 
        throw: value["Throw"].toLowerCase().replaceAll(/\s/g, '').replaceAll("+", ""), 
        map: value["Map"].toLowerCase(), 
        team: value["Team"].toLowerCase(), 
        grenade: value["Grenade"].toLowerCase(), 
        position: value["Position"], 
        id: value["Id"]
    }; 
    console.log(execute.throw);
    var row =  `
    <details id="execute_${execute.id}">
        <summary>
            <div class="executeRow">
                <span>
                    <img class="icons" , id="preview-grenade" src="./icons/${execute.grenade}.png">
                </span>
                <span>
                    <img class="icons" , id="preview-map" src="./icons/${execute.map}.png">
                </span>
                <h3>
                    <strong id="preview-description">${execute.description}</strong>
                    <small id="preview-position">${execute.position}</small>
                </h3>
                <span>
                    <img class="icons" , id="preview-team" src="./icons/${execute.team}.png">
                </span>
            </div>
        </summary>
        <div>
            <dl>
                <span>
                    <img class="key", src="./icons/${execute.throw}_throw.png">
                </span>
            </dl>
        </div>
    </details>`; 

    indexSection += row; 
}

function uploadHtml() { 
    indexSection += "</section>";
    document.getElementById("indexList").innerHTML += indexSection;
}

function selectAll() { 
    xhttp = new XMLHttpRequest(); 
    xhttp.onload = function() { 
        var foo = $.parseJSON(xhttp.responseText)
        $.each(foo, function(index, value) { 
            row(value)
        })
        uploadHtml();
    }
    //xhttp.open("GET", "./getexecutes.php"); 
    xhttp.open("GET", "http://localhost:3000/getexecutes.php"); 
    xhttp.send(); 
}

function getExecutes() { 
    selectAll(); 
    var arrObj = Object.getOwnPropertyNames(Array.prototype);
    for( var funcKey in arrObj ) {
        //console.log(arrObj[funcKey]);
    }
}
getExecutes(); 

function toHome() { 
    document.location.href = "index.html";
}
function toAdmin() { 
    document.location.href = "admin.html";
}