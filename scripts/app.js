// ----------------------------- Tamagotchi

// - Global Variables
// - Functions
// - Tamagotchi Class
// - Game Object
// - Events

// ----------------------------- Global Variables

const feedButton = document.getElementById('feed');
const playButton = document.getElementById('play');
const teachButton = document.getElementById('teach');
const tuckButton = document.getElementById('tuck-in');

const hungryBar = document.getElementById('hungry-progress');
const sleepyBar = document.getElementById('sleepy-progress');
const boredBar = document.getElementById('bored-progress');
const skillsBar = document.getElementById('skills-progress');
// const statBarList = [hungryBar, sleepyBar, boredBar];
// const statsUl = document.querySelector('.stats');
const allBars = document.querySelectorAll('.bar')

const ageSpan = document.querySelector('.age');
const nameSpan = document.querySelector('.name')

const messageP = document.querySelector('.message');

let time = 0;
let gameplay = 'off';

// ----------------------------- Functions

// start timer of pet counting up, increment sleep, boredome, and hunger with time
function lifetimer(tamagotchi) {
  const timerId = setInterval(function() {
    console.log(time);
    if (time % 15 === 0) {
      const sleepyVal = tamagotchi.stats.sleepy++;
      console.log('sleepyVal: ', sleepyVal)
      sleepyBar.style.width = `${sleepyVal*10}%`;
    };
    if (time % 3 === 0) {
      const boredVal = tamagotchi.stats.bored++;
      const hungryVal = tamagotchi.stats.hungry++;
      console.log('boredVal: ', boredVal)
      console.log('hungry Val: ', hungryVal)
      boredBar.style.width = `${boredVal*10}%`;
      hungryBar.style.width = `${hungryVal*10}%`;
    };
    time++;
    // If any stats reach 10, game over.
    tamagotchi.checkStats();
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
    this.stats.hungry += 0.5;
    boredBar.style.width = `${this.stats.bored*10}%`;
    sleepyBar.style.width = `${this.stats.sleepy*10}%`;
    this.checkStats();
  }
  learn() {
    this.stats.bored <= 2 ? this.stats.bored = 0 : this.stats.bored -= 2;
    this.stats.sleepy += 0.5;
    this.stats.skill++;
    this.stats.hungry++;
    boredBar.style.width = `${this.stats.bored*10}%`;
    sleepyBar.style.width = `${this.stats.sleepy*10}%`;
    console.log('this.stats.bored after: ', `${this.stats.bored*10}%`)
    console.log('this.stats.sleepy after: ', `${this.stats.sleepy*10}%`)
    skillsBar.style.width = `${this.stats.skill*10}%`;
  }
  // Change color based on food eaten
  changeColor() {
    console.log('this.color before: ', this.color)
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
    console.log('this.color after: ', this.color)
  }
  // activate animations when stats are in danger zone
  checkStats() {
    // let statNums = Object.values(this.stats);
    // let danger = statNums.slice(0, statNums.length - 1).some(num => {
    //   if (num >= 10) {
    //     messageP.textContent = `${this.name} isn't responding anymore...`;
    //     game.isAlive = false;
    //     gameplay = 'off';       // stops lifetimer
    //   } else if (num >= 8) {
    //     messageP.textContent = `${this.name} doesn't feel so good...`;
    //   } 
    // });
    // console.log(danger)
    // // change color of progress bars that are at 8 or above;
    // if (danger) {
    //   let statBars = Object.values(this.stats);
    //   statBars.foreach(statbar => {
    //     console.log(statbar)
    //     if (this.stats[statbar] >= 8) {
    //     }
    //   })
    // }
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
    statNums.some( num => {
      if (num > 10) {
        messageP.textContent = `${this.name} isn't responding anymore...`;
        game.isAlive = false;
        gameplay = 'off';       // stops lifetimer
      } 
    })
    console.log(danger)
    // change color of progress bars that are at 8 or above;
    // trickyyyyyyyy couldn't select just one bar
    if (danger) {
      allBars.forEach(bar => {
        bar.classList.add('warning');
      })
      // let statBars = Object.keys(this.stats);
      // statBars.forEach(statbar => {
      //   if (this.stats[statbar] >= 8) {
      //     console.log(statbar)
      //     // change color of progress bar
      //   }
      // })
      // let statBars = Object.keys(this.stats);
      // statBarList.forEach(statbar => {
      //   if () {
      //     console.log(statbar)
      //     statbar.style.backgroundColor = 'orange';
      //     // change color of progress bar
      //   }
      // })
    } else {
      allBars.forEach(bar => {
        bar.classList.remove('warning');
      })
    }

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
  
}


// ----------------------------- Events


feedButton.addEventListener('click', function(e) {
  gotchi.eat();
});
playButton.addEventListener('click', function(e) {
  gotchi.play();
});
teachButton.addEventListener('click', function(e) {
  gotchi.learn();
});
tuckButton.addEventListener('click', function(e) {
  gotchi.sleep();
});


// testing testing testing

const gotchi = new Gotchi('Gotchi');
gameplay = 'on';
lifetimer(gotchi);
// gotchi.checkStats();
// gotchi.getDesire();
// gotchi.getSkills();

// testing testing testing
