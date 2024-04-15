document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    if (newUsername.trim() !== '' && newPassword.trim() !== '') {
        if (!userExists(newUsername)) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push({ username: newUsername, password: newPassword, noteLimit: 5, subscriptions: [] });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Пользователь зарегистрирован');
            window.location.href = 'index.html';
        } else {
            alert('Пользователь с таким именем уже существует');
        }
    } else {
        alert('Пожалуйста, заполните все поля');
    }
});

function userExists(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.username === username);
}