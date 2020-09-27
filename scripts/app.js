// ------------------------------------------------------------------------------------ 
// ------------------------------------------------------------------------------------ 
// ----------------------------- Tamagotchi

// - Global Variables
// - Helper Functions
// - Tamagotchi Class
// - Game Object
// - Events


// ------------------------------------------------------------------------------------ 
// ------------------------------------------------------------------------------------ 
// ----------------------------- Global Variables

const screen = document.querySelector('.screen');
const pauseButton = document.querySelector('.pause');
const messageP = document.querySelector('.message');
const characterImg = document.querySelector('.character');

const teachOptions = document.querySelector('.teach-options');
const playOptions = document.querySelector('.play-options');
const feedOptions = document.querySelector('.feed-options');

const imageFiles = {
  happyDown: [
    './images/sprite/gotchi-young-happy-down.png',
    './images/sprite/gotchi-midage-happy-down.png',
    './images/sprite/gotchi-big-happy-down.png'
  ],
  happyUp: [
    './images/sprite/gotchi-young-happy-up.png',
    './images/sprite/gotchi-midage-happy-up.png',
    './images/sprite/gotchi-big-happy-up.png'
  ],
  reallyHappyDown: [
    './images/sprite/gotchi-young-really-happy-down.png',
    './images/sprite/gotchi-midage-really-happy-down.png',
    './images/sprite/gotchi-big-really-happy-down.png'
  ],
  reallyHappyUp: [
    './images/sprite/gotchi-young-really-happy-up.png',
    './images/sprite/gotchi-midage-really-happy-up.png',
    './images/sprite/gotchi-big-really-happy-up.png'
  ],
  back: [
    './images/sprite/gotchi-young-back.png',
    './images/sprite/gotchi-midage-back.png',
    './images/sprite/gotchi-big-back.png'
  ],
  deadUnimpressed: [
    './images/sprite/gotchi-young-dead-unimpressed.png',
    './images/sprite/gotchi-midage-dead-unimpressed.png',
    './images/sprite/gotchi-big-dead-unimpressed.png'
  ],
  openMouth: [
    './images/sprite/gotchi-young-open-mouth.png',
    './images/sprite/gotchi-midage-open-mouth.png',
    './images/sprite/gotchi-big-open-mouth.png'
  ],
  sad: [
    './images/sprite/gotchi-young-sad.png',
    './images/sprite/gotchi-midage-sad.png',
    './images/sprite/gotchi-big-sad.png'
  ],
  sleep: [
    './images/sprite/gotchi-young-sleep.png',
    './images/sprite/gotchi-midage-sleep.png',
    './images/sprite/gotchi-big-sleep.png'
  ],
  worried: [
    './images/sprite/gotchi-young-worried.png',
    './images/sprite/gotchi-midage-worried.png',
    './images/sprite/gotchi-big-worried.png'
  ],
  surprisedBad: [
    './images/sprite/gotchi-young-surprised-bad.png',
    './images/sprite/gotchi-midage-surprised-bad.png',
    './images/sprite/gotchi-big-surprised-bad.png'
  ],
  catch: [
    './images/sprite/gotchi-young-catch.png',
    './images/sprite/gotchi-midage-catch.png',
    './images/sprite/gotchi-big-catch.png'
  ],
  eat: [
    './images/sprite/gotchi-young-eat.png',
    './images/sprite/gotchi-midage-eat.png',
    './images/sprite/gotchi-big-eat.png'
  ],
  bird: [
    './images/bird-down.png',
    './images/bird-up.png'
  ],
  catBoard: [
    './images/cat-board-100.png',
    './images/cat-board-c-100.png',
    './images/cat-board-a-100.png',
    './images/cat-board-t-100.png',
    './images/cat-board-cat-100.png'
  ],
  mathboard: [
    './images/whiteboard-before-100.png',
    './images/whiteboard-2.png',
    './images/whiteboard-3.png',
    './images/whiteboard-4.png',
    './images/whiteboard-5.png',
    './images/whiteboard-after-100.png'
  ],
  loveBugs: [
    './images/images/love-bugs.png',
    './images/images/love-bugs-love.png',
    './images/images/love-bugs-love-2.png'
  ],
  squirrel: [
    './images/squirrel-happy.png',
    './images/squirrel-run-open.png',
    './images/squirrel-run-closed.png',
    './images/squirrel-upsidedown-open.png',
    './images/squirrel-upsidedown-closed.png'
  ]
}

// ------------------------------------------------------------------------------------ 
// ------------------------------------------------------------------------------------ 
// ----------------------------- Helper Functions

function pauseGame() {
  pauseButton.classList.add('pause-game'); 
  addDisplayNoneToOptions();
  toggleDisplayOnToButtons();
}

function unpauseGame() {
  pauseButton.classList.remove('pause-game'); 
  addDisplayNoneToOptions();
  toggleDisplayOnToButtons();
}

function changeCharacterImage(image) {
  characterImg.setAttribute('src', imageFiles[image][game.gotchis[0].sizeIndex]);
}

function changeMathBoardImage(index) {
  document.querySelector('.math-board').setAttribute('src', imageFiles['mathboard'][index]);
}

function changeAbcBoardImage(index) {
  document.querySelector('.abc-board').setAttribute('src', imageFiles['catBoard'][index]);
}

function addDisplayNoneToOptions() {
  document.querySelector('.teach-options').classList.add('display-none');
  document.querySelector('.play-options').classList.add('display-none');
  document.querySelector('.feed-options').classList.add('display-none');
}

function toggleDisplayOnToButtons() {
  document.getElementById('feed').classList.toggle('display-none');
  document.getElementById('play').classList.toggle('display-none');
  document.getElementById('teach').classList.toggle('display-none');
  document.getElementById('tuck-in').classList.toggle('display-none');
}

function displayDropImage(e, objectDrop) {
  const className = e.target.classList[0];
  const matchingImage = document.querySelector(`.drop-${className}`);
  matchingImage.classList.remove('display-none');
  matchingImage.classList.add(objectDrop)
}

function hideDropImage(e) {
  const className = e.target.classList[0];
  const matchingImage = document.querySelector(`.drop-${className}`);
  matchingImage.classList.add('display-none');
}

function hideScreenBoxes() {
  pauseButton.classList.add('display-none');
  document.querySelector('.star-box').classList.add('display-none');
  document.querySelector('.message-box').classList.add('display-none');
  document.querySelector('.stats-box').classList.add('display-none');
  document.querySelector('.interactions').classList.add('display-none');
}

function showScreenBoxes() {
  pauseButton.classList.remove('display-none');
  document.querySelector('.star-box').classList.remove('display-none');
  document.querySelector('.message-box').classList.remove('display-none');
  document.querySelector('.stats-box').classList.remove('display-none');
  document.querySelector('.interactions').classList.remove('display-none');
}

// ------------------------------------------------------------------------------------ 
// ------------------------------------------------------------------------------------ 
// ----------------------------- Tamagotchi Class

class Gotchi {
  constructor(name) {
    this.name = name;
    this.age = 1;
    this.sizeIndex = 0;
    this.stats = {
      hungry: 4,
      sleepy: 1,
      bored: 2,
      skill: 0,
      skillCount: 0
    };
    this.care = {
      food: {
        leaves: 0,
        cherries: 0,
        sandwich: 0
      },
      play: {
        catch: 0,
        tickle: 0,
        boardGame: 0
      },
      teach: {
        read: 0,
        math: 0,
        tricks: 0
      }
    };
  }
  sleep() {
    this.stats.sleepy = 0;
    this.age++;
    this.checkStats();
  }
  eat() {
    this.stats.hungry = 0;
    this.checkStats();
  }
  play() {
    this.stats.bored <= 2 ? this.stats.bored = 0 : this.stats.bored -= 2;
    this.stats.skill += 0.5;
    this.checkStats();
  }
  learn() {
    this.stats.bored <= 2 ? this.stats.bored = 0 : this.stats.bored -= 2;
    this.stats.skill += 0.5;
    this.checkStats();
  }
  incrementSize() {
    if (this.age === 3) this.sizeIndex = 1;
    if (this.age === 6) this.sizeIndex = 2;
    document.querySelector('.age').textContent = this.age;
  }
  checkStats() {
    if (!pauseButton.classList.contains('pause-game')) {

      let statNums = Object.values(this.stats);
      statNums = statNums.slice(0, 3);

      let danger = statNums.some(num => {
        if (num >= 8) {
          messageP.textContent = `${this.name} doesn't feel so good...`;
          return true;
        } 
      });

      let dead = statNums.some( num => {
        if (num >= 10) {
          game.isAlive = false;
          return true;
        } 
      })

      if (this.stats.skill >= 10) {
        if (this.stats.skillCount <= 5) {
          const skillStar = document.createElement('img');
          skillStar.setAttribute('src', './images/star.png');
          skillStar.setAttribute('alt', 'star');
          skillStar.classList.add('star');
          document.querySelector('.star-box').appendChild(skillStar);
        }
        this.stats.skill = 0;
        this.stats.skillCount++;
      }

      if (danger && !pauseButton.classList.contains('pause-game')) {
          document.querySelectorAll('.bar').forEach(bar => {
          bar.classList.add('warning');
          characterImg.classList.remove('pace');
        })
        if (!dead) {
          changeCharacterImage('worried')
        }
      } else {
          document.querySelectorAll('.bar').forEach(bar => {
          bar.classList.remove('warning');
          messageP.textContent = ' ';
          changeCharacterImage('happyDown')
        })
      }

      if (dead) {      
        game.isAlive = false;
        game.gameOver();
      }

      document.getElementById('bored-progress').style.width = `${this.stats.bored*10}%`;
      document.getElementById('hungry-progress').style.width = `${this.stats.hungry*10}%`;
      document.getElementById('sleepy-progress').style.width = `${this.stats.sleepy*10}%`;
      document.getElementById('skills-progress').style.width = `${this.stats.skill*10}%`;
    }
    }
  }



// ------------------------------------------------------------------------------------ 
// ------------------------------------------------------------------------------------ 
// ----------------------------- Game Object

const game = {
  gotchis: [],
  isAlive: false,
  time: 0,
  start() {
    this.isAlive = true;
  },
  life(tamagotchi) {
    const timerId = setInterval(function() {
      // timer stops if pause button clicked
      if (!pauseButton.classList.contains('pause-game')) {
        if (game.time % 14 === 0) {
          const sleepyVal = tamagotchi.stats.sleepy++;
        };
        if (game.time % 6 === 0) {
          const boredVal = tamagotchi.stats.bored++;
          const hungryVal = tamagotchi.stats.hungry++;
        };
        game.time++;

        if (!game.isAlive) {
          clearInterval(timerId);
        }
        tamagotchi.checkStats();
      }
    }, 1000);
  },
  gameOver() {
    hideScreenBoxes()
    
    changeCharacterImage('deadUnimpressed')
    characterImg.classList.remove('pace');
    characterImg.classList.add('die-down');

    document.querySelector('.night-time').classList.add('white-out');

    let time = 0;
    const timer = setInterval(function(){
      if (time === 4) {
        document.querySelector('.game-over').classList.remove('display-none');
        document.querySelector('.game-over').classList.add('animate__fadeIn');
      }
      if (time === 5) {
        document.querySelector('.play-again-button').classList.remove('display-none');
        clearInterval(timer);
      }
      time++;
    }, 1000)
  }
};


// ------------------------------------------------------------------------------------ 
// ------------------------------------------------------------------------------------ 
// ----------------------------- Events



pauseButton.addEventListener('click', function() {
  if (!this.classList.contains('pause-game')) {
    characterImg.classList.remove('pace');
    characterImg.classList.add('display-none');
    pauseGame();
  } else {
    characterImg.classList.add('pace');
    characterImg.classList.remove('display-none');
    unpauseGame() 
  }
})

// ~~~~ FEED BUTTON FUNCTIONALITY & ANIMATION

document.getElementById('feed').addEventListener('click', function(e) {
  // Close other button options divs
  teachOptions.classList.add('display-none');
  playOptions.classList.add('display-none');
  feedOptions.classList.toggle('display-none');

  feedOptions.addEventListener('click', function(e) {
    pauseGame();
    e.stopPropagation();
    feedOptions.classList.add('display-none');

    characterImg.classList.remove('pace'); 
    const care = e.target.getAttribute('class');
    game.gotchis[0].care.food[care]++;
    
    let time = 0;
    const feedingTime = setInterval(function() {
      if (time === 0) {
        displayDropImage(e, 'food-drop');
        hideScreenBoxes();
      }
      if (time === 2) {
        changeCharacterImage('catch')
        hideDropImage(e);
      }
      if (time === 2.5) changeCharacterImage('openMouth');
      if (time === 3) changeCharacterImage('eat');
      if (time === 3.5) changeCharacterImage('openMouth');
      if (time === 4) changeCharacterImage('eat');
      if (time === 4.5) changeCharacterImage('openMouth');
      if (time === 5) changeCharacterImage('happyDown');
      if (time === 5.5) changeCharacterImage('happyUp');

      if (time === 6) {
        game.gotchis[0].eat();
        changeCharacterImage('happyDown');
        characterImg.classList.add('pace');

        showScreenBoxes();
        unpauseGame();
        clearInterval(feedingTime);
      }
      time += 0.5;
    }, 500);
  })
});

// ~~~~ PLAY BUTTON FUNCTIONALITY & ANIMATION

document.getElementById('play').addEventListener('click', function(e) {
  teachOptions.classList.add('display-none');
  feedOptions.classList.add('display-none');
  playOptions.classList.toggle('display-none');
  
  playOptions.addEventListener('click', function(e) {
    pauseGame();
    e.stopPropagation();
    playOptions.classList.add('display-none');

    characterImg.classList.remove('pace'); 
    const care = e.target.getAttribute('class');
    game.gotchis[0].care.play[care]++;
    
    let time = 0;
    const playTime = setInterval(function() {
      if (time === 0) {
        displayDropImage(e, `${care}-drop`);
        hideScreenBoxes();
      }

      if (care === 'ball') {
        if (time === 18) changeCharacterImage('happyUp');
        if (time === 24) changeCharacterImage('happyDown');
        if (time === 36) changeCharacterImage('reallyHappyUp');
        if (time === 45) changeCharacterImage('reallyHappyDown');
        if (time === 48) changeCharacterImage('reallyHappyUp');
        if (time === 54) changeCharacterImage('reallyHappyDown');
        if (time === 58) changeCharacterImage('happyUp');
      }
      if (care === 'feather') {
        if (time === 36) changeCharacterImage('happyUp');
        if (time === 40) changeCharacterImage('happyDown');
        if (time === 44) changeCharacterImage('reallyHappyUp');
        if (time === 48) changeCharacterImage('reallyHappyDown');
        if (time === 52) changeCharacterImage('reallyHappyUp');
        if (time === 54) changeCharacterImage('reallyHappyDown');
        if (time === 58) changeCharacterImage('happyUp');
      }
      if (care === 'game') {
        characterImg.classList.add('move-aside');
        if (time === 18) changeCharacterImage('openMouth');
        if (time === 22) changeCharacterImage('happyDown');
        if (time === 26) changeCharacterImage('reallyHappyDown');
        if (time === 34) changeCharacterImage('sad');
        if (time === 38) changeCharacterImage('worried');
        if (time === 42) changeCharacterImage('sad');
        if (time === 48) changeCharacterImage('happyUp');
        if (time === 52) changeCharacterImage('reallyHappyUp');
      }

      if (time === 60) {
        game.gotchis[0].play();
        changeCharacterImage('happyDown');
        characterImg.classList.remove('move-aside');
        characterImg.classList.add('pace');

        hideDropImage(e);
        showScreenBoxes();
        unpauseGame();
        clearInterval(playTime);
      }
      time++;
    }, 100);
  })
});

// ~~~~ TEACH BUTTON FUNCTIONALITY & ANIMATION 

document.getElementById('teach').addEventListener('click', function(e) {
  playOptions.classList.add('display-none');
  feedOptions.classList.add('display-none');
  teachOptions.classList.toggle('display-none');
  
  teachOptions.addEventListener('click', function(e) {
      game.gotchis[0].learn();
      pauseGame();
      e.stopPropagation();

      teachOptions.classList.add('display-none');

      characterImg.classList.remove('pace'); 
      const care = e.target.getAttribute('class');
      game.gotchis[0].care.teach[care]++;

      let time = 0;
      const teachTime = setInterval(function() {
        if (time === 0) {
          displayDropImage(e, `${care}-drop`);
          hideScreenBoxes();
        }
        if (care === 'book') {
          if (time === 18) changeCharacterImage('back');
          if (time === 24) changeAbcBoardImage(1);
          if (time === 30) changeAbcBoardImage(2);
          if (time === 38) changeAbcBoardImage(3);
          if (time === 46) changeAbcBoardImage(0);
          if (time === 50) changeAbcBoardImage(4);
        }
        if (care === 'math') {
          if (time === 18) changeCharacterImage('back');
          if (time === 24) changeMathBoardImage(1);
          if (time === 28) changeMathBoardImage(2);
          if (time === 32) changeMathBoardImage(3);
          if (time === 36) changeMathBoardImage(4);
          if (time === 40) changeMathBoardImage(0);
          if (time === 44) changeMathBoardImage(5);
        }
        if (care === 'hoop') {
          characterImg.classList.add('hoop-jump');
          if (time === 18) changeCharacterImage('happyUp');
          if (time === 24) changeCharacterImage('happyDown');
          if (time === 36) changeCharacterImage('reallyHappyUp');
          if (time === 45) changeCharacterImage('reallyHappyDown');
          if (time === 48) changeCharacterImage('reallyHappyUp');
          if (time === 54) changeCharacterImage('reallyHappyDown');
          if (time === 58) changeCharacterImage('happyUp');
        }
        
        if (time === 60) {
          
          game.gotchis[0].learn();
          changeCharacterImage('happyDown');
          characterImg.classList.remove('hoop-jump');
          characterImg.classList.add('pace');

          hideDropImage(e);
          showScreenBoxes();
          unpauseGame();
          clearInterval(teachTime);
        }
        time++;
      }, 100);
 
    }
  // }
  )

});

// ~~~~ SLEEP BUTTON FUNCTIONALITY & ANIMATION 

document.getElementById('tuck-in').addEventListener('click', function(e) {
  addDisplayNoneToOptions();
  pauseGame();
  e.stopPropagation();

  game.gotchis[0].sleep();

  characterImg.classList.remove('pace'); 
  characterImg.classList.add('lie-down');
  changeCharacterImage('sleep', game.gotchis[0].sizeIndex);
  document.querySelector('.night-time').classList.add('night-time-on');
  document.querySelector('.blanket').classList.add('blanket-slide');

  let time = 0;
  const sleepyTime = setInterval(function() {
    if (time === 2) {
      game.gotchis[0].incrementSize();
      changeCharacterImage('sleep', game.gotchis[0].sizeIndex);
    }
    if (time === 4) {
      characterImg.classList.remove('lie-down');
      document.querySelector('.blanket').classList.remove('blanket-slide');
      changeCharacterImage('happyDown', game.gotchis[0].sizeIndex);
    }
    if (time === 5) {
      characterImg.classList.add('pace');
      document.querySelector('.night-time').classList.remove('night-time-on');

      unpauseGame();
      clearInterval(sleepyTime);
    }
    time++;
  }, 1000);

});


// ~~~~ START GAME STARTING ANIMATION

document.querySelector('.start-game').addEventListener('click', function() {
    document.querySelector('.start-game').remove();
    characterImg.classList.add('float-down');
    characterImg.classList.add('wobble');

    let waiting = true;
    let wait = 0;
    while (waiting) {

      const pause = setInterval(function() {

        if (wait === 5) {
          document.querySelector('body').style.backgroundImage = 'url(./images/ghilbli_day_2.jpg)';
          screen.style.backgroundImage = 'url(./images/ghibli_background.jpg)';

          characterImg.classList.remove('moon');
          characterImg.classList.add('moon-top');
          characterImg.classList.add('egg-down');
        };
        // start with default character images
        if (wait === 10) {
          characterImg.setAttribute('src', './images/sprite/gotchi-young-happy-up.png');
          characterImg.classList.add('gotchi-intro');
        }
        if (wait === 12) {
          characterImg.setAttribute('src', './images/sprite/gotchi-young-really-happy-up.png');
        }
        if (wait === 13) {
          characterImg.setAttribute('src', './images/sprite/gotchi-young-happy-up.png');
        }
        if (wait === 14) {
          screen.appendChild(document.querySelector('.i-one'));
          characterImg.remove();
          game.start();
          clearInterval(pause);
          waiting = false;
        }
        wait++
      }, 1000);
      break;
    }
  }
);


// ~~~~ INTRO / INSTRUCTIONS BUTTON EVENTS

document.querySelector('.button-one').addEventListener('click', function() {
  document.querySelector('.i-one').remove();
  screen.appendChild(document.querySelector('.i-two'));
});

document.querySelector('.button-one').addEventListener('mouseover', function(e) {
  e.target.textContent = 'wow !';
  this.addEventListener('mouseout', function(e) {
    e.target.textContent = ' wow ';
  });
});

document.querySelector('.button-two').addEventListener('mouseover', function(e) {
  e.target.textContent = 'okay !';
  this.addEventListener('mouseout', function(e) {
    e.target.textContent = 'okay?';
  });
});

document.querySelector('.button-two').addEventListener('click', function() {
  document.querySelector('.i-two').remove();
  screen.appendChild(document.querySelector('.i-three'));
});

document.querySelector('.button-three').addEventListener('mouseover', function(e) {
  e.target.textContent = 'okay !';
  this.addEventListener('mouseout', function(e) {
    e.target.textContent = 'okay?';
  });
});

document.querySelector('.button-three').addEventListener('click', function() {
  document.querySelector('.i-three').remove();
  screen.appendChild(document.querySelector('.i-four'));
});

document.querySelector('.name-choice').addEventListener('mouseover', function(e) {
  e.target.textContent = 'okay !';
  this.addEventListener('mouseout', function(e) {
    e.target.textContent = 'okay?';
  });
});

document.querySelector('.play-again-button').addEventListener('click', function() {
  location.reload();
});

document.querySelector('.play-again-button').addEventListener('mouseover', function(e) {
  e.target.textContent = 'play again !';
  this.addEventListener('mouseout', function(e) {
    e.target.textContent = 'play again?';
  });
});

// ~~~~ CREATE TAMAGOTCHI OBJECT AND SHOW SCREEN MENUS

document.querySelector('.name-choice').addEventListener('click', function(e) {
  const gotchiName = document.getElementById('gotchi-name').value;
  const tamagotchi = new Gotchi(gotchiName);
  document.querySelector('.name').textContent = gotchiName;
  // in case I want to develop so more gotchis are born::::
  game.gotchis.push(tamagotchi);
  document.querySelector('.i-four').remove();
  document.querySelector('header').classList.remove('display-none');    
  document.querySelector('main').classList.remove('display-none');
  document.querySelector('footer').classList.remove('display-none');

  game.life(game.gotchis[0]);
  document.querySelector('main').appendChild(characterImg);
  characterImg.classList.remove('gotchi-intro', 'float-down', 'wobble', 'moon-top', 'egg-down');
  characterImg.classList.add('gotchi');
  characterImg.classList.add('pace');
})



