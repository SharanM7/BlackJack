// Challenge 1
function ageInDays()
{
    let birthYear = prompt("What is your year of birth");
        if (birthYear >= 0 && birthYear<2020){
        var ageInDays = (2020- birthYear)* 365;
        document.querySelector('#ageInDays').textContent = `Your are ${ageInDays} days old`;
    }
    // var h = document.createElement('h1');
    // var text = document.createTextNode('You are '+ ageInDays+ ' days old');
    // h.appendChild(text);
    // document.getElementById('ageInDays').appendChild(h);
    // document.getElementById('ageInDays').innerHTML = "<h1>You are "+ ageInDays+" days old</h1>";
}

function reset()
{
    document.getElementById('ageInDays').innerHTML = '';
    // document.getElementById('ageInDays').remove();
}

// Challenge 2
function catGenerator()
{
    var image = document.createElement('img');
    image.src="/home/adminpc15/Desktop/Sharan/Challenge/01/img/cat.jpeg";
    document.getElementById("flex-gen-cat").appendChild(image);
}

// Challenge 3
function rpsGame(myChoice)
{
    var humanChoice,botChoice;
    humanChoice=myChoice.id;  //r,p,s
    botChoice=numToChoice(randNum()); //r,p,s
    console.log(humanChoice);
    console.log(botChoice);
    let result = decidWinner(humanChoice,botChoice);// 0,0.5,1
    
    message = finalMessage(result);
    rpsFrontEnd(humanChoice,botChoice,message); 
}
function decidWinner(yourChoice,computerChoice)
{
    console.log(yourChoice);
    console.log(computerChoice);
    
    var rpsDatabase = {
        'rock': {'scissors':1,'rock':0.5,'paper':0},
        'paper': {'rock':1,'paper':0.5,'scissors':0},
        'scissors': {'paper':1,'scissors':0.5,'rock':0},
    }
    // console.log(rpsDatabase['yourChoice']['computerChoice']);
    return rpsDatabase[yourChoice][computerChoice];
}

function randNum()
{
     return Math.floor(Math.random() *3);
}

function numToChoice(number)
{
    return ['rock','paper','scissors'][number]
}
function finalMessage(yourScore)
{
    if(yourScore===0){
        return {'message':'You Lost!', 'color':'red'}
    }else if (yourScore===0.5){
        return {'message':'You Tied', 'color':'yellow'}
    }else{
        return {'message':'You Won!', 'color':'green'}
    }
}

function rpsFrontEnd(humanImageChoice,botImageChoice,finalMessage)
{
    // console.log(botImageChoice);
    
    var imagesDatabase = {
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var messageDiv = document.createElement('div');
    var botDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='"+imagesDatabase[humanImageChoice]+"'height='150' width='150'style='box-shadow: 0px 10px 50px rgba(37,50,233,1)' >";
    messageDiv.innerHTML="<h1 style='color: " +finalMessage.color+ "; font-size: 60px; padding: 30px'>"+finalMessage.message+"</h1>";
    botDiv.innerHTML = "<img src='"+imagesDatabase[botImageChoice]+"'height='150' width='150'style='box-shadow: 0px 10px 50px rgba(243,38,24,1)' >";

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

// Challenge 4

var allButtons = document.getElementsByTagName('button');

var copyButtons= [];
for(let i=0;i<allButtons.length;i++){
    copyButtons.push(allButtons[i].classList[1]);
}

function buttonColorChange(button)
{
    if(button.value == 'red'){
        buttonToRed();
    }else if(button.value == 'green'){
        buttonToGreen();
    }else if(button.value == 'reset'){
        buttonToReset();
    }else if(button.value == 'random'){
        buttonToRandom();
    }
    
}

function buttonToRed()
{
    for(let i=0;i<allButtons.length;i++){
        allButtons[i].classList.remove(allButtons[i].classList[1])
        allButtons[i].classList.add('btn-danger');
    }
}

function buttonToGreen()
{
    for(let i=0;i<allButtons.length;i++){
        allButtons[i].classList.remove(allButtons[i].classList[1])
        allButtons[i].classList.add('btn-success');
    }
}
function buttonToReset()
{
    for(let i=0;i<allButtons.length;i++){
        allButtons[i].classList.remove(allButtons[i].classList[1])
        allButtons[i].classList.add(copyButtons[i]);
    }
}

function buttonToRandom()
{
    let setOfCol = ['btn-primary','btn-success','btn-danger','btn-warning']
    for(let i=0;i<allButtons.length;i++){
        let randNum =Math.floor(Math.random() * 4);
        allButtons[i].classList.remove(allButtons[i].classList[1])
        allButtons[i].classList.add(setOfCol[randNum]);
    }
}

//Challenge 5- 

let blackjackGame = {
    'you': {'scorespan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer': {'scorespan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards': ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardsMap': {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':[1,11]},
    'wins': 0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'standOver':false,
    'turnsOver': false,
}
 
const you =blackjackGame.you; 
const dealer = blackjackGame.dealer;

const drawSound = new Audio('sounds/CardDraw.mp3');
const cashSound = new Audio('sounds/Cash.mp3');
const LoseSound = new Audio('sounds/Lose.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',hitButton);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',dealButton);


function hitButton()
{   
        if(blackjackGame.isStand===false){
            let card = randomCard() // Card-2/4/A
            showCards(card, you);
            changeScore(card, you);
            showScore(you);
        }
    
}

function showCards(randomCard, activePlayer) 
{   
    drawSound.play();
    if(activePlayer.score<=21){
        let img = document.createElement('img');
        img.src =`img/cards/${randomCard}.jpg`;
        img.setAttribute('height','140px');
        document.querySelector(activePlayer.div).appendChild(img);
    }
}

function randomCard()
{
    let randNum = Math.floor(Math.random() * 13);
    return blackjackGame.cards[randNum];
}
function dealButton()
{
    if(blackjackGame.turnsOver===true){
        let yourImages = document.querySelector("#your-box").querySelectorAll('img');
        let dealerImages = document.querySelector("#dealer-box").querySelectorAll('img');
            for(i=0;i<yourImages.length;i++){
                yourImages[i].remove();
            }
            
            for(i=0;i<dealerImages.length;i++){ 
                dealerImages[i].remove();
            }
        you.score = 0;
        dealer.score = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        
        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

        document.querySelector('#blackjack-result').textContent= "Let's play!";
        document.querySelector('#blackjack-result').style.color= 'black';
       
        blackjackGame.isStand=false;
        blackjackGame.turnsOver=false;
        blackjackGame.standOver=false;
    }
}
function changeScore(card, activePlayer)
{
    
    if(card == 'A'){
        if(activePlayer.score + blackjackGame.cardsMap[card][1]<=21){
            activePlayer.score += blackjackGame.cardsMap[card][1];
        }else{
            activePlayer.score += blackjackGame.cardsMap[card][0];
        }  
        }else{
        activePlayer.score += blackjackGame.cardsMap[card];
    }  
    
}

function showScore(activePlayer)
{
    if(activePlayer.score<=21){
    document.querySelector(activePlayer.scorespan).textContent = activePlayer.score;
    }else{
    document.querySelector(activePlayer.scorespan).textContent = 'Bust!';
    document.querySelector(activePlayer.scorespan).style.color = 'red';
    }
    if(you.score>21){
        you.score = 1;
    }
}
function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic()
{
    if(you.score!=0 && blackjackGame.standOver=== false){
            while(dealer.score <= you.score && dealer.score<=21){
            blackjackGame.isStand= true;   
            let card = randomCard();
            showCards(card,dealer);
            changeScore(card,dealer);
            showScore(dealer);
            console.log(dealer.score);
            await sleep(1500);
            }
                blackjackGame.turnsOver= true;
                blackjackGame.standOver=true;
                displayWinner(decideWinner());
            
    }
}
function decideWinner()
{
    let winner;
    if(you.score<=21){
        if(dealer.score<you.score || dealer.score>21){
         blackjackGame.wins++;
         winner=you;
        }else if(you.score== dealer.score){
         blackjackGame.draws++;
        }else if(dealer.score > you.score){
         winner= dealer;
            blackjackGame.losses++;

        }   
    }else if(you.score>21 && dealer.score<21){
        blackjackGame.losses++;
        winner = dealer;
    }else if(you.score>21 && dealer.score>21){  
        blackjackGame.draws++;
    }
    return winner;
}

function displayWinner(winner)
{
    if(blackjackGame.turnsOver===true){
        if(winner==you){
            document.querySelector('#wins').textContent = blackjackGame.wins;
            document.querySelector('#blackjack-result').textContent = 'You Won!';
            document.querySelector('#blackjack-result').style.color = 'green';
            cashSound.play();
        }else if(winner==dealer){
            document.querySelector('#losses').textContent = blackjackGame.losses;
            document.querySelector('#blackjack-result').textContent = 'You Lost!';
            document.querySelector('#blackjack-result').style.color= 'red';
            LoseSound.play();
        }else{
            document.querySelector('#draws').textContent = blackjackGame.draws;
            document.querySelector('#blackjack-result').textContent = 'You Drew!';
            document.querySelector('#blackjack-result').style.color = 'black';
        }

    }
}