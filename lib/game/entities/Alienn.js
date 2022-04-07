ig.module(
	'game.entities.Alienn'
)
.requires(
'impact.game',
'impact.entity',
'game.entities.Alien'
)
.defines(function(){
// 
EntityAlienn = EntityAlien.extend({

name:"alien2",
//animSheet1: new ig.AnimationSheet('media/Alien.png',50,50),
eColor:"yellow",
 
init: function(x,y,settings){

this.parent(x,y,settings);
},



})

})