ig.module('game.gui_Moderator')
.requires(
	'impact.game'
	//,'impact.font'
)
.defines(function() {
	gui_Moderator = function() {

	
	


ig.gui.element.add({
		name: 'reload',
			group: 'tvOptions',
			active: false,
        offsetX:0,
    offsetY:0,
			font:  new ig.Font( 'media/04b03.font.png'),
			itext : "",
			size: {x: 75, y:75},//{x: 75, y:92},
  
			pos : {
				x: (ig.system.width/2)-37.5,//-318,
			    y:0//-200 ,//-235 ig.game.getEntitiesByType(EntitySling)[0].pos.y
				   },
			state: {
                normal:{
					image:  new ig.Image('media/reload.png'),
					tile: 0, 
					tileSize: 75, active:false
				},
			active: {
					image:  new ig.Image('media/reload.png'),
					tile: 1,
					tileSize: 75, active:true
					}
				
			},
			
			    click: function() {
					
                     ig.game.reloaded=true;
                    
				if (ig.game.reloadBallrdy === true &&  ig.game.loadedBallType.freeze ===false
                   ){
                    console.log("e")
                //   ig.game.cacheArrayClear();
                    // ig.game.loadLevel(LevelTestlvl);
                    
					ig.game.spawnEntity("EntityBall", ig.game.getEntitiesByType(EntitySling)[0].pos.x, 1000);
               
                        for(i =0; i <= ig.game.enemyArchive.length; i++){
		if (typeof ig.game.getEntityByID(ig.game.enemyArchive[i])!= 'undefined' && ig.game.getEntityByID(ig.game.enemyArchive[i]).hoverDwn== false )
            { ig.game.getEntityByID(ig.game.enemyArchive[i]).hoverDwn = true}
            
            }
                    ig.game.loadedBallType.kill();
                 ig.game.plotter.select=0;
               // if (ig.game.loadedBallType.ball == 'gravitationMass')
               //{ig.game.loadedBallType.kill()}
                
                
                }
                    
                    
                    
                
                        
                    
			},
		
		
		

})

        
        
    //MERGE FREEZE AND STARTSTOP FUNCTIONALITY BY IMPLEMENTING BOTH TAP AND HOLD
        
ig.gui.element.add({
		name: 'freeze',    offsetX:0,
    offsetY:0,
			group: 'tvOptions',
			active: false,
			font:  new ig.Font( 'media/04b03.font.png'),
			itext : "",toggle: true,
			size: {x: 75, y:75},//{x: 75, y:92},
   // toggle:true,
			pos : {
				x:(ig.system.width/2)-37.5,// (ig.system.width/2)+(-200)-23.5,//-318,
			    y:((ig.system.height/2))*1.72 ,//-235 ig.game.getEntitiesByType(EntitySling)[0].pos.y
				   },
			state: {
				normal:{
					image:  new ig.Image('media/freeze.png'),
					tile: 0, 
					tileSize: 75
                    , active:false
				},
			active: {
					image:  new ig.Image('media/freeze.png'),
					tile: 1,
					tileSize: 75, active:true
					}
				
				
			},
			
			    click: function() {
                    
            
////                    
//                    if (	ig.game.loadedBallType.freeze === true  ) 	{                          }else
//                                             { ig.game.startstop.reset();
//                                             ig.game.startstop.unpause();
//                                             ig.game.metamode= true} 
//                    
//                    
                    
                    
                        if (	ig.game.loadedBallType.freeze === true ) 	{ig.game.loadedBallType.freeze = false; 
                                                                            ig.game.metamode= false
                                                               
                                                                         
                                                                        }else
                                                                        { ig.game.metamode= true
                                                                            ig.game.loadedBallType.freeze = true;
                    
                    
                    
                                                                        }
                    
                    
                    
			},
		
		
    
    
    
    
//                        if (	ig.game.loadedBallType.freeze === true ) 	{ig.game.loadedBallType.freeze = false; 
//                                                                            ig.game.metamode= false
//                                                               
//                                                                         
//                                                                        }else
//                                                                        { ig.game.metamode= true
//                                                                            ig.game.loadedBallType.freeze = true;
//                                                                       
//                                                                    ///  ig.game.getEntitiesByType(EntityCamera)[0].shakeCam(1,1,2)  
//                                                                        
//                                                                        } 
//    
    
    
		

})

        

ig.gui.element.add({
		name: 'startstop',    offsetX:0,
    offsetY:0,
			group: 'ctrl',
			active: false,
			font:  new ig.Font( 'media/04b03.font.png'),
			itext : "",
			size: {x: 75, y:75},//{x: 75, y:92},
			pos : {
				x: 0,//(ig.system.width/2)+(-200)-23.5,//-318,
			    y:((ig.system.height/2)-15)*1.9   ,//-235 ig.game.getEntitiesByType(EntitySling)[0].pos.y
				   },
			state: {
				normal:{
					image:  new ig.Image('media/startStop.png'),
					tile: 0, 
					tileSize: 75, active:false
				},
			active: {
					image:  new ig.Image('media/startStop.png'),
					tile: 1,
					tileSize: 75, active:true
					}
				
				
			},
			
			    click: function() {  
                    
//                    ig.game.loadedBallType.vel.x = ig.game.sData[3].velX
//                    ig.game.loadedBallType.vel.y = -ig.game.sData[3].velY
//                    
//                    ig.game.loadedBallType.pos.x = ig.game.sData[3].posX
//                    ig.game.loadedBallType.pos.y = ig.game.sData[3].posY
//                        
//                     ig.game.loadedBallType.pos.x=ig.game.sData[2].posX;
//                    ig.game.loadedBallType.pos.y=ig.game.sData[2].posY;
//                    ig.game.loadedBallType.vel.x=ig.game.sData[2].velX;
//                    ig.game.loadedBallType.vel.y=-ig.game.sData[2].velY;
                    if (	ig.game.loadedBallType.freeze === true) 	{              ig.game.startstop.unpause();
                   //   ig.game.startstop.reset();
      
                                   
                    ig.game.loadedBallType.freeze = false; 
                
                    //    console.log(ig.game.startstop.delta())
                                                                    }
                                   
                               
                                   

                                   
                                   
                        //if ( ticker.delta().round(2) < -0.08 )ig.game.loadedBallType.freeze = true;
                                   
                                   
                                   
                                   
			},
		
		
		

})

        
        
ig.gui.element.add({
		name: 'cameraOff',
			group: 'ctrl2',
			active: false,
			font:  new ig.Font( 'media/04b03.font.png'),
			itext : "C:on",
			size: {x: 30, y:30},//{x: 75, y:92},
			pos : {
				x:150,// (ig.system.width/2)+(-200)-23.5,//-318,
			    y:((ig.system.height/2)-15 )*1.95 ,//-235 ig.game.getEntitiesByType(EntitySling)[0].pos.y
				   },
			state: {
				normal:{
					image:  new ig.Image('media/tvButtons.png'),
					tile: 1, 
					tileSize: 30
                    , active:false
				},
			active: {
					image:  new ig.Image('media/tvButtons.png'),
					tile: 0,
					tileSize: 30, active:true
					}
				
				
			},
			
			    click: function() {
                  ig.game.getEntitiesByType(EntityCamera)[0].cfON = !ig.game.getEntitiesByType(EntityCamera)[0].cfON;//this.itext="C:on"
                                                                  
                                                                        
                    
                     (ig.game.getEntitiesByType(EntityCamera)[0].cfON) ? (this.itext="C:on") :(this.itext="C:off") 
                    
                    
			},
		
		
		

})



ig.gui.element.add({
		name: 'nodeLft',
        offsetX:0,
    offsetY:0,
			group: 'ctrl',
			active: false,
			font:  new ig.Font( 'media/04b03.font.png'),
			itext : "",
			size: {x: 53, y:53},//{x: 75, y:92},
      flipY:false,
			pos : {
				x: (ig.system.width)-53,//(ig.system.width/2)+(-130)-23.5,//-318,
			    y:(ig.system.height/2)*1.72,//(ig.system.height/2)+(140)-23.5 ,//-235 ig.game.getEntitiesByType(EntitySling)[0].pos.y
				   },
			state: {
				normal:{
					image:  new ig.Image('media/scrollbtn.png'),
					tile: 0, 
					tileSize: 53, active:false
				},
			active: {
					image:  new ig.Image('media/scrollbtn.png'),
					tile: 1,
					tileSize: 53, active:true
					}
				
				
			},
			
			    click: function() {
                    if (	ig.game.loadedBallType.freeze === true && ig.game.plotter.select >0) 	{
                        ig.game.plotter.select--//--
                        //    ig.game.plotter.select=100
                        
                     var  cam= ig.game.getEntitiesByType(EntityCamera)[0];
                    cam.srcSpeed=-1;
                  //  console.log("Y   "+ig.game.plotter.y.round(3)+"   |  "+ig.game.loadedBallType.pos.y.round(3))
                   // console.log("X   "+ig.game.plotter.x.round(3)+"   |  "+ig.game.loadedBallType.pos.x.round(3))
                  //  console.log(ig.game.plotter.select)
                    
                                                                        } 

			},
		
		
		

})

ig.gui.element.add({
		name: 'nodeRht',
        offsetX:0,
    offsetY:0,
			group: 'ctrl',
			active: false,
			font:  new ig.Font( 'media/04b03.font.png'),
			itext : "",
    flipY:true,
				size: {x: 53, y:53},//{x: 75, y:92},
			pos : {
				x: (ig.system.width)-53,//(ig.system.width/2)+(-70)-23.5,//-318,
			    y: -8,//(ig.system.height/2)+(140)-23.5 ,//-235 ig.game.getEntitiesByType(EntitySling)[0].pos.y
				   },
			state: {
				normal:{
						image:  new ig.Image('media/scrollbtn.png'),
					tile: 0, 
					tileSize: 53, active:false
				},
			active: {
					image:  new ig.Image('media/scrollbtn.png'),
					tile: 1,
					tileSize: 53, active:true
					}
				
				
			},
			
			    click: function() {
                    if (	ig.game.loadedBallType.freeze === true && ig.game.plotter.select < ig.game.sData.length-2) 	{
                        ig.game.plotter.select++//=29//++; 
                        //    ig.game.plotter.select=45
                    var  cam= ig.game.getEntitiesByType(EntityCamera)[0];
                    cam.srcSpeed=1;
                      // console.log("Y   "+ig.game.plotter.y.round(3)+"   |  "+ig.game.loadedBallType.pos.y.round(3))
                    //   console.log("X   "+ig.game.plotter.x.round(3)+"   |  "+ig.game.loadedBallType.pos.x.round(3))
                    //   console.log(ig.game.plotter.select)
                    
                                                                        }

			},
		
		
		

})

ig.gui.element.add({
		name: 'posX~',
			group: 'tvOptions',        offsetX:-150,
    offsetY:0,
			active: false,
//			font:  new ig.Font( 'media/04b03.font.png'),
//			itext : "X~",
				size: {x: 100, y:100},//{x: 75, y:92},
			pos : {
				x: 100,//(ig.system.width/2)+(-160)-23.5,//-318,
			    y:180//(ig.system.height/2)+(195)-23.5 ,//-235 ig.game.getEntitiesByType(EntitySling)[0].pos.y
				   },
			state: {
				normal:{
				image:  new ig.Image('media/flipperbtnLft.png'),
					tile: 0, 
					tileSize: 100
				},
			active: {
					image:  new ig.Image('media/flipperbtnLft.png'),
					tile: 1, 
					tileSize: 100
					}
				
				
			},
			
			    click: function() {ig.game.flipperSound.play();
//                    if (	ig.game.loadedBallType.freeze === true 
//                        &&    ig.game.sData[ig.game.plotter.select+1].invsY===false
//                         && ig.game.sData[ig.game.plotter.select+1].invsX===false
//                        && ig.game.sData[ig.game.plotter.select+1].invsVel===false ) 	{//ig.game.sData[ig.game.plotter.select].invs =true ;
//                                                   var len = ig.game.colData.length-1;
//                        
//                                                                         //ig.game.colData[len].invsX=true;// ig.game.sData[ig.game.plotter.select].invs
//                                                                       // ig.game.sData[ig.game.plotter.select].invs
//                                                                        // ig.game.colData[0].posX=ig.game.sData[ig.game.plotter.select].posX;//+1
//                                                                       //  ig.game.colData[0].posY=ig.game.sData[ig.game.plotter.select].posY;
//                                                             //       ig.game.atlasOrder[len] = ig.game.sData[ig.game.plotter.select].indexOf;
//                                                                     //ig.game.colData[ig.game.colData.length-1].orderOf= ig.game.sData[ig.game.plotter.select].indexOf;
//    
//                            //ig.game.colData[len].orderOf= ig.game.sData[ig.game.plotter.select].indexOf;
//                        
//                        
//                   //     ig.game.atlasOrder.sort(function(a, b){return a-b});
//
//                
//                      ig.game.colData[ig.game.dirInc].invsX=true;
//                  //   ig.game.colData[0].invsX=true;    
//                        
//ig.game.rebuildColDat( ig.game.sData[ig.game.plotter.select].indexOf,ig.game.dirInc);
//      
//  
//                      
//ig.game.dirInc++                   
//                        
//                        
//                    
//                        
//                        
//                        
//                                                                        } 
                    
               
                    ig.game.loadedBallType.vel.x*=-ig.game.loadedBallType.bounciness;

			},
		
		
		

})



ig.gui.element.add({
		name: 'posY~',
			group: 'tvOptions',       
    offsetX:50,
    offsetY:0,
			active: false,
//			font:  new ig.Font( 'media/04b03.font.png'),
//			itext : "Y~",
			size: {x: 100, y:100},//{x: 75, y:92},
			pos : {
				x:ig.system.width-100,//(ig.system.width/2)+(-100)-23.5,//-318,
			    y:180,//(ig.system.height/2)+(195)-23.5 ,//-235 ig.game.getEntitiesByType(EntitySling)[0].pos.y
				   },
			state: {
				normal:{
					image:  new ig.Image('media/flipperbtnLft.png'),
					tile: 0, 
					tileSize: 100
				},
			active: {
					image:  new ig.Image('media/flipperbtnLft.png'),
					tile: 1,
					tileSize: 100
					}
				
				
			},
			
			    click: function() {ig.game.flipperSound.play();
//                    if (	ig.game.loadedBallType.freeze === true &&
//                        
//                         ig.game.sData[ig.game.plotter.select+1].invsX===false
//                        && ig.game.sData[ig.game.plotter.select+1].invsY===false
//                        && ig.game.sData[ig.game.plotter.select+1].invsVel===false
//                       
//                       
//                       ) 	{        
////                        ig.game.colData[0].invsY=true;// ig.game.sData[ig.game.plotter.select].invs
////                                                                         ig.game.colData[0].posX=ig.game.sData[ig.game.plotter.select].posX;//+1
////                                                                         ig.game.colData[0].posY=ig.game.sData[ig.game.plotter.select].posY;
//                                                                         
//                                                                              var len = ig.game.colData.length-1;
//                                                                       //  ig.game.colData[len].invsY=true;// ig.game.sData[ig.game.plotter.select].invs
//                                                                       //  ig.game.colData[0].posX=ig.game.sData[ig.game.plotter.select].posX;//+1
//                                                                    //     ig.game.colData[0].posY=ig.game.sData[ig.game.plotter.select].posY;
//                                                                //    ig.game.atlasOrder[0] = ig.game.sData[ig.game.plotter.select].indexOf;
//                                                                   //  ig.game.colData[len].orderOf= ig.game.sData[ig.game.plotter.select].indexOf;
//                        
//                       // ig.game.atlasOrder.sort(function(a, b){return a-b});
//                      //  ig.game.colData.sort(function(a= ig.game.colData.orderOf, b= ig.game.colData.orderOf){return a-b})
//                        //objs.sort(function(a,b) {return (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0);} ); 
//                      // ig.game.colData.sort(function(a,b) {return (a.orderOf > b.orderOf) ? 1 : ((b.orderOf > a.orderOf) ? -1 : 0);} ); 
//                        
//                    //    ig.game.colData.sort(function(a, b) { return (b.orderOf) - (a.orderOf); });
//                    
//                       ig.game.colData[ig.game.dirInc].invsY=true;
//                        
//                         //ig.game.colData[0].invsY=true;
//                        
//                        ig.game.rebuildColDat( ig.game.sData[ig.game.plotter.select].indexOf,ig.game.dirInc);
//                        
//                          
//                        
//                        
//                        ig.game.dirInc++
//                                                                         
//                                                                         
//                                                                        }
                    
                      ig.game.loadedBallType.vel.y*=-ig.game.loadedBallType.bounciness;

			},
		
		
		

})

ig.gui.element.add({
		name: 'null',
        offsetX:0,
    offsetY:0,
			group: 'ctrl',
			active: false,
			font:  new ig.Font( 'media/04b03.font.png'),
			itext : "",
			size: {x: 45, y:45},//{x: 75, y:92},
			pos : {
				x: 0,//(ig.system.width/2)+(-160)-23.5,//-318,
			    y:60//(ig.system.height/2)+(195)-23.5 ,//-235 ig.game.getEntitiesByType(EntitySling)[0].pos.y
				   },
			state: {
				normal:{
					image:  new ig.Image('media/null.png'),
					tile: 0, 
					tileSize: 45
				},
			active: {
					image:  new ig.Image('media/null.png'),
					tile: 1,
					tileSize: 45
					}
				
				
			},
			
			    click: function() {
                    if (	ig.game.loadedBallType.freeze === true ) 	{//ig.game.sData[ig.game.plotter.select].invs =true ;
                                                   
         
                  for (i=0,len=ig.game.colData.length ; i <len; i++) {
                      
                        if (ig.game.sData[ig.game.plotter.select].indexOf=== ig.game.colData[i].orderOf ){
                            
                            
                                  ig.game.colData[i].orderOf=null; 
                                  ig.game.colData[i].invsX=false;
                                  ig.game.colData[i].invsY=false;
                                  ig.game.colData[i].posX =0;
                                  ig.game.colData[i].posY =0;
                                  ig.game.colData[i].xBouy=0;
                                  ig.game.colData[i].yBouy=0;
                                  ig.game.colData[i].invsVel=false;
                            
                            
                          if (ig.game.dirInc > 0)  ig.game.dirInc--;
                            
                            
                                 ig.game.rebuildColDat( null, i);  
                           
                  //          console.log(ig.game.dirInc)
                            
                              break;
                            }  
                      
                      
                      
                       
                            
                  }
                        
                  //      ig.game.rebuildColDat( ig.game.sData[ig.game.plotter.select].indexOf, ig.game.dirInc);  
                        
                   
                        
                        
                    
                        
                        
                        
                                                                        }

			},
		
		
		

})
           
    
ig.gui.element.add({
		name: 'velB',
			group: 'ctrl2',
			active: true,
			font:  new ig.Font( 'media/04b03.font.png'),
			itext : "V>>",
			size: {x: 30, y:30},//{x: 75, y:92},
			pos : {
				x: 10,//(ig.system.width/2)+(-100)-23.5,//-318,
			    y:240,//(ig.system.height/2)+(195)-23.5 ,//-235 ig.game.getEntitiesByType(EntitySling)[0].pos.y
				   },
			state: {
				normal:{
					image:  ig.game.tvButton,
					tile: 1, 
					tileSize: 30
				},
			active: {
					image:  ig.game.tvButton,
					tile: 0,
					tileSize: 30
					}
				
				
			},
			
			    click: function() {
                    if (	ig.game.loadedBallType.freeze === true ) 	{        
 // console.log(ig.game.sData[ig.game.plotter.select].velY)              
                        //ig.game.sData[ig.game.plotter.select].Fn.boostV()
                          ig.game.loadedBallType.vel.x*=1.5 
             ig.game.loadedBallType.vel.y*=1.5
                                //      console.log(ig.game.sData[ig.game.plotter.select].velY)                                   
                                                                         
                                                                        }

			},
		
		
		

})


ig.gui.element.add({
		name: 'insV',
    offsetX:-18.75,
    offsetY:-12.25,
			group: 'ctrl',
			active: false,
			//font:  new ig.Font( 'media/04b03.font.png'),
			//itext : "",
			size: {x: 50, y:50},//{x: 75, y:92},
			pos : {
				x: 0,//(ig.system.width/2)+(-100)-23.5,//-318,
			    y:0,//(ig.system.height/2)+(195)-23.5 ,//-235 ig.game.getEntitiesByType(EntitySling)[0].pos.y
				   },
        offset: {
            x:12.5,
            y:12.5
            
        },
			state: {
				normal:{
					image:  ig.game.sliderImg,
					tile: 0, 
					tileSize: 50,
                    active:false,
                    offset:{x:40,y:50}
				},
			active: {
					image:   ig.game.sliderImg,
					tile: 0,
					tileSize: 50,
                active:true
					}
            
				
				
			},
			
			    click: function() {
                    
    
                    var upper = ig.game;
                   //console.log(upper.sData[upper.plotter.select+1].invsVel)
             
                    if (	upper.loadedBallType.freeze === true    
                      /*
                      this bypasses an issue where the manipulating a trajectory 1 node after the node colliding with the borders 
                      causes an offset to the preceeding nodes
                      
                      */  
               
                        && ig.game.sData[ig.game.plotter.select+1].invsY===false 
                        && ig.game.sData[ig.game.plotter.select+1].invsX===false 
                        &&   ig.game.sData[ig.game.plotter.select].comColl===false
                         &&   ig.game.sData[ig.game.plotter.select-1].comColl===false
                          &&   ig.game.sData[ig.game.plotter.select+1].comColl===false
                            && upper.sData[upper.plotter.select].invsX == false 
                            && upper.sData[upper.plotter.select+1].invsX == false 
                            && upper.sData[upper.plotter.select-1].invsX == false 
//                
                    
                    && upper.sData[upper.plotter.select].posX !== 0 
                    && upper.sData[upper.plotter.select].posX !== upper.gameDimesion.xLevel-upper.loadedBallType.size.x
                    && upper.sData[upper.plotter.select-1].posX !== 0 
                    && upper.sData[upper.plotter.select-1].posX !== upper.gameDimesion.xLevel-upper.loadedBallType.size.x
                    && upper.sData[upper.plotter.select+1].posX !== 0 
                    && upper.sData[upper.plotter.select+1].posX !== upper.gameDimesion.xLevel-upper.loadedBallType.size.x
                    && upper.sData[upper.plotter.select].posY !== 1200
                    && upper.sData[upper.plotter.select-1].posY !==  1200
                    && upper.sData[upper.plotter.select+1].posY !==  1200
                       && upper.dirInc < upper.colData.length
//                       ||
//                        upper.dirInc-1 != -1 
//                        && //upper.colData[upper.dirInc-1].orderOf
//                       upper.sData[upper.plotter.select+1].invsVel ===true
                       
                       ) 	{     
                              
                        
                        function here(){
                                   upper.colData[upper.dirInc].invsVel=true;
                        upper.rebuildColDat( upper.sData[upper.plotter.select].indexOf,upper.dirInc);
                        
                             ig.gui.element.action('getByName','insV').state.active.image =new ig.Image('media/slider.png') ;
              
                        upper.dirInc++;
                            
                       
                        }
               
               
                        
                        if (ig.game.sData[ig.game.plotter.select+1].invsVel===false ){
                            
                            here();
//                         upper.colData[upper.dirInc].invsVel=true;
//                        upper.rebuildColDat( upper.sData[upper.plotter.select].indexOf,upper.dirInc);
//                        
//                             ig.gui.element.action('getByName','insV').state.active.image =new ig.Image('media/slider.png') ;
//              
//                        upper.dirInc++;
                              }
                        
                        
                        
                        if (ig.game.sData[ig.game.plotter.select+1].invsVel===true )
                            {
                              //    upper.dirInc--;
                               //  upper.rebuildColDat( upper.sData[upper.plotter.select].indexOf,upper.dirInc);
                              //   upper.colData[upper.dirInc].invsVel=false;
                                ig.game.sData[ig.game.plotter.select+1].invsVel =false
                              // here();
                                
                            }
                      
                     //   ig.game.sData[ig.game.plotter.select].invsVel=true
                    
                        
                        
              }
                    
                    
//                    else if (upper.loadedBallType.freeze === true && ig.game.sData[ig.game.plotter.select+1].invsVel===true){
//                                 
//                           for (i=0,len=ig.game.colData.length ; i <len; i++) {
//                      
//                        if (ig.game.sData[ig.game.plotter.select].indexOf=== ig.game.colData[i].orderOf ){
//                            
//                            
//                            //ig.game.colData[i].xBouy=0;
//                           // ig.game.colData[i].yBouy=0;
//                            ig.game.colData[i].invsVel=false;
//                            
//                            
//                          if (ig.game.dirInc > 0)  ig.game.dirInc--;
//                        
//                            
//                           // ig.game.rebuildColDat( null, i);  
//                        }}
//                       // ig.game.invsVSet(upper.dirInc);
//
//                             ig.gui.element.action('getByName','insV').state.active.image =new ig.Image('media/slider.png') ;
//                        
//                        
//                   
//                    
//                        
//                        
//                        
//                        }
                    
                    
                    
                    else {
                 
                        
                 ig.gui.element.action('getByName','insV').state.active.image =new ig.Image('media/noslider.png') ;
                  
       
                  
              }
                    

			},
		
		
		

})


ig.gui.element.add({
		name: 'slider',
			group: 'ctrl2',
			active: false,
          //  within:false,
			font:  new ig.Font( 'media/04b03.font.png'),
			itext : "0",
			size: {x: 50, y:30},//{x: 75, y:92},
			pos : {
				x: (ig.system.width)-40,//-318,
			    y:(ig.system.height/2)+(100) ,//-235 ig.game.getEntitiesByType(EntitySling)[0].pos.y
				   },
			state: {
				normal:{
					image:  new ig.Image('media/tvButtons.png'),
					tile: 1, 
					tileSize: 30,
                    active:false
                    
				},
			active: {
					image:  new ig.Image('media/tvButtons.png'),
					tile: 0,
					tileSize: 30,
                active:true
					}
				
				
			},
			
			    click: function() {
                    if (	ig.game.loadedBallType.freeze === true ) 	{        
this.active = true;
                                                                        }

			},
		
		
		

})

        
        
        
        
        
        
        
  ig.gui.element.add({
		name: 'option',
			group: 'Options',offsetX:0,
    offsetY:0,
//			group: 'ctrl',
			active: false,
          //  within:false,
      toggle:true,
			font:  new ig.Font( 'media/04b03.font.png'),
			itext : "",
			size: {x: 60, y:60},//{x: 75, y:92},
			pos : {
				x: 0,//-318,
			    y:(ig.system.height/2)-(160) ,//-235 ig.game.getEntitiesByType(EntitySling)[0].pos.y
				   },
			state: {
				normal:{
					image:  new ig.Image('media/optionMenu.png'),
					tile: 0, 
					tileSize: 60,
                    active:false
                    
				},
			active: {
					image:  new ig.Image('media/optionMenu.png'),
					tile: 1,
					tileSize: 60,
                active:true
					}
				
				
			},
			
			    click: function() {
                    
                    if(this.active){ ig.game.gameMode=2;  ig.game.loadedBallType.freeze=true
                    ig.game.optionMenu=true
                    }else{ig.game.gameMode=1;
                        ig.game.optionMenu=false
    ig.game.loadedBallType.freeze=false
                         }

			},
		


})
      
        
        
        
          ig.gui.element.add({
		name: 'options',
			group: 'subOptions',offsetX:0,
    offsetY:0,
//			group: 'ctrl',
			active: true,
          //  within:false,
      toggle:true,
			font:  new ig.Font( 'media/04b03.font.png'),
			itext : "",
			size: {x: 150, y:50},//{x: 75, y:92},
			pos : {
				x: 65,//-318,
			    y:(ig.system.height/2)-(110) ,//-235 ig.game.getEntitiesByType(EntitySling)[0].pos.y
				   },
			state: {
				normal:{
					image:  new ig.Image('media/optPref.png'),
					tile: 0, 
					tileSize: 150,
                    active:false
                    
				},
			active: {
					image:  new ig.Image('media/optPref.png'),
					tile: 1,
					tileSize: 150,
                active:true
					}
				
				
			},
			
			    click: function() {
                         if(this.active){ ig.game.prefMode=true;
                    }else{
                      ig.game.prefMode=false;
   
                         }

        
			},
		


})
      
        
           ig.gui.element.add({
		name: 'options',
			group: 'subOptions',offsetX:0,
    offsetY:0,
//			group: 'ctrl',
			active: true,
          //  within:false,
      toggle:true,
			font:  new ig.Font( 'media/04b03.font.png'),
			itext : "",
		size: {x: 150, y:50},
			pos : {
				x: 65,//-318,
			    y:(ig.system.height/2)-(160) ,//-235 ig.game.getEntitiesByType(EntitySling)[0].pos.y
				   },
			state: {
				normal:{
					image:  new ig.Image('media/optMusic.png'),
					tile: 0, 
					tileSize: 150,
                    active:false
                    
				},
			active: {
					image:  new ig.Image('media/optMusic.png'),
					tile: 1,
					tileSize: 150,
                active:true
					}
				
				
			},
			
			    click: function() {
                         if(this.active){ig.game.stopMusic = false;
                    }else{
                ig.game.stopMusic = true; audio.stop(playThis);
                         }

        
			},
		


})
             
        
        
        
        

    }})
