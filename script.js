let gameData = {
    score: 0,
    currentPokemon: [],
    gameActive: false,
    winsToday: 0,
    consecutiveDays: 0,
    lastPlayDate: null
};


const pokemonDatabase = [
    { name: "Pikachu", weight: 6.0, id: 25 },
    { name: "Charizard", weight: 90.5, id: 6 },
    { name: "Blastoise", weight: 85.5, id: 9 },
    { name: "Venusaur", weight: 100.0, id: 3 },
    { name: "Alakazam", weight: 48.0, id: 65 },
    { name: "Machamp", weight: 130.0, id: 68 },
    { name: "Gengar", weight: 40.5, id: 94 },
    { name: "Onix", weight: 210.0, id: 95 },
    { name: "Hitmonlee", weight: 49.8, id: 106 },
    { name: "Chansey", weight: 34.6, id: 113 },
    { name: "Kangaskhan", weight: 80.0, id: 115 },
    { name: "Pinsir", weight: 55.0, id: 127 },
    { name: "Tauros", weight: 88.4, id: 128 },
    { name: "Gyarados", weight: 235.0, id: 130 },
    { name: "Lapras", weight: 220.0, id: 131 },
    { name: "Ditto", weight: 4.0, id: 132 },
    { name: "Eevee", weight: 6.5, id: 133 },
    { name: "Vaporeon", weight: 29.0, id: 134 },
    { name: "Jolteon", weight: 24.5, id: 135 },
    { name: "Flareon", weight: 25.0, id: 136 },
    { name: "Porygon", weight: 36.5, id: 137 },
    { name: "Snorlax", weight: 460.0, id: 143 },
    { name: "Dragonite", weight: 210.0, id: 149 },
    { name: "Mewtwo", weight: 122.0, id: 150 },
    { name: "Mew", weight: 4.0, id: 151 },
    { name: "Typhlosion", weight: 79.5, id: 157 },
    { name: "Feraligatr", weight: 88.8, id: 160 },
    { name: "Meganium", weight: 100.5, id: 154 },
    { name: "Crobat", weight: 75.0, id: 169 },
    { name: "Ampharos", weight: 61.5, id: 181 },
    { name: "Umbreon", weight: 27.0, id: 197 },
    { name: "Espeon", weight: 26.5, id: 196 },
    { name: "Forretress", weight: 125.8, id: 205 },
    { name: "Dunsparce", weight: 14.0, id: 206 },
    { name: "Heracross", weight: 54.0, id: 214 },
    { name: "Ursaring", weight: 125.8, id: 217 },
    { name: "Skarmory", weight: 50.5, id: 227 },
    { name: "Houndoom", weight: 35.0, id: 229 },
    { name: "Tyranitar", weight: 202.0, id: 248 },
    { name: "Lugia", weight: 216.0, id: 249 },
    { name: "Ho-Oh", weight: 199.0, id: 250 }
];

pokemonDatabase.push(
    { name: "Treecko", weight: 5.0, id: 252 },
    { name: "Torchic", weight: 2.5, id: 255 },
    { name: "Mudkip", weight: 7.6, id: 258 },
    { name: "Gardevoir", weight: 48.4, id: 282 },
    { name: "Slaking", weight: 130.5, id: 289 },
    { name: "Aggron", weight: 360.0, id: 306 },
    { name: "Flygon", weight: 82.0, id: 330 },
    { name: "Altaria", weight: 20.6, id: 334 },
    { name: "Salamence", weight: 102.6, id: 373 },
    { name: "Metagross", weight: 550.0, id: 376 },
    { name: "Regirock", weight: 230.0, id: 377 },
    { name: "Latios", weight: 60.0, id: 381 },
    { name: "Kyogre", weight: 352.0, id: 382 },
    { name: "Groudon", weight: 950.0, id: 383 },
    { name: "Rayquaza", weight: 206.5, id: 384 },
    { name: "Jirachi", weight: 1.1, id: 385 },
    { name: "Turtwig", weight: 10.2, id: 387 },
    { name: "Infernape", weight: 55.0, id: 392 },
    { name: "Empoleon", weight: 84.5, id: 395 },
    { name: "Luxray", weight: 42.0, id: 405 },
    { name: "Garchomp", weight: 95.0, id: 445 },
    { name: "Lucario", weight: 54.0, id: 448 },
    { name: "Togekiss", weight: 38.0, id: 468 },
    { name: "Rotom", weight: 0.3, id: 479 },
    { name: "Darkrai", weight: 50.5, id: 491 },
    { name: "Arceus", weight: 320.0, id: 493 }
);

function loadGameData() {
    const saved = JSON.parse(localStorage.getItem('pokemonWeightGame') || '{}');
    gameData = {
        score: 0,
        currentPokemon: [],
        gameActive: false,
        winsToday: saved.winsToday || 0,
        consecutiveDays: saved.consecutiveDays || 0,
        lastPlayDate: saved.lastPlayDate || null
    };

    updateDailyProgress();
    updateDisplay();
}

function saveGameData() {
    const toSave = {
        winsToday: gameData.winsToday,
        consecutiveDays: gameData.consecutiveDays,
        lastPlayDate: gameData.lastPlayDate
    };
    localStorage.setItem('pokemonWeightGame', JSON.stringify(toSave));
}

function updateDailyProgress() {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (gameData.lastPlayDate !== today) {
        if (gameData.lastPlayDate === yesterday) {

        } else if (gameData.lastPlayDate && gameData.lastPlayDate !== yesterday) {

            gameData.consecutiveDays = 0;
        }
        gameData.winsToday = 0;
    }
}

function updateDisplay() {
    document.getElementById('score').textContent = gameData.score;
    document.getElementById('wins-today').textContent = gameData.winsToday;

    const consecutiveDaysElement = document.getElementById('consecutive-days');
    if (gameData.consecutiveDays >= 3) {
        consecutiveDaysElement.textContent = gameData.consecutiveDays + ' 🔥';
    } else {
        consecutiveDaysElement.textContent = gameData.consecutiveDays;
    }

    const streakBadge = document.getElementById('streak-badge');
    const streakBadgePlus = document.getElementById('streak-badge-Plus');
    if (gameData.score >= 6) {
        streakBadgePlus.classList.add('master');
        streakBadge.classList.remove('active');
    } else if (gameData.score >= 3) {
        streakBadge.classList.add('active');
        streakBadgePlus.classList.remove('master');
    } else {
        streakBadge.classList.remove('active');
        streakBadgePlus.classList.remove('master');
    }
}

function getRandomPokemon() {
    const shuffled = [...pokemonDatabase].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2);
}

function startNewRound() {
    gameData.currentPokemon = getRandomPokemon();
    gameData.gameActive = true;


    document.getElementById('pokemon1').className = 'pokemon-card';
    document.getElementById('pokemon2').className = 'pokemon-card';


    document.getElementById('weight1').classList.remove('revealed');
    document.getElementById('weight2').classList.remove('revealed');


    document.getElementById('name1').textContent = gameData.currentPokemon[0].name;
    document.getElementById('name2').textContent = gameData.currentPokemon[1].name;
    const sprite1 = document.getElementById('sprite1');
    const sprite2 = document.getElementById('sprite2');

    sprite1.innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${gameData.currentPokemon[0].id}.gif" alt="${gameData.currentPokemon[0].name}" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${gameData.currentPokemon[0].id}.gif'; this.onerror=function(){this.parentElement.innerHTML='🎯'}">`;
    sprite2.innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${gameData.currentPokemon[1].id}.gif" alt="${gameData.currentPokemon[1].name}" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${gameData.currentPokemon[1].id}.gif'; this.onerror=function(){this.parentElement.innerHTML='🎯'}">`;
    document.getElementById('weight1').textContent = gameData.currentPokemon[0].weight + ' kg';
    document.getElementById('weight2').textContent = gameData.currentPokemon[1].weight + ' kg';
}

function selectPokemon(index) {
    if (!gameData.gameActive) return;

    gameData.gameActive = false;

    document.getElementById('weight1').classList.add('revealed');
    document.getElementById('weight2').classList.add('revealed');

    const pokemon1 = gameData.currentPokemon[0];
    const pokemon2 = gameData.currentPokemon[1];
    const selectedPokemon = gameData.currentPokemon[index];
    const otherPokemon = gameData.currentPokemon[1 - index];

    const isCorrect = selectedPokemon.weight >= otherPokemon.weight;

    if (isCorrect) {
        gameData.score++;
        document.getElementById(`pokemon${index + 1}`).classList.add('winner');
        document.getElementById(`pokemon${2 - index}`).classList.add('loser');
        updateDisplay();

        if (gameData.score >= 10) {

            setTimeout(() => {
                completeGame();
            }, 1000);
        } else {

            setTimeout(() => {
                startNewRound();
            }, 1500);
        }
    } else {
        document.getElementById(`pokemon${index + 1}`).classList.add('loser');
        document.getElementById(`pokemon${2 - index}`).classList.add('winner');


        setTimeout(() => {
            gameOver();
        }, 1000);
    }
}

function completeGame() {
    gameData.winsToday++;
    const today = new Date().toDateString();
    if (gameData.lastPlayDate !== today) {
        if (gameData.lastPlayDate === new Date(Date.now() - 86400000).toDateString()) {
            gameData.consecutiveDays++;
        } else {
            gameData.consecutiveDays = 1;
        }
        gameData.lastPlayDate = today;
    }

    saveGameData();
    updateDisplay();

    document.getElementById('game-content').style.display = 'none';
    document.getElementById('game-over').classList.add('show');

    let message = `¡Increíble! Completaste el desafío con ${gameData.score} puntos.`;
    if (gameData.consecutiveDays >= 3) {
        message += ` 🔥 ¡Tienes una racha de ${gameData.consecutiveDays} días consecutivos!`;
    }

    document.getElementById('final-message').textContent = message;
}

function gameOver() {
    document.getElementById('game-content').style.display = 'none';
    document.getElementById('game-over').classList.add('show');
    document.getElementById('final-message').textContent =
        `¡Buen intento! Lograste ${gameData.score} de 10 puntos. ¡Sigue practicando!`;
}

function restartGame() {
    gameData.score = 0;
    gameData.gameActive = false;

    document.getElementById('game-over').classList.remove('show');
    document.getElementById('game-content').style.display = 'block';

    updateDisplay();
    startNewRound();
}

function initGame() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('game-content').style.display = 'block';

    loadGameData();
    startNewRound();
}


setTimeout(initGame, 1000);