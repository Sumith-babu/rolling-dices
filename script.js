'use strict';
const player0El= document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const btnNew=document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');

document.querySelector('#score--0').textContent='0';
document.querySelector('#score--1').textContent = '0';
diceEl.classList.add('hidden');

let score=[0,0];
let activePlayer=0;
let current =0;
let playing = true;

const init = function () {
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    score = [0, 0];
    activePlayer = 0;
    current = 0;
    playing = true;
    document.querySelector(`#score--0`).textContent = 0;
    document.querySelector(`#score--1`).textContent = 0;
    document.querySelector(`#current--0`).textContent = current;
    document.querySelector(`#current--1`).textContent = current;
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--winner--0').classList.add('hidden');
    document.querySelector('.player--winner--1').classList.add('hidden');

}

const SwitchPlayer=()=>{
    current=0;
    document.querySelector(`#current--${activePlayer}`).textContent=0;
    activePlayer = activePlayer === 0 ? 1:0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


btnRoll.addEventListener('click', function(){
    if (playing){
        const dice = Math.trunc(Math.random()*6)+1;
        diceEl.src=`dice-${dice}.png`;
        diceEl.classList.remove('hidden');
        if(dice !==1){
            current+=dice;
            document.querySelector(`#current--${activePlayer}`).textContent=current;
        }else{
            SwitchPlayer();
        }
    }
})

btnHold.addEventListener('click',function(){
    if(playing){
        score[activePlayer]+=current;
        document.querySelector(`#score--${activePlayer}`).textContent=score[activePlayer];
        if(score[activePlayer]>=100){
            playing= false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--winner--${activePlayer}`).classList.remove('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else{
            SwitchPlayer();
        }
    }
})

btnNew.addEventListener('click',init)


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnsOpenModal = document.querySelectorAll('.show-modal');
const btnCloseModal = document.querySelector('.close-modal');

const closeModal = () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

const OpenModal = () => {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

for (let i = 0; i < btnsOpenModal.length; i++) {
    btnsOpenModal[i].addEventListener('click', OpenModal);
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === "Escape" && !modal.classList.contains('hidden')) {
        closeModal();
    }
})

