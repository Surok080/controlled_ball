var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

var circle = function (x, y, radius, fillCircle) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2, false);
	if (fillCircle) {
		ctx.fill();
	} else {
		ctx.stroke();
	}
};
var Ball = function () {
	this.x = width / 2;
	this.y = height / 2;
	this.xSpeed = 5;
	this.ySpeed = 0;
	this.speed = 1;
	this.size = 10;
};
Ball.prototype.move = function () {
	this.x += this.xSpeed * this.speed;
	this.y += this.ySpeed * this.speed;
	if (this.x <= 0) {
		this.xSpeed = -this.xSpeed;
	} else if (this.x >= width) {
		this.xSpeed = -this.xSpeed;
	}
	if (this.y <= 0) {
		this.ySpeed = -this.ySpeed;
	} else if (this.y >= height) {
		this.ySpeed = -this.ySpeed;
	}
};
Ball.prototype.draw = function () {
	circle(this.x, this.y, this.size, true);
};
Ball.prototype.speedCircle = function (speedC) {
	if (speedC === "1") {
		this.speed = 1;
	} else if (speedC === "2") {
		this.speed = 2;
	} else if (speedC === "3") {
		this.speed = 3;
	} else if (speedC === "4") {
		this.speed = 4;
	} else if (speedC === "5") {
		this.speed = 5;
	} else if (speedC === "6") {
		this.speed = 6;
	} else if (speedC === "x" && this.speed > 0 && this.speed < 6) {
		this.speed++;
	} else if (speedC === "z" && this.speed > 1 && this.speed <= 6) {
		this.speed--;
	} else if (speedC === "v" && this.size < 20) {
		this.size++;
	} else if (speedC === "c" && this.size > 1) {
		this.size--;
	}
};
Ball.prototype.setDirection = function (direction) {
	if (direction === "up") {
		this.xSpeed = 0;
		this.ySpeed = -5;
	} else if (direction === "down") {
		this.xSpeed = 0;
		this.ySpeed = 5;
	} else if (direction === "left") {
		this.xSpeed = -5;
		this.ySpeed = 0;
	} else if (direction === "right") {
		this.xSpeed = 5;
		this.ySpeed = 0;
	} else if (direction === "stop") {
		this.xSpeed = 0;
		this.ySpeed = 0;
	}
};

var ball = new Ball();
var keyActions = {
	32: "stop",
	37: "left",
	38: "up",
	39: "right",
	40: "down"
};
var speed = {
	49: "1",
	50: "2",
	51: "3",
	52: "4",
	53: "5",
	54: "6",
	86: "v",
	67: "c",
	90: "x",
	88: "z",

};
$("body").keydown(function (event) {
	var speedC = speed[event.keyCode];
	var direction = keyActions[event.keyCode];
	ball.speedCircle(speedC);
	ball.setDirection(direction);
});
setInterval(function () {
	ctx.clearRect(0, 0, width, height);
	ball.draw();
	ball.move();
	ctx.strokeRect(0, 0, width, height);
}, 30);