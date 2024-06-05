
/* Itinerary: 
    2 Search algorithm for Index & Admin page. 
    1 Draft protocol for media storage
        - Folder: execute_{id}
        - Media: {variable}_{id} 
        - 30MB per media. 
    3 Editing an Execute actually changes it 
    4 Filters
*/
function getPath(funcName) { 
    //return `./index.php?func=${funcName}`;
    return `http://localhost:3000/index.php?func=${funcName}`;
}

function getFolder(id) { 
    return `media\\execute_${id}`;
}
function getMedia(variable, id) { 
    return `${getFolder(id)}/${variable}_${id}`;
}

var adminTable = `
    <div class="search-bar filter-title">
        <label>Search</label>
        <input type="text" class="search" placeholder="CT Smoke Mirage">
        <br/>
    </div>
    <table>
        <tr>
            <th>Description</th>
            <th>Grenade</th>
            <th>Throw</th>
            <th>Map</th>
            <th>Team</th>
            <th>Position</th>
            <th>Edit</th>
        </tr>
`; 

function row(value) { 
    var execute = { 
        description: value["Description"], 
        grenade: value["Grenade"], 
        throw: value["Throw"], 
        map: value["Map"], 
        team: value["Team"], 
        grenade: value["Grenade"], 
        position: value["Position"], 
        id: value["Id"]
    }; 
    var row =  `
    <tr id="execute_${execute.id}">
        <td>${execute.description}</td>
        <td>${execute.grenade}</td>
        <td>${execute.throw}</td>
        <td>${execute.map}</td>
        <td>${execute.team}</td>
        <td>${execute.position}</td>
        <td>
            <button class="search" onclick="onEdit('${execute.description}', '${execute.grenade}', '${execute.throw}', '${execute.map}', '${execute.team}', '${execute.position}', ${execute.id})">Edit</button>
        </td>
    </tr>`; 

    adminTable += row; 
}

function uploadHtml() { 
    adminTable += "</table>";
    document.getElementById("adminList").innerHTML += adminTable;
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
    path = getPath("getexecutes"); 
    xhttp.open("GET", getPath("getexecutes")); 
    xhttp.send(); 
}
selectAll(); 

function switchView(str) { 
    if (str == 'edit') { 
        document.getElementById('adminList').style.display = 'none'; 
        document.getElementById('adminEdit').style.display = 'inline';
        document.getElementById('adminAddExecute').style.display = 'none';
    } 
    else {
        document.getElementById('adminEdit').style.display = 'none'; 
        document.getElementById('adminList').style.display = 'flex';
        document.getElementById('adminAddExecute').style.display = 'inline';
    }
}

function loadExecute() { 
    //description
    desc = document.getElementById('desc-input');
    desc.setAttribute('value', execute.description); 
    document.getElementById("preview-description").innerHTML = execute.description;
    //grenade 
    document.getElementById(`rb-${execute.grenade.toLowerCase()}`).click();
    //throw
    document.getElementById(`rb-${execute.throw.toLowerCase().replaceAll(/\s/g,'')}`).click();
    //map
    document.getElementById(`rb-${execute.map.toLowerCase()}`).click();
    //throw
    document.getElementById(`rb-${execute.team.toLowerCase()}`).click();
    //position
    pos = document.getElementById('position-input')
    pos.setAttribute('value', execute.position);
    document.getElementById("preview-position").innerHTML = execute.position;
}   

var execute = {
    description: '',
    grenade: '', 
    throw: '', 
    map: '',
    team: '', 
    position: '', 
    id: -1
}

function onEdit(des, gre, thr, map, team, pos, id) {
    execute.description = des;
    execute.grenade = gre;
    execute.throw = thr;
    execute.map = map;
    execute.team = team;
    execute.position = pos;
    execute.id = id; 

    //console.log(execute);
    switchView('edit');
    loadExecute();
}

let media = []; 
function onFileUpload(mediaName) { 
    var fileInput = document.getElementById(mediaName);
    var filePath = fileInput.value; 
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i; 
    if (!allowedExtensions.exec(filePath)) {
        alert('Invalid file type');
        fileInput.value = '';
        return false;
    } 
    //fileInput.preventDefault(); 
    var file = fileInput.files[0]; 
    var formData = new FormData(); 
    formData.append('file', file, `${mediaName}_${execute.id}`); 
    formData.append('folder', getFolder(execute.id)); 
    formData.append('fileName', `${mediaName}_${execute.id}`); 

    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', getPath('upload'), true); 
    xhttp.onload = function() {
        console.log(xhttp.response); 
        if (xhttp.status == 200) { 
            console.log("Upload connected & response: " + xhttp.response);
        }
        else { 
            console.log(`upload failed ${xhttp.response}`); 
        }
    }
    xhttp.send(formData);
    

        //var finalPath = `./media/execute_${execute.id}/${mediaName}_${execute.id}`;
        // document.getElementById('mediaPreview').innerHTML += `<img src="${filePath}" controls="controls"/>`; 
    
}

function onVideoUpload() { 
    var fileInput = document.getElementById('video');
    var filePath = fileInput.value; 
    var allowedExtensions = /(\.mp4|\.gif)$/i; 
    if (!allowedExtensions.exec(filePath)) {
        alert('Invalid file type');
        fileInput.value = '';
        return false;
    } 
    // Image preview
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            //document.getElementById('preview-media').innerHTML += `<video src="${e.target.result}" controls="controls"/>`;
            document.getElementById('error-message').innerHTML = '';
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

function onMapChange(src) { 
    execute.map = src.value.toLowerCase();    
    path = `./icons/${execute.map}.png`;
    document.getElementById("preview-map").src = path; 
}
function onGrenadeChange(src) { 
    execute.grenade = src.value.toLowerCase(); 
    path = `./icons/${execute.grenade}.png`;
    document.getElementById("preview-grenade").src = path; 
}
function onTeamChange(src) { 
    execute.team = src.value.toLowerCase(); 
    path = `./icons/${execute.team}.png`;
    document.getElementById("preview-team").src = path; 
}
function onThrowChange(src) { 
    execute.throw = src.value.toLowerCase().replaceAll(/\s/g,'').replaceAll('+','');
    path = `./icons/${execute.throw}_throw.png`;
    document.getElementById('preview-throw').src = path; 
}
function onDescriptionChange(src) { 
    execute.description = src.value;
    document.getElementById("preview-description").innerHTML = execute.description;
}

function onPositionChange(src) { 
    execute.position = src.value;
    document.getElementById("preview-position").innerHTML = execute.position;
}

function inputCheck() { 
    //1a
    if (document.querySelector('input[name="map"]:checked') == null) { 
        document.getElementById('error-message').innerHTML = "Please select a map";
        return false;
    }
    if (document.querySelector('input[name="team"]:checked') == null) { 
        document.getElementById('error-message').innerHTML = "Please select a team";
        return false;
    }
    if (document.querySelector('input[name="grenade"]:checked') == null) { 
        document.getElementById('error-message').innerHTML = "Please select a grenade";
        return false;
    }
    if (document.querySelector('input[name="throw"]:checked') == null) { 
        document.getElementById('error-message').innerHTML = "Please select a throw";
        return false;
    }
    //1b
    if (document.getElementById('desc-input').value == '') { 
        document.getElementById('error-message').innerHTML = "Please enter a description";
        return false;
    }
    //1c
    if (document.getElementById('position').value == '' && document.getElementById('lineup').value == '' && document.getElementById('landing').value == '' && document.getElementById('video').value == '') { 
        document.getElementById('error-message').innerHTML = "Please select an image or video";
        return false;
    }
    return true; 
}