var stage = document.getElementById('stage')

var c = stage.getContext('2d')

var colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "white",
  "purple",
  "orange"
]

var box = {
  x: stage.width/2,
  y: stage.height/2,
  w: 10,
  h: 10,
  dx: 4,
  dy: 4,
  c: 0
} 

// paddel left


var leftPaddel ={
  x: 40,
  y: (stage.height / 2) -50,
  w: 10,
  h: 100,
  dy:0,
  c: "white",
  score: 0

}

// paddel right
var rightPaddel ={
  x: stage.width -40 -10,
  y: (stage.height / 2) -50,
  w: 10,
  h: 100,
  dy:0,
  c: "white",
  score: 0
}

function draw(){

  // clear the screen / draw background
  c.beginPath()
  c.rect(0, 0, stage.width, stage.height)
  c.fillStyle = "black"
  c.fill()
  c.textAlign = "center"

  if (leftPaddel.score == 5 || rightPaddel.score == 5){

    var winner = "left wins"

    if (rightPaddel.score > leftPaddel.score){

      winner = "right wins"

    }

    c.font = "100px monospace" 
    c.fillStyle ="white"
    c.fillText( winner, stage.width/2, stage.height/2)

    //reset game

    leftPaddel.score = 0
    rightPaddel.score = 0
   
    leftPaddel.y = (stage.height /2) -50
    rightPaddel.y = (stage.height /2) -50

    box.x = stage.width /2
    box.y = stage.height /2
    box.dx = - 4
    box.dy = 0
    
   setTimeout(draw, 5000)

    return 

  }

  //draw left paddel 
  c.beginPath()
  c.rect(
    leftPaddel.x,
    leftPaddel.y,
    leftPaddel.w,
    leftPaddel.h
  )
  c.fillStyle = leftPaddel.c
  c.fill()

 //draw right paddel 
  c.beginPath()
  c.rect(
    rightPaddel.x,
    rightPaddel.y,
    rightPaddel.w,
    rightPaddel.h
  )
  c.fillStyle = rightPaddel.c
  c.fill()

  // draw the box

  c.beginPath()
  c.rect(box.x, box.y, box.w, box.h)
  c.fillStyle = colors[box.c % colors.length]
  c.fill()

  // draw dashed line 

  c.beginPath()
  c.setLineDash([10 , 5])
  c.moveTo(stage.width /2, 0)
  c.lineTo(stage.width /2 ,stage.height)
  c.stroke()
  c.lineWidth= 3
  c.strokeStyle = "white"

  // draw scores 

  c.font = "38px monospace"
  c.fillStyle="white"
  
  //left score
  
  c.fillText(leftPaddel.score, stage.width/4, 40)

  //right score
  c.fillText(rightPaddel.score, (stage.width/4)*3, 40)
  

  // has the box hit the right side
  if (box.x + box.w > stage.width){
    box.dx = -box.dx
    box.c++

    box.dx = -4 - leftPaddel.score - rightPaddel.score
    box.dy = 0
    box.x = stage.width /2
    box.y = stage.height /2

    leftPaddel.score++
  }

  // has the box hit the bottom 

  if (box.y + box.h > stage.height) {

    box.dy = -box.dy
    box.c++
  }

  //has the box hit the left 
  if (box.x < 0){

    box.dx = -box.dx
    box.c++
 
    box.dx = 4 + leftPaddel.score + rightPaddel.score
    box.dy = 0
    box.x = stage.width / 2
    box.y = stage.height / 2
    rightPaddel.score++
  }

  // dose box hit the top 

  if (box.y <0){

    box.dy = -box.dy
    box.c++
  }

  //has box hit the left paddel

  if(

    
    //left side of the box hit the right of the paddel
    box.x < leftPaddel.x + leftPaddel.w && 
    
    // bottom of the box is lower then the top of the paddle 
    box.y + box.h > leftPaddel.y && 

    //top of the box is higher then the bottem of the paddle

    box.y < leftPaddel.y + leftPaddel.h

    ){

    box.dx = Math.abs(box.dx)

    box.dy = box.dy + (leftPaddel.dy * 0.25)

  }

    //has box hit the right paddel

  if(
    //right side of the box hit the left of the paddel
    box.x +box.w > rightPaddel.x && 
    
    // bottom of the box is lower then the top of the paddle 
    box.y + box.h > rightPaddel.y && 

    //top of the box is higher then the bottem of the paddle

    box.y < rightPaddel.y + rightPaddel.h

    ){

    box.dx = -Math.abs(box.dx)

    box.dy = box.dy + (rightPaddel.dy * 0.25)

  }

  box.x += box.dx
  box.y += box.dy

  //stop the left paddel leaving the screen too much 

  if( leftPaddel.y + leftPaddel.h < 0){
    leftPaddel.y = -leftPaddel.h
    
  }

  if (leftPaddel.y > stage.height){
      
   leftPaddel.y = stage.height

  }
  //stop the right paddel laving the screen

if( rightPaddel.y + rightPaddel.h < 0){
    rightPaddel.y = -rightPaddel.h
    
  }

  if (rightPaddel.y > stage.height){
      
   rightPaddel.y = stage.height

  }
  //make left paddel move
  leftPaddel.y += leftPaddel.dy

    //make right paddel move
  rightPaddel.y += rightPaddel.dy


  requestAnimationFrame(draw)
}

draw()

//key press leftPaddel up

window.addEventListener("keydown", function(e){

  if (e.key == "w") {
    leftPaddel.dy = -10  
  }
})
//key press right up 

window.addEventListener("keydown", function(e){

  if (e.key == "ArrowUp") {
    rightPaddel.dy = -10  
  }
})

//key release leftPaddel up

window.addEventListener("keyup", function(e){

  if (e.key == "w") {
    leftPaddel.dy = 0
  }
})

//key release rightPaddel down

window.addEventListener("keyup", function(e){

  if (e.key == "ArrowUp") {
    rightPaddel.dy = 0
  }
})

//key press leftPaddel down

window.addEventListener("keydown", function(e){

  if (e.key == "s") {
    leftPaddel.dy = +10  
  }
})

//key right leftPaddel down

window.addEventListener("keydown", function(e){

  if (e.key == "ArrowDown") {
    rightPaddel.dy = +10  
  }
})

//key release leftPaddel down

window.addEventListener("keyup", function(e){

  if (e.key == "s") {
    leftPaddel.dy = 0
  }
})

  //key release rightPaddel down

window.addEventListener("keyup", function(e){

  if (e.key == "ArrowDown") {
    rightPaddel.dy = 0
  }
})

