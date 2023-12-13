function toHome() { 
    document.location.href = "index.html";
}
function toAddExecute() { 
    document.location.href = "addExecute.html";
}

/* FOR API USAGE
    1) Create connection. 
    2) GET request. 
    3) POST request. 
*/
iconsId = '12pXzTbYz30moWa3LuXOThmdWMfF9Kyjz';
executesId = '1M-jex4F67uPZ4bLWiWLtVu9mLfu840ma';

function saveExecute() { 
    //for when the user is done editing the execute. 
    /* Saving an execute
        1a. Ensure a map, grenade, and team are selected.
        1b. Ensure description is not empty. 
        1c. Has at least one image or video. 
        2. Ensure the execute is not already in the database.
        3. Add each media item to Google Drive assigning their link to a variable in the execute.
        4. Write the execute to the config file.  
    */
    //error accordingly
    if (document.getElementById('selected-map').value == '') {
        document.getElementById('error-message').innerHTML = "Please select a map."; 
    }
    else if (document.getElementById('selected-grenade').value == '') {  
        document.getElementById('error-message').innerHTML = "Please select a grenade."; 
    }
    else if (document.getElementById('selected-team').value == '') { 
        document.getElementById('error-message').innerHTML = "Please select a team."; 
    }
    else if (document.getElementById('execute-description').value == '') { 
        document.getElementById('error-message').innerHTML = "Please enter a description."; 
    }


    let execute = new Execute("", null, null, null, []); 
    


   /* Loading executes from config
        json file should have Execute objects in it as follows: 
        [0] {
            desc: "CT Smoke Jump Throw"
            name: "Mirage", 
            grenade: "Smoke", 
            team: "Terrorists", 
            media: { 
                img1: "https://drive.google.com/uc?export=download&id=0B" 
                img2: "https://drive.google.com/uc?export=download&id=0B" 
                img3: "https://drive.google.com/uc?export=download&id=";  
            }
        }

   */
}