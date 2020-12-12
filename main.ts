const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

// ctx.beginPath();
// ctx.moveTo(0, 0);
// ctx.lineTo(300, 1000);
// ctx.stroke();

// ctx.beginPath();
// ctx.moveTo(0, 0);
// ctx.lineTo(300, 300);
// ctx.stroke();

ctx.beginPath();
ctx.rect(20, 20, 300, 300);
ctx.fillStyle = "red";
ctx.fill();

var gradient = ctx.createLinearGradient(0, 0, 300, 0);
gradient.addColorStop("0", "purple");
gradient.addColorStop("0.5", "yellow");
gradient.addColorStop("1.0", "magenta");

// Fill with gradient
ctx.strokeStyle = gradient;
ctx.lineWidth = 50;
ctx.strokeRect(20, 20, 300, 300);
