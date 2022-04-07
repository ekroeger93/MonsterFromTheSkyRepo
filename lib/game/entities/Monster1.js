ig.module(
	'game.entities.Monster1'
)
.requires(
'impact.entity-pool',
'impact.entity',
'game.entities.Monster0'
)
.defines(function(){
// 
EntityMonster1 = EntityMonster0.extend({

name:"monster1",
//animSheet1: new ig.AnimationSheet('media/Alien.png',50,50),
    animSheet: new ig.AnimationSheet('media/monster2.png',50,50),//176 65 
eColor:"yellow",
 
init: function(x,y,settings){

this.parent(x,y,settings);
},



})

})