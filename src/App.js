import React, { Component } from 'react';
import './App.css';
import Floor from './Floor'
import Enemy from './Enemy'
import Boss from './Boss'
import Hero from './Hero'
import HealthPotion from './HealthPotion'
import Weapon from './Weapon'
import NextFloor from './NextFloor';
import Wall from './Wall'


class App extends Component {
  wall = [10,11,31]


  constructor(props){
    super(props)
      this.state = {
        level:1,
        floor: [],
        hero: this.randomNumber(),
        heroHealth: 100,
        heroExp: 0,
        heroLevel: 1,
        heroAttack: 5,
        heroWeapon: "Stick",
        newWeapons: [
          [this.randomNumber(),"Wooden Sword",10],
          [400+this.randomNumber(),'Steel Sword',10],
          [800+this.randomNumber(),'Battle Axe',10],
          [1200+this.randomNumber(),'Soggy Pickle',10]
        ],
        healthPotions: [this.randomNumber(),400+this.randomNumber(),800+this.randomNumber(),1200+this.randomNumber()],
        enemyStats: [
          [this.randomNumber(),10,1],
          [this.randomNumber(),10,1],
          [this.randomNumber(),10,1],
          [this.randomNumber(),10,1],
          [400+this.randomNumber(),20,5],
          [400+this.randomNumber(),20,5],
          [400+this.randomNumber(),20,5],
          [400+this.randomNumber(),20,5],
          [800+this.randomNumber(),40,10],
          [800+this.randomNumber(),40,10],
          [800+this.randomNumber(),40,10],
          [800+this.randomNumber(),40,10],
          [1200+this.randomNumber(),60,15],
          [1200+this.randomNumber(),60,15],
          [1200+this.randomNumber(),60,15],
          [1200+this.randomNumber(),60,15],
          ],
        boss: [1200+this.randomNumber(),100, 20],
        nextLevel: [this.randomNumber(), 400+this.randomNumber(), 800+this.randomNumber()]
      };
  }


  componentWillMount(){
    console.log('will mount');
    this.buildLevel()
  }

  componentDidMount(){
    console.log('did mount');
    document.addEventListener("keydown", this.moveHero.bind(this));
  }

  randomNumber(){
    console.log(this.wall);
    let randomNumber = Math.floor(Math.random()*400)
    if (this.wall.includes(randomNumber)) {
      console.log("its a wall");
      this.randomNumber()
    }else {
      return randomNumber
    }
  }

  right(event,rowLength){
    let nextTile = this.state.hero+1
    if (event.key === "ArrowRight" && (this.state.hero%rowLength) !== 19) {
      this.tileCheck(nextTile)
    }
  }

  left(event,rowLength){
    let nextTile = this.state.hero-1
    if (event.key === "ArrowLeft" && this.state.hero%(rowLength) !== 0) {
      this.tileCheck(nextTile)
    }
  }

  down(event,floorLength,rowLength){
    let nextTile = this.state.hero+rowLength
    if (event.key === "ArrowDown" && this.state.hero < (floorLength-rowLength + this.state.level -1)) {
      this.tileCheck(nextTile)
    }
  }

  up(event,floorLength,rowLength){
    let nextTile = this.state.hero-rowLength
    if (event.key === "ArrowUp" && this.state.hero > (rowLength  + this.state.level - 2)) {
      this.tileCheck(nextTile)
    }
  }

  movement(event){
    console.log(this.state.hero);
    let floorLength = this.state.floor.length
    let rowLength = Math.sqrt(floorLength)

    this.right(event,rowLength)
    this.left(event,rowLength)
    this.down(event,floorLength,rowLength)
    this.up(event,floorLength,rowLength)
  }

  tileCheck(nextTile){
    if (this.enemiesArray().includes(nextTile)) {
      this.attackEnemy(nextTile)
    } else if (this.state.boss[0] === nextTile) {
      this.attackBoss(nextTile)
    } else if (this.state.healthPotions.includes(nextTile)) {
      this.consumePotion(nextTile)
      this.setState({hero: nextTile})
    } else if (this.weaponsArray().includes((nextTile))) {
      this.pickUpWeapon(nextTile)
    } else if (this.state.nextLevel.includes(nextTile)) {
      this.nextLevel()
    } else if (this.wall.includes(nextTile)) {
      //its a wall can't do anything right now
    } else {
      this.setState({hero: nextTile})
    }
  }

  nextLevel(){
    console.log('lets go to next level');
    let newLevel = this.state.level + 400
    let newHeroLocation = this.state.hero + 400
    this.setState({
            level: newLevel,
            hero: newHeroLocation
          })
  }

  attackEnemy(location){
    let enemy = this.state.enemyStats
    let enemyIndex = this.enemiesArray().indexOf(location)
    enemy[enemyIndex][1] = enemy[enemyIndex][1] - (this.state.heroAttack*(Math.random()*.25+.75));
    let heroHealth = this.state.heroHealth - enemy[enemyIndex][2]

    if (heroHealth <= 0) {
      alert('The hero has been defeated')
      this.setState({hero:-1})
    }

    if (enemy[enemyIndex][1] <= 0) {
      let heroExp = this.state.heroExp + 20
      this.setState({heroExp})
      enemy.splice(enemyIndex,1)
    }

    if (this.state.heroExp === 100) {
      this.setState({
              heroExp: 0,
              heroAttack: this.state.heroAttack*1.2,
              heroLevel: this.state.heroLevel+1
      })
    }

    this.setState({
            enemyStats: enemy,
            heroHealth
    })
  }

  attackBoss(location){
    let boss = this.state.boss
    boss[1] = boss[1] - (this.state.heroAttack*(Math.random()*.25+.75));
    let heroHealth = this.state.heroHealth - boss[2]

    if (heroHealth <= 0) {
      alert('The hero has been defeated')
      this.setState({hero:-1})
    }

    if (boss[1] <= 0) {
      alert('You have defeated the Dungeon Boss!!!!')
      this.setState({
            hero:-1,
            boss:[]
      })
    } else {
      this.setState({
              boss,
              heroHealth
      })
    }
  }

  consumePotion(location){
    let potionIndex = this.state.healthPotions.indexOf(location);
    let potionArray = this.state.healthPotions
    potionArray.splice(potionIndex,1)
    this.setState({
            heroHealth: this.state.heroHealth+20,
            healthPotions: potionArray
    })
  }

  pickUpWeapon(location){
    let weapons = this.state.newWeapons
    let weaponsIndex = this.weaponsArray().indexOf(location)
    let heroWeapon = weapons[weaponsIndex][1]
    let heroAttack = this.state.heroAttack + weapons[weaponsIndex][2]
    weapons.splice(weaponsIndex,1)

    this.setState({
            heroAttack,
            heroWeapon,
            newWeapons: weapons
    })
  }

  moveHero(event){
    this.movement(event)
    this.buildLevel()
  }

  fogOfWar(tile){
    let postion = this.state.hero
    let fogArray = [postion-3,postion-2,postion-22,postion+18,postion-1,postion-21,postion-41,postion+19,postion+39,
                    postion+3,postion+2,postion+22,postion-18,postion+1,postion+21,postion+41,postion-19,postion-39,
                    postion+20,postion+40,postion+60,postion-20,postion-40,postion-60]

    switch (this.state.hero%20) {
      case 0:
        fogArray.splice(0,9)
        break;
      case 1:
        fogArray.splice(0,4)
        break;
      case 2:
        fogArray.splice(0,1)
        break;
      case 17:
        fogArray.splice(9,1)
        break;
      case 18:
        fogArray.splice(9,4)
        break;
      case 19:
        fogArray.splice(9,9)
        break;
      default:
    }

    if (fogArray.includes(tile)) {
        return true
    }
  }

  buildLevel(){
    console.log('build');
    var floor = []
    for(var i=this.state.level-1; i<this.state.level+399; i++){
      if (i === this.state.hero) {
        floor.push(<Hero key={i}/>)
      } else if (this.enemiesArray().includes(i)) {
        if (!this.fogOfWar(i)) {
          floor.push(<Enemy key={i} view="hidden-floor"/>)
        }else {
          floor.push(<Enemy key={i} view="enemy" sprite={true}/>)
        }
      } else if (this.state.healthPotions.includes(i)) {
        if (!this.fogOfWar(i)) {
          floor.push(<HealthPotion key={i} view="hidden-floor"/>)
        }else {
          floor.push(<HealthPotion key={i} view="potion" sprite={true}/>)
        }
      } else if (this.weaponsArray().includes(i)) {
        if (!this.fogOfWar(i)) {
          floor.push(<Weapon key={i} view="hidden-floor"/>)
        }else {
          floor.push(<Weapon key={i} view="weapon" spriteLocation={i}/>)
        }
      } else if (this.state.nextLevel.includes(i)) {
        if (!this.fogOfWar(i)) {
          floor.push(<NextFloor key={i} view="hidden-floor"/>)
        }else {
          floor.push(<NextFloor key={i} view="next-floor" sprite={true}/>)
        }

      } else if (this.state.boss[0] === i) {
        if (!this.fogOfWar(i)) {
          floor.push(<Boss key={i} view="hidden-floor"/>)
        }else {
          floor.push(<Boss key={i} view="boss" sprite={true}/>)
        }
      } else if (this.wall.includes(i)) {
        if (!this.fogOfWar(i)) {
          floor.push(<Wall key={i} view="wall"/>)
        }else {
          floor.push(<Wall key={i} view="wall" />)
        }
      } else {
        if (!this.fogOfWar(i)) {
          floor.push(<Floor key={i} view="hidden-floor"/>)
        }else {
          floor.push(<Floor key={i} view="floor"/>)
        }
      }
    }
    this.setState({floor:floor})
  }


  //Arrays for level builder to display correct coponenets
  weaponsArray(){
    var weaponsArray = []

    this.state.newWeapons.forEach(function(weapon){
      weaponsArray.push(weapon[0])
    })
    return weaponsArray
  }

  enemiesArray(){
    var enemiesArray = []

    this.state.enemyStats.forEach(function(enemy){
      enemiesArray.push(enemy[0])
    })
    return enemiesArray
  }

  render() {
    return (
      <div className="container">
        <div className="stats">
          <span>Hero's Level: {this.state.heroLevel}  </span>
          <span>Hero's Health: {this.state.heroHealth}  </span>
          <span>Hero's Experience: {this.state.heroExp}  </span>
          <br />
          <span>Dungeon Level: {Math.floor(this.state.level/400)+1} </span>
          <span>Attack: {this.state.heroAttack*.75} - {this.state.heroAttack} </span>
          <span>Weapon: {this.state.heroWeapon} </span>
        </div>
        <div className="app">
          {this.state.floor}
        </div>
      </div>
    );
  }
}


export default App;
