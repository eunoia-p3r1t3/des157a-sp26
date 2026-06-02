(function(){
    'use strict'
    console.log('reading JS');

    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const score = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');

    const gameData = {
        dice: ['1die.png', '2die.png', '3die.png', 
            '4die.png', '5die.png', '6die.png'],
        players: [' pLayeR 1', ' pLayeR 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };
    

    startGame.addEventListener('click',function(){

        gameData.index = Math.round(Math.random());
        console.log(gameData.index);

        gameControl.innerHTML = '<h2>The Game Has Started</h2>';
        gameControl.innerHTML += '<button id="quit">wANnA QuiT?</button>'
        document.querySelector ('#quit').addEventListener('click', function (){
            location.reload();
        });
        setUpTurn();
    }); //end startgame function

    function setUpTurn(){

        game.innerHTML = `<p>RoLl thE DiCe for the ${gameData.players[gameData.index]}</p>`;
        actionArea.innerHTML ='<button id="roll">RoLl thE DiCe</button>';

        document.querySelector('#roll').addEventListener('click', function(){
            throwDice();
        });

    }

    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p>RoLl thE DiCe for the ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<div id="dice"><img  src="images/${gameData.dice[gameData.roll1-1]}"><img src="images/${gameData.dice[gameData.roll2-1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

            if( gameData.rollSum === 2){
                game.innerHTML += '<p>Tuff luck!! You got <strong>Snake Eyes</strong>!!!</p>';
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                gameData.score[gameData.index] = 0;
                showCurrentScore();
                setTimeout(setUpTurn, 2000);
            }
            else if (gameData.roll1 === 1 || gameData.roll2 === 1){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                game.innerHTML += `<p> Sorry one of your rolls was a one, <strong>${gameData.players[gameData.index]}</strong> turn!!</p>`;
                setTimeout(setUpTurn, 2000);
            }else{
                gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
                actionArea.innerHTML = '<button id=rollagain>Roll again</button> <button id=pass>Pass</button>';

                document.querySelector('#rollagain').addEventListener('click', function(){
                    throwDice();
                });
                document.querySelector('#pass').addEventListener('click', function(){
                    gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                    setUpTurn();
                });
                checkWinningCondition();
            }
    }
    function checkWinningCondition(){
        if(gameData.score[gameData.index] > gameData.gameEnd){
            score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} pOiNTs! </h2>`;

            actionArea.innerHTML = "";
            document.querySelector('#quit').innerHTML = 'Start a New Game?';
        } else{
            showCurrentScore();
        }
    }
    function showCurrentScore(){
        score.innerHTML = `<div id="playerscores"><p><strong>Points : ${gameData.score[0]}</strong></p> <p><strong>Points : ${gameData.score[1]}</strong></p></div>`
    }
})();