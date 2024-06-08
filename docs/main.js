document.addEventListener('DOMContentLoaded', () => {
    const discordLoginButton = document.getElementById('discord-login');
    const userInfo = document.getElementById('user-info');
    const usernameDisplay = document.getElementById('username');
    const inventoryForm = document.getElementById('inventory-form');
    const inventoryList = document.getElementById('inventory-list');
    let userId = null;


    document.addEventListener('DOMContentLoaded', () => {
        // Hier wird der Discord-Bot-Prozess im Hintergrund gestartet
        const { spawn } = require('child_process');
        const botProcess = spawn('node', ['./DiscordBot/src/index.js'], { detached: true, stdio: 'ignore' });
    
        botProcess.unref(); // Trennen Sie den Bot-Prozess vom aktuellen Prozess der Website
    
        // Der Rest des vorhandenen Codes für den Discord-Login usw. bleibt unverändert
    });

    
    discordLoginButton.addEventListener('click', () => {
        const clientId = '1166634648823136286';
        const redirectUri = encodeURIComponent(window.location.href);
        const scope = 'identify';
        const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;

        window.location.href = discordAuthUrl;
    });

    function getAccessToken() {
        const hash = window.location.hash;
        if (hash) {
            const params = new URLSearchParams(hash.substring(1));
            return params.get('access_token');
        }
        return null;
    }

    function fetchUserInfo(token) {
        return fetch('https://discord.com/api/users/@me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json());
    }

    const token = getAccessToken();
    if (token) {
        fetchUserInfo(token).then(user => {
            userId = user.id;
            usernameDisplay.textContent = `Willkommen, ${user.username}`;
            userInfo.style.display = 'block';
            inventoryForm.style.display = 'block';
            discordLoginButton.style.display = 'none';
        });
    }

    inventoryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const item = document.getElementById('item').value.trim();
        const amount = parseInt(document.getElementById('amount').value.trim(), 10);

        if (item && amount && userId) {
            addItemToList(item, amount);
            sendDataToBot(userId, item, amount);
            document.getElementById('item').value = '';
            document.getElementById('amount').value = '';
        }
    });

    function addItemToList(item, amount) {
        const listItem = document.createElement('li');
        listItem.textContent = `${item} - ${amount}`;
        inventoryList.appendChild(listItem);
    }

    function sendDataToBot(userId, item, amount) {
        const data = { userId, item, amount };

        fetch('YOUR_BOT_ENDPOINT_URL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => console.log('Erfolgreich:', data))
        .catch(error => console.error('Fehler:', error));
    }
});
