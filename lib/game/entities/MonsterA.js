ig.module(
	'game.entities.MonsterA'
)
.requires(
'impact.entity',
'impact.entity-pool'
)
.defines(function(){



EntityMonsterA = ig.Entity.extend({

animSheet: new ig.AnimationSheet('media/monster1.png',50,50),//176 65 
deathSheet: new ig.AnimationSheet('media/boom.png',50,50),//176 65 
//animSheet2: new ig.AnimationSheet('media/AlienFall.png',50,50),
    

init: function(x,y,settings){
    this.parent(x,y,settings);

         this.addAnim( 'idle', .3, [0,1,2] );
         this.addAnim( 'idle2', .3, [0] );
     this.addAnim( 'hit', 0.3, [3,4] );
    this.addAnim( 'dead', 0.3, [4,5,4],true );
    
    this.anims.dead= new ig.Animation(this.deathSheet, 0.3, [0,1,2,3,4]);
    
//this.anims.fall= new ig.Animation(this.animSheet2,0.1,[0]);
this.vel.y=20;

},





update: function(x,y,settings){
this.parent();
  
  

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

    


});


//ig.EntityPool.enableFor( EntityMonster0 );
    
    
    
})
