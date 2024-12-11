let roomCode = '';
let playersReady = 0; // Счетчик готовности игроков
let gameActive = false;
let countdownTimer; // Таймер для обратного отсчета
let playerReadyState = false; // Состояние готовности игрока
const totalPlayers = 2; // Общее количество игроков

const startButton = document.getElementById('start-button');
const roomCodeDisplay = document.getElementById('room-code');
const statusMessage = document.getElementById('status-message');
const resetButton = document.getElementById('reset-button');
const readyButton = document.getElementById('ready-button');
const countdownDisplay = document.getElementById('countdown');
const readyStatus = document.getElementById('ready-status');

startButton.addEventListener('click', () => {
    roomCode = Math.random().toString(36).substring(2, 8).toUpperCase(); // Генерация кода комнаты
    roomCodeDisplay.textContent = `Код комнаты: ${roomCode}`;
    roomCodeDisplay.style.display = 'block';
    gameActive = true;

    // Сохраняем код комнаты в localStorage
    localStorage.setItem('roomCode', roomCode);

    statusMessage.textContent = 'Скопируйте код комнаты и подключитесь с другого устройства!';
    readyButton.style.display = 'inline'; // Показываем кнопку готов
});

readyButton.addEventListener('click', () => {
    playerReadyState = !playerReadyState; // Переключаем состояние готовности
    if (playerReadyState) {
        playersReady++;
        readyButton.textContent = 'Не готов'; // Меняем текст кнопки
    } else {
        playersReady--;
        readyButton.textContent = 'Готов'; // Меняем текст кнопки обратно
    }
    updateReadyStatus(); // Обновляем статус готовности

    // Если оба игрока готовы, начинаем обратный отсчет
    if (playersReady === totalPlayers) {
        startCountdown(); 
    }
});

function updateReadyStatus() {
    readyStatus.style.display = 'block';
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

resetButton.addEventListener('click', () => {
    roomCode = '';
    playersReady = 0;
    gameActive = false;
    roomCodeDisplay.style.display = 'none'; // Скрываем код комнаты
    statusMessage.textContent = ''; // Очищаем сообщение
    countdownDisplay.style.display = 'none'; // Скрываем обратный отсчет
    readyButton.textContent = 'Готов'; // Сбрасываем текст кнопки
    playerReadyState = false; // Сбрасываем состояние готовности
    readyStatus.style.display = 'none'; // Скрываем статус готовности
    console.log('Игра сброшена.'); // Отладочное сообщение
});
