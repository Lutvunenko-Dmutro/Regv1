document.addEventListener('DOMContentLoaded', function() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = 'index.html';
    } else {
        document.getElementById('subscribeBtn').addEventListener('click', function() {
            const targetUsername = document.getElementById('targetUsername').value;
            if (targetUsername.trim() !== '') {
                subscribe(currentUser.username, targetUsername);
            } else {
                alert('Введите имя пользователя для подписки');
            }
        });
        loadSubscriptions();
    }
});

function subscribe(currentUser, targetUsername) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const targetUser = users.find(user => user.username === targetUsername);
    if (targetUser) {
        let subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
        if (!subscriptions.find(sub => sub.user === currentUser && sub.targetUser === targetUsername)) {
            subscriptions.push({ user: currentUser, targetUser: targetUsername });
            localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
            loadSubscriptions();
        } else {
            alert('Вы уже подписаны на этого пользователя');
        }
    } else {
        alert('Пользователь с таким именем не найден');
    }
}

function loadSubscriptions() {
    const currentUser = getCurrentUser().username;
    const subscriptionsList = document.getElementById('subscriptionsList');
    subscriptionsList.innerHTML = '';
    const subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
    subscriptions.forEach(subscription => {
        if (subscription.user === currentUser) {
            const li = document.createElement('li');
            li.textContent = `Вы подписаны на пользователя ${subscription.targetUser}`;
            subscriptionsList.appendChild(li);
        }
    });
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}