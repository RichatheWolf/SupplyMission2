var helicopterIMG, helicopterSprite, packageSprite, packageIMG;
var ground, package1 = 0;
var zoneLeft, zoneBottom, zoneRight;
var zoneLeftSprite, zoneBottomSprite, zoneRightSprite;
var zoneThickness = 20, zoneHeight = 100, zoneWidth = 200;
var groundThickness = 10, groundLevel = 650;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG = loadImage("helicopter.png");
	packageIMG = loadImage("package.png");
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
	engine = Engine.create();
	world = engine.world;

	helicopterSprite = createSprite(width / 2, 200, 10, 10);
	helicopterSprite.addImage(helicopterIMG);
	helicopterSprite.scale = 0.6;

	packageSprite = createSprite(helicopterSprite.x, helicopterSprite.y + 55, 10, 10);
	packageSprite.addImage(packageIMG);
	packageSprite.scale = 0.2;

	groundSprite = createSprite(width / 2, groundLevel, width, groundThickness);
	groundSprite.shapeColor = color(255);

	zoneLeftSprite = createSprite(
		width / 2 - zoneWidth / 2 - zoneThickness / 2,
		groundLevel - groundThickness / 2 - zoneHeight / 2,
		zoneThickness,
		zoneHeight);
	zoneLeftSprite.shapeColor = color("red");

	zoneRightSprite = createSprite(
		width / 2 + zoneWidth / 2 + zoneThickness / 2,
		groundLevel - groundThickness / 2 - zoneHeight / 2,
		zoneThickness,
		zoneHeight);
	zoneRightSprite.shapeColor = color("red");

	zoneBottomSprite = createSprite(
		width / 2,
		groundLevel - groundThickness / 2 - zoneThickness / 2,
		zoneWidth,
		zoneThickness);
	zoneBottomSprite.shapeColor = color("red");

	// Create a Ground
	ground = Bodies.rectangle(width / 2, groundLevel, width, groundThickness, {isStatic: true});
 	World.add(world, ground);

	zoneLeft = Bodies.rectangle(
		width / 2 - zoneWidth / 2 - zoneThickness / 2,
		groundLevel - groundThickness / 2 - zoneHeight / 2,
		zoneThickness,
		zoneHeight,
		{isStatic: true});
	World.add(world, zoneLeft);
	
	zoneRight = Bodies.rectangle(
		width / 2 + zoneWidth / 2 + zoneThickness / 2,
		groundLevel - groundThickness / 2 - zoneHeight / 2,
		zoneThickness,
		zoneHeight,
		{isStatic: true});
	World.add(world, zoneRight);

	zoneBottom = Bodies.rectangle(
		width / 2,
		groundLevel - groundThickness / 2 - zoneThickness / 2,
		zoneWidth,
		zoneThickness,
		{isStatic: true});
	World.add(world, zoneBottom);

	Engine.run(engine);
}


function draw() {
  rectMode(CENTER);
  background(0);
  
  if (package1 != 0) {
	packageSprite.x = package1.body.position.x;
	packageSprite.y = package1.body.position.y; 
  }
  drawSprites();
}

function keyPressed() {
 	if (package1 == 0 && keyCode == DOWN_ARROW) {
    	// Look at the hints in the document and understand how to make the package body fall only on the ground
		package1 = new packages(helicopterSprite.x, helicopterSprite.y + 55, 52, 52);
	}
}