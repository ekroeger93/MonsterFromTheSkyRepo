

ig.module(
    'game.entities.particle-fast'
)
.requires(
    'impact.entity',
    'impact.entity-pool'
)
.defines(function(){

EntityParticleFast = ig.Entity.extend({        

        image: new ig.Image('media/particle.png', 13, 13),
    size: { x: 13, y: 13 },
    vel: { x: 0, y: 0 },
    

    // skip the crawl through ig.Animation and ig.Image
    // make the drawImage call directly
   
    
    draw: function () {
         
     
        ig.system.context.drawImage(this.image.data, (this.pos.x+this.size.x)-(ig.game._rscreen.x), (this.pos.y+this.size.y)- ig.game._rscreen.y);
       // ig.system.context.drawImage(this.image.data, ~~this.pos.x, ~~this.pos.y);
   
             
    },
    // (...)
    
    init: function( x, y, settings ) {    //this.particle=true;
//        this.pos.x = ig.game.loadedBallType.pos.x;
//        this.pos.x = ig.game.loadedBallType.pos.y-1000;
        this.parent( x, y, settings );

    },
    
    update: function(){     this.parent( );},
    
    
    reset: function( x, y, settings ) {
        // This function is called when an instance of this class is
        // resurrected from the entity pool.
        // The parent implementation of reset() will reset the .pos to 
        // the given x, y and will reset the .vel, .accel, .health and 
        // some other properties.
        this.parent( x, y, settings );
        
        // Play the shoot sound again. Remember, init() is never called 
        // when the entity is revived from the pool.

    },
    
    // (...)
});

// Enable Pooling!
ig.EntityPool.enableFor( EntityParticleFast );

});































//ig.module(
//    'game.entities.particle-fast'
//)
//.requires(//'impact.impact',
//    'impact.entity',
//   // 'impact.entity-pool'
//    
//)
//.defines(function () {
//
//// constructor
//// does not inherit from ig.Class which instantiates
//// classes slowly due to ig.copy
//EntityParticleFast = function (x, y) {
//    this.pos = {
//        x: x,
//        y: y
//    };
//
//    this.vel = {
//        x: this.vel.x * Math.random() - this.vel.x / 2,
//        y: this.vel.y * Math.random() - this.vel.y / 2
//    },
//    	this.erase= function() {},
//        this.particle=true, this._killed=false;
//    
//};
//
//// class
//// only define necessary attributes
//EntityParticleFast.prototype = {
//
//    image: new ig.Image('media/particle.png', 13, 13),
//    size: { x: 13, y: 13 },
//    vel: { x: 200, y: 200 },
//
//
//    // skip the crawl through ig.Animation and ig.Image
//    // make the drawImage call directly
//   
//    
//    draw: function () {
//             if (this.particle==true && this._killed==false){
//     
//        ig.system.context.drawImage(this.image.data, ~~this.pos.x, ~~this.pos.y);
//   
//             }else{return;}
//    },
//    
//    
//    type: ig.Entity.TYPE.NONE,
//checkAgainst: ig.Entity.TYPE.NONE,
//collides: ig.Entity.COLLIDES.NEVER,//PASSIVE
//    // remove gravity, collision map trace and animation update
//    update: function () {
//        
//
//
//        // simplified euler integration
//        // in-lined to remove the overhead of a function call
//        this.pos.x += this.vel.x * ig.system.tick;
//        this.pos.y += this.vel.y * ig.system.tick;
//
//        if (this.pos.x < 0 || this.pos.x + this.size.x > ig.system.width*ig.system.scale) {
//            this.vel.x = -this.vel.x;
//        }
//        if (this.pos.y < 0 || this.pos.y + this.size.y > ig.system.height*ig.system.scale) {
//            this.vel.y = -this.vel.y;
//        }
//        
//        
//         if(ig.game.killParticles.delta() >1.5){ig.game.removeParticles();}
//
//    },
//    
//    
//        reset: function( x, y, settings ) {
//        // This function is called when an instance of this class is
//        // resurrected from the entity pool.
//        // The parent implementation of reset() will reset the .pos to 
//        // the given x, y and will reset the .vel, .accel, .health and 
//        // some other properties.
//        this.parent( x, y, settings );
//        
//        // Play the shoot sound again. Remember, init() is never called 
//        // when the entity is revived from the pool.
//
//    },
//    
//    // (...)
//
//    
//    
//    
//};
//    
////ig.EntityPool.enableFor(EntityParticleFast);
//
//
//
//});