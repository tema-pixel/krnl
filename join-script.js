let playersReady = 0; // Счетчик готовности игроков
let gameActive = false;
let countdownTimer; // Таймер для обратного отсчета
let playerReadyState = false; // Состояние готовности игрока
const totalPlayers = 2; // Общее количество игроков

const joinButton = document.getElementById('join-button');
const joinCodeInput = document.getElementById('join-code');
const statusMessage = document.getElementById('status-message');
const joinReadyButton = document.getElementById('join-ready-button');
const countdownDisplay = document.getElementById('countdown');
const readyStatus = document.getElementById('ready-status');

// Получаем код комнаты из localStorage
const getRoomCode = () => {
    return localStorage.getItem('roomCode'); // Получаем код комнаты из localStorage
};

joinButton.addEventListener('click', () => {
    const inputCode = joinCodeInput.value.trim();
    const roomCode = getRoomCode(); // Получаем код комнаты

    if (inputCode) {
        if (inputCode === roomCode) {
            statusMessage.textContent = 'Вы подключены к комнате!';
            joinReadyButton.style.display = 'inline'; // Показываем кнопку готов
            readyStatus.style.display = 'block';
            readyStatus.textContent = `1/${totalPlayers} игрок готов`; // Обновляем статус готовности
            console.log('Игрок подключился к комнате:', inputCode); // Отладочное сообщение
            // Закрываем комнату для новых подключений
            localStorage.setItem('roomClosed', 'true');
        } else {
            statusMessage.textContent = 'Неверный код комнаты!';
            console.log('Неверный код:', inputCode); // Отладочное сообщение
        }
    } else {
        statusMessage.textContent = 'Введите код комнаты!';
    }
});

joinReadyButton.addEventListener('click', () => {
    playerReadyState = !playerReadyState; // Переключаем состояние готовности
    if (playerReadyState) {
        playersReady++;
        joinReadyButton.textContent = 'Не готов'; // Меняем текст кнопки
    } else {
        playersReady--;
        joinReadyButton.textContent = 'Готов'; // Меняем текст кнопки обратно
    }
    updateReadyStatus(); // Обновляем статус готовности

    // Если оба игрока готовы, начинаем обратный отсчет
    if (playersReady === totalPlayers) {
        startCountdown(); 
    }
});

function updateReadyStatus() {
    readyStatus.textContent = `${playersReady}/${totalPlayers} игроков готовы`; // Обновляем текст статуса готовности
}

function startCountdown() {
    countdownDisplay.style.display = 'block';
    let countdown = 3; // Время обратного отсчета в секундах
    countdownDisplay.textContent = `Игра начнется через ${countdown}...`;

    countdownTimer = setInterval(() => {
        countdown--;
        if (countdown <= 0) {
            clearInterval(countdownTimer);
            statusMessage.textContent = 'Игра началась!';
            countdownDisplay.style.display = 'none';
            gameActive = true; // Игра начинается
            console.log('Игра началась!'); // Отладочное сообщение
        } else {
            countdownDisplay.textContent = `Игра начнется через ${countdown}...`;
        }
    }, 1000);
}
