ig.module('plugins.gui')
.requires(
	'impact.game',
	'impact.font',
    'impact.input'
)
.defines(function () {'use strict';
	// Create GUI container
	ig.gui = {
		// Configuration
		show: true,
		initialized: false,
        within:false,
        toX:0,
        toY:0,
   
        
		// Mouse and cursor
		cursor: {
			pos: { x: 0, y: 0 },
			offset: { x: 0, y: 0 },
			image: null,

			set: function(image) {
				this.image = image;
			},

			clear: function() {
				this.image = null;
			},

			draw: function() {
				if(this.image != null)
					this.image.draw(this.pos.x - this.offset.x, this.pos.y - this.offset.y);
            
			}
		},

		// Elements
		
	
		elements: [],
		element: {
        offsetX:0,//added cant understand why i cant add an object property but whatever
        offsetY:0,
		itext: [],//added
		font:  new ig.Font( 'media/04b03.font.png' ),//added
		textAlign: ig.Font.ALIGN.LEFT,//added
             flipX:false,
        flipY:false,    
			/* Actions:
					getByName, name
					getByGroup, name
					show, name
					showGroup, name
					hide, name
					hideGroup, name
					remove, name
					removeGroup, name
					enable, name
					enableGroup, name
					disable, name
					disableGroup, name
					disableAll
			*/
			action: function(action, name) {
				var collection = [];
				for (var i = 0; i < ig.gui.elements.length; i++) {
					// getByName
					if(action == 'getByName' && ig.gui.elements[i].name == name)
						collection.push(ig.gui.elements[i]);
					// getByGroup
					if(action == 'getByGroup' && ig.gui.elements[i].group == name)
						collection.push(ig.gui.elements[i]);
					// show
					if(action == 'show' && ig.gui.elements[i].name == name)
						ig.gui.elements[i].show = true;
					// showGroup
					if(action == 'showGroup' && ig.gui.elements[i].group == name)
						ig.gui.elements[i].show = true;
					// hide
					if(action == 'hide' && ig.gui.elements[i].name == name)
						ig.gui.elements[i].show = false;
					// hideGroup
					if(action == 'hideGroup' && ig.gui.elements[i].group == name)
						ig.gui.elements[i].show = false;
					// remove
					if(action == 'remove' && ig.gui.elements[i].name == name)
						ig.gui.elements.erase(ig.gui.elements[i]);
					// removeGroup
					if(action == 'removeGroup' && ig.gui.elements[i].group == name)
						ig.gui.elements.erase(ig.gui.elements[i]);
					// enable
					if(action == 'enable' && ig.gui.elements[i].name == name)
						ig.gui.elements[i].disable = false;
					// enableGroup
					if(action == 'enableGroup' && ig.gui.elements[i].group == name)
						ig.gui.elements[i].disable = false;
					// disable
					if(action == 'disable' && ig.gui.elements[i].name == name)
						ig.gui.elements[i].disable = true;
					// disableGroup
					if(action == 'enableGroup' && ig.gui.elements[i].group == name)
						ig.gui.elements[i].disable = true;
					// disableAll
					if(action == 'disableAll')
						ig.gui.elements[i].disable = true;
				}
				if(collection.length) {
					if(collection.length == 1) collection = collection[0];
					return collection;
				}
			},

			add: function(element) {
				if(element.show == undefined) element.show = true;
				if(element.disabled == undefined) element.disabled = false;
				if(element.active == undefined) element.active = false;
				ig.gui.elements.push(element);
			},

			draw: function() {
			
			
			

				for (var i = 0, l =ig.gui.elements.length; i < l; i++) {
					var element = ig.gui.elements[i],
						state = 'normal';
						
 if (ig.ua.mobile === false){
					// Check position & state
     
					if(!element.show) continue;
					if(ig.gui.cursor.pos.x >= element.pos.x+  element.offsetX && ig.gui.cursor.pos.x <= element.pos.x + element.size.x +  element.offsetX &&
						ig.gui.cursor.pos.y >= element.pos.y +  element.offsetY && ig.gui.cursor.pos.y <= element.pos.y + element.size.y +  element.offsetY &&
						!element.disabled) {
						state = 'hover';
                        element.within=true; //added
					} else{ element.within=false;} //added
					
					// Pressed
					if(state == 'hover' && (ig.input.state('click') || ig.input.pressed('click'))) {
						state = 'active';
						if(ig.input.state('click') && typeof ig.gui.elements[i].mouseDown == 'function')
							ig.gui.elements[i].mouseDown.call(element);
						if(ig.input.pressed('click')) {
							// Toggle (click)
							if(element.toggle)
								element.active = !element.active;
							// Click function
							if(typeof ig.gui.elements[i].click == 'function')
								ig.gui.elements[i].click.call(element);
						}
					}
 }else
 
 
 
 
 
 { 
     	var element = ig.gui.elements[i],
						state = 'normal';
         //var toX,toY;
     
     
    // console.log (ig.gui.elements[i] );
     
     var upper= ig.game;
    var refCanvas = ig.system.canvas;
                
//     function getTouchPos(canvasDom, touchEvent) {
//  var rect = canvasDom.getBoundingClientRect();
//  return {
//    x: touchEvent.touches[0].clientX - rect.left,
//    y: touchEvent.touches[0].clientY - rect.top
//  };
//}
     		var pos = {left: 0, top: 0};
		if( refCanvas.getBoundingClientRect ) {
			pos = refCanvas.getBoundingClientRect();
		}
     
        if(!element.show) continue;
     				
   
     /*
     when first navigating nodes touch lags significantly
     
     Impact already has EventListeners 
     Mimic touch-button?
     
     //console.log(ig.input.keydown) touchstart
//console.log(ig.input.mousemove) touchmove
//keyup touchend   / 
     
    
         refCanvas.addEventListener('touchstart', function(e){
     
                 //   getTouchPos( ig.system.canvas,e);
                    var touch = e.touches[0];

                       upper.toX=(touch.clientX-pos.left)/2;
                       upper.toY= (touch.clientY-pos.top)/2;
                        
                  
          if (e.target == refCanvas) e.preventDefault();
  
            
                        
                       upper.touching=true;
                        
                        
    },  {passive:false})
  
    refCanvas.addEventListener('touchmove', function(e){
         
                               //  getTouchPos( ig.system.canvas,e);
                    if (e.target == refCanvas)  e.preventDefault();
  
            
var touch = e.touches[0];
         
            upper.toX=(touch.clientX-pos.left)/2;
          upper.toY= (touch.clientY-pos.top)/2;
         
        // upper.touching=true;
         
     }, {passive:false})
         
     refCanvas.addEventListener('touchend', function(e){
  if (e.target == refCanvas) e.preventDefault();
    ig.game.touching=false;
                            ig.input.released('click'); 
    }, {passive:false})
    
    
    
    
     */

     
     if (ig.input.state('click')==true){
upper.toX=ig.input.mouse.x;
upper.toY=ig.input.mouse.y;
          upper.touching=true;
     }else{
        
 upper.touching=false;
         
         
     }
  
     //    ig.input.keydown('touchstart')

     
       if( ig.game.toX >= element.pos.x+  element.offsetX &&  ig.game.toX <= element.pos.x + element.size.x+  element.offsetX &&
                           ig.game.toY >= element.pos.y+  element.offsetY && ig.game.toY<= element.pos.y + element.size.y+  element.offsetY &&!element.disabled 
                        &&ig.game.touching==true )
                        {       
      	state = 'hover';
                        element.within=true; //added
					} else{ element.within=false;} //added
                        
         
     
     					if(state == 'hover') {
						state = 'active';
					//	if(ig.game.touching) ig.gui.elements[i].mouseDown.call(element);
						if(ig.input.pressed('click')) {
							// Toggle (click)
							if(element.toggle)
								element.active = !element.active;
							// Click function
							if(typeof ig.gui.elements[i].click == 'function')
								ig.gui.elements[i].click.call(element);
						}
                        }
     
     
		
     
 }
                    
                    
                    
                    
                    
                    
                    
					// Toggle (state)
					if(element.toggle && element.active)
						state = 'active';

					// Default state
					if(ig.gui.elements[i].state[state] == undefined)
						state = 'normal';
                    
                
					// Alpha
					//if(element.alpha != undefined)
					//	ig.system.context.globalAlpha = element.alpha;

					// Image
					var image = ig.gui.elements[i].state[state];
					if(isNaN(image.tile) || isNaN(image.tileSize)) {
						image.image.draw(element.pos.x, element.pos.y);
					} else {
					//	image.image.drawTile(element.pos.x, element.pos.y, image.tile, image.tileSize);
						image.image.drawTile(element.pos.x+  element.offsetX, element.pos.y +element.offsetY, image.tile, image.tileSize, false, element.flipX,element.flipY);
					}
                    
                    
                        //added inactive 
                    ( ig.gui.elements[i].disable == true) ?
                     element.alpha = 1 : element.alpha = 0;
                    //
                    
                    
                    
                    

					// Restore
					//ig.system.context.globalAlpha = 1;
					//added

 

if (typeof element.font != 'undefined' && element.itext.length >0 )
{
element.font.draw(element.itext,
element.pos.x+(element.size.x/2)+3,
element.pos.y+(element.size.y/2)-3,
ig.Font.ALIGN.CENTER);
//}


}//added
					
					
				}
			}
		},
        
        
        
    touchStart: function( e ) {
	},
	
	touchEnd: function( e ) {

	},
	
        
        
        
        

		// Draw
		draw: function() {
			this.element.draw();
			// Capture mouse
			this.cursor.pos = {
				x: ig.input.mouse.x,
				y: ig.input.mouse.y
			}
			this.cursor.draw();
		}
	}

	// Initialize and draw
	ig.Game.inject({
		update: function() {
			this.parent();

			// Initialize GUI
			if(ig.gui.initialized) return; else ig.gui.initialized = true;

			// Bind
		//	ig.input.bind(ig.KEY.click, 'click');
		}
	});
});
