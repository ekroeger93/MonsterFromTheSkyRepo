ig.module(
'game.entities.Camera'
)
.requires(
'impact.entity',
'impact.game',
'plugins.impact-storage',
'game.gui_Moderator',
'plugins.gui',
 'impact.font'

//'plugins.scale'

)
.defines(function(){

var storage = new ig.Storage(); // disable
storage.initUnset('gameMode',0); //disable

EntityCamera = ig.Entity.extend({
	
gameMode: 0,
maxVel: {x:6000,y:6000},
zindex: -500,
gotoNxtRound : false,
ball: null, 
sling :null,
size:{x:0 , y:0},
ignorePause: true,
gravityFactor: 0,
upDate:0,    
clickndrag:false,
menuText: new ig.Font ('media/04b03.font.png'),
cfON:true,
altPress:false,
tPDelay:false,
tPress:false,

    shakeTime:null,
    shake:false,
    sMag:{x:0,y:0},
    sTime:.1,
    
 
    sPnt : {x:0,y:0},
    ePnt : {x:0,y:0}, 
    tSpeed:false,
    srcSpeed:0,
    
    gradPix:new Image(240,320),
    gradPix2:new Image(240,320),
    
    timerEff :null, 
    yScroll : 0,
    trigger:false,
    
    
    Vfx:0,
    preVfx:0,
    
    
    
rData:[],
pasTime:0,
curTime:0,
        viewPrev:{x:0,y:0},    view:{x:0,y:0},
init: function (x, y, settings){
   // console.log( ""+gui_Moderator());

    
    
    
    
    this.rData.length =40;// new Array(480) sdata meaning stationary data (now realtime data/hybrid)
for (i=0;i<this.rData.length;i++)
{
 var sPos = new Object(); 
 sPos.posX = 0;
 sPos.posY = 0;
 sPos.time = i*ig.game.aTick;
     this.rData[i]=sPos
}
    
    this.pasTime=new ig.Timer();
    this.pasTime.pause();
       this.curTime=new ig.Timer();
    this.curTime.pause();
    
    
    if(ig.global.guiRunning===false){
    gui_Moderator(); }//dont run it twice on replays
    ig.global.guiRunning=true;
    
     this.srcSpeed=0;
    this.tSpeed=new ig.Timer();
   this.tPDelay = new ig.Timer();
    
    this.shakeTime = new ig.Timer();
    this.timerEff = new ig.Timer();
    this.timerEff.pause();
      this.tSpeed.pause();
    this.tPDelay.pause();
    this.shakeTime.pause();
this.gameMode = ig.game.gameMode;
this.parent(x,y,settings);
   //console.log(ig.game.gameDimesion.sndSec)
this.pos.x = 	120//ig.game.gameDimesion.sndSec;// disable
this.pos.y = 1000//1100;
this._wmDrawBox = true;
this._wmBoxColor = 'rgba(255,0,255,0.5)';
    ig.game.specialEntity = this;
       this.view.x=this.pos.x;
       this.view.y=this.pos.y;
    this.gradPix= new Image(240,320);
    this.gradPix.src='media/gradPix4.png';  
    this.gradPix2.src='media/gradPix5.png';  
       // (ig.system.scale==2 )?(   this.plotImg1=new Image(125,100)):( this.plotImg1= new Image(250,200));
},


update: function(){
//this.parent();
this.ball = ig.game.loadedBallType === null ? ig.game.getEntitiesByType(EntityBall)[0] : ig.game.loadedBallType 
this.sling =ig.game.getEntitiesByType(EntitySling)[0];//disable
	 
//		ig.gui.element.action('hideGroup','ctrl');
//		ig.gui.element.action('disableGroup','ctrl')    ;

	
var slingshot = ig.game.getEntitiesByType(EntitySlingShot)[0];
var sling =ig.game.getEntitiesByType(EntitySling)[0]
    


    

            ig.game.screen.x = (this.pos.x) - (ig.system.width/2);
ig.game.screen.y = (this.pos.y) - ig.system.height/2;	 
    
 //   if (this.shake==true)this.shakeCam();
    
        if(this.shake===true){
   {
     this.shake=true;
   this.shakeTime.unpause();
    var speed=this.shakeTime.delta()*100;
  this.vel.x= (Math.sin(speed)).toDeg()*this.sMag.x;
  this.vel.y= (Math.sin(speed)).toDeg()*this.sMag.y;
    
    if (this.shakeTime.delta()> this.sTime){
        this.shakeTime.reset();
        this.shakeTime.pause();
        this.shake=false;
        this.vel.x= 0;
        this.pos.x=ig.game.gameDimesion.sndSec;
    }
    
    
}} 
    
    
    
    
        if (ig.game.gameMode==4){
        
    this.pos.x =this.view.x
this.pos.y =this.view.y

    }else{
        

             
    
    
    
    

	//console.log(sling.pos.x);
//console.log(this.ball.vel.y);
        if (this.ball.vel.y !== 0  && ig.game.loadedBallType.freeze === false ) {
                
            
          
            this.pos.x= ig.game.gameDimesion.sndSec;
            this.pos.y= ig.game.sData[2].posY;//this.ball.pos.y;
          
            
           // (this.cfON)? (   ig.game.screen.y= (this.ball.pos.y)- (ig.system.height/2)):(   this.pos.x = slingshot.pos.x ,ig.game.screen.y= (this.pos.y) - ig.system.height/2);
              
            
            
            

			}
			else if (this.ball.vel.y == 0  && sling.pos.y < 1230){
			
            //    this.pos.x = slingshot.pos.x ;
            //    this.pos.y = (slingshot.pos.y+60)+((sling.pos.y-1000)/4)
    
          //   this.pos.x = slingshot.pos.x ;
               this.pos.y = (slingshot.pos.y+60)+((sling.pos.y-1000)/3.5)
                
                
            }}//< optimize    
    
          ig.gui.element.action('showGroup','Options');
		ig.gui.element.action('enableGroup','Options');
    
    
     
    if( ig.input.pressed('flipX') ) {
ig.gui.element.action('getByName','posX~').click();
ig.gui.element.action('getByName','posX~').state.normal.tile=1
}else{ig.gui.element.action('getByName','posX~').state.normal.tile=0}
    if( ig.input.pressed('flipY') ) {
ig.gui.element.action('getByName','posY~').click();
   ig.gui.element.action('getByName','posY~').state.normal.tile=1
}else{ig.gui.element.action('getByName','posY~').state.normal.tile=0}
    
    
    
	if (this.ball.vel.y === 0){
         
          ig.gui.element.action('hideGroup','tvOptions');
		ig.gui.element.action('disableGroup','tvOptions');
ig.game.screen.x = (this.pos.x) - (ig.system.width/2);
ig.game.screen.y = (this.pos.y) - ig.system.height/2;	

    }else{
    
    
    
    
    
    
		 ig.gui.element.action('showGroup','tvOptions')
	     ig.gui.element.action('enableGroup','tvOptions')

    }

	
				
    
    if(sling.hold==true || this.ball.freeze==true && ig.game.optionMenu==false){
             ig.gui.element.action('hideGroup','Options');
		ig.gui.element.action('disableGroup','Options');
        
    }
    
    
    
    
     if ( ig.game.optionMenu==false){
         
             ig.gui.element.action('hideGroup','subOptions');
		ig.gui.element.action('disableGroup','subOptions');
         
//           ig.gui.element.action('showGroup','ctrl'),
//	ig.gui.element.action('enableGroup','ctrl')  
//		 ig.gui.element.action('showGroup','tvOptions')
//	     ig.gui.element.action('enableGroup','tvOptions')
   
         
     }else{
                      ig.gui.element.action('showGroup','subOptions');
		ig.gui.element.action('enableGroup','subOptions');
              ig.gui.element.action('hideGroup','ctrl'),
		ig.gui.element.action('disableGroup','ctrl')  ;
                   ig.gui.element.action('hideGroup','tvOptions');
		ig.gui.element.action('disableGroup','tvOptions');
         ig.game.reloadBallrdy == false;  
     }
    
    
    
    

    
    if (this.ball !== null){



          ig.gui.element.action('hideGroup','ctrl2');
		ig.gui.element.action('disableGroup','ctrl2');
   
    
    
        (  ig.game.metamode==true)?( 
     ig.gui.element.action('showGroup','ctrl'),
	ig.gui.element.action('enableGroup','ctrl')  
        ):(	
        ig.gui.element.action('hideGroup','ctrl'),
		ig.gui.element.action('disableGroup','ctrl')  );
        
							
        
        
			
   if(//this.ball.freeze === true ||
          // ig.gui.element.action('getByName','startstop').within &&
          // ig.input.state('click')
     ig.game.metamode==true

     ) {
          
              // this.pos.x= (ig.game.plotter.x);
  this.pos.y= ig.game.plotter.y
       
            ig.game.screen.x= ((ig.game.plotter.x)- (ig.system.width/2))*ig.system.scale;
   // ig.game.screen.y= ig.game.plotter.y- ig.system.height/2;
       
       
       
       
    }
	////var frez=           ig.gui.element.action('getByName','freeze') ;

    if (ig.game.metamode==true  )
    {ig.gui.element.action('hide','reload'); ig.gui.element.action('disable','reload');
    
     
    
                                                               //    frez.tile=1;
     
     
       //ig.gui.element.action('getByName','freeze').tile=1;
    }
    else{if(ig.game.reloadBallrdy == true){
        ig.gui.element.action('show','reload');ig.gui.element.action('enable','reload');
     ig.gui.element.action('getByName','reload').alpha =1;
    
    }
    }
        
        
        

        
        
        
        
        

    }
       
    if(ig.game.reloadBallrdy == false){
        //ig.gui.element.action('getByName','reload').show =false; causes colData insVel error?
        ig.gui.element.action('disabled','reload');
        ig.gui.element.action('getByName','reload').alpha =0;// work around 
    }
    
     
//
        allBrel= (ig.gui.element.action('getByName','freeze').within || ig.gui.element.action('getByName','slider').within ||
             ig.gui.element.action('getByName','nodeRht').within ||   ig.gui.element.action('getByName','nodeLft').within ||
                ig.gui.element.action('getByName','reload').within
             );
        var slider,edgeBgn,edgeEnd,calibY,calibY2;
    
        var slideVal,unit,maxima,array,offX;
    

    
 var dist = 0;
var speed;    
    
    
  
var lastStp;
    
  var upDateLast= function(update){
        lastStp=update;
        
    }
//  upDateLast(1);
//    console.log(lastStp);
    
  /*
  
  swipe gesture
  
  
  
  
  */
  
  
  
  
    
    if (ig.input.state('click') && ig.input.mouse.x > ig.system.width-50){
        
        if (this.sPnt.y=== 0 ){ this.sPnt.y=ig.input.mouse.y.round()

        }else{
             
            
        upDateLast(this.ePnt.y); 
         
                 this.ePnt.y=ig.input.mouse.y.round()
    
                
       if (this.ePnt.y !== lastStp || this.ePnt.y==0 || this.ePnt.y===this.sPnt.y){
            this.ePnt.y=(ig.input.mouse.y.round())
      //   console.log("last: "+lastStp+" "+this.ePnt.y)
           

       }
            else
                
                
                if (this.ePnt.y === lastStp || !ig.input.state('click')   ) {//console.log('stop');
                                                                             this.tSpeed.reset(); 
                    this.tSpeed.pause();
                    this.sPnt.y=lastStp;
                    this.ePnt.y=lastStp;
            }
       
      //   console.log(" "+this.ePnt.y)
            
              dist=( this.sPnt.y-( this.ePnt.y));
                
            if( dist !==0 ){this.tSpeed.unpause();}
            
    
        }
   
    }else{    
        
        
        this.tSpeed.reset(); this.tSpeed.pause();
         upDateLast(this.ePnt.y); 
         
    this.ePnt.y=lastStp;
        this.sPnt.y= 0 
    }
    
    speed= dist;//((((dist)/(this.tSpeed.delta()+1))).round());
     //  console.log( "1: "+ speed)
     speed= (((((dist)/(this.tSpeed.delta()+1)))).round()).limit(-2,2);
    
   this.srcSpeed=(((((dist)/(this.tSpeed.delta()+1)))));
    
   // console.log(   this.tSpeed.delta())
    //console.log(  dist)
            //   console.log("2: "+  speed)
    
  
    
    
    
    if ( this.ball.freeze == true){
            ig.gui.element.action('hide','posX~'); ig.gui.element.action('disable','posX~');
            ig.gui.element.action('hide','posY~'); ig.gui.element.action('disable','posY~');

  
    if (    ig.game.plotter.select+speed <  ig.game.sData.length-2 && ig.game.plotter.select+speed > 1 && !ig.gui.element.action('getByName','insV').within &&
       this.clickndrag===false
       ){
    ig.game.plotter.select+=speed;
         //  this.srcSpeed=speed;
        
     //   console.log(  this.srcSpeed);
        
    }
        
        if (    ig.game.plotter.select+speed > ig.game.sData.length-1 ) ig.game.plotter.select=ig.game.sData.length-2;
        if (    ig.game.plotter.select+speed < 0 ) ig.game.plotter.select=0;
        
  
        
    }
         
    
    //acceliration-deacceliration 
    
    
    //REVISE
    /*
    make it a swipe gesture instead.
    use distance of click and dragging to invoke speed/rate of selection 
    tapping on upper and lower section for +1,-1
    have fixed center point of slider as reference to selection
    --this would probably be similar to slings Equation-- 
    |99|
    |98|
    {97}--fixed { }
    |96|
    
    */
    
    
    
    
    
    calibY=100//180//120//bottom 140 make sure to align with intitial state of slider.pos.y
    calibY2=110//220//top   160

    slider = ig.gui.element.action('getByName','slider');
    edgeBgn = (ig.system.width/2)+(0);
    edgeEnd = (ig.system.width/2)+(ig.game.sData.length-1);// 200 length
    
    
    
    
    
	edgeBgnY= (ig.system.height/2)+(calibY)
    edgeEndY=(ig.system.height/2)-calibY2//30//(ig.system.height/2)-(100)
    //sData.length/slider.max >>> increment the slider in scale with sData.length
    // slider.max/sData.length (200/500)=0.4
    
    

    maxima =ig.game.sData.length-1
    
    unit = (maxima/(calibY+calibY2))//200

    slideVal =((((edgeBgnY-slider.pos.y))*unit).floor()) ;
    
    offY =slider.size.y/2;
    

    	if (ig.input.state('click')  && slider.within && this.tPress===false
        ){ 
     
            
            slider.pos.y = ((ig.input.mouse.y)-offY).limit(edgeEndY+1,edgeBgnY) ;
    
            
            
            
        ig.game.plotter.select= slideVal;//slideVal; 
    
        }

    
   
    
    
    //MANIPULATE VELCOTIY 
    
    
    
    
    
//    
//            if (mouse.x > this.initalPos.x && this.pos.x > this.initalPos.x) {
//         angle=   Math.abs((( Math.atan2( (mouse.x-this.initalPos.x),(mouse.y-this.initalPos.y)))-(0).toRad())).toDeg();       
//        }
//        
//                  if (mouse.x < this.initalPos.x && this.pos.x > this.initalPos.x){
//        angle=-2;;
//                  //angle=   Math.abs((( Math.atan2( (this.initalPos.x-mouse.x),(mouse.y-this.initalPos.y)))-(0).toRad())).toDeg();
//        }
//        
//        if (mouse.x < this.initalPos.x && this.pos.x < this.initalPos.x){
//          angle=   Math.abs((( Math.atan2( (this.initalPos.x-mouse.x),(mouse.y-this.initalPos.y)))-(0).toRad())).toDeg();
//        }
//
//              if (mouse.x > this.initalPos.x && this.pos.x < this.initalPos.x){
//         angle=-1;
//                  //angle=   Math.abs((( Math.atan2( (this.initalPos.x-mouse.x),(mouse.y-this.initalPos.y)))-(0).toRad())).toDeg();
//        }
//        
//    
//    
//         var dist4={
//            x:Math.abs(this.initalPos.x-(ig.game.screen.x+ig.input.mouse.x)),
//            y:Math.abs(this.initalPos.y-(ig.game.screen.y+ig.input.mouse.y))
//            
//        }
//        
//        
//        
//      var  posAdis={
//           y:(dist2) * Math.cos(angle.toRad()),
//           x:(dist2) * Math.sin(angle.toRad())
//             
//             };
//        
////var  xAd =  dist2 * Math.cos(angle.toRad());
// //var yAd = dist2 *  Math.sin(angle.toRad());
//        
//        if(this.pos.x < this.initalPos.x)posAdis.x*=-1;
//        if(this.pos.x > this.initalPos.x)Math.abs(posAdis.x);
//
//       if (dist3<110){   
//           
//           
//
//           
//           
//      }else{
//
//          
////
//     }
  
    
    
    
    
    
    
    
    

    var atlias, xLmt,xProp,yProp,xDisp,yDisp,dist;
     atlias = ig.gui.element.action('getByName','insV');
    button = ig.gui.element.action('getByName','freeze');

//var offSet=12.5 
       if (this.upDate !== ig.game.plotter.select) {
       
    this.upDate =ig.game.plotter.select;
 // ig.game.plotter.select=50;
         

atlias.pos.x = ((ig.game.plotter.x)-(ig.game.screen.x/ig.system.scale))//-offSet
atlias.pos.y = (ig.game.plotter.y-ig.game.screen.y)//-offSet;
           
           

       }

 //  if (this.ball.pos.y==-4901.2381959248405)this.ball.freeze=true;
    
    


    
    if ( ig.input.pressed('click')==true){this.tPDelay.unpause();}
    if (this.tPDelay.delta()>.12){this.tPDelay.reset();this.tPDelay.pause();}
        
        if (ig.input.released('click')==true && this.tPDelay.delta()==0)this.tPress=false;

    
   
    
    if(ig.input.state('click')&& atlias.within&& allBrel===false&& this.tPDelay.delta()!=0){this.tPress=true;}
    
    

      if (this.tPress)//<-delay functionallity added due to lackof pressed event mobile
      
      {
    ig.gui.element.action('hide','insV');
          
          
            var mouse={
            x:((ig.game._rscreen.x/ig.system.scale)+ig.input.mouse.x),
            y:(ig.input.mouse.y)
            //y:(ig.input.mouse.y-(ig.game.screen.y*(2/ig.system.scale)))
        }
                  
       
       
        xProp= (ig.game.plotter.x-(ig.game._rscreen.x/ig.system.scale));
        yProp= (ig.game.plotter.y-ig.game._rscreen.y);
      //  yProp= ((ig.game._rscreen.y*(-2/ig.system.scale))+ig.game.plotter.y);
      
    
    //((ig.game._rscreen.y*(2/ig.system.scale))-ig.input.mouse.y)
          
          
      xProp2= ig.game.plotter.x+(ig.game._rscreen.x/ig.system.scale);
      yProp2= (ig.game.plotter.y);
    

          var Var={x:(ig.game.plotter.x+(ig.game._rscreen.x/ig.system.scale)),y:(ig.game.plotter.y-(ig.game._rscreen.y))}
       
          var Var2={x: atlias.pos.x+(ig.game._rscreen.x/ig.system.scale),y:(atlias.pos.y+ig.game._rscreen.y)}


  
    
   
          var angle =0.001;
          

           
          Vang1={x:(ig.game.plotter.x+(ig.game._rscreen.x/ig.system.scale)),y:ig.game.plotter.y};
          Vang2={x:ig.game._rscreen.y+atlias.pos.y,y:ig.game._rscreen.y+atlias.pos.y};       
          Vang3={x:((ig.game._rscreen.x*(2/ig.system.scale))+ig.input.mouse.x),y:(ig.input.mouse.y)  }         
          
          
          if (Var2.x == ig.game.plotter.x && mouse.x== ig.game.plotter.x && mouse.y < ig.game.plotter.y){
              angle=0
              
          }
          
            
          if (Var2.x == ig.game.plotter.x && mouse.x== ig.game.plotter.x && mouse.y > ig.game.plotter.y){
              angle=180
              
          }
            
          if (Var2.x < ig.game.plotter.x && mouse.x < ig.game.plotter.x) {//console.log('b');
                      angle=  ( Math.abs((( Math.atan2( (Vang3.x-Var.x),(Vang3.y-Var.y)))-(0).toRad())).toDeg());;                              
                                                    }
          
          if (Var2.x > ig.game.plotter.x && mouse.x > ig.game.plotter.x) {//console.log('c');
                                 angle=  ( Math.abs((( Math.atan2( (Vang3.x-Var.x),(Vang3.y-Var.y)))-(0).toRad())).toDeg());                         
                                                      }
           if (Var2.x > ig.game.plotter.x && mouse.x < ig.game.plotter.x) {//console.log('d');
                                    angle=  ( Math.abs((( Math.atan2( (Vang3.x-Var.x),(Vang3.y-Var.y)))-(180).toRad())).toDeg());     
                                                      }
          
            if (Var2.x < ig.game.plotter.x && mouse.x > ig.game.plotter.x) {///console.log('e');
                               angle=  ( Math.abs((( Math.atan2( (Var.x-Vang3.x),(Var.y-Vang3.y)))-(180).toRad())).toDeg()); 
                                                      }
          
          
          
          
          
          
          
          
          
          //console.log(Vang3);//{x: 152.3333282470703, y: 164.6666564941406}
          //{x: 125.33332824707031, y: 164.6666564941406} mobile
          
          
//
//        var dist2=  Math.sqrt(
//Math.pow((ig.game.plotter.x+(ig.game.screen.x/ig.system.scale)) -(mouse.x) ,2)+
//Math.pow(( (ig.game.plotter.y-ig.game._rscreen.y) -(mouse.y )),2)
//        ) ;        
//          
//          
        //  ((ig.game._rscreen.x*(2/ig.system.scale))+ig.input.mouse.x)
          
          
//                         var dist2=  Math.sqrt(
//Math.pow(((ig.game._rscreen.x*(2/ig.system.scale))+ig.game.plotter.x)-(mouse.x) ,2)+
//Math.pow(( ig.game.plotter.y-(ig.game._rscreen.y)-mouse.y),2)
//        ) ;        
//          
          //console.log(((ig.game._rscreen.x*(2/ig.system.scale))+ig.game.plotter.x)-(mouse.x) )
         // console.log(ig.game.plotter.y-(ig.game._rscreen.y)-mouse.y)
        ///  
          
//               var dist2=  Math.sqrt(
//Math.pow(ig.game.plotter.x-(mouse.x) ,2)+
//Math.pow(( (yProp ) -(mouse.y )),2)
//        ) ;          
        
          
          
          
      //           xProp= (ig.game.plotter.x-(ig.game._rscreen.x/ig.system.scale));

    //    yProp= ((ig.game._rscreen.y*(-2/ig.system.scale))+ig.game.plotter.y);
      //(ig.game.plotter.y-ig.game._rscreen.y);
              
//                         var dist2=  Math.sqrt(//works for scale of 2
//Math.pow(xProp-(ig.input.mouse.x) ,2)+
//Math.pow(( (yProp ) -(ig.input.mouse.y )),2)
//        ) ;          
          
          
                                   var dist2=  Math.sqrt(
Math.pow(xProp-(ig.input.mouse.x) ,2)+
Math.pow(( ((ig.game.plotter.y-ig.game._rscreen.y) ) -(ig.input.mouse.y )),2)
        ) ;          
          
          
          
//                         var dist2=  Math.sqrt(
//Math.pow(xProp-(ig.input.mouse.x) ,2)+
//Math.pow(( (  (ig.game._rscreen.y/ig.system.scale)-ig.game.plotter.y  ) -(ig.input.mouse.y )),2)
//        ) ;          
//          
          
          
//                var dist4=  Math.sqrt(
//Math.pow((ig.game.plotter.x- (ig.game._rscreen.x))-(atlias.pos.x) ,2)+
//Math.pow(( (yProp ) -(atlias.pos.y )),2)
//        ) ;          
//          
          
          
//          
          
          
//                 
//               var dist2=  Math.sqrt(
//Math.pow(xProp-(mouse.x) ,2)+
//Math.pow(( (yProp ) -(mouse.y )),2)
//        ) ;             
        //  console.log("dX: "+(ig.game.plotter.x-(mouse.x) )+" dY: "+( (yProp ) -(mouse.y ))  )
          
     //     console.log("plot:x = "+ig.game.plotter.x+"::mx= "+mouse.x)
     //     console.log("plot:y = "+(yProp )+"::mx= "+mouse.y)
  
          
          //  : -0.31504837628060045 dY: 132.75922208661268  
          
        
          
//            var dist2=  Math.sqrt(
//Math.pow(xProp -(mouse.x) ,2)+
//Math.pow(( (ig.game.plotter.y-ig.game.screen.y) -(mouse.y )),2)
//        ) ;        
//    console.log(
//        
//        "x::  "+(mouse.x)//59.51406190138125
//                
//                )//xProp 120
//          //mouse.x 165.8333282470703
          
          
          
//             var dist3=  Math.sqrt(
//Math.pow(( ig.game.plotter.x+(ig.game._rscreen.x/ig.system.scale) -(((ig.game._rscreen.x*2)/ig.system.scale)+atlias.pos.x) ),2)+
//Math.pow(( ig.game.plotter.y-(ig.game._rscreen.y+atlias.pos.y ) ),2)
//        ) ;        
//          
          
                      var dist3=  Math.sqrt(
Math.pow(( ig.game.plotter.x+(ig.game._rscreen.x/ig.system.scale) -(((ig.game._rscreen.x*2)/ig.system.scale)+atlias.pos.x) ),2)+
Math.pow(  ( (yProp ) -(atlias.pos.y ) ),2)
        ) ;        
          
          
          
          
   // -(-(ig.game._rscreen.x*2)/ig.system.scale)      
          
          
//              var dist4=  Math.sqrt(
//Math.pow((ig.game.plotter.x- (ig.game._rscreen.x))-(atlias.pos.x) ,2)+
//Math.pow(( (yProp ) -(atlias.pos.y )),2)
//        ) ;          
//          
                    
              var dist4=  Math.sqrt(
Math.pow((xProp)-(atlias.pos.x) ,2)+
Math.pow(( ig.game.plotter.y-  (atlias.pos.y+ig.game._rscreen.y)),2)
        ) ;          
         // console.log((xProp)-(atlias.pos.x))
          
    
         // console.log(ig.game.plotter.y-  (atlias.pos.y+ig.game._rscreen.y))
   
        
//               console.log(" d2:"+dist2+" d4:"+dist4);
//          console.log(" xP:"+xProp+" yP:"+yProp);
//          
          
          /*
          2
          xP:119.94323205857351 yP:159.92394406987114
Camera.js:668  d2:29.981754965374222 d4:29.981754965374222



          
          4
           d2:4422.179290673922 d4:19.29579779395685
Camera.js:669  xP:119.99471581969921 yP:-4246.025662460956
          
          */
          
          
          
          
//                               var dist4=  Math.sqrt(
//Math.pow((xProp)-(atlias.pos.x) ,2)+
//Math.pow(( (yProp ) -(atlias.pos.y )),2)
//        ) ;          
                 
                                xLmt = 30//45
          
        //  sQR = Math.sqrt(Math.pow( (xLmt*2),2)/2)/2
          sQR = (Math.sqrt(Math.pow(xLmt,2)/2)).round()
          var2= 45-sQR;
          
          
          
               
          
      var  posAdis={
        
           x:(dist3.limit(0,xLmt+1)) * Math.sin(angle.toRad()),
                y:(dist3.limit(0,xLmt+1)) * Math.cos(angle.toRad())
          
             };
      
     
          
          // sqrt((len^2)/2)/2
          
          
          
          
          //45 - 31.81980515339464 = 13.18019484660536
          //sqrt(45)*2 = 13.41640786499874
                     
//               console.log( 
//                   
//                   
//                   "posAX: "+(  ((45) * Math.sin(  (45).toRad()  )))+
//           "|| posAY: "+(   ((45) * Math.cos  (  (45).toRad()  )))
//          
//          33.83251142154779+33.73513411748965=67.56764553903744
//          )      
                     
          
          
        xDisp =  ((xProp)-atlias.pos.x).round(4);
        yDisp =  ((yProp)-(atlias.pos.y)).round(4);
          
//       xDisp =  45-Math.abs((xProp+( 45-(Math.sqrt(45)*2)   )-(atlias.pos.x)))
//       yDisp =  45-Math.abs((yProp+( 45-(Math.sqrt(45)*2))  )-(atlias.pos.y))
//          
//          
//       xDisp =  45-Math.abs((xProp+( 45-(var2))   )-(atlias.pos.x))
//       yDisp =  45-Math.abs((yProp+( 45-(var2))  )-(atlias.pos.y))
//      
      
//         xDisp =  Math.abs((xProp+( sQR )   )-(atlias.pos.x))+var2
//       yDisp =  Math.abs((yProp-( sQR )  )-(atlias.pos.y))+var2

 
      
   
   //   xDisp = 45//((dist3) * Math.sin((90).toRad()));
     //  yDisp = -45  //((dist3) * Math.cos((90).toRad()));
      
   
//          console.log(sQR);
          //    console.log("xDisp: "+(xDisp)+" yDisp: "+(yDisp))
//              console.log("posAdis.x: "+(posAdis.x)+" posAdis.y: "+(posAdis.y))
          
        
          
          
        // console.log("xVar: "+(xProp)+" yVar: "+(yProp))
          
          /*
          23.639578748988693posAY: 38.29080317251978
          
          lmts at half decrease at end and orgin
          0
          -45
          0
          45
          0
          
          
          */
       
                    
                     
                     
        if(atlias.pos.x <  ((ig.game.plotter.x)-(ig.game._rscreen.x/ig.system.scale))){
             //  yDisp = -xDisp;
            posAdis.x*=-1; //console.log("a")
                                                                                      }
        if(atlias.pos.x > ((ig.game.plotter.x)-(ig.game._rscreen.x/ig.system.scale))){Math.abs(posAdis.x); //  
                                                                             //   yDisp = xDisp;      
                                                                                     
                                                                                     }    
          
//               if(atlias.pos.y < yProp){posAdis.x*=-1; 
//             //      console.log("a")
//                   
//                                                                                      }
//        if(atlias.pos.y > yProp){Math.abs(posAdis.x); // 
//          //     console.log("b")
//                                                                                     }    
          

//         atlias.pos.x=((ig.input.mouse.x))
//atlias.pos.y=((ig.input.mouse.y))    
// atlias.pos.x=      179.3333282470703;
// ig.input.mouse.x=      179.3333282470703;
//atlias.pos.y= 164.6666564941406;
// ig.input.mouse.y= 164.6666564941406;
  
          
   
          
          
          
        //  console.log(" x:"+xDisp+" y:"+yDisp);
          
          
          
//          if (xDisp == xLmt) yDisp=xLmt;
//          if (yDisp == xLmt) xDisp=xLmt;
   //   console.log(dist2 <=  xLmt || dist3 <=  xLmt);
          
   //       console.log(dist2 )
          
//atlias.pos.x=((ig.input.mouse.x))
//atlias.pos.y=((ig.input.mouse.y)) 
          
          
 
//          if ( dist2 <  xLmt && dist4 <  xLmt  )//50
//       //   if (dist2 <=  xLmt  )//50
//          
//          {          
//
// atlias.pos.x=((ig.input.mouse.x))
//
//atlias.pos.y=((ig.input.mouse.y))     
//              
//
//               
//          } 
//              else 
//           { 
//          
//      atlias.pos.x=((posAdis.x)+(ig.game.plotter.x-(ig.game._rscreen.x/ig.system.scale)))//.limit(xProp-xLmt,xProp+xLmt);
//  // atlias.pos.y=yProp;
//               
//               
////        atlias.pos.y=(((posAdis.y)+((ig.game.plotter.y)-(ig.game._rscreen.y*2)/ig.system.scale))).limit(yProp-xLmt,yProp+xLmt);;
////              
//               
//     atlias.pos.y=(((posAdis.y)+((ig.game.plotter.y)-(ig.game._rscreen.y))))//.limit(yProp-xLmt,yProp+xLmt);;
//      
//               
//      
//                 //console.log(" X:"+xProp+" || Y:"+yProp+"|| X2:"+atlias.pos.x+" || Y2:"+atlias.pos.y );
//          }
//          
//          
          
          
        
          
                    if ( dist2 >=  xLmt && dist4 >=  xLmt  )//50

           { 
          
      atlias.pos.x=((posAdis.x)+(ig.game.plotter.x-(ig.game._rscreen.x/ig.system.scale))).limit(xProp-xLmt,xProp+xLmt);

     atlias.pos.y=(((posAdis.y)+((ig.game.plotter.y)-(ig.game._rscreen.y)))).limit(yProp-xLmt,yProp+xLmt);;
      
               
          }else 
          
                    {          

 atlias.pos.x=((ig.input.mouse.x))//-atlias.offset.x

atlias.pos.y=((ig.input.mouse.y))//-atlias.offset.y    
              

               
          } 
              
          
          
          
          
//          
         // console.log(dist2);
       //  console.log("dist2: "+(dist2)+"  dist4: "+dist4+"  diff: "+(Math.abs(dist2-dist4)));     
//console.log(" aY: "+atlias.pos.y)
       //  console.log("mX1: "+ig.input.mouse.x+" mX2"+mouse.x  ) ;
        
      
             //ig.game.sData[ig.game.plotter.select].xBouy  =(1+(xDisp/xLmt))*(this.ball.bounciness*2);
           var exT = ((dist4/xLmt) ).round(2)
           
           
          //console.log(exT );
          
         //  / (.5+exT)
          
//          ig.game.sData[ig.game.plotter.select].xBouy  =(1*(xDisp/(xLmt )))*(this.ball.bounciness*2);
//                 
//            ig.game.sData[ig.game.plotter.select].yBouy = (1*(  yDisp/(xLmt )))*(this.ball.bounciness*2);    
//          
          
//          ig.game.sData[ig.game.plotter.select].xBouy  =(2*(xDisp/(xLmt )))*(this.ball.bounciness);
//                 
//            ig.game.sData[ig.game.plotter.select].yBouy = (2*(  yDisp/(xLmt )))*(this.ball.bounciness);
//     
       ig.game.sData[ig.game.plotter.select].xBouy  =((2*(xDisp/(sQR )))*(this.ball.bounciness)).limit(-1,1);
                 
            ig.game.sData[ig.game.plotter.select].yBouy = ((2*(  (yDisp)/(sQR)))*(this.ball.bounciness)).limit(-1,1);
     
       
                    
             this.clickndrag =true;
           
          
          
           
       }else{atlias.pos.x = ((ig.game.plotter.x)-(ig.game.screen.x/ig.system.scale))//-offSet
atlias.pos.y = (ig.game.plotter.y-ig.game.screen.y)//-offSet;
           }
    
    // console.log("dist2: "+dist2+"dist4: "+dist4); 
    // console.log("dist3: "+dist4); 
    
        if(ig.input.released('click')&&!atlias.within)this.clickndrag=false;
    if(ig.input.pressed('click')&&!atlias.within)this.clickndrag=false;


    
  //  console.log("Xb: "+ig.game.sData[ig.game.plotter.select].xBouy.round(3)+"   Yb: "+ig.game.sData[ig.game.plotter.select].yBouy.round(3)+"  xDis:"+xDisp+"|| yDis"+yDisp);
    
    
  //  console.log("Xb: "+ig.game.sData[ig.game.plotter.select].xBouy.round(3)+"   Yb: "+ig.game.sData[ig.game.plotter.select].yBouy.round(3)+"  xDis:"+xProp+"|| yDis"+yProp);
//  
//    console.log("Xb: "+ig.game.sData[ig.game.plotter.select].xBouy.round(3)+"   Yb: "+ig.game.sData[ig.game.plotter.select].yBouy.round(3));
//
//    
    
    
    

    
    
    
    
    
    //yDisp
    //xDis:120.11659062424593|| yDis160.1717049168401
  //  dist2: 54.67182923487836
    
    
    
    //dist2: 116.65971421575861dist4: 6.735518711677336
    
//       
       // console.log(Var)//{x: 93, y: 159.78203427363042}
       // console.log(Var2)//{x: 165.8333282470703, y: -8523.83334350586}
   //  console.log(dist2)
    //console.log(dist3)
  //  console.log(angle);//85.4298
      /// console.log(mouse.x+" :"+mouse.y);//165.8333282470703 :164.6666564941406
    //   console.log(mouse.y);
       // console.log((posAdis.x.round())+" | "+posAdis.y.round());
    
         
       //   console.log(" mY:"+mouse.y+" pY:"+atlias.pos.y)
          
          
          
       //   console.log((((posAdis.x)+xProp))+" | "+((posAdis.y)+yProp)+":: "+ig.input.mouse.x+" | "+ig.input.mouse.y);
      //console.log((((posAdis.x)+ig.game.plotter.x))+" | "+((posAdis.y)-ig.game.plotter.y)+":: "+ig.input.mouse.x+" | "+ig.input.mouse.y);
       
          //(-ig.game._rscreen.x*2)/ig.system.scale
          
        //  console.log(((posAdis.x)+xProp).round()===(ig.input.mouse.x).round() && ((posAdis.y)+yProp).round()===(ig.input.mouse.y).round()   );
          
          
          //dist3
          //59.52257691005919 desktop
          //Camera.js:698 32.679312059345975 mobile
          
          //Var2
          //{x: 152.3333282470703, y: -8708.33334350586} *** desktop
          //{x: 125.33332824707031, y: -8708.58334350586} ** mobile
          
          //Var
          //{x: 93, y: -8528.576055930129} desktop
          //{x: 93, y: -8713.21796572637} mobile
          
          //ANGLE
          
          //Camera.js:700 85.29373215785172 desktop
          //81.65525676096118 moblie
          
    //    console.log(((posAdis.x)+(ig.game.plotter.x-(ig.game.screen.x/ig.system.scale)))+":: "+ig.input.mouse.x);
 //  console.log(((posAdis.y)+(ig.game.plotter.y-(ig.game.screen.y)))+":: "+ig.input.mouse.y);
          
          //179.3273355713724 | 164.66617747942283:: 179.3333282470703 | 164.6666564941406
          //178.8864487929061 | 168.56151735577404:: 179.3333282470703 | 164.6666564941406
          
        //bounciness =.5
        //  console.log("x: "+(1+(xDisp/xLmt))*(this.ball.bounciness*2)+"|| y:"+(-1+(yDisp/xLmt))*(this.ball.bounciness));
     
       //  console.log("xVar: "+(xDisp)+" yVar: "+(yDisp))
        // console.log("xVar: "+(xProp)+" yVar: "+(yProp))
          
          
         //console.log("xPVar: "+(atlias.pos.x)+" yPVar: "+(atlias.pos.y))
     //    console.log("xPVar: "+(posAdis.x)+" yPVar: "+(posAdis.y))
          
          // X:-66 || Y:1563|| X2:66 || Y2:1308
          
    //    console.log(dist3)  
      
          
          // 119.84113818094394 
          
          
             //ig.game.sData[ig.game.plotter.select].yBouy = (-1+(yDisp/xLmt))*(this.ball.bounciness);
          
  
    
    
//    
//         console.log(
//             
//              " X:"+ig.game.sData[ig.game.plotter.select].velX.round()+" || Y:"+(ig.game.sData[ig.game.plotter.select].velY.round()-12)+
//                    
//                    
//             
//             "|| X2:"+ig.game.sData[ig.game.plotter.select+1].velX.round()+" || Y2:"+ig.game.sData[ig.game.plotter.select+1].velY.round()
//                    
//                    
//                    
//                    );
//    
    
        // console.log("x: "+dist4   )
    
    
//
// var offSet=17.5     
//   if (this.upDate !== ig.game.plotter.select) {
//       
//    this.upDate =ig.game.plotter.select
//    
//    
//// atlias.pos.x = ((ig.game.plotter.x-ig.game.screen.x))-17.5;                 
//
// atlias.pos.x = ((ig.game.plotter.x)-(ig.game.screen.x/ig.system.scale))//-offSet
//  atlias.pos.y = (ig.game.plotter.y-ig.game.screen.y)//-offSet;
//       
//       }
//    
//    
////limit(edgeEndY+1,edgeBgnY)
//        xProp= (ig.game.plotter.x-(ig.game.screen.x/ig.system.scale))
//        yProp= (ig.game.plotter.y-ig.game.screen.y)
//        
//        xLmt = 45
//        xDisp =  (xProp)-atlias.pos.x
//        yDisp =  (yProp)-atlias.pos.y
//    
//    
//    if ( ig.input.pressed('click')==true){this.tPDelay.unpause();}
//    if (this.tPDelay.delta()>.12){this.tPDelay.reset();this.tPDelay.pause();}
//        
//        if (ig.input.released('click')==true && this.tPDelay.delta()==0)this.tPress=false;
//
//    
//   
//    
//    if(ig.input.state('click')&& atlias.within&& allBrel===false&& this.tPDelay.delta()!=0){this.tPress=true;}
//    
//    
//
//      if (this.tPress)//<-delay functionallity added due to lackof pressed event mobile
//      
//      {
//    
//             atlias.pos.x=((ig.input.mouse.x)-offSet).limit(xProp-xLmt,xProp+xLmt)
//             atlias.pos.y=((ig.input.mouse.y)-offSet).limit(yProp-xLmt,yProp+xLmt)
//                  
//         
//             ig.game.sData[ig.game.plotter.select].yBouy = (yDisp/xLmt)*(this.ball.bounciness*2);
//                 ig.game.sData[ig.game.plotter.select].xBouy  =(xDisp/xLmt)*(this.ball.bounciness*2);
//                
//         
//                    
//            if (ig.game.dirInc-1 != -1 && ig.game.colData[ig.game.dirInc-1].invsVel ==true
//
//               ){   
//
//            }
//
//                    
//                    
//             this.clickndrag =true;
//           
//           
//       }
//        if(ig.input.released('click')&&!atlias.within)this.clickndrag=false;
//    if(ig.input.pressed('click')&&!atlias.within)this.clickndrag=false;
//
//  
//    //if player trys to drags atlias beyond its borders outer X s
//        if (ig.input.state('click') && !atlias.within && allBrel===false &&
//          
//
// 
//            
//            ig.input.mouse.y< yProp+xLmt &&
//             ig.input.mouse.y> yProp-xLmt 
//            &&  ig.game.sData[ig.game.plotter.select+1].invsVel===true
//            && Math.abs(xDisp/xLmt) === 1
//        
//&& this.clickndrag==true
//           
//           ){
//                
//              atlias.pos.y=((ig.input.mouse.y)-offSet).limit(yProp-xLmt,yProp+xLmt);
//                ig.game.sData[ig.game.plotter.select].yBouy = (yDisp/xLmt)*this.ball.bounciness*2;
//                (ig.input.mouse.x >  xProp) ?    ig.game.sData[ig.game.plotter.select].xBouy =  -1 :     ig.game.sData[ig.game.plotter.select].xBouy = 1 ;
//
//
//            
//            }
////    
//   
////outer Y s
//            if (ig.input.state('click') && !atlias.within && allBrel===false &&
//                          
//            ig.input.mouse.x< xProp+xLmt &&
//            ig.input.mouse.x> xProp-xLmt 
//                        &&  ig.game.sData[ig.game.plotter.select+1].invsVel===true
//                   && Math.abs(yDisp/xLmt) === 1
//&& this.clickndrag==true
//               
//               ){
//                
//              atlias.pos.x=((ig.input.mouse.x)-offSet).limit(xProp-xLmt,xProp+xLmt);
//            ig.game.sData[ig.game.plotter.select].xBouy = (xDisp/xLmt)*this.ball.bounciness*2;
//             (ig.input.mouse.y >  yProp) ?    ig.game.sData[ig.game.plotter.select].yBouy = -1 :     ig.game.sData[ig.game.plotter.select].yBouy = 1 ;
//
//  
//                
//            }
////NOTICE ASSINEMENT TO Y/XBOUY OF 1 CAUSES DISPLACEMENT REASON UNKOWN right side!
////check corners 
//          if (ig.input.state('click') && !atlias.within && allBrel===false && ig.game.sData[ig.game.plotter.select+1].invsVel===true
//             && this.clickndrag==true
//             ){
//          atlias.pos.x=((ig.input.mouse.x)-offSet).limit(xProp-xLmt,xProp+xLmt)
//             atlias.pos.y=((ig.input.mouse.y)-offSet).limit(yProp-xLmt,yProp+xLmt)
//          //upper right 
//              if (ig.input.mouse.x> xProp+xLmt &&  ig.input.mouse.y< yProp+xLmt && ig.input.mouse.y< yProp-xLmt){       //   console.log("blink UR")
//              ig.game.sData[ig.game.plotter.select].yBouy =1
//              ig.game.sData[ig.game.plotter.select].xBouy =-1
//              
//
//              }
//         //lower  right
//              if (ig.input.mouse.x> xProp+xLmt && ig.input.mouse.y> yProp-xLmt && ig.input.mouse.y> yProp+xLmt ){     //     console.log("blink LR")
//              ig.game.sData[ig.game.plotter.select].yBouy =-1
//              ig.game.sData[ig.game.plotter.select].xBouy =-1
//              
//  
//              
//              }
//         //lower left     
//                if (ig.input.mouse.x< xProp-xLmt && ig.input.mouse.y> yProp-xLmt && ig.input.mouse.y> yProp+xLmt){       //   console.log("blink LL")
//              ig.game.sData[ig.game.plotter.select].yBouy =-1
//              ig.game.sData[ig.game.plotter.select].xBouy =1
//       
//                }  
//         //upper left      
//           if (ig.input.mouse.x< xProp-xLmt && ig.input.mouse.y< yProp+xLmt && ig.input.mouse.y< yProp-xLmt){        //  console.log("blink UR")
//              ig.game.sData[ig.game.plotter.select].yBouy =1
//              ig.game.sData[ig.game.plotter.select].xBouy =1
//    
////
//           }   
//          
//               
////
//   
//                  
//                  }

//    }


    this.parent();

    
    
    
},

//DISABLE TO EDIT
    
shakeCam:function(magX=5,magY=5,time=.1){
     this.shake=true;
    
       this.sMag.x=magX;
       this.sMag.y=magY;
    this.sTime=time;
    
    
    
//   this.shakeTime.unpause();
//    var speed=this.shakeTime.delta()*100;
//  this.vel.x= (Math.sin(speed)).toDeg()*mag;
////    this.pos.x=0;
//       console.log(this.shakeTime.delta());
//    
//    if (this.shakeTime.delta()>time){
//        this.shakeTime.reset();
//        this.shakeTime.pause();
//        this.shake=false;
//        this.vel.x= 0;
//        this.pos.x=ig.game.gameDimesion.sndSec;
//    }
//    
    
},    
    
draw: function(){
    

	this.parent();

    
var    ctx = ig.system.context;
var    width=ig.system.width*ig.system.scale;// sampleMap.width * tilesize;//ig.game.pxWidth// 
var    height=ig.system.height*ig.system.scale; //sampleMap.height * tilesize;// ig.game.pxHeight//
    
 //var Veffect=10*(window.audVdata*10);

  //Visualiser.prototype.getAmplitude()
    
   // console.log(Visualiser.prototype.getAmplitude());
    
//var Veffect=10*((Visualiser.prototype.getAmplitude())*10);
 this.Vfx=this.getAudFX();//Visualiser.prototype.getAmplitude();

    
   // if ( this.preVfx ==  this.Vfx){ this.preVfx= this.preVfx};//{preVfx= Vfx;}
   
    
    var Veffect=10*((window.lerp( this.preVfx,  this.Vfx, 0.25))*10); 


     var effect=Math.abs((1000-ig.game.screen.y)/150).round();
      var scroll=((ig.game.screen.y-(2240*7))/20).round();//400
    var scroll2=((ig.game.screen.y-(2500))/2).round();//400
  
   ig.system.context.drawImage(this.gradPix,0,0,this.gradPix.width*2,this.gradPix.height*2);
   //
//    hue=(effect+187);
    
    
            if(ig.system.scale==2){
ig.system.context.fillStyle = ig.system.context.createPattern(this.gradPix, "repeat");

ig.system.context.save();

ig.system.context.translate(this.gradPix.x, (this.gradPix.y-scroll));
            
ig.system.context.fillRect(0, scroll, (this.gradPix.width*ig.system.scale),(  (this.gradPix.height)*ig.system.scale)  );
            
ig.system.context.restore();
            }else{
                
                ig.system.context.fillStyle = ig.system.context.createPattern(this.gradPix2, "repeat");

ig.system.context.save();

ig.system.context.translate(this.gradPix2.x, (this.gradPix2.y-scroll2));
            
ig.system.context.fillRect(0, scroll2, (this.gradPix2.width*ig.system.scale),(  (this.gradPix2.height)*ig.system.scale)  );
            
ig.system.context.restore();
                
            }
    

    
    
       
    
    
    if ( this.ball != null){
   
    ///TOPS
//     
//    if(ig.game.comboCount>1 && ig.game.stopMusic == false || this.ball.freeze==true  && ig.game.stopMusic == false ){
//    
//    ig.system.context.globalCompositeOperation = "source-atop";
//    
//        
//
//
//ig.system.context.restore();
//    
//    
//    hue2=(Veffect+30);//197
//    sat2=50;
//    lig2=50;
//    
//        
//        
//ig.system.context.globalCompositeOperation = "color";
//    
//ig.system.context.fillStyle = "hsl(" + hue2 + "," + (100) + "%, 25%)";
//
//ig.system.context.fillRect(0, 0,  this.gradPix.width*ig.system.scale, ( this.gradPix.height)*ig.system.scale);
//    
//        ig.system.context.globalCompositeOperation = "destination-in";
//    
//     ig.system.context.globalCompositeOperation = "source-atop";}
//    

    
    
    				var sampleMap = ig.game.backgroundMaps[0]; 

						var tilesize = ig.game.gameDimesion.tilesize//sampleMap.tilesize;
						var yLevel, xLevel
						var Cam =ig.game.loadedBallType //ig.game.getEntitiesByType(EntityBall)[0];
						var xLevel  = ig.system.width*ig.system.scale;// sampleMap.width * tilesize;//ig.game.pxWidth// 
						var yLevel =  ig.system.height*ig.system.scale; //sampleMap.height * tilesize;// ig.game.pxHeight//
    
    
    
    
    
            ig.system.context.fillStyle="lime"       
     ig.system.context.fillRect(0,(1400-ig.game._rscreen.y),xLevel,yLevel);
    
    
    
    ig.system.context.fillStyle="green"       
     ig.system.context.fillRect(0,(1500-ig.game._rscreen.y),xLevel,yLevel);
    
          ig.system.context.fillStyle="red"       


    
                        
                  ig.system.context.fillStyle="navy"  
     ig.system.context.fillRect(-(ig.game._rscreen.x+(5*ig.system.scale))+(ig.game.gameDimesion.xLevel*ig.system.scale)+9,
                               // (Cam.pos.y -ig.game._rscreen.y)-400
                                0
                                ,400,680*ig.system.scale)   
      
                      ig.system.context.fillStyle="navy"  
     ig.system.context.fillRect(-ig.game._rscreen.x-404.5,
                                //(Cam.pos.y -ig.game._rscreen.y)-400
                                0
                                ,400,680*ig.system.scale)   
     
      ig.system.context.fillStyle="white"  
     ig.system.context.fillRect(0,
    ((1000)-((ig.game._rscreen.y)+(ig.game.getEntitiesByType(EntitySling)[0].appoxHeight)))*ig.system.scale               
                                ,ig.game.gameDimesion.ground,5*ig.system.scale);
   
ig.system.context.fillStyle="red"  
          ig.system.context.fillRect(0,
    ((1000)-((ig.game._rscreen.y)-ig.game.penaltyLine))*ig.system.scale               
                                ,ig.game.gameDimesion.ground,10*ig.system.scale)
    
    
    
   

    var angleR= (180).toRad();
   
    
    var angleRX= (180).toRad();

   if(ig.game.loadedBallType.vel.y>0) {angleRY= (180).toRad();} else{angleRY= (-180).toRad();}
    
    
       var offset =(ig.game.loadedBallType.size.x/2);
    var sizeW=15*ig.system.scale ;
    
    if (ig.game.loadedBallType.vel.y!=0)this.pasTime.unpause();
        
    if (ig.game.loadedBallType.vel.y!=0)this.curTime.unpause();
    

    
    
    for (i=3;i < 15; i++){
    ig.system.context.beginPath(); 
        
        
    var rand = ig.game.Randomize(20);
        if (this.rData[i].time.round(2) == (this.pasTime.delta().round(2))  ){

            this.rData[i].posX = ig.game.loadedBallType.pos.x;
            this.rData[i].posY = ig.game.loadedBallType.pos.y;
          this.rData[i].time =(this.pasTime.delta()+(ig.game.aTick*i)).round(2);
        
        } 
          
        
     
        
        var x= this.rData[i].posX, y=this.rData[i].posY;
        
//        ig.system.context.fillStyle="#FFF"+(i*2)+17;
        // ig.system.context.fillStyle='rgb(255, '+i*7+', 55)';
        
        
        
        
//            ig.system.context.fillStyle='rgb('+(255-(Veffect))+', '+i*13+', 55)';
//            ig.system.context.beginPath();
//            ig.system.context.arc(  ((this.rData[i].posX+(offset))*ig.system.scale),
//                          (((this.rData[i].posY+(offset) )-(ig.game._rscreen.y))*ig.system.scale  ),sizeW,0,2*Math.PI); 
//                ig.system.context.fill();
//            ig.system.context.stroke();
//    
    
    
    }
                       
//              ig.system.context.beginPath();
//  ig.system.context.arc(  ((this.rData[3].posX+(offset))*ig.system.scale),
//                          (((this.rData[3].posY+(offset) )-(ig.game._rscreen.y))*ig.system.scale  ),sizeW+Veffect,0,2*Math.PI); 
//        ig.system.context.fill();
//  ig.system.context.stroke();
  
//      
                        
//Radar BEGIN
                        
     	
						var yLevel, xLevel, yFrame,xFrame,xOffset,yOffset,sampleMap,tilesize,yScrolling
						,xScale,yOffCalib;
						
					//(ig.system.width*ig.system.scale)
						sampleMap = ig.game.backgroundMaps[0]; 
						tilesize = sampleMap.tilesize;
                        xScale=1.2//1.7 4//12 1.4
                        yScale=1.2
						xLevel  = ig.system.width*ig.system.scale;	//ig.game.pxWidth// 
						yLevel =   ig.system.height*ig.system.scale;//sampleMap.height * tilesize;	// ig.game.pxHeight//
						xFrame = xLevel/xScale          //width of Radar
						yFrame = yLevel/yScale//6				//height of Radar
						xOffset = ((xLevel/2)-(xFrame/2))//Xpos of Radar
						yOffset = 1060-ig.game._rscreen.y;//YPos of Radar
			            yOffCalib= 60;// calibarates the Ypos of draws within Radar 
                        xOffCalib=20;

    
    
    
    
    
     		var clapperBoardbotm = new ig.Image('media/clapperBoard1.png')
		var clapperBoardtop = new ig.AnimationSheet('media/clapperBoard2.png',230,30)
		var clapperClap = new ig.Animation(clapperBoardtop, 0 ,[0])
		
        if (ig.input.pressed('click') && this.yScroll	 < 20 && this.yScroll !=-1 && ig.game.gameMode ==0) this.trigger = true;

if (this.trigger === true){
		this.timerEff.unpause(); 	
		if (this.timerEff.delta() > 0.01 && this.yScroll	!=20)
		      {this.yScroll	 += 2; this.timerEff.reset()}
		if (this.yScroll	 > 20)
		      {this.yScroll	 = 20;this.timerEff.pause();}				
}
    
    
// CLAPPERBOARD DRAW BEGIN
if (ig.game.gameMode == 0){

    
    var pos={x:5,y:100};

		clapperClap.pivot.x = 0
		clapperClap.pivot.y = 30
		clapperClap.angle = (-20+this.yScroll	).toRad();
    
		    clapperClap.draw(5,pos.y-30)
		
		clapperBoardbotm.draw(pos.x,pos.y)
	
	                    
    
      ig.system.context.fillStyle="black";
             ig.system.context.font=(ig.system.scale/2)*40+"px Arial";
          ig.system.context.textAlign="left";
        ig.system.context.fillText(ig.game.roundNum+1,(pos.x+50)*ig.system.scale,(pos.y+90)*ig.system.scale   );    
        ig.system.context.fillText(ig.game.totalMonsters,(pos.x+170)*ig.system.scale,(pos.y+90)*ig.system.scale);    
                    ig.system.context.fillText(ig.game.stats.points,(pos.x+20)*ig.system.scale,(pos.y+130)*ig.system.scale); 
    
    
   
    
			if (  this.yScroll	 == 20){		
			       this.trigger = false;
				  this.yScroll	=0;
				ig.game.gameMode = 1;
	
            }

    
    
    
    
    
			
		}
    
    
    
    
    
    
    
    
    
    
if (//ig.game.gameMode === 1
   //ig.input.state('click')
    ig.game.getEntitiesByType(EntitySling)[0].hold===true
    
   ){
		
    
    
    
    
    
				ig.system.context.beginPath();// (yOffset-10)
				ig.system.context.rect(xOffset,yOffset,xFrame,yFrame);
    ig.system.context.globalAlpha=0.7;
				ig.system.context.fillStyle="SLATEGRAY"
				ig.system.context.fill();				

 ig.system.context.globalAlpha=1;

        ig.system.context.fillStyle="lime";
             ig.system.context.font=(ig.system.scale/2)*20+"px Arial";
                ig.system.context.textAlign="left";
    ig.system.context.fillText("round: "+(ig.game.roundNum+1),xOffset+((ig.system.scale/2)*5),yOffset+((ig.system.scale/2)*20));    
    ig.system.context.fillText("wave: "+(ig.game.wave+1),xOffset+((ig.system.scale/2)*140),yOffset+((ig.system.scale/2)*20));    
    ig.system.context.fillText("monsters: "+ig.game.countEnemy,xOffset+((ig.system.scale/2)*240),yOffset+((ig.system.scale/2)*20));    
    ig.system.context.fillText("score: "+ig.game.stats.points.round(),xOffset+((ig.system.scale/2)*5),yOffset+((ig.system.scale/2)*50));    
    
    


}
    
    
    
    
    
     
    
    
    
    
    
    

		
//SLING HELD
	if (ig.game.gameMode ===1 
	//&&	ig.game.getEntitiesByType(EntitySling)[0].hold == true 
 //       ||
//ig.game.loadedBallType.vel.y != 0
							)	
							{	
                                
    //yScrolling= (ig.game.getEntitiesByType(EntitySling)[0].hold)?(ig.game.getEntitiesByType(EntitySling)[0].appoxHeight-1000) : (-ig.game.loadedBallType.pos.y-600)+1000;  
        
                                
                if ( ig.game.getEntitiesByType(EntitySling)[0].hold==true && this.cfON == true ||
                              
                               ig.game.getEntitiesByType(EntitySling)[0].hold==true && this.cfON == false)
                    {
                        yScrolling =(ig.game.getEntitiesByType(EntitySling)[0].appoxHeight-1000) ;
                        
                        
                    }
                
                           if ( ig.game.getEntitiesByType(EntitySling)[0].hold==false && this.cfON == false
                              )
                    {
                        yScrolling =(-ig.game.loadedBallType.pos.y-600)+1000;
                        
                        
                    }        
                                
                                
        //(ig.game.getEntitiesByType(EntitySling)[0].appoxHeight-1000);
                              
                                ig.system.context.beginPath();
								ig.system.context.fillStyle="white"; 
                   
//DRAW BALL
//	if (ig.game.loadedBallType.pos.y+yScrolling < yLevel-(yOffCalib*yScale)) 
//						{	
//		ig.system.context.fillRect(
//		((ig.game.loadedBallType.pos.x//-ig.game.loadedBallType.size.x/2
//         )
//         +(xOffset*xScale))/xScale,//4
//		(ig.game.loadedBallType.pos.y+yScrolling)/yScale+yOffset+yOffCalib
//		,ig.game.loadedBallType.size.x/xScale,ig.game.loadedBallType.size.y/yScale				)		}

//Draw Trajectory Path
                             
//var calibR,angleR,bxR,byR    
//              
//bxR =((ig.game.loadedBallType.pos.x+12)+(xOffset*12))/xScale
//byR =((ig.game.loadedBallType.pos.y+yScrolling)/5+yOffset+60)
//
//calibR=(359).toRad();//callibaration
//if(this.ball.pos.x+22.5 >  ig.game.gameDimesion.xLevel/2){
//angleR=(Math.atan2(-ig.game.getEntitiesByType(EntitySling)[0].maxVelocity,ig.game.getEntitiesByType(EntitySling)[0].maxVelocityX)+calibR).toDeg()*(Math.PI / 180);
//}
//                                
//else{
//angleR=(Math.atan2(-ig.game.getEntitiesByType(EntitySling)[0].maxVelocity,ig.game.getEntitiesByType(EntitySling)[0].maxVelocityX)+calibR).toDeg()*(Math.PI / 180);                              }   
//if (	 byR+yScrolling  < 700  &&  byR+yScrolling  > -300){                                
//ig.system.context.moveTo(bxR,byR)
//		                    
//   ig.system.context.lineTo(bxR+1000 * Math.cos(angleR),
//                            byR+1000 * Math.sin(angleR));
//}
//            
//                                
                             
        
                                
                                


                                
                                
                                
                                
//DRAW Approx Height	
	ig.system.context.fillRect( 
	((xOffset*xScale))/xScale,
	((((1000-ig.game.getEntitiesByType(EntitySling)[0].appoxHeight))+yScrolling)/yScale+yOffset+yOffCalib)
	,xFrame,2)		
		
//Draw Center line Y
//    ig.system.context.fillRect( 
//	((xLevel/2)+(xOffset*xScale))/xScale,yOffset,2,yFrame)		
//	
//     ig.system.context.fillRect( 
//	((xLevel)+(xOffset*xScale))/xScale,yOffset,2,yFrame)		
//    
//     ig.system.context.fillRect( 
//	((xOffset*xScale))/xScale,yOffset,2,yFrame)		
//    
     
        //DRAW HOTEL                        
                                
                                

//DRAW GROUND        
                                
//DRAW GROUND

if (ig.game.gameDimesion.ground+yScrolling < yLevel-(yOffCalib*yScale)){		
		ig.system.context.fillRect( 
		((xOffset*4))/4,
			(ig.game.gameDimesion.ground+yScrolling)/yScale+yOffset+yOffCalib,
		xFrame	,	2			)		
	}
           
                                
                                
              ig.system.context.fillStyle="red"  
         
                                
         if (ig.game.penaltyLine+yScrolling < yLevel-(yOffCalib*yScale)){		
		
    ig.system.context.fillRect( ((xOffset*4))/4,((1000+ig.game.penaltyLine)+yScrolling)/yScale+yOffset+yOffCalib,
	xFrame	,	25			)		
	}
                                  
                    ig.system.context.fillStyle="white"

                                
                                
                                
                                
                                
                                
                                
//Draw sData
           for (i=0; i <ig.game.sData.length; i+=4)//++
      {
          
  if(ig.game.sData[i].posY+yScrolling < yLevel-(yOffCalib*yScale) )
						{	
                      if (typeof ig.game.sData[i-1]!='undefined' ){         
                            
//		ig.system.context.fillRect(
//		((ig.game.sData[i].posX*ig.system.scale)+(xOffset*xScale))/xScale,//4
//		(ig.game.sData[i].posY+yScrolling)/yScale+yOffset+yOffCalib
//		,ig.game.loadedBallType.size.x/xScale,ig.game.loadedBallType.size.y/yScale)		}
//
//          
             ig.system.context.beginPath();     
                          
                          
                   ig.system.context.lineWidth = ig.game.loadedBallType.size.x/xScale;

                          
                          
                          
             	ig.system.context.moveTo(
                    
                    		
                    
    ( (((ig.game.sData[i-1].posX*ig.system.scale)+xOffset*xScale))/xScale)+ ig.game.loadedBallType.size.x/2,//4
                    
		((ig.game.sData[i-1].posY+yScrolling)/yScale+yOffset+yOffCalib)+ ig.game.loadedBallType.size.x/2
                    
      
                    );
                
                ig.system.context.lineTo(

                    
     ( (((ig.game.sData[i].posX*ig.system.scale)+xOffset*xScale))/xScale)+ ig.game.loadedBallType.size.x/2,//4
                    
		((ig.game.sData[i].posY+yScrolling)/yScale+yOffset+yOffCalib)+ ig.game.loadedBallType.size.x/2
                    
      
                
                );
          
             ig.system.context.stroke();  
                      }
          
                        }
      }
                                
//end        
//Draw All the Enemies based off of the  ig.game.getEntityByID(enemyArchive[i])
 //  1260 yLevel  420 yFrame
			if (ig.game.countEnemy != 0){
	
				for(i =0; i <= ig.game.enemyArchive.length; i++){
		
					if (typeof ig.game.getEntityByID(ig.game.enemyArchive[i])!= 'undefined'){
                        var enemy = ig.game.getEntityByID(ig.game.enemyArchive[i]);
                        if (
					  enemy.pos.y+yScrolling+enemy.size.y  < yLevel-(yOffCalib*yScale)  && //800 >> 1080
						enemy.pos.y+yScrolling+enemy.size.y > -enemy.size.y )	{
					
                        
					    if (enemy.name == "alien1") ig.system.context.fillStyle="blue"; 
					    if (enemy.name == "alien2") ig.system.context.fillStyle="yellow"; 
	     
							ig.system.context.fillRect(
                          ((enemy.pos.x*ig.system.scale+(xOffset*xScale))/xScale),
				          (enemy.pos.y+yScrolling)/yScale+yOffset+yOffCalib,
                          (enemy.size.x*ig.system.scale)/xScale,(enemy.size.y*ig.system.scale)/yScale)	
															
						
						}
                    }
	
				}}
	

                                
                                
                                                    
         for (i=0,len=ig.game.componentArchive.length; i <= len; i++){
                  if (typeof ig.game.getEntityByID(ig.game.componentArchive[i]) !== 'undefined' ){   
        
        var compoent;
        compoent = ig.game.getEntityByID(ig.game.componentArchive[i])
        
             
                                    if (
					  compoent.pos.y+yScrolling< yLevel-(yOffCalib*yScale)  && //800 >> 1080
						compoent.pos.y+yScrolling+compoent.size.y > -200)	{
					
                        
					  
	     
							ig.system.context.fillRect(
                          (((compoent.pos.x*ig.system.scale)+((xOffset)*xScale))/xScale),
				          (compoent.pos.y+yScrolling)/yScale+yOffset+yOffCalib,
                          (compoent.size.x*ig.system.scale)/xScale,(compoent.size.y*ig.system.scale)/yScale)	
															
						//ig.system.context.stroke();
						}                    
                     
           
         }}            
                                
                                
                                
                                
                        
///                                
ig.system.context.stroke();


								}	//end Sling hold



				if 	(ig.game.getEntitiesByType(EntitySling)[0].hold == false && 
					ig.game.gameMode == 1){


// put ammunition selection here


											}
    
 if (this.ball.vel.y != 0 && this.ball.freeze==true
    ){
     
     
     
     
     
     
 
 }
 
    
    
    }
    
    
    
    
},
     
 
getAudFX:function(){
    this.preVfx= window.lerp( this.preVfx,  this.Vfx, 0.15);//this.Vfx;
    return Visualiser.prototype.getAmplitude();
}


})



})


/*

        xProp= (ig.game.plotter.x-ig.game.screen.x)
        yProp= (ig.game.plotter.y-ig.game.screen.y)
        
        xLmt = 75
        xDisp =  (xProp)-atlias.pos.x
        yDisp =  (yProp)-atlias.pos.y
      
                if (ig.input.state('click')  && atlias.within && allBrel===false 
                  
                   ){ 
    
             atlias.pos.x=((ig.input.mouse.x)-17.5).limit(xProp-xLmt,xProp+xLmt)
             atlias.pos.y=((ig.input.mouse.y)-17.5).limit(yProp-xLmt,yProp+xLmt)
             
             
//            if (  ig.game.sData[ig.game.plotter.select].velX > 0 && (xDisp/xLmt) > 0 ){
//             ig.game.sData[ig.game.plotter.select].xBouy = (xDisp/xLmt)}else {ig.game.sData[ig.game.plotter.select].xBouy =0}
//            
//                     if (  ig.game.sData[ig.game.plotter.select].velY > 0 && (yDisp/xLmt) > 0 ){
//             ig.game.sData[ig.game.plotter.select].yBouy = (yDisp/xLmt)}else {ig.game.sData[ig.game.plotter.select].yBouy =0}
                    
         
             ig.game.sData[ig.game.plotter.select].yBouy = (yDisp/xLmt)*(this.ball.bounciness*2);
                 ig.game.sData[ig.game.plotter.select].xBouy  =(xDisp/xLmt)*(this.ball.bounciness*2);
                    
    
//    ig.game.colData[ ig.game.dirInc].xBouy=(xDisp/xLmt)*(this.ball.bounciness*2);//ig.game.sData[ig.game.plotter.select].xBouy;
//    ig.game.colData[ ig.game.dirInc].yBouy= (yDisp/xLmt)*(this.ball.bounciness*2);//ig.game.sData[ig.game.plotter.select].yBouy;
//                    
                    
                    
             this.clickndrag =true;
           
             
             ///atlias.pos.y=(ig.input.mouse.y)-17.5
          ///ig.game.loadedBallType.bounciness
       
        
    
   
     
           
           
       }
    
    if (ig.input.released('click') && !atlias.within ) this.clickndrag =false;
    if (ig.input.pressed('click') && !atlias.within ) this.clickndrag =false;
    

    // console.log(this.clickndrag);
  
    //if player trys to drags atlias beyond its borders outer X s
        if (ig.input.state('click') && !atlias.within && allBrel===false &&
            
 
            
            ig.input.mouse.y< yProp+xLmt &&
             ig.input.mouse.y> yProp-xLmt 
            &&  ig.game.sData[ig.game.plotter.select+1].invsVel===true
            && Math.abs(xDisp/xLmt) === 1
        
&& this.clickndrag==true
           
           ){
                
              atlias.pos.y=((ig.input.mouse.y)-17.5).limit(yProp-xLmt,yProp+xLmt);
                ig.game.sData[ig.game.plotter.select].yBouy = (yDisp/xLmt)*this.ball.bounciness*2;
                (ig.input.mouse.x >  xProp) ?    ig.game.sData[ig.game.plotter.select].xBouy =  -1 :     ig.game.sData[ig.game.plotter.select].xBouy = 1 ;

            }
//    
   
//outer Y s
            if (ig.input.state('click') && !atlias.within && allBrel===false &&
                          
            ig.input.mouse.x< xProp+xLmt &&
            ig.input.mouse.x> xProp-xLmt 
                        &&  ig.game.sData[ig.game.plotter.select+1].invsVel===true
                   && Math.abs(yDisp/xLmt) === 1
&& this.clickndrag==true
               
               ){
                
              atlias.pos.x=((ig.input.mouse.x)-17.5).limit(xProp-xLmt,xProp+xLmt);
            ig.game.sData[ig.game.plotter.select].xBouy = (xDisp/xLmt)*this.ball.bounciness*2;
             (ig.input.mouse.y >  yProp) ?    ig.game.sData[ig.game.plotter.select].yBouy = -1 :     ig.game.sData[ig.game.plotter.select].yBouy = 1 ;

            }
//NOTICE ASSINEMENT TO Y/XBOUY OF 1 CAUSES DISPLACEMENT REASON UNKOWN right side!
//check corners 
          if (ig.input.state('click') && !atlias.within && allBrel===false && ig.game.sData[ig.game.plotter.select+1].invsVel===true
             && this.clickndrag==true
             ){
          atlias.pos.x=((ig.input.mouse.x)-17.5).limit(xProp-xLmt,xProp+xLmt)
             atlias.pos.y=((ig.input.mouse.y)-17.5).limit(yProp-xLmt,yProp+xLmt)
          //upper right 
              if (ig.input.mouse.x> xProp+xLmt &&  ig.input.mouse.y< yProp+xLmt && ig.input.mouse.y< yProp-xLmt){       //   console.log("blink UR")
              ig.game.sData[ig.game.plotter.select].yBouy =1
              ig.game.sData[ig.game.plotter.select].xBouy =-1}
         //lower  right
              if (ig.input.mouse.x> xProp+xLmt && ig.input.mouse.y> yProp-xLmt && ig.input.mouse.y> yProp+xLmt ){     //     console.log("blink LR")
              ig.game.sData[ig.game.plotter.select].yBouy =-1
              ig.game.sData[ig.game.plotter.select].xBouy =-1}
         //lower left     
                if (ig.input.mouse.x< xProp-xLmt && ig.input.mouse.y> yProp-xLmt && ig.input.mouse.y> yProp+xLmt){       //   console.log("blink LL")
              ig.game.sData[ig.game.plotter.select].yBouy =-1
              ig.game.sData[ig.game.plotter.select].xBouy =1}  
         //upper left      
           if (ig.input.mouse.x< xProp-xLmt && ig.input.mouse.y< yProp+xLmt && ig.input.mouse.y< yProp-xLmt){        //  console.log("blink UR")
              ig.game.sData[ig.game.plotter.select].yBouy =1
              ig.game.sData[ig.game.plotter.select].xBouy =1}   
          
                  
                  
                  }

    ig.game.colData[ ig.game.dirInc].xBouy=ig.game.sData[ig.game.plotter.select].xBouy;
    ig.game.colData[ ig.game.dirInc].yBouy=ig.game.sData[ig.game.plotter.select].yBouy;

    

    this.parent();
    
    
    
    
    
    
    
    
    
    
    
    MyGame = ig.Game.extend({
    
    buttons: null,
    buttonImage: new ig.Image( 'media/buttons.png' ),
    
    init: function() {
        // For Desktop Browsers
        ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
        ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
        ig.input.bind( ig.KEY.C, 'shoot' );
        ig.input.bind( ig.KEY.X, 'jump' );
        
        // For Mobile Browsers and Ejecta
        if( ig.ua.mobile ) {
            this.buttons = new ig.TouchButtonCollection([
                new ig.TouchButton( 'left', {left: 0, bottom: 0}, 128, 128, this.buttonImage, 0 ),
                new ig.TouchButton( 'right', {left: 128, bottom: 0}, 128, 128, this.buttonImage, 1 ),
                new ig.TouchButton( 'shoot', {right: 128, bottom: 0}, 128, 128, this.buttonImage, 2 ),
                new ig.TouchButton( 'jump', {right: 0, bottom: 96}, 128, 128, this.buttonImage, 3 )
            ]);
            
            // Align the touch buttons to the screen edges; you have 
            // to call this function once after creating the 
            // TouchButtonCollection and then every time you change 
            // the game's screen size
            this.buttons.align();
        }
    },
    
    draw: function() {
        this.parent();
        
        // Draw all touch buttons - if we have any
        if( this.buttons ) {
            this.buttons.draw(); 
        }
    }
});
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //
// var offSet=17.5     
//   if (this.upDate !== ig.game.plotter.select) {
//       
//    this.upDate =ig.game.plotter.select
//    
//    
//// atlias.pos.x = ((ig.game.plotter.x-ig.game.screen.x))-17.5;                 
//
// atlias.pos.x = ((ig.game.plotter.x)-(ig.game.screen.x/ig.system.scale))//-offSet
//  atlias.pos.y = (ig.game.plotter.y-ig.game.screen.y)//-offSet;
//       
//       }
//    
//    
////limit(edgeEndY+1,edgeBgnY)
//        xProp= (ig.game.plotter.x-(ig.game.screen.x/ig.system.scale))
//        yProp= (ig.game.plotter.y-ig.game.screen.y)
//        
//        xLmt = 45
//        xDisp =  (xProp)-atlias.pos.x
//        yDisp =  (yProp)-atlias.pos.y
//    
//    
//    if ( ig.input.pressed('click')==true){this.tPDelay.unpause();}
//    if (this.tPDelay.delta()>.12){this.tPDelay.reset();this.tPDelay.pause();}
//        
//        if (ig.input.released('click')==true && this.tPDelay.delta()==0)this.tPress=false;
//
//    
//   
//    
//    if(ig.input.state('click')&& atlias.within&& allBrel===false&& this.tPDelay.delta()!=0){this.tPress=true;}
//    
//    
//
//      if (this.tPress)//<-delay functionallity added due to lackof pressed event mobile
//      
//      {
//    
//             atlias.pos.x=((ig.input.mouse.x)-offSet).limit(xProp-xLmt,xProp+xLmt)
//             atlias.pos.y=((ig.input.mouse.y)-offSet).limit(yProp-xLmt,yProp+xLmt)
//                  
//         
//             ig.game.sData[ig.game.plotter.select].yBouy = (yDisp/xLmt)*(this.ball.bounciness*2);
//                 ig.game.sData[ig.game.plotter.select].xBouy  =(xDisp/xLmt)*(this.ball.bounciness*2);
//                
//         
//                    
//            if (ig.game.dirInc-1 != -1 && ig.game.colData[ig.game.dirInc-1].invsVel ==true
//
//               ){   
//
//            }
//
//                    
//                    
//             this.clickndrag =true;
//           
//           
//       }
//        if(ig.input.released('click')&&!atlias.within)this.clickndrag=false;
//    if(ig.input.pressed('click')&&!atlias.within)this.clickndrag=false;
//
//  
//    //if player trys to drags atlias beyond its borders outer X s
//        if (ig.input.state('click') && !atlias.within && allBrel===false &&
//          
//
// 
//            
//            ig.input.mouse.y< yProp+xLmt &&
//             ig.input.mouse.y> yProp-xLmt 
//            &&  ig.game.sData[ig.game.plotter.select+1].invsVel===true
//            && Math.abs(xDisp/xLmt) === 1
//        
//&& this.clickndrag==true
//           
//           ){
//                
//              atlias.pos.y=((ig.input.mouse.y)-offSet).limit(yProp-xLmt,yProp+xLmt);
//                ig.game.sData[ig.game.plotter.select].yBouy = (yDisp/xLmt)*this.ball.bounciness*2;
//                (ig.input.mouse.x >  xProp) ?    ig.game.sData[ig.game.plotter.select].xBouy =  -1 :     ig.game.sData[ig.game.plotter.select].xBouy = 1 ;
//
//
//            
//            }
////    
//   
////outer Y s
//            if (ig.input.state('click') && !atlias.within && allBrel===false &&
//                          
//            ig.input.mouse.x< xProp+xLmt &&
//            ig.input.mouse.x> xProp-xLmt 
//                        &&  ig.game.sData[ig.game.plotter.select+1].invsVel===true
//                   && Math.abs(yDisp/xLmt) === 1
//&& this.clickndrag==true
//               
//               ){
//                
//              atlias.pos.x=((ig.input.mouse.x)-offSet).limit(xProp-xLmt,xProp+xLmt);
//            ig.game.sData[ig.game.plotter.select].xBouy = (xDisp/xLmt)*this.ball.bounciness*2;
//             (ig.input.mouse.y >  yProp) ?    ig.game.sData[ig.game.plotter.select].yBouy = -1 :     ig.game.sData[ig.game.plotter.select].yBouy = 1 ;
//
//  
//                
//            }
////NOTICE ASSINEMENT TO Y/XBOUY OF 1 CAUSES DISPLACEMENT REASON UNKOWN right side!
////check corners 
//          if (ig.input.state('click') && !atlias.within && allBrel===false && ig.game.sData[ig.game.plotter.select+1].invsVel===true
//             && this.clickndrag==true
//             ){
//          atlias.pos.x=((ig.input.mouse.x)-offSet).limit(xProp-xLmt,xProp+xLmt)
//             atlias.pos.y=((ig.input.mouse.y)-offSet).limit(yProp-xLmt,yProp+xLmt)
//          //upper right 
//              if (ig.input.mouse.x> xProp+xLmt &&  ig.input.mouse.y< yProp+xLmt && ig.input.mouse.y< yProp-xLmt){       //   console.log("blink UR")
//              ig.game.sData[ig.game.plotter.select].yBouy =1
//              ig.game.sData[ig.game.plotter.select].xBouy =-1
//              
//
//              }
//         //lower  right
//              if (ig.input.mouse.x> xProp+xLmt && ig.input.mouse.y> yProp-xLmt && ig.input.mouse.y> yProp+xLmt ){     //     console.log("blink LR")
//              ig.game.sData[ig.game.plotter.select].yBouy =-1
//              ig.game.sData[ig.game.plotter.select].xBouy =-1
//              
//  
//              
//              }
//         //lower left     
//                if (ig.input.mouse.x< xProp-xLmt && ig.input.mouse.y> yProp-xLmt && ig.input.mouse.y> yProp+xLmt){       //   console.log("blink LL")
//              ig.game.sData[ig.game.plotter.select].yBouy =-1
//              ig.game.sData[ig.game.plotter.select].xBouy =1
//       
//                }  
//         //upper left      
//           if (ig.input.mouse.x< xProp-xLmt && ig.input.mouse.y< yProp+xLmt && ig.input.mouse.y< yProp-xLmt){        //  console.log("blink UR")
//              ig.game.sData[ig.game.plotter.select].yBouy =1
//              ig.game.sData[ig.game.plotter.select].xBouy =1
//    
////
//           }   
//          
//               
////
//   
//                  
//                  }
//
//    

    
    
        var atlias, xLmt,xProp,yProp,xDisp,yDisp,dist;
     atlias = ig.gui.element.action('getByName','insV');
    button = ig.gui.element.action('getByName','freeze');
 
var offSet=17.5 
       if (this.upDate !== ig.game.plotter.select) {
       
    this.upDate =ig.game.plotter.select;
   ig.game.plotter.select=50;
         

atlias.pos.x = ((ig.game.plotter.x)-(ig.game.screen.x/ig.system.scale))//-offSet
atlias.pos.y = (ig.game.plotter.y-ig.game.screen.y)//-offSet;
           
           

       }

   if (this.ball.pos.y==
-4901.2381959248405)this.ball.freeze=true;
    
    


    
    if ( ig.input.pressed('click')==true){this.tPDelay.unpause();}
    if (this.tPDelay.delta()>.12){this.tPDelay.reset();this.tPDelay.pause();}
        
        if (ig.input.released('click')==true && this.tPDelay.delta()==0)this.tPress=false;

    
   
    
    if(ig.input.state('click')&& atlias.within&& allBrel===false&& this.tPDelay.delta()!=0){this.tPress=true;}
    
    

      if (this.tPress)//<-delay functionallity added due to lackof pressed event mobile
      
      {
    
          
          
            var mouse={
            x:((ig.game._rscreen.x/ig.system.scale)+ig.input.mouse.x),
            y:(ig.input.mouse.y)
        }
                  
       
       
        xProp= (ig.game.plotter.x-(ig.game._rscreen.x/ig.system.scale));
        yProp= (ig.game.plotter.y-ig.game._rscreen.y);
    
    
      xProp2= ig.game.plotter.x+(ig.game._rscreen.x/ig.system.scale);
      yProp2= (ig.game.plotter.y);
    

          var Var={x:(ig.game.plotter.x+(ig.game._rscreen.x/ig.system.scale)),y:(ig.game.plotter.y-(ig.game._rscreen.y))}
       
          var Var2={x: atlias.pos.x+(ig.game._rscreen.x/ig.system.scale),y:(atlias.pos.y+ig.game._rscreen.y)}


        xLmt = 45
        xDisp =  (xProp)-atlias.pos.x
        yDisp =  (yProp)-atlias.pos.y
    
   
          var angle =0.001;
          

           
          Vang1={x:(ig.game.plotter.x+(ig.game._rscreen.x/ig.system.scale)),y:ig.game.plotter.y};
          Vang2={x:ig.game._rscreen.y+atlias.pos.y,y:ig.game._rscreen.y+atlias.pos.y};       
          Vang3={x:(ig.game._rscreen.x+ig.input.mouse.x),y:(ig.input.mouse.y)  }         
          
            
          if (Var2.x < ig.game.plotter.x && mouse.x < ig.game.plotter.x) {console.log('b');
                      angle=  ( Math.abs((( Math.atan2( (Vang3.x-Var.x),(Vang3.y-Var.y)))-(0).toRad())).toDeg());;                              
                                                    }
          if (Var2.x > ig.game.plotter.x && mouse.x > ig.game.plotter.x) {console.log('c');
                                 angle=  ( Math.abs((( Math.atan2( (Vang3.x-Var.x),(Vang3.y-Var.y)))-(0).toRad())).toDeg());                         
                                                      }

        var dist2=  Math.sqrt(
Math.pow((ig.game.plotter.x+(ig.game.screen.x/ig.system.scale)) -(mouse.x) ,2)+
Math.pow(( (ig.game.plotter.y-ig.game._rscreen.y) -(mouse.y )),2)
        ) ;        
    
          
             var dist3=  Math.sqrt(
Math.pow(( ig.game.plotter.x+(ig.game._rscreen.x/ig.system.scale) -(((ig.game._rscreen.x*2)/ig.system.scale)+atlias.pos.x) ),2)+
Math.pow(( ig.game.plotter.y-(ig.game._rscreen.y+atlias.pos.y ) ),2)
        ) ;        
    -(-(ig.game._rscreen.x*2)/ig.system.scale)      
          
          

             
                     
                     
                     
      var  posAdis={
           y:(dist3) * Math.cos(angle.toRad()),
           x:(dist3) * Math.sin(angle.toRad())
             
             };
      
                     
                     
                     
                     
                     
                     
        if(atlias.pos.x <  ((ig.game.plotter.x)-(ig.game._rscreen.x/ig.system.scale))){posAdis.x*=-1; //console.log("a")
                                                                                      }
        if(atlias.pos.x > ((ig.game.plotter.x)-(ig.game._rscreen.x/ig.system.scale))){Math.abs(posAdis.x); //  console.log("b")
                                                                                     }        

         atlias.pos.x=((ig.input.mouse.x))
atlias.pos.y=((ig.input.mouse.y))    
// atlias.pos.x=      179.3333282470703;
// ig.input.mouse.x=      179.3333282470703;
//atlias.pos.y= 164.6666564941406;
// ig.input.mouse.y= 164.6666564941406;
  
//          if (dist2<50)
//          
//          {           
// atlias.pos.x=((ig.input.mouse.x))
//atlias.pos.y=((ig.input.mouse.y))         
//
//               
//           } else
//           {  
//        atlias.pos.x=((posAdis.x)+(ig.game.plotter.x-(ig.game._rscreen.x/ig.system.scale)));
//        atlias.pos.y=((posAdis.y)+(ig.game.plotter.y-(ig.game._rscreen.y)));
//               
//               
//      
//          }

//
    
    
    
    
    
    
    
    
    
    

*/
