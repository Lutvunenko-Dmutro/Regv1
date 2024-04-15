document.addEventListener('DOMContentLoaded', function() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = 'index.html';
    } else {
        document.getElementById('currentUser').textContent = currentUser.username;
        loadNotes();
        updateNoteCapacity();
    }
});

document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

document.getElementById('addNoteBtn').addEventListener('click', function() {
    const noteInput = document.getElementById('noteInput').value;
    if (noteInput.trim() !== '') {
        if (checkNoteCapacity()) {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            notes.push({ text: noteInput, owner: getCurrentUser().username });
            localStorage.setItem('notes', JSON.stringify(notes));
            loadNotes();
        } else {
            alert('Достигнут лимит заметок');
        }
    }
});

function loadNotes() {
    const currentUser = getCurrentUser().username;
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        if (note.owner === currentUser) {
            const li = document.createElement('li');
            li.textContent = note.text;
            notesList.appendChild(li);
        }
    });
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

function checkNoteCapacity() {
    const currentUser = getCurrentUser().username;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUserData = users.find(user => user.username === currentUser);
    return currentUserData.noteLimit === undefined || currentUserData.noteLimit > 0;
}

function updateNoteCapacity() {
    const noteInput = document.getElementById('noteInput');
    if (!checkNoteCapacity()) {
        noteInput.setAttribute('placeholder', 'Достигнут лимит заметок');
        noteInput.disabled = true;
        document.getElementById('addNoteBtn').disabled = true;
    } else {
        noteInput.removeAttribute('placeholder');
        noteInput.disabled = false;
        document.getElementById('addNoteBtn').disabled = false;
    }
}