
///// add event listeners

const login_button = document.querySelector('#login_button');
const create_user_account = document.querySelector('#new_account_button');


create_user_account.addEventListener('click', function(){window.location.href = "/register";});
login_button.addEventListener('click', authenticate_login);


function authenticate_login(e){
    e.preventDefault();
    const username = document.querySelector('#username_input').value;
    const password = document.querySelector('#password_input').value;
    let found = false;

    // code below requires server call
    // we will need to load data from server to verify correctness of
    // username and password entered by user

    if(username === 'user' && password === 'user'){
        found = true;
        window.location.href = 'HTML/user.html';
    }else if(username === 'temp' && password === 'temp'){
        found = true;
        window.location.href = 'HTML/waterlooInit.html';
    }else if(username === 'waterloo' && password === 'waterloo'){
        found = true;
        window.location.href = 'HTML/waterlooFinal.html';
    }

    if (!found){
        alert('Invalid Username or Password');
    }

}
