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

const moonImg = document.querySelector('.moon');

const body = document.querySelector('body');
const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const screen = document.querySelector('.screen');


// ----------------------------- Tamagotchi Class

class Gotchi {
  constructor(name) {
    this.name = name;
    this.age = 1;
    this.color = 'lightblue';
    this.desire = '';
    this.skill = '';
    this.stats = {
      hungry: 6,
      sleepy: 3,
      bored: 3,
      skill: 0
    };
    this.care = {
      food: {
        leaves: 0,
        cherries: 1,
        sandwich: 0
      },
      play: {
        catch: 1,
        tickle: 0,
        boardGame: 0
      },
      teach: {
        read: 0,
        math: 1,
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
    sleepyBar.style.width = `${this.stats.sleepy*10}%`;
    this.age++;
    ageSpan.textContent = this.age;
    this.checkStats();
    // change color
    this.changeColor();
  }
  eat() {
    this.stats.hungry = 0;
    hungryBar.style.width = `${this.stats.hungry*10}%`;
    this.checkStats();
  }
  play() {
    this.stats.bored <= 2 ? this.stats.bored = 0 : this.stats.bored -= 2;
    this.stats.sleepy += 0.5;
    this.stats.skill += 0.25;
    this.stats.hungry += 1.5;
    boredBar.style.width = `${this.stats.bored*10}%`;
    sleepyBar.style.width = `${this.stats.sleepy*10}%`;
    this.checkStats();
  }
  learn() {
    this.stats.bored <= 2 ? this.stats.bored = 0 : this.stats.bored -= 2;
    this.stats.sleepy += 0.5;
    this.stats.skill++;
    this.stats.hungry += 1.5;
    boredBar.style.width = `${this.stats.bored*10}%`;
    sleepyBar.style.width = `${this.stats.sleepy*10}%`;
    skillsBar.style.width = `${this.stats.skill*10}%`;
  }
  // Change color based on food eaten
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
  // activate animations when stats are in danger zone
  checkStats() {
    let statNums = Object.values(this.stats);
    statNums = statNums.slice(0, statNums.length - 1);
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
        // gameplay = 'off';       // stops life()
        return true;
      } 
    })
    // change color of progress bars that are at 8 or above;
    // trickyyyyyyyy couldn't select just one bar
    if (danger) {
      allBars.forEach(bar => {
        bar.classList.add('warning');
      })
    } else {
      allBars.forEach(bar => {
        bar.classList.remove('warning');
      })
    }
    // commented out below so game can continue during testing ////
    // if (dead) {
    //   messageBoxDiv.remove();
    //   statsBoxDiv.remove();
    //   interactionsDiv.remove();
    //   // move name to center, put Gotchi in a grave //////////////////
    // }

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
  intro() {
    // gotchi hatches, show statsBoxDiv, interactionsDiv, messageDiv,
    // DONT show name ~~ that comes after intro
    // explain game rules
  },
  start() {
    this.isAlive = true;
    this.intro();
    const gotchiName = prompt('What will you call your Tamagotchi?');
    const tamagotchi = new Gotchi(gotchiName);
    // update name~~
    nameSpan.textContent = gotchiName;
    // in case I want to develop so more gotchis are born::::
    this.gotchis.push(tamagotchi);

    // instead of prompt... a form might be better...
    // const gotchiName = prompt('What will you call your Tamagotchi?');
    // const tamagotchi = new Gotchi(gotchiName);
    header.classList.remove('display-none');
    main.classList.remove('display-none');
    footer.classList.remove('display-none');
    // life(this.gotchis[0]);
    this.life(this.gotchis[0]);
  },
  life(tamagotchi) {
    const timerId = setInterval(function() {
      console.log(game.time);
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
      // If any stats reach 10, game over.
      tamagotchi.checkStats();
      // if (this.gameplay === 'off') {
      if (this.isAlive === false) {
        clearInterval(timerId);
        this.gameOver();
      }
    }, 1000);
  },
  gameOver() {
    // if gotchi dies
  }
}


// ----------------------------- Events


startButton.addEventListener('click', function() {
  // remove start button,
  startButton.remove();
  // start float down animation
  moonImg.classList.add('float-down');
  moonImg.classList.add('wobble');
  // when animation is done, 
  // change background images of body and screen (maybe fade the screen to white for day)
  let waiting = true;
  let wait = 0;
  while (waiting) {
    const pause = setInterval(function() {
      if (wait === 6) {
        body.style.background = 'url(./images/ghilbli_day_2.jpg)';
        screen.style.background = 'url(./images/ghibli_background.jpg)';
        // moonImg.remove();
        clearInterval(pause);
        waiting = false;
      }
      wait++
    }, 1000);
    break;
  }



  // remove moon image
  // show gotchi image
  // show message, stats, and interaction boxes
})

// maybe have the user click the tamagotchi before clicking a button that way, the captured element can be passed into the event listeners below
// buttons are inactive until tamagotchi is clicked, then they are active and can be clicked.

feedButton.addEventListener('click', function(e) {
  game.gotchis[0].eat();
});
playButton.addEventListener('click', function(e) {
  game.gotchis[0].play();
});
teachButton.addEventListener('click', function(e) {
  game.gotchis[0].learn();
});
tuckButton.addEventListener('click', function(e) {
  game.gotchis[0].sleep();
});


// ----------------------------- testing testing testing

// const gotchi = new Gotchi('Gotchi');
// gameplay = 'on';
// game.life(gotchi);
// gotchi.checkStats();
// gotchi.getDesire();
// gotchi.getSkills();
// gotchi.checkAge();


// testing testing testing
// game.start();