<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Начало</title>
    <link rel="stylesheet" href="index.css"/>
    <link rel="stylesheet" href="styles/buttons.css"/>
    <script>
        const colors = ['D1253C', 'FAAB17', '287D61', 'F43815', '199C72', 'f51720', 'f8d210', 'A7C30E'];
        let login_box = document.getElementById('main');

        const chosen_color = colors[Math.floor(Math.random() * colors.length)];

        if(chosen_color === 'f8d210' || chosen_color === 'A7C30E' || chosen_color === 'FAAB17')
        {
            login_box.style.color = 'black';
        }
        login_box.style.backgroundColor = '#' + chosen_color;

        function login()
        {
            window.location.href = './login/index.html';
        }
        function register()
        {
            window.location.href = './register';
        }
        function guest()
        {
            window.location.href = './app/main.php';
        }
    </script>
</head>
<body>
    <div id="main">
        Изберете опция: <br/>
        <button id="login" onclick="login()">Влизане</button>
        <button id="register" onclick="register()">Регистрация</button>
        <button id="guest" onclick="guest()">Вход като гост</button>
    </div>
</body>
</html>