<?php
include_once('../connect.php');
header("Content-type: application/json");

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(401);
    exit("Connection failed: " . $conn->connect_error);
}
else
{
    $select_users = "SELECT username, password FROM users";
    $users = $conn->query($select_users);

    $data = json_decode($_POST["data"], true);
    $login_status = 0; //0 - no such user found, 1 - wrong password, 2 - login successful
    if ($users->num_rows > 0) {
        // output data of each row
        while($row = $users->fetch_assoc()) {
            if($row["username"] == $data["username"])
            {
                $login_status = 1;
                $hashed_pass = md5($data["password"]);

                if($hashed_pass == $row["password"]) {
                    $login_status = 2;
                }
            }
        }
    }
    $conn->close();

    if($login_status == 2)
    {
        http_response_code(200);
        echo "Okay";
    }
    elseif($login_status == 1)
    {
        http_response_code(401);
        echo "Грешна парола !";
    }
    else
    {
        http_response_code(401);
        echo "Такъв потребител не съществува !";
    }

}



