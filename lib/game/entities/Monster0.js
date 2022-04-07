ig.module(
	'game.entities.Monster0'
)
.requires(
'impact.entity',
'impact.entity-pool'
)
.defines(function(){



EntityMonster0 = ig.Entity.extend({
name:"monster0",
animSheet: new ig.AnimationSheet('media/monster1.png',50,50),//176 65 
deathSheet: new ig.AnimationSheet('media/boom.png',50,50),//176 65 
//animSheet2: new ig.AnimationSheet('media/AlienFall.png',50,50),
    
hitDelay :  null,
pushDelay: null,
   rotAnimT:null, 
    
gravityFactor: 0,
invincible: false,//new ig.Timer(0),
push: false,
size:{x:50, y:50},
offset: {x: 0, y:0},//88
maxVel: {x:0,	y:0},
health:101,
speed: 0,
hoverDwn:false,
dead:false,
invtXvel: false,    
weight: 100,    
    
eColor:"blue",    
    
zIndex:0,
envade:false,
ballType : null,
unId: null,
magId: -1,
enlisted:false,

targeted:false,    
    
monImg: new ig.Image("media/monster1.png"),    
mod:0,

drawM:null,

init: function(x,y,settings){
    this.parent(x,y,settings);

//this.vel.x = 70;
//this.vel.y = 200;
this.hitDelay = new ig.Timer();
this.pushDelay = new ig.Timer();
this.rotAnimT = new ig.Timer();
// (timer*25)

        this.size = {
            x:50,// this.monImg.width,
            y:50// this.monImg.height
        };
    
    

///(((this.id%5)*130));    
//this.mod=


   //ig.game.gameDimesion.sndSec 
     
  //  var modS=(ig.game.spawnQuery[ig.game.wave])/(29);
    var modS=(ig.game.rSpawnManagement[ig.game.roundNum][0][1])/(10);
  //  console.log(ig.game.spawnQuery[ig.game.wave]);
    
    var col = (ig.game.spawnQuery[ig.game.wave]/8).floor();
  //  var col = Math.sqrt(ig.game.spawnQuery[ig.game.wave]).ceil();
    
    (this.id % 2==0) ? 
        this.mod=1
    :
    this.mod=-1;  
    
  //  ig.game.gameDimesion.sndSec 

//this.pos.x = (((this.id%(5))*50));   
this.pos.x = (((this.id%(5))*50));   
this.pos.y = (-10000)+((this.id%(6))*(130));        
///this.pos.y = (-2000)+((this.id%(6))*(130));        
    
    if (this.pos.x==50 || this.pos.x==150)this.pos.y+=50;
    if (this.pos.x==100 || this.pos.x==200)this.pos.y+=100;
    
    
//console.log(this.pos.x)
    
  //  console.log(ig.game.spawnQuery[ig.game.wave]/6)
//    
//this.pos.x = (this.id%5)*(this.mod*30)+(ig.game.gameDimesion.sndSec) ; 
//    
//this.mod=this.pos.x/4;

//    (this.id % 2==0) ? 
//        this.mod=(this.pos.x/55) 
//    :
//    this.mod=(-this.pos.x/55);
//    
//    console.log(this.mod)
//this.pos.y = (-11000)+(((this.id)%6)+1)*(150*this.mod)   
//    
   // this.pos.y = -10000+((this.id%7))*140;  
this.hitDelay.pause();
this.pushDelay.pause();
this.rotAnimT.pause();    
ig.game.countEnemy+=1

//this.anims.idle= new ig.Animation(this.animSheet1, 0.1, [0]);
//this.anims.hit= new ig.Animation(this.animSheet1, 0.4, [1,2,3,4,5,6,7]);
//this.anims.dead= new ig.Animation(this.animSheet1, 0.7, [9,10,11,12,13,14,15]);

//    this.anims.idle= new ig.Animation(this.animSheet, 0.3, [0,1,2]);
//this.anims.hit= new ig.Animation(this.animSheet, 0.2, [3,4]);
//this.anims.dead= new ig.Animation(this.animSheet, 0.1, [5],true);
//     this.addAnim( 'idle', .1, [0] );
//     this.addAnim( 'hit', 0.5, [1,2,3,4,5] );
//    this.addAnim( 'dead', 0.5, [6,7,8,9],true );
    
         this.addAnim( 'idle', .3, [0,1,2] );
         this.addAnim( 'idle2', 0, [0],true );
     this.addAnim( 'hit', 0.3, [4,3] );
    this.addAnim( 'dead', 0.3, [4,5,4],true );
   
    
    this.anims.dead= new ig.Animation(this.deathSheet, 0.3, [0,1,2,3,4]);
    
//this.anims.fall= new ig.Animation(this.animSheet2,0.1,[0]);
this.currentAnim = this.anims.idle
    
//    if (ig.ua.mobile === false){
//this.currentAnim = this.anims.idle}else{
//    this.currentAnim = this.anims.idle2
//}
    
},


reset: function( x, y, settings ) {
	
	  this.parent( x, y, settings );
	
},



update: function(x,y,settings){
this.parent();
  
      if(ig.game.prefMode==true){this.disableAnim=true;}else{this.disableAnim=false;}
   
    
    
for (i= 0;  this.enlisted == false ; i++) //enlist for archive   i < ig.game.enemyArchive.length
  { if (typeof ig.game.enemyArchive[i]==='undefined' && this.enlisted == false){ig.game.enemyArchive[i] = this.id; this.enlisted = true}
    
  }
    if (!this.dead)
    {
    
    if (this.ballType != null){
        
        this.freeze = ig.game.loadedBallType.freeze ;
        
        
        if (ig.game.loadedBallType.freeze === false && this.touches(this.ballType)=== true  ) {
            
     this.hitDelay.unpause()
            
       
        //    this.currentAnim = this.anims.fall
        this.eColor="black"
        }else if (ig.game.loadedBallType.freeze === true && this.touches(this.ballType)=== true ){  this.hitDelay.pause();}
    
    
    
    }
     
    
        
       
    
    
if (this.hitDelay != null && this.hitDelay.delta() > 2) {
	this.invincible = false;this.hitDelay.reset();this.hitDelay.pause();
  this.rotAnimT.reset();this.rotAnimT.pause();
    


    
this.anims.hit.rewind();
    
    
//    if (ig.ua.mobile === false){
//              if ( this.currentAnim !== this.anims.idle)       ig.game.countHits--;
//this.currentAnim = this.anims.idle}else{if ( this.currentAnim !== this.anims.idle2)       ig.game.countHits--;
//    this.currentAnim = this.anims.idle2 
//}
//    
    
    
    
if ( this.currentAnim !== this.anims.idle) ig.game.countHits--;
this.currentAnim = this.anims.idle
    
    
}
   //    if (this.hitDelay.delta()==0)this.currentAnim = this.anims.idle;
        
        
        if (this.hitDelay.delta() < 2 &&this.hitDelay.delta()!==0 ){

            
            
            
                 if ( this.currentAnim !== this.anims.hit)      
            ig.game.countHits++;
             this.currentAnim = this.anims.hit;
            this.rotAnim();
//            if (ig.ua.mobile === false){
//            
//           
//            if ( this.currentAnim !== this.anims.hit)      
//            ig.game.countHits++;
//             this.currentAnim = this.anims.hit;
//            this.rotAnim();
//            }
//            else{ // if(ig.game.countHits <10){ 
//            
//             if ( this.currentAnim !== this.anims.hit)      
//            ig.game.countHits++;
//             this.currentAnim = this.anims.hit;
//            this.rotAnim();
//            
//            //}
//                
//            }
         
        }
        
        
}
   // console.log( this.hitDelay.delta())
    
if (this.hoverDwn === true && this.dead ==false){
 

    this.monsterDecend(700)//400 
    
       this.maxVel.y=1000;
    

    
   this.maxVel.x = 1000;
   // this.vel.y = 200;
}else 
{this.maxVel.y=0; this.vel.y = 0;this.maxVel.x = 0; }

  //  console.log(this.currentAnim.frame);
    
    if(this.dead)  this.rotAnim();
    
 if (this.hoverDwn === true && this.dead === true
     &&     this.currentAnim.angle>3.08
     //this.currentAnim.frame==5
    
    )
{this.maxVel.y = 2000; this.vel.y=2000; this.accel.y = 1000;
}
    //console.log(ig.game.gameDimesion.xLevel)
if (this.pos.x+this.size.x > ig.game.gameDimesion.xLevel){this.invtXvel= true // this.pos.y+=30
this.pos.x = ig.game.gameDimesion.xLevel-this.size.x
                                                 }
if (this.pos.x < 0  ){this.invtXvel = false // this.pos.y+=30
}
    
if (this.magnetized) this.invtXvel = false;    
    
this.invtXvel ? this.vel.x =-100 : this.vel.x =100 ;
    
//this.accel.y = 200


if (//this.currentAnim != this.anims.fall &&
    this.pos.y > (1000+ig.game.penaltyLine) && this.envade== false) { ig.game.stats.penalty+=1; this.envade = true;
ig.game.stats.points-=(ig.game.stats.points*.10); 
//ig.game.stats.points-=100; 
                                                              
                                                              
                                                              ig.game.cRundPoints-=100;       this.kill();       ig.game.countEnemy--;                                               
                                                                                    }


},

type: ig.Entity.TYPE.B,
checkAgainst: ig.Entity.TYPE.A,
collides: ig.Entity.COLLIDES.NEVER,


handleMovementTrace: function( res )
{
this.parent( res );
if ( res.collision.x || res.collision.y || this.pos.y > 1100){
this.kill(); ig.game.stats.points+=100;ig.game.cRundPoints+=100;//current round points
ig.game.countEnemy--;	return;

}

},

    
    
draw: function(){
    


//    
    if (ig.game.metamode==true){

		if( this.currentAnim ) {
       this.off =ig.game.sData[ig.game.plotter.select].posX   
          
            
	if( this.currentAnim ) {
			this.currentAnim.draw(
				//((this.pos.x+120)-this.off).round(),//pretty close....
			//	this.pos.x-ig.game._rscreen.x,//pretty close....
				this.pos.x - this.offset.x- (ig.game._rscreen.x/ig.system.scale),
				this.pos.y - this.offset.y - ig.game._rscreen.y
			);
		}
if(this.disableAnim==false){
  this.currentAnim.update();
}

            
}
    
    }else{
        
       
        
        		this.currentAnim.draw(
				this.pos.x - this.offset.x- (ig.game._rscreen.x),
				this.pos.y - this.offset.y - ig.game._rscreen.y
			);
        
   
    }

 
        
   
    
}  ,  
    
    
    
//    
//    draw: function(){
// 
//var img = new Image(74,74);
//img.src='media/monster0.png';   
//        
//        
////this.monImg.draw((this.pos.x), ((this.pos.y-ig.game._rscreen.y)*ig.system.scale)               );
// //   ig.system.context.drawImage(img, this.pos.x, ((this.pos.y-ig.game._rscreen.y)*ig.system.scale));      
//        
////      ig.system.context.rotate((Math.PI/180)*90); 
//        
//        
//        
//
//        
//        
//        
//        
//        
//        
//        
//        this.parent();
//    //       ig.system.context.drawImage('media/monster0.png',this.pos.x,this.pos.y,74,74);
//
////     ig.system.context.beginPath();  
////    ig.system.context.fillStyle=this.eColor; 
////           ig.system.context.fillRect(
////               (((this.pos.x*ig.system.scale)-ig.game._rscreen.x))//+ ig.game.loadedBallType.size.x/2
////               ,
////               ((this.pos.y-ig.game._rscreen.y)*ig.system.scale)//+ ig.game.loadedBallType.size.x/2
////               ,
////               
////                this.size.x*ig.system.scale,this.size.y*ig.system.scale);      
////         ig.system.context.stroke();
//    
//} ,
//
//    
//    
    
    
// drawRotatedImage: function(image, x, y, angle) 
//{ 
//    context.save(); 
//
//    context.translate(x, y);
//
//    context.rotate(angle * TO_RADIANS);
//
//    context.drawImage(image, -(image.width/2), -(image.height/2));
//
//    context.restore(); 
//},      
//    
    
    
returnHit(){
    ig.game.countHits++;
    	return ;
},
    
    
rotAnim(){
 
      this.rotAnimT.unpause();   

    if (!this.dead){ 
var speed=6;
var degrees=(this.rotAnimT.delta()*speed);
 //   console.log(  (Math.sin(degrees)).toDeg());
this.currentAnim.scale.x=1.4;
this.currentAnim.scale.y=1.4;
 this.currentAnim.angle= (Math.sin(degrees));
  //  this.currentAnim.angle=((this.rotAnimT.delta())*25).toRad();
    
    }else{
       // this.currentAnim.gotoFrame(0);
 //  this.currentAnim.rewind();
       // this.currentAnim= this.anims.dead;//      this.currentAnim.gotoFrame(0);
            if(this.currentAnim.frame ==4 && this.currentAnim.loopCount > 0){
                                                                 ig.game.countEnemy--;         
                                                                            this.kill();
                                                                            }
        
        if(this.disableAnim){   ig.game.countEnemy--;     this.kill();}
    
    

  //      if (this.rotAnimT.delta()*75 < 180){
         //this.currentAnim.angle=((this.rotAnimT.delta())*75).toRad();
      //  console.log(this.currentAnim.angle)
    //    }
        
    }
    
    
    
},    
    
    
receiveDamage: function(value)
{

if (this.health - value <= 0 && !this.dead)//so that it would not delete itself before it falls 
{ig.game.comboReset.set(1);
ig.game.comboCount+=1;
 this.currentAnim.rewind();
this.currentAnim = this.anims.dead;
 this.eColor="black";
 this.hoverDwn = true
 this.dead = true;
 this.invincible = true
 this.magnetized = false;
this.maxVel.y = 200
this.maxVel.x = 0
this.vel.y = 200	
ig.game.stats.points+=10*ig.game.comboCount

}



if (this.invincible === false)
{                ig.game.bellSound.play();
 this.eColor="white"
//this.currentAnim = this.anims.a1
ig.game.comboReset.set(1)
ig.game.comboCount+=1
ig.game.stats.points+=10*ig.game.comboCount
ig.game.cRundPoints+=10*ig.game.comboCount
//for( i = 0; i <30; i++)			
//	ig.game.spawnEntity(EntityHitParticles, ig.game.getEntitiesByType(EntityBall)[0].pos.x+23, ig.game.getEntitiesByType(EntityBall)[0].pos.y+21.5);

this.parent(value);
this.makeInvincible();//<
}  else
{   return;}
	
},


check: function( other )
	{
        ig.game.loadedBallType.hit=true;
        
//check specific ball type 
	this.unId = other.id//ig.game.getEntityByID(other.id)
	this.ballType = ig.game.getEntityByID(this.unId)//unId






		},
    

    
monsterDecend(hvrDwn){
this.magnetized = false
this.accel.y =hvrDwn/2; 
    
 // if (this.magnetized == false){  
if (this.vel.y > hvrDwn)
{this.hoverDwn = false; return;}
 // }
    
},


makeInvincible() {

	this.invincible = true
	//this.hitDelay.reset();
	
	},


	
});


//ig.EntityPool.enableFor( EntityMonster0 );
    
    
    
})
