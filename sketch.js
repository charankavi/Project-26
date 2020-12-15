var dog,dogImg,dogImg1,milk_img;
var database;
var foodS,foodStock;
var feed,add;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
   milk_img=loadImage("Images/Milk.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(800,600);

  dog=createSprite(700,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 

  feed = createButton("feed");
  feed.position(1000,100);
  feed.mousePressed(writeStock(foodS));

  add = createButton("add food");
  add.position(925,100);
}

// function to display UI
function draw() {
  background(50,255,50);
 

  

  drawSprites();
  fill(255,255,255);
  stroke("black");
  text("Food remaining : "+foodS,600,200);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}