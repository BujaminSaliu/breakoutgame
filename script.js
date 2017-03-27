//selects element in index file
var canvas = document.getElementById('myCanvas');

//method returns an object that provides methods and properties for drawing on the canvas. 
var ctx = canvas.getContext('2d');

//to give new cordinates to the ball.
var x = canvas.width/2;
// push the ball upp 30px from the bottom
var y = canvas.height-30; 
var dx= 2;
var dy = -2;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;

var bricks = [];
for(i = 0; i<brickColumnCount; i++){
	bricks[i] = []; // adding another array in the index i in bricks
	for(j=0; j<brickRowCount; j++){
		bricks[i][j] = {x: 0, y:0, status: 1}
	}

}


document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function drawBricks(){
	for(i=0; i<brickColumnCount; i++) {
		for(j=0; j<brickRowCount; j++) {
			if(bricks[i][j].status == 1) { // draw the brick if status is equal 1
				var brickX = (i*(brickWidth+brickPadding)) + brickOffsetLeft; 
				var brickY = (j*(brickHeight+brickPadding)) + brickOffsetTop;
				bricks[i][j].x=brickX;
				bricks[i][j].y=brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle="red";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

//keydown above is passed to e
//keyDownHandler stores the key pressed to variabel e
function keyDownHandler(e){ 
	if(e.keyCode==39){ //39 is right arrow btn
		rightPressed=true;
	}
	else if(e.keyCode==37){ // 37 == left arrowbtn
		leftPressed=true;
	}
}

function keyUpHandler(e){
	if(e.keyCode==39){
		rightPressed=false;
	}
	else if(e.keyCode==37){
		leftPressed=false;
	}
}

//starting x position x-axle of paddle
var paddleX = (canvas.width-paddleWidth)/2; 


function drawBall(){
	//ball is drawn
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle="#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle(){
	ctx.beginPath() // parameters for rect xpos, ypos, width, height
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle="black";
	ctx.fill();
	ctx.closePath();
}

function collisionDetection(){
	for (i = 0; i < brickColumnCount; i++) {
		for (j = 0; j < brickRowCount; j++) {
			var b = bricks[i][j];
			if (b.status==1) {
				//calculations to get the x of the bricks
				//if the x position of the ball is greater than the x pos of the brick
				//plus the brick width (ball is between left and right sides of the brick)
				//change position of the ball same goes for the y direction
				if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
					dy =-dy;
					b.status=0; // so the brick doesnt get drawn again
					score++;
					if(score == brickRowCount * brickColumnCount){
						alert("You win!");
						document.location.reload();
					}
				}
			}
		}
	}
}


function drawScore(){
	ctx.font = "16px Arial";
	ctx.fillStyle = "black";
	ctx.fillText("Score: " + score, 8, 20); //8 and 20 are the x and y cordinates
}

function draw(){
	//canvas cleared
	ctx.clearRect(0,0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	collisionDetection();
	drawScore();

	//to change direction of ball going up/down and make it not dissapear
	//y+dy<0 = if the center of the ball i greater than the height
	//change direction if the ball is touching the top of the canvas
	if(y + dy < ballRadius) {
		dy = -dy;
	}
	else if (y + dy > canvas.height-ballRadius) {
		//if x pos of the ball is between R & L of the paddle 
		//bounce the ball back
		if (x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		}
		else {
			alert("GAME OVER!");
		document.location.reload();
		}

		
	}

	
	if(x + dx < 0 || x+dx>canvas.width-ballRadius){
		dx = -dx;
	}
	//subtracting paddleWidth from canvas width
	// to prevent paddle to dissapear off canvas
	if (rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += 7;
	} 
	else if(leftPressed && paddleX > 0){
		paddleX -= 7; 
	}

	//add the x and y for the next frame to draw in diff pos
	x += dx;
	y += dy;

}

setInterval(draw, 10); // draws a new ball every 10 ms

















// ctx.beginPath();
// ctx.rect(20, 40, 50, 50); //cordinates, coordinates, width, height
// ctx.fillStyle="#FF0000"; //defines the color
// ctx.fill(); // paints
// ctx.closePath();

// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle='rgba(0, 0, 255, 1)';
// ctx.stroke();
// ctx.closePath();
