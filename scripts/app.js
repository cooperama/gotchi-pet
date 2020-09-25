// ----------------------------- Tamagotchi

// - Global Variables
// - Tamagotchi Class
// - Game Object
// - Events

// ----------------------------- Global Variables



const startButton = document.querySelector('.start-game');
const feedButton = document.getElementById('feed');
const playButton = document.getElementById('play');
const teachButton = document.getElementById('teach');
const tuckButton = document.getElementById('tuck-in');

// const agreeButtons = document.querySelectorAll('.agree');

const pauseButton = document.querySelector('.pause');

// const document.querySelector('.i-one') = document.querySelector('.i-one');
// const document.querySelector('.i-two') = document.querySelector('.i-two');
// const document.querySelector('.i-three') = document.querySelector('.i-three');
// const document.querySelector('.i-four') = document.querySelector('.i-four');

const agreeOne = document.querySelector('.button-one');
const agreeTwo = document.querySelector('.button-two');
const agreeThree = document.querySelector('.button-three');

const nameButton = document.querySelector('.name-choice');
const nameBox = document.getElementById('gotchi-name');

const hungryBar = document.getElementById('hungry-progress');
const sleepyBar = document.getElementById('sleepy-progress');
const boredBar = document.getElementById('bored-progress');
const skillsBar = document.getElementById('skills-progress');
const allBars = document.querySelectorAll('.bar')

const ageSpan = document.querySelector('.age');
const nameSpan = document.querySelector('.name')

const messageP = document.querySelector('.message');
const messageBoxDiv = document.querySelector('.message-box');
const statsBoxDiv = document.querySelector('.stats-box');
const interactionsDiv = document.querySelector('.interactions');

const characterImg = document.querySelector('.character');

const body = document.querySelector('body');
const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const screen = document.querySelector('.screen');


const imageFiles = {
  happy: [
    './images/sprite/gotchi-young-happy.png',
    './images/sprite/gotchi-midage-happy.png',
    './images/sprite/gotchi-big-happy-down.png'
  ],
  reallyHappy: [
    './images/sprite/gotchi-young-really-happy.png',
    './images/sprite/gotchi-midage-really-happy.png',
    './images/sprite/gotchi-big-really-happy-down.png'
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
    './images/sprite/gotchi-big-open-mouth-down.png'
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
    './images/sprite/gotchi-big-worried-down.png'
  ],
  surprisedBad: [
    './images/sprite/gotchi-young-surprised-bad.png',
    './images/sprite/gotchi-midage-surprised-bad.png',
    './images/sprite/gotchi-big-surprised-bad-down.png'
  ],
}



function changeCharacterImage(image, sizeIndex) {
  characterImg.setAttribute('src', imageFiles[image][sizeIndex]);
}

// changeCharacterImage('happy', this.sizeIndex)

// ----------------------------- Tamagotchi Class

class Gotchi {
  constructor(name) {
    this.name = name;
    this.age = 1;
    this.sizeIndex = 0;
    // color feature held off for time
    this.color = 'lightblue';
    this.desire = '';
    this.skill = '';
    this.stats = {
      hungry: 6,
      sleepy: 1,
      bored: 3,
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
    this.character = {
      temper: {
        leaves: ['calm', 'green'],
        cherries: ['playful', 'pink'],
        sandwich: ['energetic', 'orange']
      },
      desire: {
        catch: 'help',
        tickle: 'love',
        boardGame: 'travel'
      },
      skills: {
        read: 'speak',
        math: 'building',
        tricks: 'fly'
      }
    },
    this.choices = {
      catch: `Find ${this.name} a friend`,
      tickle: `Send ${this.name} to college`,
      boardGame: `Set ${this.name} free`
    },
    this.result = '';
  }
  sleep() {
    this.stats.sleepy = 0;
    this.age++;
    this.checkStats();
    console.log('sleep function age: ', this.age)
    // change color -- held off for time
    // this.changeColor();
  }
  eat() {
    this.stats.hungry = 0;
    this.checkStats();
  }
  play() {
    this.stats.bored <= 2 ? this.stats.bored = 0 : this.stats.bored -= 2;
    this.stats.sleepy += 0.2;
    this.stats.skill += 0.5;
    this.stats.hungry += 0.5;
    this.checkStats();
  }
  learn() {
    this.stats.bored <= 2 ? this.stats.bored = 0 : this.stats.bored -= 2;
    this.stats.sleepy += 0.2;
    this.stats.skill += 0.5;
    this.stats.hungry += 0.5;
    this.checkStats();
  }
  incrementSize() {
    if (this.age === 3) this.sizeIndex = 1;
    if (this.age === 6) this.sizeIndex = 2;
    ageSpan.textContent = this.age;
  }
  // Change color based on food eaten
  // Feature skipped if no time... if time, figure out svg thing
  changeColor() {
    const foods = Object.keys(this.care.food);
    let mostEaten;
    let amountEaten = 0;
    for (let i = 0; i < foods.length; i++) {
      if (this.care.food[foods[i]] > amountEaten) {
        mostEaten = foods[i];
        amountEaten = this.care[foods[i]];
      }
    }
    this.color = this.character.temper[mostEaten][1];
  }
  checkStats() {
    let statNums = Object.values(this.stats);
    statNums = statNums.slice(0, 3);
    // statNums = statNums.slice(0, statNums.slice(0, 3));
    // Change message if stats go above 8
    let danger = statNums.some(num => {
      if (num >= 8) {
        messageP.textContent = `${this.name} doesn't feel so good...`;
        return true;
      } 
    });
    // Check if any stats are at 10, if so, game over
    let dead = statNums.some( num => {
      if (num > 10) {
        messageP.textContent = `${this.name} isn't responding anymore...`;
        game.isAlive = false;
        return true;
      } 
    })

    if (this.stats.skill === 10) {
      if (this.stats.skillCount <= 3) {
        this.stats.skill = 0;
        this.stats.skillCount++;
        const skillStar = document.createElement('img');
        skillStar.setAttribute('src', './images/star.png');
        skillStar.setAttribute('alt', 'star');
        skillStar.classList.add('star');
        document.querySelector('.star-box').appendChild(skillStar);
      }
    }

    // change color of progress bars that are at 8 or above;
    // trickyyyyyyyy couldn't select just one bar
    if (danger) {
      allBars.forEach(bar => {
        bar.classList.add('warning');
      })
      if (!dead) {
        changeCharacterImage('worried', this.sizeIndex)
        // characterImg.setAttribute('src', './images/sprite/gotchi-young-worried.png')
      }
    } else {
      allBars.forEach(bar => {
        bar.classList.remove('warning');
        messageP.textContent = ' ';
        changeCharacterImage('happy', this.sizeIndex)
        // characterImg.setAttribute('src', './images/sprite/gotchi-young-happy.png')
      })
    }
    // commented out below so game can continue during testing ////
    if (dead) {
      game.isAlive = false;
      game.gameOver();
    }
    boredBar.style.width = `${this.stats.bored*10}%`;
    hungryBar.style.width = `${this.stats.hungry*10}%`;
    sleepyBar.style.width = `${this.stats.sleepy*10}%`;
    skillsBar.style.width = `${this.stats.skill*10}%`;
  }
  // Update desire/skill if age is 6 activate animations to hint at Tamagotchi's desire
  checkAge() {
    if (this.age === 6) {
      // activate desire / skills scenes
      this.desire = this.getDesire();
      this.skill = this.getSkills();
      console.log('this.desire: ', this.desire)
      console.log('this.skill: ', this.skill)
    }
    if (this.age === 10) {
      // activate wants a change scene
      this.result = this.getDesire();
      // return this.choices[this.result];
    }
  }
  getDesire() {
    const desires = Object.keys(this.care.play);
    let mostPlayed;
    let amountPlayed = 0;
    for (let i = 0; i < desires.length; i++) {
      if (this.care.play[desires[i]] > amountPlayed) {
        mostPlayed = desires[i];
        amountPlayed = this.care.play[desires[i]];
      }
    }
    console.log('gotchi wants: ', this.character.desire[mostPlayed])
    return this.character.desire[mostPlayed];
  }
  getSkills() {
    const skillsList = Object.keys(this.care.teach);
    let mostTaught;
    let amountTaught = 0;
    for (let i = 0; i < skillsList.length; i++) {
      if (this.care.teach[skillsList[i]] > amountTaught) {
        mostTaught = skillsList[i];
        amountTaught = this.care.teach[skillsList[i]];
      }
    }
    console.log('gotchi skills: ', this.character.skills[mostTaught])
    return this.character.skills[mostTaught];
  }
}


// ----------------------------- Game Object

const game = {
  gotchis: [],
  isAlive: false,
  time: 0,
  start() {
    this.isAlive = true;
    screen.appendChild(document.querySelector('.i-one'));
  },
  life(tamagotchi) {
    const timerId = setInterval(function() {
      // timer stops if pause button clicked
      if (!pauseButton.classList.contains('pause-game')) {
        if (game.time % 15 === 0) {
          const sleepyVal = tamagotchi.stats.sleepy++;
          sleepyBar.style.width = `${sleepyVal*10}%`;
        };
        if (game.time % 3 === 0) {
          const boredVal = tamagotchi.stats.bored++;
          const hungryVal = tamagotchi.stats.hungry++;
          boredBar.style.width = `${boredVal*10}%`;
          hungryBar.style.width = `${hungryVal*10}%`;
        };
        game.time++;

        // not turning up false...
        if (game.isAlive === false) {
          // this.gameOver();
          clearInterval(timerId);
        }
        // If any stats reach 10, game over.
        tamagotchi.checkStats();
      }
    }, 1000);
  },
  gameOver() {
    console.log('gameOver')
    document.querySelector('.star-box').remove();
    messageBoxDiv.remove();
    statsBoxDiv.remove();
    interactionsDiv.remove();
    // move name to center, put Gotchi in a grave //////////////////
    changeCharacterImage('deadUnimpressed', this.gotchis[0].sizeIndex)
    // characterImg.setAttribute('src', './images/sprite/gotchi-young-dead-unimpressed.png')
    characterImg.classList.add('die-down');
    let time = 0;
    document.querySelector('.night-time').classList.add('white-out');
    // const dieTime = setInterval(function() {
    //   if (time === 5) {
    //     clearInterval(dieTime);
    //   }
    //   time++;
    // }, 1000);
  }
}


// ----------------------------- Events


function addDisplayNoneToOptions () {
  document.querySelector('.teach-options').classList.add('display-none');
  document.querySelector('.play-options').classList.add('display-none');
  // document.querySelector('.tuck-in-options').classList.add('display-none');
  document.querySelector('.feed-options').classList.add('display-none');
}

function toggleDisplayOnToButtons() {
  feedButton.classList.toggle('display-none');
  playButton.classList.toggle('display-none');
  teachButton.classList.toggle('display-none');
  tuckButton.classList.toggle('display-none');
}

function pauseGame() {
  pauseButton.classList.toggle('pause-game'); // pauses timer!!!
  addDisplayNoneToOptions();
  toggleDisplayOnToButtons()
}

// starting animation ~~
startButton.addEventListener('click', function() {
  startButton.remove();
  characterImg.classList.add('float-down');
  characterImg.classList.add('wobble');
  let waiting = true;
  let wait = 0;
  while (waiting) {
    const pause = setInterval(function() {
      if (wait === 5) {
        body.style.backgroundImage = 'url(./images/ghilbli_day_2.jpg)';
        screen.style.backgroundImage = 'url(./images/ghibli_background.jpg)';

        characterImg.classList.remove('moon');
        characterImg.classList.add('moon-top');
        characterImg.classList.add('egg-down');
      };
      // start with default character images
      if (wait === 10) {
        characterImg.setAttribute('src', './images/sprite/gotchi-young-happy.png')
        characterImg.classList.add('gotchi-intro');
      }
      if (wait === 12) {
        characterImg.setAttribute('src', './images/sprite/gotchi-young-really-happy.png')
      }
      if (wait === 13) {
        characterImg.setAttribute('src', './images/sprite/gotchi-young-happy.png')
      }
      if (wait === 14) {
        characterImg.remove();
        game.start();
        clearInterval(pause);
        waiting = false;
      }
      wait++
    }, 1000);
    break;
  }
})

pauseButton.addEventListener('click', function() {
  pauseGame();
})

// maybe have the user click the tamagotchi before clicking a button that way, the captured element can be passed into the event listeners below
// buttons are inactive until tamagotchi is clicked, then they are active and can be clicked.


feedButton.addEventListener('click', function(e) {
  addDisplayNoneToOptions();
  document.querySelector('.feed-options').classList.toggle('display-none');

  document.querySelector('.feed-options').addEventListener('click', function(e) {
    const care = e.target.getAttribute('class')
    game.gotchis[0].care.food[care]++;
    e.stopPropagation();
    game.gotchis[0].eat();
    document.querySelector('.feed-options').classList.add('display-none');
  })
});

playButton.addEventListener('click', function(e) {
  addDisplayNoneToOptions();
  document.querySelector('.play-options').classList.toggle('display-none');
  
  document.querySelector('.play-options').addEventListener('click', function(e) {
    const care = e.target.getAttribute('class')
    game.gotchis[0].care.play[care]++;
    e.stopPropagation();
    game.gotchis[0].play();
    document.querySelector('.play-options').classList.add('display-none');
  })
});

teachButton.addEventListener('click', function(e) {
  addDisplayNoneToOptions();
  document.querySelector('.teach-options').classList.toggle('display-none');
  
  document.querySelector('.teach-options').addEventListener('click', function(e) {
    const care = e.target.getAttribute('class')
    game.gotchis[0].care.teach[care]++;
    e.stopPropagation();
    game.gotchis[0].learn();
    document.querySelector('.teach-options').classList.add('display-none');
  })
});

tuckButton.addEventListener('click', function(e) {
  addDisplayNoneToOptions();
  // document.querySelector('.tuck-in-options').classList.toggle('display-none');

  game.gotchis[0].sleep();
  
  
  // document.querySelector('.tuck-in-options').addEventListener('click', function(e) {
    e.stopPropagation();
    // document.querySelector('.tuck-in-options').classList.add('display-none');
    document.querySelector('.night-time').classList.add('night-time-on');
    pauseGame();
    
    changeCharacterImage('sleep', game.gotchis[0].sizeIndex)
    
    characterImg.classList.add('lie-down');
    document.querySelector('.blanket').classList.add('blanket-slide');
    
    let time = 0;
    const sleepyTime = setInterval(function() {
      if (time === 2) {
        game.gotchis[0].incrementSize();
        changeCharacterImage('sleep', game.gotchis[0].sizeIndex)
      }
      if (time === 4) {
        document.querySelector('.blanket').classList.remove('blanket-slide');
        characterImg.classList.remove('lie-down');
        changeCharacterImage('happy', game.gotchis[0].sizeIndex)
      }
      if (time === 5) {
        pauseGame();
        document.querySelector('.night-time').classList.remove('night-time-on');
        clearInterval(sleepyTime);
      }
      time++;
    }, 1000);
});

agreeOne.addEventListener('click', function() {
  document.querySelector('.i-one').remove();
  screen.appendChild(document.querySelector('.i-two'));
})

agreeOne.addEventListener('mouseover', function(e) {
  e.target.textContent = 'wow !';
  this.addEventListener('mouseout', function(e) {
    e.target.textContent = 'wow';
  })
})

agreeTwo.addEventListener('mouseover', function(e) {
  e.target.textContent = 'okay !';
  this.addEventListener('mouseout', function(e) {
    e.target.textContent = 'okay?';
  })
})

agreeTwo.addEventListener('click', function() {
  document.querySelector('.i-two').remove();
  screen.appendChild(document.querySelector('.i-three'));
})


agreeThree.addEventListener('mouseover', function(e) {
  e.target.textContent = 'okay !';
  this.addEventListener('mouseout', function(e) {
    e.target.textContent = 'okay?';
  })
})

agreeThree.addEventListener('click', function() {
  document.querySelector('.i-three').remove();
  screen.appendChild(document.querySelector('.i-four'));
})

nameButton.addEventListener('mouseover', function(e) {
  e.target.textContent = 'okay !';
  this.addEventListener('mouseout', function(e) {
    e.target.textContent = 'okay?';
  })
})

nameButton.addEventListener('click', function(e) {
  const gotchiName = nameBox.value;
  const tamagotchi = new Gotchi(gotchiName);
  nameSpan.textContent = gotchiName;
  // in case I want to develop so more gotchis are born::::
  game.gotchis.push(tamagotchi);
  console.log(tamagotchi)
  document.querySelector('.i-four').remove();
  header.classList.remove('display-none');    
  main.classList.remove('display-none');
  footer.classList.remove('display-none');
  game.life(game.gotchis[0]);
  main.appendChild(characterImg);
  // the classes below were added in the beginning.. removed here for cleanliness
  characterImg.classList.remove('gotchi-intro', 'float-down', 'wobble', 'moon-top', 'egg-down');
  characterImg.classList.add('gotchi');
})


// ----------------------------- testing testing testing
