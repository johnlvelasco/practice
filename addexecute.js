//image paths
const images = { 
    "mirage": "./icons/mirage.png", 
    "inferno": "./icons/inferno.png",     
    "nuke": "./icons/nuke.png", 
    "overpass": "./icons/overpass.png", 
    "vertigo": "./icons/vertigo.png", 
    "anubis": "./icons/anubis.png", 
    "ancient": "./icons/ancient.png",
    "train": "./icons/train.png",
    "dust2": "./icons/dust2.png", 
    "cache": "./icons/cache.png",
    "molotov": "./icons/molotov.png", 
    "smoke": "./icons/smoke.png", 
    "flashbang": "./icons/flash.png", 
    "high explosive": "./icons/he.png", 
    "incendiary": "./icons/incendiary.png",
    "terrorists": "./icons/terrorist.png", 
    "counter terrorists": "./icons/counter-terrorist.png"
};


const executeCfg = {
    map: '',
    team: '',  
    grenade: '', 
    throw: '', 
    description: '', 
    media: []
}

// switch page to home
function toHome() { 
    document.location.href = "index.html";
}
//switch page to Add
function toAddExecute() { 
    document.location.href = "addExecute.html";
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

iconsId = '12pXzTbYz30moWa3LuXOThmdWMfF9Kyjz';
executesId = '1M-jex4F67uPZ4bLWiWLtVu9mLfu840ma';

function onMapChange(src) { 
    url = images[src.value]; 
    document.getElementById("preview-map").src = url; 
    executeCfg.map = src.value; 
    document.getElementById('error-message').innerHTML = ''; 
}
function onGrenadeChange(src) { 
    url = images[src.value]; 
    document.getElementById("preview-grenade").src = url; 
    executeCfg.grenade = src.value; 
    document.getElementById('error-message').innerHTML = ''; 
}
function onTeamChange(src) { 
    url = images[src.value]; 
    document.getElementById("preview-team").src = url; 
    executeCfg.team = src.value; 
    document.getElementById('error-message').innerHTML = ''; 
}
function onThrowChange(src) { 
    document.getElementById('preview-throw').innerText = src.value; 
    executeCfg.throw = src.value; 
    document.getElementById('error-message').innerHTML = ''; 
}
function onDescriptionChange() { 
    description = document.getElementById('desc-input').value
    document.getElementById("preview-description").innerHTML = description;
    executeCfg.description = description;
    document.getElementById('error-message').innerHTML = ''; 
}
//for when the user is done editing the execute. 
/* Saving an execute
    1a. Ensure a map, grenade, team, and throw are selected.
    1b. Ensure description is not empty. 
    1c. Has at least one image or video. 
    2. Ensure the execute is not already in the database.
    3. Add each media item to Google Drive assigning their link to a variable in the execute.
    4. Write the execute to the config file.  
*/
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


function getFileContents(fn) { 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(`responseText: ${this.responseText}`); 
        }
    };
    xhttp.open('GET', fn, true); 
    xhttp.send();
}
function postMedia() { 
    var xhttp = new XMLHttpRequest();
    var post = JSON.stringify(executeCfg); 
    const url = "https://www.csexecutes.com/executes"; 
    xhttp.open('POST', url, true); 
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(executeCfg)); 
}

/*
    Make a seperate project using Node.js to create and facilitate API Endpoint actions
    Need only GET and POST abilities for Execute objects. 
    This project can make the requests
    That project will create and allow the API to be used. 
*/


function saveExecute() { 
    executeCfg.media = media;
    getFileContents('executes.json'); 

    if (!inputCheck()) { 
        return; 
    }
    console.log("Saving..."); 
    `<div class="row"> 
        <div class="iconBanner"> 
            <img class="icons" id="mapImage">
            <img class="icons" id="teamImage">
            <img class="icons" id="grenadeImage">
        </div>
        <div class="rightBanner">
            <div class="desc desc-banner">
                <div id="description" class="desc"></div> 
                <div id="throw" class="desc throw"></div>
            </div>
            <div id="preview-media" class="media"></div>
        </div>
    </div>`;
}