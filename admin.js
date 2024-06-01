/* AJAX can be used to do many things in this proj
    1) Read database to create html that we used python and copy-paste for 
    2) Update webpage without taking it down
    3) Add/Edit Executes in realtime
*/

function selectAll() { 
    xhttp = new XMLHttpRequest(); 
    xhttp.onload = function() { 
        const foo = JSON.parse(this.response); 
        console.log(foo); 
    }
    xhttp.open("GET", "http://localhost:3000/getexecutes.php"); 
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
    //onPositionChange(pos)
}   

const execute = {
    description: '',
    grenade: '', 
    throw: '', 
    map: '',
    team: '', 
    position: '', 
    media: []
}

function onEdit(des, gre, thr, map, team, pos) {
    execute.description = des;
    execute.grenade = gre;
    execute.throw = thr;
    execute.map = map;
    execute.team = team;
    execute.position = pos;
    console.log(execute);
    switchView('edit');
    loadExecute();
}

let media = []; 
function onFileUpload(id) { 
    var fileInput = document.getElementById(id);
    var filePath = fileInput.value; 
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; 
    if (!allowedExtensions.exec(filePath)) {
        alert('Invalid file type');
        fileInput.value = '';
        return false;
    } 
    // Image preview
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('preview-media').innerHTML += `<img src="${e.target.result}"/>`;
            media.push(e.target.result);
            document.getElementById('error-message').innerHTML = '';
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
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
            document.getElementById('preview-media').innerHTML += `<video src="${e.target.result}" controls="controls"/>`;
            media.push(e.target.result);
            document.getElementById('error-message').innerHTML = '';
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

function onMapChange(src) { 
    execute.map = src.value;    
    path = `./icons/${execute.map}.png`;
    document.getElementById("preview-map").src = path; 
}
function onGrenadeChange(src) { 
    execute.grenade = src.value; 
    path = `./icons/${execute.grenade}.png`;
    document.getElementById("preview-grenade").src = path; 
}
function onTeamChange(src) { 
    execute.team = src.value; 
    path = `./icons/${execute.team}.png`;
    document.getElementById("preview-team").src = path; 
}
function onThrowChange(src) { 
    execute.throw = src.value; 
    parsed = `${execute.throw.toLowerCase().replaceAll(/\s/g,'')}`
    parsed = `${parsed.replaceAll('+','')}`
    path = `./icons/${parsed}_throw.png`;
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