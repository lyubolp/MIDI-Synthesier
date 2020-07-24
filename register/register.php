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
    $login_status = 0; //0 - error, 1 - user exists, 2 - password don't match, 3 - all okay
    if ($users->num_rows > 0) {
        // output data of each row
        while($row = $users->fetch_assoc()) {
            if($row["username"] == $data["username"])
            {
                $login_status = 1;
            }
        }
    }

    if ($login_status != 1)
    {
        if($data["password"] == $data["password_repeat"])
        {
//            $insert_user = "INSERT INTO users (username, password, email)
//                            VALUES (". $data["username"]. ", " . md5($data["password"]) . ", " . $data["email"] . ")";
            $username = mysqli_real_escape_string($conn, $data['username']);
            $password = md5(mysqli_real_escape_string($conn, $data['password']));
            $email = mysqli_real_escape_string($conn, $data['email']);

            $insert_user = "INSERT INTO users (username, password, email)
                            VALUES ('$username', '$password', '$email')";

            if($conn->query($insert_user) === TRUE)
            {
                $login_status = 3;
            }
            else
            {
                echo $conn->error;
            }
        }
        else
        {
            $login_status = 2;
        }
    }
    $conn->close();

    if($login_status == 3)
    {
        http_response_code(200);
        echo "Okay";
    }
    elseif($login_status == 2)
    {
        http_response_code(401);
        echo "Паролите не съвпадат";
    }
    else if($login_status == 1)
    {
        http_response_code(401);
        echo "Такъв потребител вече съществува !";
    }
    else
    {
        http_response_code(401);
        echo "Грешка в сървъра";
    }

}



