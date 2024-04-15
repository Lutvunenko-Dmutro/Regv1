const users = [
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' }
];

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('notesContainer').style.display = 'block';
    } else {
        alert('Неверное имя пользователя или пароль');
    }
});

document.getElementById('addNoteBtn').addEventListener('click', function() {
    const noteInput = document.getElementById('noteInput').value;
    if (noteInput.trim() !== '') {
        const notesList = document.getElementById('notesList');
        const li = document.createElement('li');
        li.textContent = noteInput;
        notesList.appendChild(li);
        document.getElementById('noteInput').value = '';
    }
});

document.getElementById('logoutBtn').addEventListener('click', function() {
    document.getElementById('loginForm').reset();
    document.getElementById('notesContainer').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});