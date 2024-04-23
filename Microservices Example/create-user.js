fetch('http://localhost:3002/register', {  // Оновлено URL
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: 'testUser',
        password: 'testPassword',
    }),
})
.then(response => response.json())
.then(data => {
    console.log('User created:', data);
})
.catch((error) => {
    console.error('Error:', error);
});
