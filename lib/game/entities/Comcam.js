ig.module(
	'game.entities.Comcam'
)
.requires(
'impact.entity'
)
.defines(function(){
// 
EntityComcam = ig.Entity.extend({
    
    
 maxVel: {x:6000,y:6000},
    view:{x:0,y:0},
    viewPrev:{x:0,y:0},
   //   animSheet: new ig.AnimationSheet('media/monster1.png',50,50),//176 65 
    
init: function(x,y,settings){
this.pos.x = 0//ig.game.gameDimesion.sndSec;// disable
this.pos.y = 0//1100;

this.view.x=240;
this.view.y=320;
    

   // this.vel.x=10;
//this.addAnim( 'idle', .3, [0,1,2] );
    //this.currentAnim = this.anims.idle
this.parent(x,y,settings);   //ig.game.specialEntity = this;
},
//1,5,11
    
    //FROM -240 to 240 X axis/2
    //FROM -320 to 320 Y axis/2
    
    
update:function(){
      //this.currentAnim = this.anims.idle

    ig.game.screen.x = (this.pos.x) - (ig.system.width/2);
ig.game.screen.y = (this.pos.y) - (ig.system.height/2);
    
this.pos.x =  (240)-this.view.x
this.pos.y = (320)-this.view.y
    
    
    if (ig.input.pressed('click')){

     
    }
   
    
      this.parent();
}
    
    
    
    //107,118
    

})

})