(function(){
    'use strict'
    console.log('reading JS');

    const nextPage = document.querySelector('#but');
    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const score = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');
    const characterDisplay = document.querySelector('#character');
    const playerChar = document.querySelectorAll('#characters img');

    let counter = 0;

    const gameData = {
        dice: ['1die.png', '2die.png', '3die.png',
            '4die.png', '5die.png', '6die.png'],
        players: [' pLayeR 1', ' pLayeR 2'],
        // FIX 2a: store chosen character image src for each player
        charImgs: ['', ''],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    nextPage.addEventListener('click', function(){
        document.querySelector('#rules').style.display = "none";
        document.querySelector('#pick').style.display = "block";
        const jazzSound = new Audio('audio/jazz.mp3');
        jazzSound.play();
    });

    // FIX 2b: actually save the chosen character's src, and highlight selection
    for(const eachChar of playerChar){
        eachChar.addEventListener('click', function(event){
            counter++;

            // Highlight the selected character
            event.target.style.outline = '4px solid #115C7B';
            event.target.style.borderRadius = '10px';

            if(counter === 1){
                // Save Player 1's chosen character image src
                gameData.charImgs[0] = event.target.src;
                // Show a prompt to pick for player 2
                document.querySelector('#pick header h1').textContent = 'now choose for';
                document.querySelector('#pick header h2').textContent = 'player 2';
            }

            if(counter === 2){
                // Save Player 2's chosen character image src
                gameData.charImgs[1] = event.target.src;
                // Move to the game page
                document.querySelector('#pick').style.display = "none";
                document.querySelector('#mygame').style.display = "block";
            }
        });
    }

    startGame.addEventListener('click', function(){

        gameData.score = [0, 0];
        gameData.index = Math.round(Math.random());

        // FIX 1a: replace innerHTML cleanly, then query #quit AFTER it exists in the DOM
        gameControl.innerHTML = '<h2>The Game Has Started</h2><button id="quit">wANnA QuiT?</button>';
        document.querySelector('#quit').addEventListener('click', function(){
            location.reload();
        });

        // FIX 2c: show both characters with player labels
        characterDisplay.innerHTML = `
            <div id="playerscores">
                <div style="text-align:center">
                    <img  src="${gameData.charImgs[0]}" style="width:150px; border-radius:10px;" alt="Player 1 character">
                    
                </div>
                <div style="text-align:center">
                    <img src="${gameData.charImgs[1]}" style="width:150px; border-radius:10px;" alt="Player 2 character">
                    
                </div>
            </div>`;

        setUpTurn();
    });

    function setUpTurn(){
        game.innerHTML = `<div id="who"><p>RoLl thE DiCe for the ${gameData.players[gameData.index]}</p></div>`;

        // FIX 1b: set innerHTML once, then query the button — avoids duplicate listeners
        // by replacing the whole element each time
        actionArea.innerHTML = '<button id="roll">RoLl thE DiCe</button>';
        document.querySelector('#roll').addEventListener('click', function(){
            throwDice();
        });
    }

    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;

        game.innerHTML = `<div id="who"><p>RoLl thE DiCe for the ${gameData.players[gameData.index]}</p></div>`;
        game.innerHTML += `<div id="dice">
            <img src="images/${gameData.dice[gameData.roll1-1]}" alt="die showing ${gameData.roll1}">
            <img src="images/${gameData.dice[gameData.roll2-1]}" alt="die showing ${gameData.roll2}">
        </div>`;

        gameData.rollSum = gameData.roll1 + gameData.roll2;

        if(gameData.rollSum === 2){
            // Snake eyes: zero out the CURRENT player (before switching), then switch
            gameData.score[gameData.index] = 0;
            game.innerHTML += '<p>Tuff luck!! You got <strong>Snake Eyes</strong>!!! Your score is zeroed!</p>';
            gameData.index = gameData.index ? 0 : 1;
            showCurrentScore();
            setTimeout(setUpTurn, 2000);
        }
        else if(gameData.roll1 === 1 || gameData.roll2 === 1){
            // FIX 3: switch player first, THEN announce whose turn it now is
            gameData.index = gameData.index ? 0 : 1;
            game.innerHTML += `<p>Sorry, a one was rolled! It's now <strong>${gameData.players[gameData.index]}</strong>'s turn!</p>`;
            setTimeout(setUpTurn, 2000);
        } else {
            gameData.score[gameData.index] += gameData.rollSum;

            // FIX 1c: set innerHTML once, then attach listeners to the new buttons
            actionArea.innerHTML = '<button id="rollagain">Roll again</button> <button id="pass">Pass</button>';
            document.querySelector('#rollagain').addEventListener('click', function(){
                throwDice();
            });
            document.querySelector('#pass').addEventListener('click', function(){
                gameData.index = gameData.index ? 0 : 1;
                setUpTurn();
            });

            checkWinningCondition();
        }
    }

    function checkWinningCondition(){
        if(gameData.score[gameData.index] > gameData.gameEnd){
            score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} pOiNTs!</h2>`;
            actionArea.innerHTML = "";
            document.querySelector('#quit').textContent = 'Start a New Game?';
        } else {
            showCurrentScore();
        }
    }

    function showCurrentScore(){
        score.innerHTML = `
            <div id="playerscores">
                <p><strong>${gameData.players[0]} Points: ${gameData.score[0]}</strong></p>
                <p><strong>${gameData.players[1]} Points: ${gameData.score[1]}</strong></p>
            </div>`;
    }

})();