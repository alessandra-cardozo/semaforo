const img = document.getElementById('img');
const buttons = document.getElementById('buttons');
const driverInfo = document.getElementById("driverInfo");
const pedestrianInfo = document.getElementById("pedestrianInfo");
const body = document.body;

let colorIndex = 0;
let intervalId = null;

const colors = {
    'red': { 
        src: './img/vermelho.png', background: '#d32f2f', 
        driverText: "🛑 **Vermelho:** PARE! O trânsito deve parar completamente.", 
        pedestrianText: "🚶 **Vermelho:** NÃO ATRAVESSE! Espere o sinal verde para pedestres."
    },
    'yellow': { 
        src: './img/amarelo.png', background: '#fbc02d', 
        driverText: "⚠️ **Amarelo:** ATENÇÃO! Prepare-se para parar.", 
        pedestrianText: "🚶 **Amarelo:** Continue atravessando apenas se já estiver na faixa."
    },
    'green': { 
        src: './img/verde.png', background: '#388e3c', 
        driverText: "✅ **Verde:** SIGA! O trânsito pode continuar.", 
        pedestrianText: "🚶 **Verde:** ATRAVESSE! É seguro caminhar na faixa."
    },
    'off': { 
        src: './img/desligado.png', background: '#2c3e50', 
        driverText: "🚦 Semáforo desligado. Aguarde um comando!", 
        pedestrianText: "🚦 Semáforo desligado. Observe antes de atravessar!"
    }
};

const changeLight = (color) => {
    img.src = colors[color].src;
    body.style.backgroundColor = colors[color].background;
    driverInfo.innerHTML = colors[color].driverText;
    pedestrianInfo.innerHTML = colors[color].pedestrianText;
};

const startTrafficLight = () => {
    stopAutomatic(); // ✅ Para o automático antes de desligar
    changeLight('off');
};

const nextIndex = () => colorIndex = colorIndex < 2 ? ++colorIndex : 0;

const changeAutomatic = () => {
    const colorKeys = ['red', 'yellow', 'green'];
    changeLight(colorKeys[colorIndex]);
    nextIndex();
};

const stopAutomatic = () => {
    clearInterval(intervalId);
};

const actions = {
    'start': () => startTrafficLight(), // 🔹 Agora o "start" interrompe o automático
    'red': () => { stopAutomatic(); changeLight('red'); },
    'yellow': () => { stopAutomatic(); changeLight('yellow'); },
    'green': () => { stopAutomatic(); changeLight('green'); },
    'automatic': () => {
        stopAutomatic();
        intervalId = setInterval(changeAutomatic, 1000);
    }
};

buttons.addEventListener('click', (event) => {
    const action = event.target.id;
    if (actions[action]) actions[action]();
});
