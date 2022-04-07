ig.module(
	'game.entities.Boss1'
)
.requires(
'impact.entity'
)
.defines(function(){

    

   
EntityBoss1 = ig.Entity.extend({
name:"Boss1",
animSheet: new ig.AnimationSheet('media/BOSS1.png',200,200),//176 65 
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
zIndex:5,

ballType : null,
spawn:false,

enlisted:false,
drawM:null,
death:false,
    
 healthBar:new Image(125,100),
    
init: function(x,y,settings){
    this.parent(x,y,settings);
    
this.healthBar.src='media/bHBar.png'
    
//this.vel.x = 70;
//this.vel.y = 200;
this.hitDelay = new ig.Timer();
this.pushDelay = new ig.Timer();
this.rotAnimT = new ig.Timer();
// (timer*25)

        this.size = {
            x:200,// this.monImg.width,
            y:200// this.monImg.height
        };
    
             this.addAnim( 'idle', .3, [0,1,2] );
             this.addAnim( 'hit', .3, [3,4] );
             this.addAnim( 'death', .3, [5,6,7,8] );
             this.addAnim('end',0.3,[9,10,11,12,13,14,15])

//this.anims.fall= new ig.Animation(this.animSheet2,0.1,[0]);
this.currentAnim = this.anims.idle
  



    

},


update: function(x,y,settings){
this.parent();
    
      if(ig.game.prefMode==true && this.death==false){this.disableAnim=true;}else{this.disableAnim=false;}
   
    
    
for (i= 0;  this.enlisted == false ; i++) //enlist for archive   i < ig.game.enemyArchive.length
  { if (typeof ig.game.enemyArchive[i]==='undefined' && this.enlisted == false){ig.game.enemyArchive[i] = this.id; this.enlisted = true}
    
  }

    
     if(this.death==false){ //it doesnt matter your dead you bastard!!! wtf errors for  
    if (this.spawn == false){
    ig.game.spawnEntity("EntityBjewels",(this.pos.x-this.size.x)+16, this.pos.y+82,{number:1});//disable to edit
    ig.game.spawnEntity("EntityBjewels",(this.pos.x-this.size.x)+168, this.pos.y+82,{number:2});//disable to edit
    ig.game.spawnEntity("EntityBjewels",(this.pos.x-this.size.x)+92, this.pos.y+60,{number:3});//disable to edit
    ig.game.spawnEntity("EntityBjewels",(this.pos.x-this.size.x)+44, this.pos.y+148,{number:4});//disable to edit
    ig.game.spawnEntity("EntityBjewels",(this.pos.x-this.size.x)+140, this.pos.y+148,{number:5});//disable to edit
   this.spawn=true; }

 if (     ig.game.reloaded== true){
     
  ig.game.getEntitiesByType(EntityBjewels)[0].hit=false;;
  ig.game.getEntitiesByType(EntityBjewels)[1].hit=false;;
  ig.game.getEntitiesByType(EntityBjewels)[2].hit=false;;
  ig.game.getEntitiesByType(EntityBjewels)[3].hit=false;;
  ig.game.getEntitiesByType(EntityBjewels)[4].hit=false;;
     
      this.invincible=false

        ig.game.reloaded= false;
 }   
    
    
    if(  ig.game.getEntitiesByType(EntityBjewels)[0].hit==true &&
  ig.game.getEntitiesByType(EntityBjewels)[1].hit==true &&
  ig.game.getEntitiesByType(EntityBjewels)[2].hit==true &&
  ig.game.getEntitiesByType(EntityBjewels)[3].hit==true &&
  ig.game.getEntitiesByType(EntityBjewels)[4].hit==true){this.currentAnim = this.anims.hit;
                                                       
                                                         if (this.invincible== false)
                                                         this.health-=100;
                                                         this.invincible=true
                                                        }else{
        this.currentAnim = this.anims.idle;
        
    }
  
   
    if (this.health==1){ if (this.currentAnim.loopCount > 0){ this.currentAnim.rewind();}
          this.currentAnim = this.anims.death;
        ig.game.gameMode=4;
    }
     }
    
    
    if(this.death==true){  this.disableAnim=false;
           this.currentAnim = this.anims.end;
        
                         if(this.currentAnim.frame == 6 && this.currentAnim.loopCount > 0) {
                             
//                               ig.game.getEntitiesByType(EntityBjewels)[0].kill();
//  ig.game.getEntitiesByType(EntityBjewels)[1].kill();
//  ig.game.getEntitiesByType(EntityBjewels)[2].kill();
//  ig.game.getEntitiesByType(EntityBjewels)[3].kill();
//  ig.game.getEntitiesByType(EntityBjewels)[4].kill();
                             
                             console.log("here");//ig.game.roundNum+=1
                             ig.game.index++;
                             ig.game.countEnemy--;  ig.game.bossKill=true;
                         //    ig.game.RoundUpdas();ig.game.wave=0;
                             this.kill();
                                                         
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



if ( this.pos.y > (1000+ig.game.penaltyLine) && this.envade== false) { ig.game.stats.penalty+=1; this.envade = true;
ig.game.stats.points-=(ig.game.stats.points*.10); 

                                                              
                                                              
                                                              ig.game.cRundPoints-=100;       this.kill();       ig.game.countEnemy--;                                               
                                                                                    }
    
    
    


},

type: ig.Entity.TYPE.NONE,
checkAgainst: ig.Entity.TYPE.NONE,
collides: ig.Entity.COLLIDES.NEVER,


//handleMovementTrace: function( res ){
//this.parent( res );
////if ( res.collision.x || res.collision.y || this.pos.y > 1100){
////this.kill(); ig.game.stats.points+=100;ig.game.cRundPoints+=100;//current round points
////ig.game.countEnemy--;	return;
////
////}
//
//},

 draw: function(){
    
 
       // ig.system.context.drawImage(img, ((this.pos.x*ig.system.scale)-5)- (ig.game._rscreen.x), ((this.pos.y-ig.game._rscreen.y)*ig.system.scale));   
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

 
        //200
     ig.system.context.fillRect(  ((this.pos.x*(ig.system.scale))- (ig.game._rscreen.x) )+100,((this.pos.y-ig.game._rscreen.y)*ig.system.scale)-50,(this.health-1)*2,50);
 ig.system.context.drawImage(this.healthBar,((this.pos.x*(ig.system.scale))- (ig.game._rscreen.x) )+100,((this.pos.y-ig.game._rscreen.y)*ig.system.scale)-50);
     
    
}  ,   
    

rotAnim(){
 
      this.rotAnimT.unpause();   

    if (!this.dead){ 
var speed=6;
var degrees=(this.rotAnimT.delta()*speed);
 //   console.log(  (Math.sin(degrees)).toDeg());

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
    
    
receiveDamage: function(value){
    
if (this.health - value <= 0 && !this.dead)//so that it would not delete itself before it falls 
{

}},


check: function( other ){
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

    
    EntityBjewels = ig.Entity.extend({
animSheet: new ig.AnimationSheet('media/jewels.png',16,16),//176 65 
gravityFactor: 0,
number:0,
hit:false,
zIndex:4,
health:1000,
    
init: function(x,y,settings){
    this.parent(x,y,settings);
         this.addAnim( 'idle', 0, [0,1],true );
         this.addAnim( 'hit', 1, [1],true );
    this.currentAnim = this.anims.idle; this.currentAnim.frame=0;this.currentAnim.rewind();
},


update: function(x,y,settings){
this.parent();
    var boss =ig.game.getEntitiesByType(EntityBoss1)[0];
    
    if(this.number===1){this.pos.x =(boss.pos.x)+16;this.pos.y =boss.pos.y+82;}
    if(this.number===2){this.pos.x =(boss.pos.x)+168;this.pos.y =boss.pos.y+82;}
    if(this.number===3){this.pos.x =(boss.pos.x)+92;this.pos.y =boss.pos.y+60;}
    if(this.number===4){this.pos.x =(boss.pos.x)+44;this.pos.y =boss.pos.y+148;}
    if(this.number===5){this.pos.x =(boss.pos.x)+140;this.pos.y =boss.pos.y+148;}

    
//        ig.game.spawnEntity("EntityBjewels",(this.pos.x-this.size.x)+92, this.pos.y+60,{number:3});//disable to edit
//    ig.game.spawnEntity("EntityBjewels",(this.pos.x-this.size.x)+44, this.pos.y+148,{number:3});//disable to edit
//    ig.game.spawnEntity("EntityBjewels",(this.pos.x-this.size.x)+140, this.pos.y+148,{number:3});//disable to edit
//    
    
if (boss.death==true)this.kill();
    
    
if (this.hit == true){//this.currentAnim.rewind();
        this.currentAnim.frame=1;
}
   if (this.hit == false){
        //this.currentAnim = this.anims.idle;
       this.currentAnim.rewind();
            this.currentAnim.frame=0;
} 

    
},

type: ig.Entity.TYPE.B,
checkAgainst: ig.Entity.TYPE.A,
collides: ig.Entity.COLLIDES.NEVER,




    
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
    

    


check: function( other ){this.health=1000;this.hit=true;
//check specific ball type 
//	this.unId = other.id//ig.game.getEntityByID(other.id)
//	this.ballType = ig.game.getEntityByID(this.unId)//unId
		},
    




    
    
    


	
});

  
    
})




//draw: function(){
//    
//
//
////    
//    if (ig.game.metamode==true){
//
//		if( this.currentAnim ) {
//       this.off =ig.game.sData[ig.game.plotter.select].posX   
//          
//            
//	if( this.currentAnim ) {
//			this.currentAnim.draw(
//				//((this.pos.x+120)-this.off).round(),//pretty close....
//			//	this.pos.x-ig.game._rscreen.x,//pretty close....
//				this.pos.x - this.offset.x- (ig.game._rscreen.x/ig.system.scale),
//				this.pos.y - this.offset.y - ig.game._rscreen.y
//			);
//		}
//if(this.disableAnim==false){
//  this.currentAnim.update();
//}
//
//            
//}
//    
//    }else{
//        
//       
//        
//        		this.currentAnim.draw(
//				this.pos.x - this.offset.x- (ig.game._rscreen.x),
//				this.pos.y - this.offset.y - ig.game._rscreen.y
//			);
//        
//   
//    }
//
// 
//        
//   
//    
//}  ,  
//    
