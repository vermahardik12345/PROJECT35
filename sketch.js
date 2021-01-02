    //declaring global variables

   var dog,dogimg,happydog,happydogimg,database,foodS,foodStock;


  function preload()
  {
      //loading images
    
      dogimg=loadImage("images/dogImg.png");

      happydogimg=loadImage("images/dogImg1.png");
  }

function setup() {
   
  database=firebase.database();
  
  createCanvas(500, 500);
   foodStock=database.ref('Food');
   foodStock.on("value",readStock);

   dog=createSprite(250,350,10,10);
   dog.addImage(dogimg);
   dog.scale=0.15;











  
}

function draw() {  
   background(46,139,87);

  if(foodS!==undefined){
   if(keyWentDown(UP_ARROW)){
  writeStock(foodS);

  dog.addImage(happydogimg);
}
if(keyWentDown(DOWN_ARROW)){
  dog.addImage(dogimg);
}
if(foodS==0){
  dog.addImage(dogimg)
  foodS=20;
}
  }

  drawSprites();
 textSize(20);
 fill("pink");
 stroke("yellow");
 
  text("PRESS UP ARROW KEY TO FEED DRAGO MILK",30,100);
   text("FOOD STOCK:"+     foodS,100,480);
   text("PRESS DOWN KEY TO STOP FEEDING DRAGO",30,180);
}
function readStock(data)
{
  foodS=data.val();
}

function writeStock(x){
if(x<=0){
  x=0;
}
else{
  x=x-1;
}
database.ref('/').update({
  Food:x
})
}

