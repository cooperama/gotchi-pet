// ----------------------------- Tamagotchi

// - Global Variables
// - Functions
// - Tamagotchi Class
// - Game Object
// - Events

// ----------------------------- Global Variables

const feedButton = document.querySelector('#feed');
const playButton = document.querySelector('#play');
const teachButton = document.querySelector('#teach');
const tuckButton = document.querySelector('#tuck-in');
let time = 0;


// ----------------------------- Functions

// start timer of pet counting up, increment sleep, boredome, and hunger with time
function lifetimer(pet) {
  const timerId = setInterval(function() {
    if (time % 30000 === 0) {
      pet.stats.sleepy++;
    }
  })
}

// ----------------------------- Tamagotchi Class

class Gotchi {
  constructor(name) {
    this.name = name;
    this.age = 1;
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
    this.choices = [
      `Find ${this.name} a friend`,
      `Send ${this.name} to college`,
      `Set ${this.name} free`
    ],
    this.result = '';
  }
  sleep() {
    this.sleepy = 0;
  }
  eat() {
    this.hungry = 0;
  }
  play() {
    this.bored <= 2 ? this.bored = 0 : this.bored -= 2;
    this.sleepy++;
  }
  learn() {
    this.bored <= 2 ? this.bored = 0 : this.bored -= 2;
    this.sleepy++
  }
  // activate animations...
  checkStats() {
    const statNums = this.stats.values();
    statNums.some(num => {
      if (num === 10) {
        alert(`${this.name} isn't responding anymore...`);
        game.isAlive = false;
      } else if (num >= 8) {
        alert(`${this.name} doesn't feel so good...`);
      }
    })
  }
  checkAge() {
    if (this.age === 6) {
      // activate desire / skills scenes
      this.getDesire();
      this.getSkills();
    }
    if (this.age === 10) {
      // activate wants a change scene
    }
  }
  getColor() {
    const foods = this.care.food.keys();
    let mostEaten;
    let amountEaten = 0;
    for (let i = 0; i < foods.length; i++) {
      if (this.care[foods[i]] > amountEaten) {
        mostEaten = foods[i];
        amountEaten = this.care[foods[i]];
      }
    }
    return this.character.temper[mostEaten][1];
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