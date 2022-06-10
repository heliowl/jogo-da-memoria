const cards = document.querySelectorAll('.card');
const winner = document.getElementById('winner');
let hasFlippedCard = false;
let firstCard, secondCard;
/*bloqueio do tabuleiro quando for true*/
let lockBoard = false;
totalCards = 16;

//Criando uma variável global para nos dizer em qual estado a tela atual se encontra.
isFullScreen = false;
var elem = document.documentElement;
function ativarDesativarFS() {
    //Se o estado atual for "FullScreen", desativá-lo.
    //verificações para todos os navegadores.
      if (document.exitFullscreen) {
      document.exitFullscreen();
      isFullScreen = false;
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
      isFullScreen = false;
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
      isFullScreen = false;
    }


  if (elem.requestFullscreen) {
     elem.requestFullscreen();
     isFullScreen = true;
  } else if (elem.mozRequestFullScreen) { /* Firefox */
     elem.mozRequestFullScreen();
      isFullScreen = true;
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
     isFullScreen = true;
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
     isFullScreen = true;
  }

}



function flipCard(){
    /*bloqueia o tabuleiro quando 2 cartas estiverem viradas*/
    if(lockBoard) return;
    if(this === firstCard) return;

    /*this representa a carta clicada cards e adiciona a classe flip a ela*/
    this.classList.add('flip');
    if(!hasFlippedCard){
        hasFlippedCard = true;

        /*a firstCard receberá a carta clicada*/
        firstCard = this;
        return;
    }
    secondCard = this;
    hasFlippedCard = false; /*"zera" as cartas selecionadas*/
    checkForMatch();
}


function checkForMatch(){
    /*Verifica se as duas cartas(data-card html) são iguais, se sim, chama a função para desabilitar elas*/
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards();
        return;
    }

    undeflipCards();
}

/*revove o evento de click da carta*/
function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    totalCards -= 2;

    win();         
       
    /*tira da memória as cartas e deixa como nulas*/
    resetBoard();
}

function win(){
    if(totalCards === 0){
        document.getElementById('winner').style.opacity = '1';
        document.getElementById('winner').style.zIndex = '1';
    }
}

function undeflipCards(){
    /*aciona o bloqueio*/
    lockBoard = true;

    setTimeout(() => {
        /*remove a classe flip das cartas e desvira em 1,5 segundos*/
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        /*desbloqueia o tabuleiro*/
        resetBoard();
    }, 1500);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

/*Embaralhar*/
/*Parênteses antes e depois da função para ele executar automáticamente a cada atualização da tela*/
(function shuffle(){
    cards.forEach((card) => {

        /*sorteia numeros de 0 a 15 o floor arredonda para não ter número quebrado */
        let randomPosition = Math.floor(Math.random() * 16);

        /*cada carta receberá um valor na propriedade order (que por padrão é feita pelo sistema na ordem em que é escrita no HTML) */
        card.style.order = randomPosition;
    })
})();

/*percorre a lista de cartas e para cada carta clicada adiciona o evento flipCard que adiciona uma classe a carta*/
cards.forEach((card) => {
    card.addEventListener('click', flipCard);
});

function novoJogo(){
    cards.forEach((card) => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
        let randomPosition = Math.floor(Math.random() * 16);
        card.style.order = randomPosition;
    });
    document.getElementById('winner').style.opacity = '0';
    document.getElementById('winner').style.zIndex = '-1'; 
    totalCards = 16;
}

novo = document.getElementById('novo');
novo.addEventListener('click', novoJogo);
