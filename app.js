const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

canvas.width = 64 * 32;
canvas.height = 64 * 18;
const flechaverde = "./assets/flechaVerde.png";
const flecharoja = "./assets/flechaRojo.png";
const flechaazul = "./assets/flechaAzul.png";
const flechaamarilla = "./assets/flechaAmarillo.png";

const hightAmarillo = 100
const hightRojo = 250
const hightVerde = 400
const hightAzul = 559
let rangoJuego = 1500; //la idea es poder mover esto en un futuro


let botones = []
let flechas = [];

class Game {
  constructor() {

    this.newArrow = 0;
    this.enemyTime = 0
    this.enemyInterval = 2500
  };
  draw(c) {


  }
  update() {



  };
  update2() {
    if (this.enemyTime > this.enemyInterval) {
      this.addEnemy();
      this.enemyTime = 0;
    } else {
      this.enemyTime += 16;
    }
    flechas = flechas.filter(flechas => !flechas.markForDelete)
    this.newArrow++
    if (this.newArrow > 300) {

      this.newArrow = 0

    };


  };
  addEnemy() {
    Math.random() < 0.5 ? nuevaFlechaVerde() : this.addEnemy2()
    // if (this.speed>0)this.enemies.push(new ClimbingEnemy(this))

    // this.enemies.push(new FlyingEnemy(this))
  }
  addEnemy2() {
    Math.random() < 0.5 ? this.addEnemy3() : nuevaFlechaRoja()
  }
  addEnemy3() {
    Math.random() < 0.5 ? nuevaFlechaAmarilla() : nuevaFlechaAzul()
  }
}



const nuevaFlechaVerde = () => {
  flechas.push(new Flecha(0, hightVerde, flechaverde))
}
const nuevaFlechaRoja = () => {
  flechas.push(new Flecha(0, hightRojo, flecharoja))
}
const nuevaFlechaAmarilla = () => {
  flechas.push(new Flecha(0, hightAmarillo, flechaamarilla))
}
const nuevaFlechaAzul = () => {
  flechas.push(new Flecha(0, hightAzul, flechaazul))
}

class Player {
  constructor(x) {
    this.ArrowUP = {
      x: x,
      y: 100,
      width: 100,
      height: 610
    };
    this.keys = [];
  };
  draw(c) {
    c.strokeRect(this.ArrowUP.x, this.ArrowUP.y, this.ArrowUP.width, this.ArrowUP.height)
    c.strokeRect(this.ArrowUP.x - 100, this.ArrowUP.y, this.ArrowUP.width, this.ArrowUP.height)

  }
  update() {



    this.acctionKey()
  }
  Arrow(x, y, width, height, color) {
    x = x;
    y = y;
    width = width;
    height = height;
    color = color
  }
  input() {
    window.addEventListener('keydown', e => {
      if ((e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'w' ||
        e.key === 'a' ||
        e.key === 'd' ||
        e.key === 's' ||
        e.key === ' ' ||
        e.key === 'f' ||
        e.key === 'g' ||
        e.key === 'Enter'
      )
        && this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key)
      }
    });
    window.addEventListener('keyup', e => {
      if (e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'w' ||
        e.key === 'a' ||
        e.key === 'd' ||
        e.key === 's' ||
        e.key === ' ' ||
        e.key === 'f' ||
        e.key === 'g' ||
        e.key === 'Enter') {
        this.keys.splice(this.keys.indexOf(e.keys), 1), botones = [];

      }
    });
  }
  acctionKey() {
    this.input()

    if (this.keys == 'ArrowRight') pressButon(rangoJuego, hightVerde, flechaverde), this.colitionArrow()
    else if (this.keys == 'ArrowLeft') pressButon(rangoJuego, hightRojo, flecharoja), this.colitionArrow()
    else if (this.keys == 'ArrowDown') pressButon(rangoJuego, hightAzul, flechaazul), this.colitionArrow()
    else if (this.keys == 'ArrowUp') pressButon(rangoJuego, hightAmarillo, flechaamarilla), this.colitionArrow()

  }
  colitionArrow() {

    for (let i = 0; i < flechas.length; i++) {
      let transicionalArrow = flechas[i]
      if (botones[0].x <= transicionalArrow.x + 25 &&
        botones[0].x + (botones[0].width / 2) >= transicionalArrow.x &&
        botones[0].y <= transicionalArrow.y + transicionalArrow.height &&
        botones[0].y + botones[0].height >= transicionalArrow.y) {

        setTimeout(() => {
          transicionalArrow.markForDelete = true
        }, 500);
      }

    }
  }

}

class PressButton {
  constructor(x, y, imagen) {
    this.x = x,
      this.y = y,
      this.image = new Image(),
      this.image.src = imagen,
      this.width = 100,
      this.height = 100
  }
  draw() {

    c.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
}


const pressButon = (x, y, imagen) => {
  x = x
  y = y
  imagen = imagen

  botones.push(new PressButton(x, y, imagen))
}


class Flecha {
  constructor(x, y, srcImage) {
    this.x = x;
    this.y = y;

    this.image = new Image()
    this.image.src = srcImage
    this.width = 100;
    this.height = 100;
    this.markForDelete = false;
    this.newArrowGreen = 0

  }
  draw() {

    c.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  update() {
    this.x += 2;
    if (this.x > canvas.width) {
      this.markForDelete = true
    }
  }
}



const game = new Game()
const player = new Player(rangoJuego)



const animate = () => {

  c.fillStyle = " white"
  c.fillRect(0, 0, canvas.width, canvas.height)
  botones.forEach(botones =>
    botones.draw())


  for (let i = 0; i < flechas.length; i++) {
    let qv = flechas[i]

    qv.draw()
    qv.update()

  }
  player.draw(c)
  player.update()
  game.draw(c)
  game.update()
  game.update2()


  requestAnimationFrame(animate)
};
animate()