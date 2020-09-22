// ----------------------------- Tamagotchi

// - Global Variables
// - Functions
// - Tamagotchi Class
// - Game Object
// - Events

// ----------------------------- Global Variables

const feedButton = document.getElementById('#feed');
const playButton = document.getElementById('#play');
const teachButton = document.getElementById('#teach');
const tuckButton = document.getElementById('#tuck-in');

const hungryBar = document.getElementById('#hungry');
const sleepyBar = document.getElementById('#sleepy');
const boredBar = document.getElementById('#bored');
const skillsBar = document.getElementById('#skills');

let time = 0;
let gameplay = 'off';

// ----------------------------- Functions

// start timer of pet counting up, increment sleep, boredome, and hunger with time
function lifetimer(tamagotchi) {
  const timerId = setInterval(function() {
    if (time % 45 === 0) {
      const sleepyVal = tamagotchi.stats.sleepy++;
      sleepyBar.setAttribute('value', sleepyVal);
    };
    if (time % 30 === 0) {
      const boredVal = tamagotchi.stats.bored++;
      const hungryVal = tamagotchi.stats.hungry++;
      boredBar.setAttribute('value', boredVal);
      hungryBar.setAttribute('value', hungryVal);
    };
    time++;
    if (gameplay === 'off') {
      clearInterval(timerId);
    }
  }, 1000);

}

// ----------------------------- Tamagotchi Class

class Gotchi {
  constructor(name) {
    this.name = name;
    this.age = 1;
    this.color = 'lightblue';
    this.desire = '';
    this.skill = '';
    this.stats = {
      hungry: 7,
      sleepy: 3,
      bored: 3
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
    this.sleepy = 0;
    sleepyBar.setAttribute('value', this.sleepy);
  }
  eat() {
    this.hungry = 0;
    hungryBar.setAttribute('value', this.hungry);
  }
  play() {
    this.bored <= 2 ? this.bored = 0 : this.bored -= 2;
    this.sleepy++;
    boredBar.setAttribute('value', this.bored);
    sleepyBar.setAttribute('value', this.sleepy);
  }
  learn() {
    this.bored <= 2 ? this.bored = 0 : this.bored -= 2;
    this.sleepy++
    boredBar.setAttribute('value', this.bored);
    sleepyBar.setAttribute('value', this.sleepy);
  }
  // Change color based on food eaten
  changeColor() {
    const foods = this.care.food.keys();
    let mostEaten;
    let amountEaten = 0;
    for (let i = 0; i < foods.length; i++) {
      if (this.care[foods[i]] > amountEaten) {
        mostEaten = foods[i];
        amountEaten = this.care[foods[i]];
      }
    }
    this.color = this.character.temper[mostEaten][1];
  }
  // activate animations when stats are in danger zone
  checkStats() {
    const statNums = this.stats.values();
    statNums.some(num => {
      if (num === 10) {
        alert(`${this.name} isn't responding anymore...`);
        game.isAlive = false;
        gameplay = false;       // stops lifetimer
      } else if (num >= 8) {
        alert(`${this.name} doesn't feel so good...`);
      }
    })
  }
  // Update desire/skill if age is 6 activate animations to hint at Tamagotchi's desire
  checkAge() {
    if (this.age === 6) {
      // activate desire / skills scenes
      this.desire = this.getDesire();
      this.skill = this.getSkills();
    }
    if (this.age === 10) {
      // activate wants a change scene
    }
  }
  getDesire() {
    const desires = this.care.play.keys();
    let mostPlayed;
    let amountPlayed = 0;
    for (let i = 0; i < desires.length; i++) {
      if (this.care[desires[i]] > amountPlayed) {
        mostPlayed = desires[i];
        amountPlayed = this.care[desires[i]];
      }
    }
    return this.character.desire[mostPlayed];
  }
  getSkills() {
    const skills = this.care.teach.keys();
    let mostTaught;
    let amountTaught = 0;
    for (let i = 0; i < skills.length; i++) {
      if (this.care[skills[i]] > amountTaught) {
        mostTaught = desires[i];
        amountTaught = this.care[skills[i]];
      }
    }
    return this.character.desire[mostTaught];
  }
}


// ----------------------------- Game Object

const game = {
  
}


// ----------------------------- Events

feedButton.addEventListener('click', game.feedGotchi());
playButton.addEventListener('click', game.playWithGotchi());
teachButton.addEventListener('click', game.teachGotchi());
tuckButton.addEventListener('click', game.tuckGatchiIn());