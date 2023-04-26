const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const puntuaje = document.getElementById('puntuaje')
const time = document.getElementById('time')

canvas.width = 64 * 32;
canvas.height = 64 * 18;
const flechaverde = "./assets/flechaVerde.png";
const imVerde = new Image();
imVerde.src = flechaverde

const flecharoja = "./assets/flechaRojo.png";
const imRojo = new Image();
imRojo.src = flecharoja
const flechaazul = "./assets/flechaAzul.png";
const imAzul = new Image();
imAzul.src = flechaazul
const flechaamarilla = "./assets/flechaAmarillo.png";
const imAmarillo = new Image();
imAmarillo.src = flechaamarilla

const hightAmarillo = 100
const hightRojo = 250
const hightVerde = 400
const hightAzul = 559
let rangoJuego = 1500; //la idea es poder mover esto en un futuro
let enemySpeed = 5
let makePoint = true
let gameOver = false;

let botones = []
let flechas = [];

class Game {
  constructor() {

    this.newArrow = 0;
    this.enemyTime = 0
    this.enemyInterval = 1500
    this.time = 0;
    this.maxTime = 20000;

    this.score = 0;
  };
  draw(c) {





  }
  update(deltatime) {
    puntuaje.innerText = game.score
    time.innerText = this.time
    this.time += deltatime
    if (this.time > this.maxTime) {
      gameOver = true,
        mensajeGameOver()
    }


  };
  update2(deltatime) {
    if (this.enemyTime > this.enemyInterval) {
      this.addEnemy();
      this.enemyTime = 0;
    } else {
      this.enemyTime += deltatime;
    }
    flechas = flechas.filter(flechas => !flechas.markForDelete)

    // aqui estaba un modulo que no era necesario para nada :D


  };
  addEnemy() {
    Math.random() < 0.4 ? nuevaFlechaVerde() : this.addEnemy2()
    // if (this.speed>0)this.enemies.push(new ClimbingEnemy(this))

    // this.enemies.push(new FlyingEnemy(this))
  }
  addEnemy2() {
    Math.random() < 0.6 ? this.addEnemy3() : nuevaFlechaRoja()
  }
  addEnemy3() {
    Math.random() < 0.5 ? nuevaFlechaAmarilla() : nuevaFlechaAzul()
  }
}

const mensajeGameOver = () => {

  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.fillStyle = "black"
  c.font = "150px serif";
  c.fillText("Game Over ", canvas.width / 2, 200);
  c.font = "50px serif";
  c.fillText(`tu puntaje fue de ${game.score}`, canvas.width / 2, 250);
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
    c.drawImage(imVerde, rangoJuego, hightVerde, 100, 100)
    c.drawImage(imRojo, rangoJuego, hightRojo, 100, 100)
    c.drawImage(imAzul, rangoJuego, hightAzul, 100, 100)
    c.drawImage(imAmarillo, rangoJuego, hightAmarillo, 100, 100)


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
    if (makePoint) {
      for (let i = 0; i < flechas.length; i++) {
        let transicionalArrow = flechas[i]
        if (botones[0].x <= transicionalArrow.x + 25 &&
          botones[0].x + (botones[0].width / 2) >= transicionalArrow.x &&
          botones[0].y <= transicionalArrow.y + transicionalArrow.height &&
          botones[0].y + botones[0].height >= transicionalArrow.y) {
          makePoint = false



          setTimeout(() => {
            transicionalArrow.markForDelete = true
            game.score++
            makePoint = true
          }, 500);
        }

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
    this.x += enemySpeed;
    if (this.x > canvas.width) {
      this.markForDelete = true
    }
  }
}
const game = new Game()
const player = new Player(rangoJuego)
let lastime = 0
const animate = (timeStamp) => {
  const deltatime = timeStamp - lastime;
  lastime = timeStamp


  c.fillStyle = " white"
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.save()
  c.globalAlpha = 0.3
  player.draw(c)

  c.restore()
  botones.forEach(botones =>
    botones.draw())


  for (let i = 0; i < flechas.length; i++) {
    let qv = flechas[i]
    qv.draw()
    qv.update()
  }

  player.update()
  game.draw(c)
  game.update(deltatime)
  game.update2(deltatime)

  if (!gameOver) {
    requestAnimationFrame(animate)
  }
};
animate(0)


