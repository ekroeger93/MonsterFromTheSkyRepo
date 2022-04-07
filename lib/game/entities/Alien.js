ig.module(
	'game.entities.Alien'
)
.requires(
'impact.entity',
'impact.entity-pool'
)
.defines(function(){



EntityAlien = ig.Entity.extend({
name:"alien1",
//animSheet1: new ig.AnimationSheet('media/Alien.png',50,50),//176 65 
//animSheet2: new ig.AnimationSheet('media/AlienFall.png',50,50),
hitDelay :  null,
pushDelay: null,
gravityFactor: 0,
invincible: false,//new ig.Timer(0),
push: false,
size:{x:50, y:50},
offset: {x: 0, y:0},//88
maxVel: {x:0,	y:0},
health:200,
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

init: function(x,y,settings){

this.parent(x,y,settings);
//this.vel.x = 70;
//this.vel.y = 200;
this.hitDelay = new ig.Timer();
this.pushDelay = new ig.Timer();

this.pos.y = -10000+((this.id%6))*140;    
this.pos.x = (((this.id%5)*130));    
    
this.hitDelay.pause();
this.pushDelay.pause();
ig.game.countEnemy+=1

//this.anims.a1= new ig.Animation(this.animSheet1, 0.1, [0]);

//this.anims.fall= new ig.Animation(this.animSheet2,0.1,[0]);

//this.currentAnim = this.anims.a1
},


reset: function( x, y, settings ) {
	
	  this.parent( x, y, settings );
	
},



update: function(x,y,settings){
this.parent();

for (i= 0;  this.enlisted == false ; i++) //enlist for archive   i < ig.game.enemyArchive.length
  { if (typeof ig.game.enemyArchive[i]==='undefined' && this.enlisted == false){ig.game.enemyArchive[i] = this.id; this.enlisted = true}
    
  }
    
    if (this.ballType != null){
        if (this.touches(this.ballType)=== true) {
        //    this.currentAnim = this.anims.fall
        this.eColor="black"
        }else{
               //     this.currentAnim = this.anims.a1
            
               //this.eColor="yellow"
            }}
     
if (this.hitDelay != null && this.hitDelay.delta() > 1) {
	this.invincible = false;this.hitDelay.pause();}
    
    
if (this.hoverDwn === true && this.dead ==false){
   this.monsterDecend(400)//400  
       this.maxVel.y=1000;
    this.maxVel.x = 70
   // this.vel.y = 200;
}else 
{this.maxVel.y=0; this.vel.y = 0;this.maxVel.x = 0; }

 if (this.hoverDwn === true && this.dead === true)
{this.maxVel.y = 1000; this.vel.y = 1000
}
    //console.log(ig.game.gameDimesion.xLevel)
if (this.pos.x+this.size.x > ig.game.gameDimesion.xLevel){this.invtXvel= true // this.pos.y+=30
this.pos.x = ig.game.gameDimesion.xLevel-this.size.x
                                                 }
if (this.pos.x < 0  ){this.invtXvel = false // this.pos.y+=30
}
    
if (this.magnetized) this.invtXvel = false;    
    
this.invtXvel ? this.vel.x =-70 : this.vel.x =70 ;
    
//this.accel.y = 200


if (//this.currentAnim != this.anims.fall &&
    this.pos.y > 720 && this.envade== false) { ig.game.stats.penalty+=1; this.envade = true;
ig.game.stats.points-=100; ig.game.cRundPoints-=100;                                                       
                                                                                    }



},

type: ig.Entity.TYPE.B,
checkAgainst: ig.Entity.TYPE.A,
collides: ig.Entity.COLLIDES.NONE,


handleMovementTrace: function( res )
{
this.parent( res );
if ( res.collision.x || res.collision.y || this.pos.y > 1100){
this.kill(); ig.game.stats.points+=100;ig.game.cRundPoints+=100;//current round points
ig.game.countEnemy--;	return;

}

},

    
    
    draw: function(){
    
     ig.system.context.beginPath();  
    ig.system.context.fillStyle=this.eColor; 
           ig.system.context.fillRect(
               (((this.pos.x*ig.system.scale)-ig.game._rscreen.x))//+ ig.game.loadedBallType.size.x/2
               ,
               ((this.pos.y-ig.game._rscreen.y)*ig.system.scale)//+ ig.game.loadedBallType.size.x/2
               ,
               
                this.size.x*ig.system.scale,this.size.y*ig.system.scale);      
         ig.system.context.stroke();
    
} ,

receiveDamage: function(value)
{

if (this.health - value <= 0)//so that it would not delete itself before it falls 
{ig.game.comboReset.set(1)
ig.game.comboCount+1
//this.currentAnim = this.anims.fall;
 this.eColor="black";
 this.hoverDwn = true
 this.dead = true;
 this.invincible = true
 this.magnetized = false;
this.maxVel.y = 200
this.maxVel.x = 0
this.vel.y = 200	}//else{this.currentAnim = this.anims.a1}



if (this.invincible === false)
{
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
	this.hitDelay.reset();
	
	},


	
});



})
