const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const puntuaje = document.getElementById('puntuaje')
const time = document.getElementById('time')
const divGameOver = document.querySelector('.gameOver')
const botonera = document.querySelector('.botones')
const inicio = document.querySelector('.gameStar')
const opciones = document.querySelector('.opciones')




canvas.width = 64 * 18;  //32
canvas.height = 64 * 32;  //18
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
const flechaamarilla2 = "./assets/flechaAmarillo2.png";
const imAmarillo = new Image();
imAmarillo.src = flechaamarilla
let altura = -50;
let anchura = 100
const yAmarillo = altura //+ 0
const yRojo = altura//+ 150;
const yVerde = altura// + 300
const yAzul = altura// + 450




const xAmarillo = anchura + 300
const xRojo = anchura + 0;
const xVerde = anchura + 870
const xAzul = anchura + 600


let yJuego = canvas.height - 150;



let rangoJuego = 1700;

let makePoint = true
let gameOver = true;
let segundos = -1;
let botones = []
let flechas = [];



class Game {
  constructor() {
    this.enemySpeed = 5
    this.newArrow = 0;
    this.enemyTime = 0
    this.enemyInterval = 1000
    this.time = 0;
    this.maxTime = 5;
    this.score = 0;
    this.backGround = new Image()
    this.backGround.src = "./assets/wallpaper.png"
  };
  draw(c) {

  }
  update(deltatime) {
    // difilcultad 
    dificultad()


    // apuntadores hacia HTML
    puntuaje.innerText = this.score



    if (segundos >= this.maxTime) {
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
  };
  addEnemy() {
    Math.random() < 0.4 ? nuevaFlechaVerde() : this.addEnemy2()

  }
  addEnemy2() {
    Math.random() < 0.6 ? this.addEnemy3() : nuevaFlechaRoja()
  }
  addEnemy3() {
    Math.random() < 0.5 ? nuevaFlechaAmarilla() : nuevaFlechaAzul()
  }
}

setInterval(function () {
  segundos++;
  time.innerHTML = segundos + ' segundos';
}, 1000);




const nuevaFlechaVerde = () => {
  flechas.push(new Flecha(xVerde, yVerde, flechaverde))
}
const nuevaFlechaRoja = () => {
  flechas.push(new Flecha(xRojo, yRojo, flecharoja))
}
const nuevaFlechaAmarilla = () => {
  flechas.push(new Flecha(xAmarillo, yAmarillo, flechaamarilla))
}
const nuevaFlechaAzul = () => {
  flechas.push(new Flecha(xAzul, yAzul, flechaazul))
}

const dificultad = () => {
  switch (segundos) {
    case 5:
      game.enemySpeed = 6.5
      game.enemyInterval = 950
      break
    case 10:
      game.enemySpeed = 7
      game.enemyInterval = 800
      break
    case 15:
      game.enemySpeed = 8.5
      game.enemyInterval = 850
      break
    case 20:
      game.enemySpeed = 10
      game.enemyInterval = 750
      break
    case 25:
      game.enemySpeed = 11.5
      game.enemyInterval = 500
      break
    case 30:
      game.enemySpeed = 12
      game.enemyInterval = 600
    case 35:
      game.enemySpeed = 12.5
      game.enemyInterval = 500
      break
    case 40:
      game.enemySpeed = 13
      game.enemyInterval = 400
      break
    case 45:
      game.enemySpeed = 13.5
      game.enemyInterval = 350
      break
    case 50:
      game.enemySpeed = 14
      game.enemyInterval = 300
      break
    case 55:
      game.enemySpeed = 15
      game.enemyInterval = 100
      break

  }
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
    c.fillStyle = "black"
    c.font = '80px Silkscreen'
    c.fillText('TIEMPO ', canvas.width / 3, 80);
    c.fillText(segundos, 510, 157);



    c.drawImage(imVerde, xVerde, yJuego, 100, 100)
    c.drawImage(imRojo, xRojo, yJuego, 100, 100)
    c.drawImage(imAzul, xAzul, yJuego, 100, 100)
    c.drawImage(imAmarillo, xAmarillo, yJuego, 100, 100)


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

    if (this.keys == 'ArrowRight') pressButon(xVerde, yJuego, flechaverde), this.colitionArrow()
    else if (this.keys == 'ArrowLeft') pressButon(xRojo, yJuego, flecharoja), this.colitionArrow()
    else if (this.keys == 'ArrowDown') pressButon(xAzul, yJuego, flechaazul), this.colitionArrow()
    else if (this.keys == 'ArrowUp') pressButon(xAmarillo, yJuego, flechaamarilla), this.colitionArrow()

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

// funciones del HTML
const gameStart = () => {
  inicio.classList.add('noMostrar')
  botonera.classList.remove('noMostrar'), animate(0);
}

const showopciones = () => { opciones.classList.add('mostrar'), opciones.classList.remove('noMostrar') }
const shangeTime = (t) => {
  game.maxTime = t, opciones.classList.add('noMostrar');
}
const releaseButons = () => { player.keys = [], botones = [] }
const pushArriba = () => { player.keys.push('ArrowUp') }
const pushAbajo = () => { player.keys.push('ArrowDown') }
const pushDerecha = () => { player.keys.push('ArrowRight') }
const pushIzquierda = () => { player.keys.push('ArrowLeft') }
const mensajeGameOver = () => {
  divGameOver.classList.add('mostrar')

  divGameOver.classList.remove('noMostrar')

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
    this.crecer = .25

  }
  draw() {

    c.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  update() {
    this.y += game.enemySpeed;
    // this.x -= .4
    // this.width += this.crecer
    // this.height += this.crecer
    if (this.y > canvas.height) {
      this.markForDelete = true
    }
  }
}
class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.image = image
    this.width = 2244
    this.height = 2048
    this.speedModifier = speedModifier
  }
  update() {
    if (this.x < -this.width) this.x = 0;
    else this.x -= this.speedModifier * (game.enemySpeed * 0.2)

  }
  draw() {
    c.drawImage(this.image, this.x, this.y, this.width, this.height)
    c.drawImage(this.image, this.x + this.width - this.speedModifier, this.y, this.width, this.height)


  }
}

class BackGround {
  constructor() {
    this.width = canvas.width;
    this.height = canvas.height;
    this.imagelayer1 = layer1
    this.imagelayer2 = layer2
    this.imagelayer3 = layer3
    this.imagelayer4 = layer4
    this.layer1 = new Layer(this.imagelayer1, 0.8)
    this.layer2 = new Layer(this.imagelayer2, 0.4)
    this.layer3 = new Layer(this.imagelayer3, 0.6)
    this.layer4 = new Layer(this.imagelayer4, 0)  // este es el fondo azul detras no es necesario qu este moviendo

    this.bGArray = [this.layer4, this.layer2, this.layer3, this.layer1]

  }
  update() {
    this.bGArray.forEach(Layer => {
      Layer.update()
    })
  }
  draw() {
    this.bGArray.forEach(Layer => {
      Layer.draw()

    })
  }
}

let backGround = new BackGround()

const game = new Game()
const player = new Player(rangoJuego)
let lastime = 0
const animate = (timeStamp) => {
  const deltatime = timeStamp - lastime;
  lastime = timeStamp
  gameOver = false

  c.fillStyle = " white"
  c.fillRect(0, 0, canvas.width, canvas.height)
  backGround.draw()
  backGround.update()
  game.draw(c)

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

  game.update(deltatime)
  game.update2(deltatime)

  if (!gameOver) {
    requestAnimationFrame(animate)
  }
};
// animate(0)