(function () {
    let submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', pickup_data);
})();

function pickup_data(event) {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let password= document.getElementById('password').value;

    let data = {
        username,
        password
    };

    sendRequest('login.php', 'POST', `data=${JSON.stringify(data)}`);
}

function sendRequest(url, method, data) {
    console.log(data);
    let request = new XMLHttpRequest();

    request.addEventListener('load', function () {
        let response = request.responseText;
        if (request.status === 200) {
            window.location.href = '../main.php';
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

