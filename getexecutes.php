<?php header('Access-Control-Allow-Origin: *');
    $server = "191.101.79.103"; 
    $username = "u395675147_admin"; 
    $password = "1!Banana!2"; 
    $db = "u395675147_cs2executes";
    $conn = mysqli_connect($server, $username, $password, $db);

    $sql = "select * from executes"; 
    $result = mysqli_query($conn, $sql);

    $data = array(); 

    if (mysqli_num_rows($result) > 0) { 
    while($row = mysqli_fetch_assoc($result)) { 
        $data[] = $row; 
    }
    } else { 
        $output["empty"] = "empty"; 
    }

    echo json_encode($data);

    mysqli_close($conn); 
?>