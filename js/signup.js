import { addUser } from "./database/addUser.js";
import { fetchUser } from "./database/eventsModule.js";

document.querySelector('#signup-btn').addEventListener('click', async () => {
    const name = document.getElementById('name').value.trim(),
    email = document.getElementById('email').value.trim(),
    password = document.getElementById('password').value.trim(),
    passwordConfirm = document.getElementById('password-confirm').value.trim(),
    nameError = document.querySelector('#name-error'),
    passError = document.querySelector('#pass-error'),
    emailError = document.querySelector('#email-error'),
    confirmError = document.querySelector('#confirm-error');
    let fetchedUser,
    passwordConfirmed = false;
    
    if (name !== '' && name !== undefined && name !== null) {
        fetchedUser = await fetchUser(name);
    }

    console.log(fetchedUser)

    if (fetchedUser && fetchedUser.length > 0) {
        console.log('user already exists');
        return;
    }
    
    if (name === '') {
        nameError.textContent = 'Preencha seu nome de usuário'
    } else {
        nameError.textContent = ''
    }
    if (email === '') {
        emailError.textContent = 'Preencha o e-mail'
    } else {
        emailError.textContent = ''
    }
    if (password !== passwordConfirm) {
        confirmError.textContent = 'Senhas não conferem'
    } else {
        confirmError.textContent = ''
    }
    if (password === ''){
        passError.textContent = 'Preencha a senha'          
    } else {
        passError.textContent = ''
    }
    if (passwordConfirm === ''){
        confirmError.textContent = 'Confirme sua senha'
    } else {
        confirmError.textContent = ''
    }
    if (password === passwordConfirm && password !== '') {
        passwordConfirmed = true;
        console.log('password confirmed');
    }

    if (name !== '' && email !== '' && passwordConfirmed) {

        const userData = {
            userName: name,
            userEmail: email
        };
        
        localStorage.setItem('password', password);

        addUser(userData);

        window.location.href = '/painel.html'
    }

    
})