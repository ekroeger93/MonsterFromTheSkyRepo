
ig.module(
	'game.entities.Component'
)
.requires(
'impact.game',
'impact.entity'
)
.defines(function(){



EntityPlatform = ig.Entity.extend({
    
xSize:0,ySize:0,
size:{x:0 , y:0},    
//animSheet1: new ig.AnimationSheet('media/platform.png',240,500),//176 65 
offset: {x:0, y:0},
maxVel: {x:0,	y:0},
gravityFactor: 0,
    zIndex:0,
enlisted:false,

init: function(x,y,settings){

this.parent(x,y,settings);
//this.anims.plat = new ig.Animation(this.animSheet1, 0.05, [0]);    
//this.currentAnim = this.anims.plat
    this.size.x= this.xSize;
    this.size.y= this.ySize;
},

update: function(){
    
    for (i= 0;  this.enlisted == false ; i++) //enlist for archive   i < ig.game.enemyArchive.length
  { if (typeof ig.game.componentArchive[i]==='undefined' && this.enlisted == false){ig.game.componentArchive[i] = this.id; this.enlisted = true}
    
  }
    
    
    
this.parent();
//200,-2000 // 250 , y:400 
//    
  //  console.log(this.pos.y+(this.size.y/2))
},

    
draw: function(){
    
     ig.system.context.beginPath();  
    ig.system.context.fillStyle="red"; 
           ig.system.context.fillRect(
//               ((this.pos.x-ig.game._rscreen.x))//+ ig.game.loadedBallType.size.x/2
//               ,
//               ((this.pos.y-ig.game._rscreen.y))//+ ig.game.loadedBallType.size.x/2
//               ,
//               
                   (((this.pos.x*ig.system.scale)-ig.game._rscreen.x))//+ 
               ,
               ((this.pos.y-ig.game._rscreen.y)*ig.system.scale)//+ 
               ,
               
               
               
                this.size.x*ig.system.scale,this.size.y*ig.system.scale);      
         ig.system.context.stroke();
    
} ,
    

//  type: ig.Entity.TYPE.NONE,
//checkAgainst: ig.Entity.TYPE.A,
//collides: ig.Entity.COLLIDES.NEVER,
// 
//    
    
    check: function( other ){
	  
       


		},
				
//handleMovementTrace: function( res ){
//this.parent( res );
//
//}    
    
    
});
})