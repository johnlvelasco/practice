<?php 
    function getExecutes() { 
        header('Access-Control-Allow-Origin: *');
        $server = "191.101.79.103"; 
        $username = "u395675147_admin"; 
        $password = "1!Banana!2"; 
        $db = "u395675147_cs2executes";
        $conn = mysqli_connect($server, $username, $password, $db);

        $sql = "CALL selectall"; 
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
    }

    function upload() { header('Access-Control-Allow-Origin: *');
        $currentDir = getcwd(); 
        $file = $_FILES['file']; 
        $folder = $_POST["folder"];
        $fn = $_POST["fileName"];

        $destPath = $currentDir . "\\" . $folder . "\\" . $fn; 
        
        $errors = []; 

        if (!empty($_FILES['file'] ?? null)) { 
            $fileName = $fn; 
            $fileTmpName = $_FILES['file']['tmp_name']; 
            if (isset($fileName)) { 
                if (empty($errors)) { 
                    if (!file_exists($folder)) {
                        mkdir($folder, 0777, true);
                    }

                    $didUpload = move_uploaded_file($fileTmpName, $destPath); 
                    if ($didUpload) { 
                        echo "The files were uploaded sucessfully"; 
                    } else { 
                        echo "File upload failed"; 
                    }
                } else { 
                    foreach($errors as $error) { 
                        echo $error . "Error details: " . "\n";
                    }
                }
            }
        }
    }  

    if (isset($_GET['func'])) {
        $func = $_GET['func'];
        if ($func == 'getexecutes') {
            echo getExecutes();
        } elseif ($func == 'upload') {
            echo upload();
        } else {
            echo "Invalid function name.";
        }
    } else {
        echo "No function specified.";
    }
?>