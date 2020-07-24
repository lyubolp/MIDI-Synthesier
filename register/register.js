(function () {
    let submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', pickup_data);

    load_random_color_for_login_box();
})();
function load_random_color_for_login_box()
{
    const colors = ['D1253C', 'FAAB17', '287D61', 'F43815', '199C72', 'f51720', 'f8d210', 'A7C30E'];
    let login_box = document.getElementById('login-form');

    const chosen_color = colors[Math.floor(Math.random() * colors.length)];

    if(chosen_color === 'f8d210' || chosen_color === 'A7C30E' || chosen_color === 'FAAB17')
    {
        login_box.style.color = 'black';
    }
    login_box.style.backgroundColor = '#' + chosen_color;
}
function pickup_data(event) {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let password= document.getElementById('password').value;
    let password_repeat = document.getElementById('password_repeat').value;
    let email = document.getElementById('email').value;

    email = email.replace('@','_at_');

    let data = {
        username,
        password,
        password_repeat,
        email
    };

    sendRequest('register.php', 'POST', `data=${JSON.stringify(data)}`);
}

function sendRequest(url, method, data) {
    console.log(data);
    let request = new XMLHttpRequest();

    request.addEventListener('load', function () {
        let response = request.responseText;
        if (request.status === 200) {
            window.location.href = '../app/main.php';
        } else {
            print_erros(response);
        }
    });

    request.open(method, url, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(data);
}

function print_erros(error_text)
{
    let error_obj = document.getElementById('errors');
    error_obj.innerText = error_text;
}

