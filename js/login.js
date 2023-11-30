import { fetchUser } from "./database/eventsModule.js";

document.querySelector('#login-btn').addEventListener('click', async () => {
    const name = document.getElementById('name').value.trim(),
    password = document.getElementById('password').value.trim();

    const nameError = document.querySelector('#name-error'),
    passError = document.querySelector('#pass-error');

    let fetchedUser;

    if (name !== '' && name !== undefined) {
        fetchedUser = await fetchUser(name);
    }
    
    console.log('name:',name, 'password: ', password, fetchedUser)
    
    if (fetchedUser && fetchedUser.length > 0) {
        if (fetchedUser[0].userName === name && localStorage.getItem('password') === password) {
            window.location.href = '/painel.html'
        } else if (localStorage.getItem('password') !== password) {
            password.textContent = 'Senha Incorreta'
        }
    } else {
        console.log('got here')
        nameError.textContent = 'Usuario não encontrado';
    }
})  