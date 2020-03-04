var bunny_img
var robot_img
var logo_img
var background_img
var twitter_bird_img
var jumpSound
var inGame
var score
var velocity
var count
var counting
var closestX
var closestTopY
var closestBotY
var pipes
var bird
var IABird

var end = false

var net
var betterBunny = 0
var betterJSON = null

var userData = null
var testing = false

function preload() {
  bunny_img = loadImage('img/bunny.png')
  twitter_bird_img = loadImage('img/twitter_bird.png')
  robot_img = loadImage('img/robot2.png')
  logo_img = loadImage('img/logo.png')
  jumpSound = loadSound('sound/tap.mp3')
  background_img = loadImage('img/background.jpg')
}

function setup() {
  var width = 1368
  var height = 768
  createCanvas(width, height)
  frameRate(60)
  clear()
  background(background_img)
}

function draw() {

  if (inGame) {
    if (!bird.collide(closestX, closestBotY, closestTopY, testing)) {
      clear()
      background(background_img)

      if (!testing) {
        bird.draw()
        image(bunny_img, bird.getX(), bird.getY())
      }

      IABird.think(closestTopY)
      IABird.draw()
      image(robot_img, IABird.getX(), IABird.getY())

      for (var i = 0; i < pipes.length; i++) {
        pipes[i].draw()
        if (pipes[i].outOfBounds()) {
          pipes[i] = new Pipe(1368)
          score++
          var elem = document.getElementById('score')
          elem.innerText = score
        }
        if (pipes[i].checkOut(100)) {
          closestX = 1000
        } else if (pipes[i].getX() < closestX) {
          closestX = pipes[i].getX()
          closestBotY = pipes[i].getBotY()
          closestTopY = pipes[i].getTopY()
        }
      }
      image(logo_img, 1192, 588, 150, 150)
    } else {
      gameOver(false)
      inGame = false
    }
    if (IABird.collide(closestX, closestBotY, closestTopY, false)) {
      gameOver(true)
    }
  }
}

function gameOver(victory) {
  inGame = false
  end = true
  if (victory) {
    $('#countdown').text('Parabéns!')
    $('#countdown').css('margin-left', '38vw')
    $('#countdown').show()
    $('#score').addClass('animated infinite')
    $('#score').addClass('rubberBand')
    $('#countdown').addClass('animated')
    $('#countdown').addClass('fadeInRight')
  } else {
    $('#countdown').text('Fim de Jogo')
    $('#countdown').css('margin-left', '35vw')
    $('#countdown').show()
    $('#score').addClass('animated infinite')
    $('#score').addClass('rubberBand')
    $('#countdown').addClass('animated')
    $('#countdown').addClass('fadeInRight')
  }
  socket.emit('game over', {score: score, win: victory})
  if (testing) {
    window.location.replace('./')
  }
}

function keyPressed() {
  if (inGame) {
    if (keyCode === UP_ARROW || keyCode == 32) {
      bird.up()
      jumpSound.play()
    }
  } else {
    if (keyCode === ENTER) {
      window.location.replace('./')
    }
  }
  if (keyCode == 70) {
    var fs = fullscreen()
    fullscreen(!fs)
  }
}

function initGame(json) {
  pipes = [new Pipe(684), new Pipe(1026), new Pipe(1368), new Pipe(1710)]
  bird = new Bird(200, 100, 'human')
  IABird = new Bird(100, 100, 'bot')

  closestX = 684
  closestTopY = 0
  closestBotY = 0

  count = 3

  $('#score').text('0')
  $('#countdown').show()

  inGame = false

  countdown = function() {
    if (!end) {
      if (count === 1 || testing) {
        inGame = true;
        $('#countdown').hide('slow')
        $('#score').show('slow')
        clearInterval(counting)
      } else {
        count--
        $('#countdown').text(count)
      }
    } else {
      clearInterval(counting)
    }
  }

  counting = setInterval(function() { countdown() }, 1000)

  score = 0

  $('#countdown').hide()
  $('#score').show()

  velocity = 60
}

initGame()
