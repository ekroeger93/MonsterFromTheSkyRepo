// A Button Entity for Impact.js
 
ig.module( 'plugins.button' )
.requires(
'impact.entity',
'impact.font'
)
.defines(function() {
 
Button = ig.Entity.extend({
size: { x: 80, y: 40 },
text: [],
offset: {x: 0, y: 0},
nameButt: '',
textPos: { x: 5, y: 5 },
textAlign: ig.Font.ALIGN.LEFT,
font:  new ig.Font( 'media/04b03.font.png' ),
animSheet: null,
state: 'idle',
_oldPressed: false,
_startedIn: false,
_actionName: 'click',
//deactiveTimer : new ig.Timer(),
init: function( x, y, settings ) {
this.parent( x, y, settings );
this.name = this.nameButt ;
this.addAnim( 'idle', 1, [0] );
this.addAnim( 'active', 1, [1] );
this.addAnim( 'deactive', 1, [2] );
 
if ( this.text.length > 0 && this.font === null ) {
if ( ig.game.buttonFont !== null ) this.font = ig.game.buttonFont;
else console.error( 'If you want to display text, you should provide a font for the button.' );
}
},
update: function() {
//console.log(this.deactiveTimer.delta())



if ( this.state !== 'hidden' ) {

var _clicked = ig.input.state( this._actionName );

if ( !this._oldPressed && _clicked && this._inButton()) {
this._startedIn = true;
}else if (this._oldPressed && _clicked && !this._inButton()){this.state = 'idle'; }


if ( this._startedIn && this.state !== 'deactive' && this._inButton()) {
if ( _clicked && !this._oldPressed ) { // down

this.setState( 'active' );

this.pressedDown();
}
else if ( _clicked 
) { // pressed
this.setState( 'active' );
this.pressed();
}

else if ( this._oldPressed ) { 
this.pressedUp();
}
}

if ( this._oldPressed && !_clicked ) {
this._startedIn = false;
}
 
this._oldPressed = _clicked;
}
},
draw: function() {
if ( this.state !== 'hidden' ) {
this.parent();
 
if ( this.font !== null ) {
for ( var i = 0; i < this.text.length; i++ ) {
this.font.draw(
this.text[i],
(this.pos.x- (this.offset.x/2)) + this.textPos.x - ig.game.screen.x,
(this.pos.y- (this.offset.y/2)) + ((this.font.height + 2) * i) + this.textPos.y - ig.game.screen.y,
this.textAlign
);
}
}
}
},


setState: function( s ) {
this.state = s;
if ( this.state !== 'hidden' ) {
//this.currentAnim = this.anims[this.state];
}
},


pressedDown: function() {if (this._outButton) this.setState('idle')},
pressed: function() {
},
pressedUp: function() {this.state = "idle"},
_inButton: function() {
return ig.input.mouse.x + ig.game.screen.x > (this.pos.x-this.offset.x) &&
ig.input.mouse.x + ig.game.screen.x < (this.pos.x-this.offset.x) + this.size.x &&
ig.input.mouse.y + ig.game.screen.y > (this.pos.y-this.offset.y) &&
ig.input.mouse.y + ig.game.screen.y < (this.pos.y-this.offset.y) + this.size.y;
}


});
 
});