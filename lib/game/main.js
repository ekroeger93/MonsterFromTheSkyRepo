//harmonic motion spring physics
//pre-determined max velocity of sling
//apex height of projectile
//pre-determined pathway of projectile /w collision consideration (realtime and stationary)

//wave spawner algorithm 
//sliding icon strip interface
//mini-map radar
//

//COMBOS SCALE HIT POINTS!!!!! 


/*
    TO-DO list 




LOG 7-12-19
    
    Having a slomotion feature is exteremly tedious to adapt if not overwhelming because of unforseeable
    varables due to the changes in gravity (the rate of "applied" gravity at both timelines). Im going to attempt
    to have a ghost tail added to the projectile, Once the slow motion is intitiated the current projectile will remain
    motion as to preserve the sData while the ghost tail (previous positions) will have another projectile "follow up"
    HOWEVER it will move inbetween the spaces at which the previous posisions lie to give the effect of slow motion. So
    in a sense its going to crawl those positions.
    
    To fininalize I may have it until the ghost projectile meets 
    the current projectile position <-- this projecitle will pause at a certain point while still keeping intact its variables. 

    overall this is a work around methoid without using system.tick 

    ! - will have collsision issues


    the other option would be to impliment a side animation showing a hit enemy



    *Failsafe methoid use 'future ghost projectile' to check collisions at sData collided points
    *Fix corner collisions on component to sData && tight spaces << kinda needs more attention
    *usage of Mulitple components X 


    
    !before adding new features 
    
    *cleanup code  reduce and compartmentize
    
    *fixup some collision with sData and compoenent paticuarlly corners 
        -record the sling position per shot see if node trace is false use as refference
        
    *fix the sData Rebuild to be more verbose so that when using pausing and unpausing
    the collData remains fixed, and only updated when anew point is added, esspeically when
    a Invs node is place forthfront other nodes
    
    *optimize sData for better preformance the following causes decreased, Compoents, higher array length,
    
    
-if [0].index > [selection].index 
[0].index = [selection].index 
else 
{put [selection] at count}

where the greatest index is at [0]
while the least is at [count] Decending order





KNOWN BUG/DEFFECT ISSUES:

* occasionally nodes passing through corner collisions on Components, or misinterping collision
* rare cases in which the projecitle does not collide with colData << needed investigation 
* pauseing again after colData's has been set, caues them to shift with sData
* 



Needed features (conviently feasible)

-The old Ammunition selection on the left side of UI
-links to added colData/ or somthing locking onto nearest colData press and hold the directional buttons
-the ablility to time-step and keep the colData suspended NOT following the sData
-get Highest node for Radar - disabling Apex Height caculation 
-some Failsafe options for possible bugs 
-basic UI info 
-projected images of the colData/ some indication 
-PerTurn enemy movment 
-camera keeping up with a high velocity projectile 
-pull sling feel enchancements /tension

?-grapple a node on click, use like sling expect it being limited with the given veloctiy 
?-make the attempt to get rid of the abatrary buttons with an combined controlled functionality 
?-make it more like a push/smuge/dent effect on the velocity
    e.g. in a declining velocity nodes are lodged upwards when the player pushes them down 


   Simulation                                                                         Summary
                                       +-------------------------------------+
  Box of Inverse Threshold (zoomed)    |    new traj                         |        The Inverse Box is used to change the selected
                     1                 |         o o               .  .      |        node velocity to a certain threshold below or
  +--------~y---------+1  magnitude    |        o    o           .       .   |        equal to the bounciness of the projectile.
  |         |         |   of inverse   |       o       o       .           . |        Within the Inverse box is the Slider used to
  |         |         |                |                o    .               |        reflect the value to the affected velocity.
  |         |         |                |      o          o .       old traj  |        The slider initial position is that of the
  |         |         |    -------------------o-------->[0]                  |        selected node. Once the player displaces the
  +---------0--------~X---/            |               o   \                 |        slider the magnitude that of the inverse
  |        /|         |                |             o      \                |        will change the nodes velocity.
  |       / |      ------>slider       |           o       affected node     |        The simulation shows that the node X velocity
  |      /  |    /    |     displaced  |         o            velocity       |        is affected by a inverse of .5 while the
  |     /   |    |    | value X  =.5   |       o                             |        Y velocity remains the same because the
-1+-----+---+----o----+  value Y  = 1  |     o                               |        value is equal to the bounciness being both
  -1    |                              |   o                                 |        equal to 1 and positve interger
        |-slider inital state          | o                                   |
            affected node position     +-------------------------------------+
                                        ... old traj vX =100 , vY =100
                                        ooo new traj vX =-50 , vY =100


X-COMPLETED 
    -depreicate the invsX,Y functionality 


BUG REPORT 3-15-17

node miscalcuation when modifying nodes alongside the walls in a upward zigzag orientation
per one node space 
 /
|\
|/
|\
|/
|\







Projected features : 

Projectile type

-heavy - light 
the heavery the harder hits
the lighter the faster

Node functions

Trajectory
    -inverses(x,y) velocities
    -speed boost
    -pause at point 
    -weight change? 
    
Arsenal    
    -explosion
    -gunner
    
    
   -chainlink
    slow/stop/barrier
    magnetize

    


*/
/*

TO-DO TECH DEMO RELEASE



-ADD VARIOUS EFFECTS

-WORK ON GAME ELEMENTS
    
    -playable up to three rounds then generate sharable score image
    
-FINISH UP MAIN MENU FOR TECH DEMO
    

*/    


ig.module( 
	'game.main' 
)

.requires( //'plugins.fixed-tick',/// not ready for this 
	'impact.game',
  //  'plugins.pixi',
    	'game.gui_Moderator',
      'game.levels.movietest',
	'game.levels.testlvl', 
    'plugins.animation-scaling',
 //'game.system',
//'plugins.touch-button', 'game.levels.movietest' 

//'impact.debug.debug',
    //      'plugins.fixed-tick',
    //	'game.entities.video',
	//'impact.font',
// 'plugins.touch-button',
     'game.particles-fast',
    'plugins.impact-storage'
  //  'plugins.timeslower'

    
)

.defines(function(){
//var myTimeSlower = new TimeSlower();
var storage = new ig.Storage();
 
storage.initUnset('round', 0);
storage.initUnset('points', 0);
storage.initUnset('gameMode',0); //disable


MyGame = ig.Game.extend({


gameDimesion : {
tilesize : 0, 
xLevel : 0,
yLevel : 0,
fstSec : 0,		//center of a three sectioned dimension 1st from the left
sndSec : 0,		//center of level
thrSec : 0		//center of a three sectioned dimension 3rd from the left  
},

//font:		 new ig.Font('media/04b03.font.font.png' ),
//statText2:	 new ig.Font('media/quarts.font.png'), //56
//statText3:   new ig.Font('media/squarts.font.png'),  
//statText: 	 new ig.Font('media/cartoon.font.png'),
comboText: 	 new ig.Font('media/combo.font.png'),
comboRText:  new ig.Font('media/comboRed.font.png'),
//comboBText:  new ig.Font('media/comboBlue.font.png'),
comboYText:  new ig.Font('media/comboYellow.font.png'),
stats: {penalty:0, points:0, money:0 , waveNum: this.wave},
penaltyLine:-2500,
cRundPoints: 0,//current round points
gravity: 300,//300
countEnemy:0,/////<<<<<<

gameMode: 0,		// 0 = status, 1 = play, 2 = shop
comboCount:1,
comboReset:null,
timerEff :null, 
playerTurn: true,
lvlMap : null,
newRound : false,
gotoShop : false,
loadedBallType : null, // the ball that is currently loaded into the sling 
reloadBallrdy:false,

syncTime:null,//syncTimer for enemies     

oscTimer:null,     
oscFx:0,     
     
wave:-1,
spawnQuery:0, 
totalMonsters:0,

graceEntry:0,
standEntry:0,
challEntry:0,

roundNum:0,// 
waveNum:0, //number to spawn per wave of specified specice
//cunECount:0,// number of enimies in current wave
eSpecies:"",//specified type of enemy entity to spawn
//eDeduction:2,//subtract control of unique enimies population between waves 
//eAdhesion:2, //addition control of unique enimies population between waves
rSpawnManagement: 0, //manage data of types of enimies spawing per round per wave
//parameters Type,Num,eDed,eAdh
rGoalManagement: 0,
enemyArchive:0,
numCom:0,//indexed compoents     
componentArchive:0,
componentArchive2:0,     
yScroll : 0,
sData: [],//array data of futures positions stationary solution
tData: 0,//literal array of time increments     
plotter:{x:0,y:0,select:0},//
colData:[],//collision based data
atlasOrder:[],//linear directory of sData indexes in order fashion < to >
dirInc:0,//increments the index of colData   
hitWall:0,   
itrackBall:0,
     
leftoff:0,//test var to aquire node in collision     
tDelay:0,//new ig.Timer();
startstop:null,

metamode:false,     
tempmode:false,
     
lastPos:{x:0,y:0},
lastEnNode :{x:null,y:null},  
component:null,     

aTick:0,
gRate:0,
    
    
touching:false,
toX:0,
toY:0,
    

    
        buttons: null,
  //  buttonImage: new ig.Image( 'media/buttons.png' ),  
    
    scrollT:null,
    scrollS:0,
    scrollLock:0,
    slideFx:0,
    dampening:0,
    ease:false,
    
    tvButton: new ig.Image('media/tvButtons.png'),
//    scrollImg1: new ig.Image('media/scroll.png'),
//    scrollImg2: new ig.Image('media/scroll2.png'),
//    plotImg1: new ig.Image('media/plot.png'),
//    plotImg2: new ig.Image('media/plot2.png'),
   sliderImg: new ig.Image('media/slider.png'),
    
    
    
    
    
    imgAddin:0,
    
//    musicBeatSt0: new ig.Sound('music/startupBeat0.wav',false),
//    musicBeat0: new ig.Sound('music/Beat0.mp3',false),
//    musicBeatLw0: new ig.Sound('music/lowBeat0.wav',false),
//    musicBeatHi0: new ig.Sound('music/highBeat0.wav',false),
    musicTrans0: new ig.Sound('music/trans0.ogg'),
    flipperSound: new ig.Sound('media/flip.ogg'),
    bellSound: new ig.Sound('media/bells.ogg'),
    thudHitSound:new ig.Sound('media/thud.ogg'),
    goAnnouncer: new ig.Sound('music/GOOO.ogg'),
    anvIns:new Image(120,120),
    scrollImg1:new Image(125,500),
    scrollImg2:new Image(250,1000),
    plotImg1:new Image(125,100),
    plotImg2:new Image(250,200),
    drawnAvi:false,
    
      bumperImg:new Image(90,90),
    
    //    (ig.system.scale==2 )?(img2.src='media/scroll.png'):(img2.src='media/scroll2.png');  
    fxPlay:false,
    fxTime:null, 
    
    startStop:false,
    
    
    
    
    TOTAL_PARTICLES:30,
    killParticles:new ig.Timer(),
    pool:[],
    
    countHits:0,
    
    
    prefMode:false,
    
    optionMenu:false,
    stopMusic:false,
    
    reloaded:false,
    
    ///For Narriation and popup
    cmd:[],
    cPanel:[],
    index:0,
    isRunning:true,
    goNext:false,
    animSheet: new ig.AnimationSheet( 'media/widNar.png', 60, 68 ),
    animSheet2: new ig.AnimationSheet( 'media/popGuy.png', 35, 40 ),
    
    animEvent:null,
    animEvent2:null,
    orderCall:0,
    
    intro:true,
    
    //effects
    bumpTfx:null,
    
    bossKill:false,//what a pain in the ass i swear
    
    TestVar:false,
    
    tickSwitch:false,
    
   // adapter:-0.09,//-4382.5543763323585
    adapter:0,
    phaseOff:{x:0,y:0},
  
    statPos:{x:0,y:0,vX:0,vY:0},
    
    phaseDist:0,
    phaseSpeed:0,
    phaseInter:0,
    phaseTime:0,
    
init: function() {
    
ig.input.bind( ig.KEY.A, 'flipX' );
ig.input.bind( ig.KEY.D, 'flipY' );
      
    //	ig.system.tickRate = 25;
    
     if (ig.ua.mobile === true)ig.game.prefMode=true;
    
            this.aviIns = new Image(120,120);
 
    
     (ig.system.scale==2 )?(  this.scrollImg1= new Image(125,500)):( this.scrollImg1 = new Image(250,1000));
     (ig.system.scale==2 )?(   this.plotImg1=new Image(125,100)):( this.plotImg1= new Image(250,200));
    
           
    this.animEvent= new ig.Animation( this.animSheet, .2, [0,1] );
  
    this.animEvent.x=0;
    this.animEvent.y=0;
   
    this.animEvent.mvx=0;
    this.animEvent.mvy=0;
    
    this.animEvent.isMoving=false;
    
    
    
        this.animEvent2= new ig.Animation( this.animSheet2, .2, [0,1] );
  
    this.animEvent2.x=0;
    this.animEvent2.y=0;
   
    this.animEvent2.mvx=0;
    this.animEvent2.mvy=0;
    
    this.animEvent2.isMoving=false;
//    this.animEvent.moveAnim= function (x,y,rate) {
//        
//        var prev= {x:0,y:0};
//
//        
//     if(prev.x==0){prev.x= ig.game.animEvent.x;}
//      if(prev.y==0){prev.y=ig.game.animEvent.y;}
//        
//             if( ig.game.animEvent.mvx==0){ig.game.animEvent.mvx= ig.game.animEvent.x;}
//      if(ig.game.animEvent.mvy==0){ig.game.animEvent.mvy=ig.game.animEvent.y;}
//        
//        
//        var distance = Math.sqrt(Math.pow(x-prev.x,2)+Math.pow(y-prev.y,2));
//   
//        var directionX= (x-ig.game.animEvent.x)/distance;
//        var directionY= (y-ig.game.animEvent.y)/distance;
//        
//        
//
//
//        if(Math.sqrt(Math.pow(ig.game.animEvent.mvx-prev.x,2)+Math.pow(ig.game.animEvent.mvy-prev.y,2)) >=distance   )
//        { 
//    
//         return;
//        }else{
//                ig.game.animEvent.mvx+= directionX*rate;
//  ig.game.animEvent.mvy+= directionY*rate;
//            
//ig.system.context.save();
//ig.system.context.translate(  ig.game.animEvent.mvx, ig.game.animEvent.mvy);
//ig.game.animEvent.draw(ig.game.animEvent.mvx, ig.game.animEvent.mvy);   
//ig.system.context.restore();
//              //ig.game.animEvent.moveAnim(x,y,1);
//        }
//        
//        console.log( ig.game.animEvent.mvx);
//        
//        
//        
//    };
//    
    this.cmd=[
        
        [ 
     
    //  ["moveTo",120,-2000,200],
          
            //   ["none"], 
            
["drawAnim",this.animSheet,60,200,.2,[0]],
["callOut",120,150,"Hello there! My name  is Pr.Widdly. Welcome  to Monsters from the   Sky Beta",22],   
["callOut",120,100,"",15,true],
            
["drawAnim",this.animSheet,60,200,.2,[1]],
["callOut",120,150,"I hadnt had the time to make a in-game  tutorial, so I recommend reviewing it on the webpage if needed ",22],  
["callOut",120,100,"",15,true],
            
          ["drawAnim",this.animSheet,60,200,.2,[2],this.animSheet2,160,260,.1,[0]],
             ["callOut",150,270,"LIES HE'S A LAZY BUM.",20],
                ["callOut",120,100,"",15,true],         
            
                         ["drawAnim",this.animSheet,60,200,.2,[4]],
  ["callOut",120,150,"...anyways",20],
              ["callOut",120,100,"",15,true],
             
            
["drawAnim",this.animSheet,60,200,.2,[2]],
["callOut",120,150,"There is an options menu on the left corner if you wish to turn music off or if the gameplay is slow",22],  
["callOut",120,100,"",15,true],     
            
            
["drawAnim",this.animSheet,60,200,.2,[0]],
["callOut",120,150,"Okay lets get to it then! I hope you enjoy it.",20],
["callOut",120,100,"end",15,true],
            
                ["end"],  
            //263   
           // ["moveTo",120,-1800,50], 
  ["none"], 
                ["moveTo",120,-1900,50], 
            
            
            ["callOut",50,150," BWAH HA HA HA YOU'LL NEVER PENITRATE MY FORCE FEILD.",27],
            
                       ["drawAnim",this.animSheet,60,200,.2,[2]],
  ["callOut",120,150,"This guy is a Boss it looks like he has a protective barrier we'll have to try somthing else.",20],
  ["callOut",120,150,"Seems like the jewerly hes wearing is responsible for his sheild generator we should try hitting those ",20],
       ["callOut",120,100,"end",15,true],       
              ["drawAnim",this.animSheet,60,200,.2,[2],this.animSheet2,160,260,.1,[0]],
             ["callOut",150,270,"YEAH HIT HIM IN THE JEWELS!.",20],
                ["callOut",120,100,"",15,true],     
            
             ["drawAnim",this.animSheet,60,200,.2,[3]],
  ["callOut",120,150,"...",20],
              ["callOut",120,100,"",15,true],
                ["end"],  
            
             
            // ["moveTo",120,-1900,50], 
             ["none"], 
            ["callOut",50,150,"MY PRESIOUS JEWELS!!",27],

            ["killBoss"],
            ["end"],         ["none"], 
            // ["moveTo",120,-1900,50], 
            
            

                
            
    ]
    
    
    ]
  
    
      this.aviIns.src='media/avimg2.png'; 
      (ig.system.scale==2 )?(this.scrollImg1.src='media/scroll.png'):(this.scrollImg1.src='media/scroll2.png');  
    (ig.system.scale==2 )?(this.plotImg1.src='media/plot.png'):(this.plotImg1.src='media/plot2.png');  
    
    this.bumperImg.src='media/bumper.png';
    
    
  this.loadLevel(LevelTestlvl);
 this.lvlMap = ig.game.backgroundMaps[0];
this.gameMode = storage.getInt('gameMode');
      
//need to implement for fixed-tick plugin    
this.aTick=ig.system.tick//.04
this.gRate=this.gravity*ig.game.aTick
/////    

this.gameDimesion.tilesize = ig.game.backgroundMaps[0].tilesize
this.gameDimesion.xLevel = ig.system.width;// (ig.game.backgroundMaps[0].width * this.gameDimesion.tilesize)
this.gameDimesion.yLevel = ig.system.height;// ig.game.backgroundMaps[0].height * this.gameDimesion.tilesize
this.gameDimesion.fstSec =(this.gameDimesion.xLevel/3)/2
this.gameDimesion.sndSec =(this.gameDimesion.xLevel/2)
this.gameDimesion.thrSec =(this.gameDimesion.xLevel)-this.gameDimesion.fstSec

this.gameDimesion.ground = 1250;
 
    this.scrollT= new ig.Timer();
    this.startstop = new ig.Timer();
    this.fxTime=new ig.Timer();
    this.phaseInter=new ig.Timer();
    
      ig.game.startstop.pause();
    this.phaseInter.pause();
 //ig.system.tickRate=25 //need to fix code for this implementation 
 
this.sData.length =200;// new Array(480) sdata meaning stationary data (now realtime data/hybrid)
for (i=0;i<this.sData.length;i++){
   
    var sPos = new Object(); 
    var upper= ig.game;
 sPos.posX = 0
 sPos.posY = 0
 sPos.velX =0
 sPos.velY =0
    
sPos.posY2=0
sPos.velY2=0
    
 sPos.posY3=0
sPos.velY3=0
    
 sPos.invsX=false
 sPos.invsY=false
 sPos.invsVel=false
 sPos.xBouy=0
 sPos.yBouy=0
 //sPos.xBouy=0
 //sPos.collH= false
 //sPos.collV= false

 sPos.comColl= false //collides with isolated compoenet
 
 
 sPos.indexOf = i; 
    
   
 
     sPos.Fn = {    //JUST FUCKING BEAUTIFULL IT MUCH MORE RESPONSIVE NOW>>>>>>> :D 
         //implement collision type specifically for component collision
        
         
//         boostV: function(){
//            
//             upper.loadedBallType.vel.x*=1.5 
//             upper.loadedBallType.vel.y*=1.5
//       //          upper.sData[i].posX =upper.sData[i-1].posX-(upper.sData[i].velX*-ig.game.aTick)
//   // upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*ig.game.aTick)
//         },
//         
         
         
         
      invsX : function (i){

          
         //defualting parameter e = e || 'default';
         if  (i > 0){
             
          
                if ( upper.sData[i].invsX===false && upper.sData[i].comColl===false){
                   
                    
                 
                 
//                    upper.sData[i].velY = upper.sData[i-1].velY-upper.gRate;    
//                    upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*upper.aTick);
//                    
//                    upper.sData[i].velX=(upper.sData[i].velX)*-upper.loadedBallType.bounciness;
////                    
                       
                     //     upper.sData[i].velY = upper.sData[i-1].velY;//-upper.gRate;    
                //    upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*upper.aTick);
                    
                              upper.sData[i].velX=(upper.sData[i].velX)*-upper.loadedBallType.bounciness;
                 //   upper.sData[i].posX =upper.sData[i-2].posX-(upper.sData[i-1].velX*-upper.aTick);
          
                    //-(upper.sData[i].velX*-upper.aTick);

     
//                        upper.sData[i].velX=(upper.sData[i-1].velX)*-(upper.loadedBallType.bounciness);
//                    
//                        upper.sData[i].velY = upper.sData[i-2].velY-upper.gRate
//   upper.sData[i].posY =  upper.sData[i-2].posY-(upper.sData[i-1].velY*upper.aTick)
//                    
                    
                  //        upper.sData[i].velY = upper.sData[i-1].velY-upper.gRate; 
            
//                      upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*ig.game.aTick)
//                    upper.sData[i].velY = upper.sData[i-1].velY-ig.game.gRate    
//                    
//                   
//                    upper.sData[i].velX=(upper.sData[i-1].velX)*-upper.loadedBallType.bounciness
               //  upper.sData[i].posX =upper.sData[i-1].posX-(upper.sData[i].velX*-ig.game.aTick)
                    /*
                    
                    misscalcuation when a node[1] is inversed deriving from three walls inverses
                    and then affected by an node[0] inverse 
                    - x is solved too early
                    
                    */
                    
                    
                    /*
                    miscalcuation when a node[0] is inversed into the wall it derived from and
                    the node[1] is plotted after the second bounce off 
                    
                    -y step too late or x step too early
                    
                    -POSSIBLILITY OF VINVERSION OFFSET INTENSITY!!!!
                    
                    */
                    
                    
                    
                    
        /*            
                              upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*ig.game.aTick)  
            upper.sData[i].velX=(upper.sData[i-2].velX)*-upper.loadedBallType.bounciness
            
            works when a upmost node is affected by previous node before hitting wall
            however does not work if one node is inversed after hitting wall
            resulting
            the col.y is solved a step too early
            
               */     
                    
                    }
             
             if (upper.sData[i].invsX===true ){
                 
                 
//                        upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*upper.aTick);
//                        upper.sData[i].velX=(upper.sData[i-1].velX)*-(upper.loadedBallType.bounciness);
//                        upper.sData[i].velY = upper.sData[i-1].velY-upper.gRate;
//                        upper.sData[i].posX =upper.sData[i-1].posX-(upper.sData[i].velX*-upper.aTick);
                        upper.sData[i].velY = upper.sData[i-1].velY-upper.gRate;    
                    upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*upper.aTick);
                    
                              upper.sData[i].velX=(upper.sData[i-1].velX)*-upper.loadedBallType.bounciness;
                 
      }
         
                 if ( upper.sData[i].comColl===true){
                   // upper.sData[i].velX=(upper.sData[i-1].velX)*-upper.loadedBallType.bounciness
                    upper.sData[i].velX=(upper.sData[i-1].velX)*-upper.loadedBallType.bounciness//-ig.game.gRate
                     upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*upper.aTick)
                    //upper.sData[i].posY =  upper.sData[i-1].posY//-(upper.sData[i].velY*ig.game.aTick)
                  //   upper.sData[i].comColl=false
                    }
         
         }
//             
//             return console.log("gulp");
             
         },
         
      invsY: function (i){ 
         //defualting parameter e = e || 'default';
        if  (i > 0){
                if ( upper.sData[i].invsY===false &&  upper.sData[i].comColl===false){
                upper.sData[i].posX =  upper.sData[i-1].posX//-(upper.sData[i].velX*-ig.game.aTick)
                upper.sData[i].velX=   upper.sData[i-1].velX 
                upper.sData[i].velY = (upper.sData[i-1].velY)*-upper.loadedBallType.bounciness
                }
            if (upper.sData[i].invsY===true ) {
              upper.sData[i].velY = (upper.sData[i-1].velY*-(upper.loadedBallType.bounciness))-upper.gRate
              upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*upper.aTick)
              upper.sData[i].posX =  upper.sData[i-1].posX-(upper.sData[i-1].velX*-upper.aTick)// fixes the trajecotry pathway after unfreeze but disloges on inverse when node is strained from border collision
      }
        
        
        
        
                  if ( upper.sData[i].comColl===true){
                   // upper.sData[i].velX=(upper.sData[i-1].velX)*-upper.loadedBallType.bounciness
                    upper.sData[i].velY = (upper.sData[i-1].velY-ig.game.gRate)*-upper.loadedBallType.bounciness//-ig.game.gRate
                    upper.sData[i].posX =upper.sData[i-1].posX-(upper.sData[i].velX*-upper.aTick)
                    upper.sData[i].posY =  upper.sData[i-1].posY//-(upper.sData[i].velY*ig.game.aTick)
                    // upper.sData[i].comColl=false
                    }
         
        
        
        }
        },
          
      invsVel: function(i,xBouy,yBouy) {    
          
          
                  
            
           

//                    
          
                     //  upper.sData[i].posY= upper.sData[i-1].posY-(upper.sData[i].velY*upper.aTick) ; 
                       
//                         upper.sData[i].velX= (upper.sData[i-1].velX)*-(upper.sData[i].xBouy)
//            upper.sData[i].velY= (upper.sData[i-1].velY*-(upper.sData[i].yBouy))-this.gRate
                       
//                   upper.sData[i].velX= (upper.sData[i-1].velX)*-(xBouy);
//              upper.sData[i].velY= (upper.sData[i-1].velY*-(yBouy))-upper.gRate;
//                       
                      upper.sData[i].velX= (upper.sData[i-1].velX)*-(xBouy);
              upper.sData[i].velY= (upper.sData[i-1].velY*-(yBouy))-(ig.game.gravity*0.04);
                       
            
    //     upper.sData[i].velX=(upper.sData[i-1].velX)*-(upper.sData[upper.colData[upper.dirInc-1].orderOf].xBouy);
  //      upper.sData[i].velY=(upper.sData[i-1].velY*-(upper.sData[upper.colData[upper.dirInc-1].orderOf].yBouy))-12;
              
           //    upper.sData[i].velX=(upper.sData[i-1].velX)*-(upper.colData[upper.dirInc].xBouy);
             //  upper.sData[i].velY=((upper.sData[i-1].velY)*-(upper.colData[upper.dirInc].yBouy))-12;
              
              
//              upper.sData[i].posX= upper.sData[i-1].posX-(upper.sData[i].velX*-upper.aTick);
//              upper.sData[i].posY= upper.sData[i-1].posY-(upper.sData[i].velY*upper.aTick);

                 upper.sData[i].posX= upper.sData[i-1].posX-(upper.sData[i].velX*-0.04);
              upper.sData[i].posY= upper.sData[i-1].posY-(upper.sData[i].velY*0.04); 
           
               //  upper.sData[i].velY= (upper.sData[i-1].velY*-(yBouy))-upper.gRate;
              
            
              
                       //   ((upper.sData[i-1].velX)*-(upper.loadedBallType.bounciness*upper.sData[i-1].xBouy))==0 ? upper.sData[i].velX=(upper.sData[i-1].velX) : upper.sData[i].velX=(upper.sData[i-1].velX)*-(upper.loadedBallType.bounciness*upper.sData[i-1].xBouy);
             // ((upper.sData[i-1].velY)*-(upper.loadedBallType.bounciness*upper.sData[i-1].yBouy))==0 ? upper.sData[i].velY=(upper.sData[i-1].velY-ig.game.gRate) : upper.sData[i].velY=(upper.sData[i-1].velY)*-(upper.loadedBallType.bounciness*upper.sData[i-1].yBouy);
             
                  
            //  upper.sData[i].velX= (upper.sData[i-1].velX)*-(upper.loadedBallType.bounciness*upper.sData[i-1].xBouy)
            //  upper.sData[i].velY= (upper.sData[i-1].velY*-(upper.loadedBallType.bounciness*upper.sData[i-1].yBouy))-ig.game.gRate
            
                  
                  
                ///VVV have extra pos.y on top to keep calibaration  
                  
                        //    upper.sData[i].posY= upper.sData[i-1].posY-(upper.sData[i].velY*ig.game.aTick) 
                  
//                  upper.sData[i].velY= ((upper.sData[i-2].velY-(ig.game.gRate))*-(upper.sData[i-1].yBouy))
//            
//                        upper.sData[i].posY= upper.sData[i-1].posY-(upper.sData[i].velY*ig.game.aTick) 
//                       upper.sData[i].posX= upper.sData[i-1].posX-(upper.sData[i].velX*-ig.game.aTick)
//                       
//                       upper.sData[i].velX= (upper.sData[i-1].velX)*-(upper.sData[i-1].xBouy)        
                  
          /*
                       upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*ig.game.aTick)
                        upper.sData[i].velX=(upper.sData[i-1].velX)*-(upper.loadedBallType.bounciness)
                        upper.sData[i].velY = upper.sData[i-1].velY-ig.game.gRate
                        upper.sData[i].posX =upper.sData[i-1].posX-(upper.sData[i].velX*-ig.game.aTick)
          
          
          */
          
          
          
          
          
        //  upper.sData[i].posY= upper.sData[i-1].posY-(upper.sData[i].velY*ig.game.aTick)
                      
    
              //upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*ig.game.aTick)
              //upper.sData[i].posX =  upper.sData[i-1].posX-(upper.sData[i-1].velX*-ig.game.aTick)// fixes the trajecotry pathw
              
              
              /*
              \
               upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*ig.game.aTick)
                        upper.sData[i].velX=(upper.sData[i-1].velX)*-(upper.loadedBallType.bounciness)
                        upper.sData[i].velY = upper.sData[i-1].velY-ig.game.gRate
                        upper.sData[i].posX =upper.sData[i-1].posX-(upper.sData[i].velX*-ig.game.aTick)
              
              
              */
              
              
              
            
            
            
         
     },
         
        trace: function(i){
               
//   
            
            //            
//    upper.sData[i].velX = upper.sData[i-1].velX        
//    upper.sData[i].velY = upper.sData[i-1].velY-upper.gRate; 
//    upper.sData[i].posX =upper.sData[i-1].posX-(upper.sData[i].velX*-upper.aTick);
//    upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*upper.aTick);
//  
            
            
            
   
//    upper.sData[i].velX = upper.sData[i-1].velX        
//    upper.sData[i].velY = upper.sData[i-1].velY-upper.gRate
//    upper.sData[i].posX =upper.sData[i-1].posX-(upper.sData[i].velX*-upper.aTick)
//    upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*upper.aTick)
//      if(ig.system.tick == 0.04){       
//            
//            
    upper.sData[i].velX = upper.sData[i-1].velX        
    upper.sData[i].velY = upper.sData[i-1].velY-(ig.game.gravity*0.04); 
    upper.sData[i].posX =upper.sData[i-1].posX-(upper.sData[i].velX*-0.04);
    upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*0.04);
////  
//            
//            
//              }else{
//                      upper.sData[i].velX = upper.sData[i-1].velX        
//    upper.sData[i].velY = upper.sData[i-1].velY-(ig.game.gravity*0.01); 
//    upper.sData[i].posX =upper.sData[i-1].posX-(upper.sData[i].velX*-0.01);
//    upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*0.01);
//                  
//              }
            

upper.sData[i].velY2=upper.sData[i-1].velY2-(300*0.02);
upper.sData[i].posY2=  upper.sData[i-1].posY2-(upper.sData[i].velY2*0.02);
      
            
upper.sData[i].velY3=upper.sData[i-1].velY3-(300*0.01);            
 upper.sData[i].posY3=upper.sData[i-1].posY3-(upper.sData[i].velY3*0.01);

            
            
            
            //    }
            
            
            
            
            
//                if(ig.system.tick == 0.02){      
//    upper.sData[i].velX = upper.sData[i-1].velX        
//    upper.sData[i].velY = upper.sData[i-1].velY-300*0.02
//    upper.sData[i].posX =upper.sData[i-1].posX-(upper.sData[i].velX*-0.02)
//    upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*0.02)
//    }
             //upper.sData[i].comColl=false
             
             
             
         } 
     }///////////////// this.sData.Fn.invsX(i)

     //881.0653934691719

     ///issue with plotting when plot inverse before another and at a wall ??
     //speed?? pause?? 
     
     
     
     
    this.sData[i]=sPos
}
    
this.colData.length=20;//5
for (i=0;i<this.colData.length;i++){
    var sPos = new Object(); 
 sPos.posX = 0
 sPos.posY = 0
 sPos.posY2 = 0
 sPos.posY3 = 0  
 sPos.invsX= false
 sPos.invsY= false
 sPos.invVel=false
 sPos.xBouy=0
 sPos.yBouy=0 
 sPos.orderOf=null// priority to the point nearest to "FUTURE POSITION" projectile 
    this.colData[i]=sPos
}

    /*
    ORGANIZE colData points by the closest to projectile X,Y
    preventing the usage of for loops, instead do things in 
    a orderly fashion since projectile is going through the 
    them anyhow.
    * this cannot be achieved using mere distance formula 
    it would disregared all points previous to the one 
    being check 
    *Therefore I\ll use a reference indexOf from sData 
    to better determine "which point would be closet in reference
    to the its future postion rather than actual distance"
    *colData.orderOf priority will be determined by the 
    -number of colData points
    -the least sData indexOf reference 
    *Means of Ordering the collision 
        -rearrange the array indexes of colData
        -create a formula to create distinctions for which
        can be proceeded convienently 
        
        variables-
        a= sPos.indexOf
        b= numOf_colData or number of variables(a)
        c= (a(1)-a(2))/b >>e.g. where b =2  
        
        points.sort(function(a, b){return a-b});
        
    <<switching values with XOR
    
    I need better iterations on array properties 
    sData indexes need to keep checking for collision 
    but in such a way that isnt obscure and highly obtuse
    
    
    *the sData X,Y properites need to check on the colData points 
    and be able to determine the type of collision, 
    *
    for (var prop in arr){}
    
    for (const color of colors) << returns items of the array
    for (const colorIndex in colors) << retruns indexes of the array
    
    continuously update array colData when new point is manipulated  
    
    orderOf[] orders index value of sData to be used as alias for indexes of colData 
    
    .forEach(function(index){}
    
    check preceeding invertedX node!!!
    
    Issue ->> when plotting an inverse before another it disloges the sData from the colData position
 
 - keep track of the preceeding inverse by taking notice when the selection is before the higher colData
  then manipulate the higher colData based on the recent lowest installment of inverse plot  
 - rebuild the colData starting from the closest index *** 
 - reconfigure the process for which sData interprets an inverse (get rid of variable dependency and use calls to functions?)
 and use a different method of collision
 
 
 >enchance the ordering of colData making it more independent verbose 
    
    */
    
    
    
    

this.rSpawnManagement=[//203
    
////    [["EntityMonster0",59,3,1] ],  //round1 59
    
 //   [["EntityMonster0",65,3,1] ],  
    [["EntityMonster0",71,3,1] ],  
    ["BOSS"] ,  
  ["end"]
]

    

    
this.comboReset = new ig.Timer();
this.syncTime = new ig.Timer();    
this.tDelay=new ig.Timer();
     
this.yScroll = 0;
this.stats.points = storage.getInt('points');

//storage.get('round') == 0 ? this.roundNum = 0: this.roundNum = storage.getInt('round')  ;
this.roundNum = 0;
this.enemyArchive = new Array(200)
this.componentArchive = new Array(16)
this.componentArchive2 = new Array(8)

   
                                ig.game.syncTime.pause()

//DETERMINISTIC TRAJECTORY INVERSION DATA MANAGEMENT 

    
// ROUND SPAWN MANAGEMENT Manual Implementation
	
//PARAMETER array depth [rounds][eSpecies][spawnMgr] >> 
//[rounds [eSpecies  [enemy, numTotal,eDeduction,eAdhesion,spawnZoneMax,spawnZoneMin] ] ]

this.rGoalManagement= [5000,5250,5500,6000 ]


ig.input.bind(ig.KEY.MOUSE1, 'click');



  this.scrollT.pause();
    
    
    this.bumpTfx=new ig.Timer();
    this.bumpTfx.pause();

	},

////////////////////////////////////////////////////////////////////////////////////////////////        
update: function() {
    
this.aTick=ig.system.tick;
   this.gRate=this.gravity*this.aTick; 

    
    //-12061.125878592204  
    
    //-12066.702704408559
//195 -12065.589530224912
  //-12065.589530224912
    
    
   this.parent();
storage.set('gameMode',0)


//at very beginning
if (this.intro==true)   ig.game.gameMode=4;//introduction
//if (this.rSpawnManagement[this.roundNum][0]=="BOSS") ig.game.gameMode=4//the Boss event
    
    

//ig.game.gameMode = 1;
ig.game.newRound = true

    
//if (this.gameMode == 1){
//
//   if  (ig.game.loadedBallType.vel.y === 0) ig.game.syncTime.unpause();
//      if  (ig.game.loadedBallType.vel.y != 0) ig.game.syncTime.pause();
//    
//if (ig.game.syncTime.delta() > 10 ) {
//
////have variable flag entity when to hover down
////    for(i =0; i <= ig.game.enemyArchive.length; i++){
////		if (typeof ig.game.getEntityByID(ig.game.enemyArchive[i])!= 'undefined' && ig.game.getEntityByID(ig.game.enemyArchive[i]).hoverDwn== false )
////            { ig.game.getEntityByID(ig.game.enemyArchive[i]).hoverDwn = true}
////            else {ig.game.syncTime.reset();}
////            }
//       //
//    
//  
//}
//}
    

    
    if(this.gameMode == 0 && this.totalMonsters==0){
        
        
for  (i =0 ; i < this.rSpawnManagement[this.roundNum].length; i++ ){
this.totalMonsters+=(this.rSpawnManagement[this.roundNum][i][1]);
    }
    
    }
   if ( this.gameMode == 1 )
    {this.totalMonsters=0;}

    
    
//    if (this.rSpawnManagement[this.roundNum][0]=="BOSS" && this.countEnemy ==0 && this.bossKill==false){
//         console.log("here")
//        this.RoundUpdas();
//        console.log("here")
//        this.wave=2;this.index++;//this.orderCall+=1 
//        this.gameMode=4; 
//    }
    
    if (this.comboReset.delta() > 0 ){this.comboCount =1;this.comboReset.reset();this.comboReset.pause(); }

    if (this.gameMode == 1 && this.countEnemy < 1 && this.wave < 2 ) {
        
      
      //    console.log("here")
        this.wave++;this.RoundUpdas();storage.set('points', this.stats.points );
        
        
    
    }

    

    if (this.wave === 2 && this.countEnemy < 1 ){	  ig.game.gameMode=0;
	   storage.set('points', this.stats.points );
	   storage.set('gameMode', 0)
	   storage.set('round', this.roundNum+=1)
 
    this.wave=0;
    this.RoundUpdas();
                                                 
    	ig.game.spawnEntity("EntityBall", ig.game.getEntitiesByType(EntitySling)[0].pos.x, 1000);
               
                    ig.game.loadedBallType.kill();
                 ig.game.plotter.select=0;
    }

    
    
    
    
//Pelimiary Calcuation of Zero Velocity Projectile begin 
    
    //ig.game.gameDimesion.xLevel
    
var inTime,vRate,hRate,maxV,curPos,curVel,solPos,base,invCase,reflector,
    collides, wall,size,ghost,segDis,ax,ay,bx,by; 

 
///console.log(ig.game.loadedBallType.hold)
    

     
curVel= {x:0,y:0};    
curPos= {x:0,y:0};  //current
solPos= {x:0,y:0};  //solved
maxV= {x:0,y:0};
base = 0;    

    
    
    
    
    
        

    
    //MERGE STARTSTOP AND FREEZE FUNCTIONALITY
//    
// if  (ig.game.startstop.delta().round(2) > 0.04 )
//  {
//       ig.game.loadedBallType.freeze = true;
//      
//      
//         if  (ig.game.startstop.delta().round(2) > 1.0 && ig.input.state('click')){
//             ig.game.loadedBallType.freeze=false; ig.game.startstop.reset();
//      ig.game.startstop.pause();      ig.game.metamode= false
//         }
//      
//      
//      if (ig.game.startstop.delta().round(2) < 1.0) {//ig.game.loadedBallType.freeze = true;
//     
//      if (ig.input.released('click')){
// 
//       ig.game.loadedBallType.freeze = true;
//    
//      ig.game.startstop.reset();
//      ig.game.startstop.pause();
//      
//         }}
//      
//  
//  }
//    
//    
//    
//    if (      ig.game.loadedBallType.freeze === false && ig.game.startstop.delta().round(2) >0 ){
//        ig.game.loadedBallType.freeze = true;
//       
//    }
    
    
    
        

       //ig.game.loadedBallType.freeze = true;
      
    
  //  touching
       
    
    //SAVE FOR LATER <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\
    
//     if (ig.ua.mobile === false){
//         if  ( ig.input.state('click') &&
//              ig.gui.element.action('getByName','freeze').within || 
//              ig.input.state('click') && ig.gui.element.action('getByName','freeze').active &&  ig.gui.element.action('getByName','freeze').within ){
//             ig.game.startstop.unpause();  
//             
//             if (ig.game.startstop.delta().round(2) > 1.0){
//             
//             ig.game.loadedBallType.freeze=false; //ig.game.startstop.reset();
//                 ig.game.startStop===false; ig.game.startstop.pause();  
//            ig.game.metamode= false;
//             }
//             
//         }
//      
//
//      if (ig.input.released('click') &&  
//          ig.game.startStop===true  &&
//          ig.game.startstop.delta().round(2)  > 0.04  && 
//          ig.game.startstop.delta().round(2) < 1.0 && 
//          ig.gui.element.action('getByName','freeze').within){
// 
//       ig.game.loadedBallType.freeze = false;
//  
//      ig.game.startstop.reset();     ig.game.startStop=false;   
//
//         }
//      
//    
//   if  (ig.game.startstop.delta().round(2) > 0.04 &&    ig.game.startstop.delta().round(2) < 1.0  &&
//        ig.input.state('click')==false && 
//        ig.gui.element.action('getByName','freeze').within  ){  
//         ig.gui.element.action('getByName','freeze').active=true;
//       ig.game.loadedBallType.freeze = true;  
//       ig.game.startStop=true 
//  }
//    
//    if ( ig.game.loadedBallType.freeze === true && 
//        ig.input.state('click')==false && 
//        ig.gui.element.action('getByName','freeze').within){
//        
//        ig.game.startstop.pause();            }
//         
//     }else{
//         
//  
//         
//         
//         
//         
//         
//         
//         
//         if (         ig.gui.element.action('getByName','freeze').active){
//             
//               ig.game.loadedBallType.freeze = true;  
//             
//             if (ig.game.startstop.delta().round(2) == 0.04)ig.game.startstop.pause();     
//             
//         }
//         
//         
//         if(ig.game.touching && ig.game.startstop.delta().round(2) == 0.04 &&  ig.gui.element.action('getByName','freeze').within)ig.game.startStop=true;
//         
//   
//         
//         if (ig.game.startStop==true && !ig.game.touching){ ig.game.loadedBallType.freeze = false; ig.game.startStop=false;}
//         
//         
//         
//         
//         
//         
//         
//         
//         
//         
//         
//     }
    
 ////////////<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
   
    
    
    
      


 if  (ig.game.startstop.delta().round(2) > this.aTick)
  {
      ig.game.loadedBallType.freeze = true;
    
            ig.game.startstop.reset();
      ig.game.startstop.pause();
  
  }





//ball is launched      
    maxV.y  = ig.game.getEntitiesByType(EntitySling)[0].maxVelocity
    maxV.x  =ig.game.getEntitiesByType(EntitySling)[0].maxVelocityX

    solPos.x = ig.game.getEntitiesByType(EntitySling)[0].prePositionX
    solPos.y = ig.game.getEntitiesByType(EntitySling)[0].prePositionY
    
//when ball is suspened      
    curPos.x = ig.game.loadedBallType.pos.x
    curPos.y = ig.game.loadedBallType.pos.y

    curVel.x=ig.game.loadedBallType.vel.x
    curVel.y=ig.game.loadedBallType.vel.y
  
       hRate = 5*(ig.game.loadedBallType.phyTime);
       vRate =(300*ig.game.loadedBallType.phyTime);

    
// Stationary solving

if (ig.game.loadedBallType.vel.y===0 ){
    
 this.sData[0].velY = maxV.y ;
 this.sData[0].velY2 = maxV.y ;
 this.sData[0].velY3 = maxV.y ;
 this.sData[0].velX = maxV.x ;     
  this.sData[0].posY = solPos.y
  this.sData[0].posY2 = solPos.y
  this.sData[0].posY3 = solPos.y
  this.sData[0].posX = solPos.x - ig.game.loadedBallType.parOffset.x;     
    this.sData[1].velX= this.sData[0].velX 
    this.sData[1].velY = maxV.y - (ig.game.gravity*0.04);
    this.sData[1].velY2 = maxV.y - (ig.game.gravity*0.02);
    this.sData[1].velY3 = maxV.y - (ig.game.gravity*0.01);
    this.sData[1].posX =  this.sData[0].posX+(this.sData[0].velX*0.04)
    this.sData[1].posY =  this.sData[0].posY+(-this.sData[0].velY*0.04)   
    this.sData[1].posY2 =  this.sData[0].posY2+(-this.sData[0].velY2*0.02)   
    this.sData[1].posY3 =  this.sData[0].posY3+(-this.sData[0].velY3*0.01)   
} else
// Realtime solving    
    {
    this.sData[0].velX=      curVel.x;
    this.sData[0].velY =    -curVel.y;
            this.sData[0].velY2 =    -curVel.y;
            this.sData[0].velY3 =    -curVel.y;
    this.sData[0].posX =   curPos.x; 
    this.sData[0].posY =   curPos.y; 
    this.sData[0].posY2 =   curPos.y; 
    this.sData[0].posY3 =   curPos.y; 

    this.sData[1].velX=      curVel.x;
    this.sData[1].velY =    -curVel.y;
                 this.sData[1].velY2 =    -curVel.y;
            this.sData[1].velY3 =    -curVel.y;
        
    this.sData[1].posX =   curPos.x; 
    this.sData[1].posY =   curPos.y;
    
        this.sData[1].posY2 =   curPos.y; 
    this.sData[1].posY3 =   curPos.y; 

    }
//    
    
    
    var ax,ay,bx,by,cx,cy,segDis,segDis2       

    
 /*
 DEPRECATED THE (2-d) DISTANCE EQUATION 
 the 2-d distance equation of x & y seems more buggish than 
 the 1-d distance x & x.
 
 */   



if (this.plotter.select !=0 ){
 this.plotter.x = this.sData[this.plotter.select].posX
 this.plotter.y = this.sData[this.plotter.select].posY
} else 
{ this.plotter.x = this.sData[this.itrackBall].posX
 this.plotter.y = this.sData[this.itrackBall].posY
    
    
}
    
    //ig.game.getEntitiesByType(EntityBall)[0]
    var testC;
    testC = this.getEntitiesByType(EntityPlatform)[0];
    testC2 = this.getEntitiesByType(EntityPlatform)[1];
 //   function At(){return console.log("gulp")}
    
    
/*
pre-cache preformance optimization unrolled loop investigation


article response: 

 If you get a stall because you have a cache-miss on the data-array the cpu cannot do anything but to wait.
On the other hand this code:

for (int i=0; i<n; i+=4)
{
  sum1 += data[i+0];
  sum2 += data[i+1];
  sum3 += data[i+2];
  sum4 += data[i+3];
}
sum = sum1 + sum2 + sum3 + sum4;
could run faster. If you get a cache miss or other stall in one calculation there are still three other dependency chains that don't depend on the stall. A out of order CPU can execute these.




*/    
    

    for(i=2, length =this.sData.length ; i< length; i++)//length cus you know pre-cache helps
     { 
         
 
 //this.sData[50].test= new At();
offset = ig.game.loadedBallType.size.x          
 
 this.sData[i].Fn.trace(i);
         
         
         this.BorderChecks(0,ig.game.gameDimesion.xLevel,null,null,i,3) // (bxOne,bxTwo,byOne,byTwo,i)
         this.BorderChecks(null,null,this.gameDimesion.ground,null,i,4)
   
         
                   
         
                     for (j=0,temp =0 ,len=ig.game.dirInc+1;j<len;j++)
                      {//better! room for improvment though len=this.colData.length


                          
                          
                            if (this.colData[j].orderOf !== null  &&  ig.game.loadedBallType.freeze === true
                                   ){ 
                                    
                       
////                                                       
                                    temp=this.colData[j].orderOf;
                                    this.colData[j].posX =this.sData[temp].posX;
                                    this.colData[j].posY =this.sData[temp].posY;
                                this.colData[j].posY2 =this.sData[temp].posY2;
                                 this.colData[j].posY3 =this.sData[temp].posY3;
                                
                              if (this.colData[j].invsVel == true){
                                this.colData[j].xBouy = this.sData[temp].xBouy;
                                this.colData[j].yBouy = this.sData[temp].yBouy;

                              }

//                                  
                                    }
//                          

         
                          
                          
                             this.sData[i].invsY = (
                              1+(this.sData[i-1].posX+this.sData[i-1].posY).round(4) === 
                                (this.colData[j].posX +this.colData[j].posY).round(4)+this.colData[j].invsY)
                                  
//                               
                          if (this.sData[i].invsY) break;
          
//                             this.sData[i].invsX = (
//                              1+(  this.sData[i-1].posX+this.sData[i-1].posY).round(4) === 
//                                (this.colData[j].posX +this.colData[j].posY).round(4)+this.colData[j].invsX) 
//                          
////    
//                             if (this.sData[i].invsX ) break;
                          
                          
           
                          
                          
                          
                          
                          
                          
                          
                                 this.sData[i].invsVel = (
                              1+(  this.sData[i-1].posX+this.sData[i-1].posY).round(4) === 
                                (this.colData[j].posX +this.colData[j].posY).round(4)+this.colData[j].invsVel) ;
                                      
                        
                          
                                  if (this.sData[i].invsVel === true
                                     ){
                                      
                  
                                      
                                      this.sData[i].Fn.invsVel(i, this.colData[j].xBouy, this.colData[j].yBouy)
                                      
           
                                      
                                      break;
                          }

                          
                                 if (this.sData[i].invsVel ) break;
                       
                          
                          
                          
                          
                          
                          
                      }      
         
      if (this.sData[i].invsX===true) {this.sData[i].Fn.invsX(i);                 //  if (  ig.Timer.atick==0.01)ig.game.adapter-=0.045;
             }
      if (this.sData[i].invsY===true) this.sData[i].Fn.invsY(i);

 
 
         this.itrackBall=1;
           if (ig.game.loadedBallType.hold === true)this.sData[i].invsX = false;
           if (ig.game.loadedBallType.hold === true)this.sData[i].invsY = false;
          if (ig.game.loadedBallType.hold === true)this.sData[i].comColl = false;
          // if (ig.game.loadedBallType.hold === true)this.sData[i].invsVel = false;
    }

    
   if ( this.getEntitiesByType( 'EntityPlatform' ) == 0){
       
      
                                                        
                                                        }


    
    
    
    
    //PLAY SOM MUSIC

//   
//    if (ig.game.stopMusic== false){
//    if (ig.game.loadedBallType.vel.y==0){
//        
//        
//           if (window.playing ==false){
//              window.playThis=1;;window.playing =true;
//
//                   audio.play( window.playThis);        
//                           }
//        
//        
//        
//    if (window.playThis==4){ 
//                     audio.stop(window.playThis);
//       window.playThis=1;
//audio.play( window.playThis);
//                 
//             }
//        
//        if (  window.playThis==2){
//            audio.stop(window.playThis);
//       window.playThis=1;
//audio.play( window.playThis);
//        }else{  window.playThis=1;
//             
//
//             
//             }
//        
//        
// //  audio.play(1);
//    }else{
//        
//        if (ig.game.comboCount <= 1){
//        
////audio.stop(window.playThis);
////       window.playThis=2;
////audio.play(  window.playThis);}else{
////    
////    audio.stop(window.playThis);
////       window.playThis=4;
////audio.play(  window.playThis);
//    
//}
//        
//        
//}
//
//
//    if ( ig.game.metamode==true){
//
//          audio.stop(window.playThis);
//        
//        this.musicTrans0.loop=false;
//        
//        if(this.fxPlay == false   ){
//            this.fxTime.unpause();
//         //   this.musicTrans0.play();this.fxPlay=true;
//       
//            //ig.system.context.globalAlpha=0.4
//              //ig.system.context.scale=0.4
//            
//        }
//        
//        if(this.fxTime.delta()>2.5  ){
//       window.playThis=3;
//audio.play(  window.playThis);
//          
//        this.fxTime.pause(); 
//        
//        }
//        
//        
//    }else{this.fxPlay = false;    this.fxTime.set(0);  this.fxTime.pause();}
//  
//    
//    }
//    
//    
    
    

    
    
},

// In your Game
draw: function() {
    // Draw all background maps and entities
    this.parent();
       // this.specialEntity.draw( true );
    var clockwise =true;
    var angle =(90).toRad();
    
    var bumpfx;
    var size=15;
   // bumpfx = 150* this.bumpTfx.delta()
    


    
 //   console.log(bumpfx);
    
  var sin = clockwise ? Math.sin(angle) : Math.sin(-angle), cos = clockwise ? Math.cos (angle) : Math.cos(-angle);
    
    ig.system.context.beginPath()
       ig.system.context.save();
                 ig.system.context.fillStyle="white"   ;    
        
  //  ig.system.context.transform(cos,sin,-sin,cos,0,0)
    
    //ig.system.context.fillRect(0*(ig.system.scale/2),0*(ig.system.scale/2), 640*(ig.system.scale/2), 150*(ig.system.scale/2)); 
   
    //ig.system.context.fillRect(0*(ig.system.scale/2),0*(ig.system.scale/2), 640*(ig.system.scale/2), 150*(ig.system.scale/2)); 
    
   
//    if (ig.game.loadedBallType.hitSide.left == true ||ig.game.loadedBallType.hitSide.right == true ){this.bumpTfx.unpause();                                                    }
//    
    
    if ( this.bumpTfx.delta() !==0 ){
    if(this.bumpTfx.delta() <.6  ){
        
        bumpfx = (Math.sin((20)* this.bumpTfx.delta())).toDeg()
       // bumpfx = this.bumpTfx.delta()*50
  
      if (ig.game.loadedBallType.hitSide.left == true ){
                ig.system.context.fillRect(0*(ig.system.scale/2),0*(ig.system.scale/2), (size-bumpfx)*(ig.system.scale/2), 640*(ig.system.scale/2));}
     if (ig.game.loadedBallType.hitSide.right == true ){
            ig.system.context.fillRect(480*(ig.system.scale/2)-(size-bumpfx),0*(ig.system.scale/2), (size-bumpfx)*(ig.system.scale/2), 640*(ig.system.scale/2));}
    if (ig.game.loadedBallType.hitSide.up == true ){
              ig.system.context.fillRect(0*(ig.system.scale/2),0*(ig.system.scale/2),640*(ig.system.scale/2), (size-bumpfx)*(ig.system.scale/2));
    }
        
    }else{
        this.bumpTfx.reset();
        this.bumpTfx.pause();
        ig.game.loadedBallType.hitSide.left=false;
        ig.game.loadedBallType.hitSide.right=false;
        ig.game.loadedBallType.hitSide.up=false;
    }}
    
    
    
    
 
 
     // ig.system.context.fillRect(0*(ig.system.scale/2),640*(ig.system.scale/2)-(size-bumpfx),640*(ig.system.scale/2), (size-bumpfx)*(ig.system.scale/2));
    
    
    
       // console.log(this.bumpTfx.delta());
       //   bumpfx = (Math.sin((55)* this.bumpTfx.delta())).toDeg()
    
    
//        ig.system.context.fillRect(0*(ig.system.scale/2),0*(ig.system.scale/2), (70-bumpfx)*(ig.system.scale/2), 640*(ig.system.scale/2));
//    
//            ig.system.context.fillRect(480*(ig.system.scale/2)-(70+bumpfx),0*(ig.system.scale/2), (70+bumpfx)*(ig.system.scale/2), 640*(ig.system.scale/2));
//    
//             ig.system.context.translate(120*(ig.system.scale/2),75*(ig.system.scale/2));
//    
  //  ig.system.context.setTransform(1, 0, 0, 1, 0, 0);
    
    ig.system.context.restore();
    
    
    
    
      if( this.buttons ) {
            this.buttons.draw(); 
        } 
    
    
           
        if(ig.game.optionMenu==true){   
              ig.system.context.fillStyle="#c04809"   ;    
                   // ig.system.context.fillRect((375*(ig.system.scale/2)),70*(ig.system.scale/2), (img2.width), (img2.height/3)); 
                    ig.system.context.fillRect(0*(ig.system.scale/2),0*(ig.system.scale/2), 640*(ig.system.scale/2), 200*(ig.system.scale/2)); 
   
        }
    
    
   // if (ig.ua.mobile === false)
    if(ig.gui.show ) ig.gui.draw(); 

    
     
        
        
    
    
    
    var pop =(   Math.abs(-1+Math.abs(-1+(2+(ig.game.comboReset.delta()*2))))+1  );//eww gah
   // console.log(pop)
                       
//	ig.game.comboRText.scaleFont = (pop)+(.7);// scale font
//	ig.game.comboBText.scaleFont = (pop)+(.7);// scale font
	ig.game.comboYText.scaleFont = (pop)+(.7);// scale font
       // ig.Sound.enabled=false;
    

    

    
    

    

if (ig.game.loadedBallType.hit==true && ig.game.loadedBallType.freeze == false  &&    this.tickSwitch==false
   ){     
  // this.tickSwitch=true


}
    
    //console.log(ig.game.comboReset.delta())
    if(ig.game.comboReset.delta()!==0 && ig.game.comboReset.delta()!==-1 )
       ig.game.comboYText.draw(''+(ig.game.comboCount), ig.game.gameDimesion.sndSec, 30, ig.Font.ALIGN.CENTER );
    
    
    
    if(this.tickSwitch===true){
        
           // ig.game.loadedBallType.freeze=true;   ig.game.loadedBallType.freeze=false;
//    if (this.statPos.y==0)this.statPos.y = ig.game.sData[45].posY;
//       if (this.statPos.x==0)this.statPos.x = ig.game.sData[45].posX;
//    if (this.statPos.vX==0)this.statPos.vX = ig.game.sData[45].velX;
//       if (this.statPos.vY==0)this.statPos.vY  = ig.game.sData[45].velY;
    
   // ig.Timer.atick=0.01;
    
  // if(this.adapter==0)this.adapter=-0.135;
   
        
  //this.adapter+=.045;
        
 
        
     
        
 ig.game.phaseInter.unpause();
     
//     if (this.phaseOff.y==0)               {
//        // this.phaseOff.y=(( (ig.game.loadedBallType.vel.y-(300*0.01))*0.01))+.345 ;                        
//// console.log(this.phaseOff.y);
//     }
//                                // this.phaseOff.y=//ig.game.sData[0].posY3-ig.game.loadedBallType.pos.y;
//               
//                                
//     if (this.phaseOff.x==0)      {        
//      this.phaseOff.x=ig.game.loadedBallType.vel.x*0.01; //(ig.game.loadedBallType.pos.x-ig.game.loadedBallType.last.x);
//         
//      //   console.log(this.phaseOff.x);
//     }

   // if (ig.game.prefMode){ig.Timer.atick=.02;}

       // console.log(this.adapter)
        
//               console.log(
//          "ball [x:"+ig.game.loadedBallType.pos.x+" y: "+ig.game.loadedBallType.pos.y +"  sol [x:"+
//                   ((ig.game.colData[ig.game.dirInc-1].posX))
//                  // ((ig.game.colData[ig.game.dirInc-1].posX+ (  (ig.game.colData[ig.game.dirInc-1].posX)-this.pos.x) ) )
//                   
//                   +"  y:"+" |var:"+this.adapter+"| "+
//            
//            
//            (
//                
//             ig.game.colData[ig.game.dirInc-1].posY//+((ig.game.colData[ig.game.dirInc-1].orderOf-1)*.4)
//                //- (  (ig.game.colData[ig.game.dirInc-1].posY)-this.pos.y)
//                ) +"]"
//      
//                 );
//        
//        
        
        //ball [x:103.81755531600766 y: -3470.0813436782178  sol [x:103.81755531600811  y:-3467.201343678217]
  //difference offset =2.88
       // 195 rate per 3
        //65 rate per 1
        
//    console.log(
//                  "ball [x:"+ig.game.loadedBallType.pos.x+" y: "+ig.game.loadedBallType.pos.y )
//            
//        
//        "|| stX: "+this.statPos.x+" | stY:"+(this.statPos.y-ig.game.adapter));
    
//console.log(this.adapter);
    ig.game.comboYText.draw(''+(ig.game.comboCount), ig.game.gameDimesion.sndSec, 30, ig.Font.ALIGN.CENTER );
	
        
//        
//        if(
//            ig.game.loadedBallType.pos.x.round(6)  == this.statPos.x.round(6)  &&
//       ig.game.loadedBallType.pos.y.round(6) == (this.statPos.y-ig.game.adapter).round(6)  ||     ig.game.loadedBallType.pos.x.round(6)  == this.statPos.x.round(6)  &&
//       ig.game.loadedBallType.pos.y.round(6) == (this.statPos.y-(ig.game.adapter+.045)).round(6) ||     ig.game.loadedBallType.pos.x.round(6)  == this.statPos.x.round(6)  &&
//       ig.game.loadedBallType.pos.y.round(6) == (this.statPos.y-(ig.game.adapter-.045)).round(6)
//        
//        
//        )
//        
//        
//        {this.tickSwitch=false;
//              ig.Timer.atick=0.04;    console.log("a")                                                  
//        }
//        
        
        
        /*
        
        when ball.vel.y matches the sData y 
        
        */
        
        
        
//                if(this.tickSwitch==true && this.phaseTime==0 ){
//                    ig.game.loadedBallType.pos.x=this.statPos.x;
//                    ig.game.loadedBallType.pos.y=this.statPos.y;
//                    
//                        ig.game.loadedBallType.vel.x=this.statPos.vX;
//                  //  ig.game.loadedBallType.vel.y=-this.statPos.vY 
//                   
//                    (ig.game.loadedBallType.vel.y < 0) ?  
//                    ig.game.loadedBallType.vel.y=-this.statPos.vY :ig.game.loadedBallType.vel.y=this.statPos.vY ;
//                    
//                    ig.Timer.atick=0.04;
//                    this.tickSwitch=false;
//                    
//                    this.statPos.x=0;
//                    this.statPos.y=0;
//                }
//        
        
    }else{this.adapter=0;
        ig.Timer.atick=0.04;
        
    }
    
    this.phaseDist = (Math.sqrt( Math.pow((ig.game.loadedBallType.pos.x-this.statPos.x),2 )+Math.pow((ig.game.loadedBallType.pos.y-this.statPos.y),2))).round(1)
    
   this.phaseSpeed= Math.sqrt( Math.pow(ig.game.loadedBallType.vel.x,2)+Math.pow(ig.game.loadedBallType.vel.y,2)).round(1);
      //console.log("time: "+ig.game.phaseInter.delta());  
    
    this.phaseTime= ((this.phaseDist/this.phaseSpeed).round(1));
    
    
  //  console.log(this.phaseDist);
    
    //1.76-1.6
    //  console.log( this.phaseSpeed);  
// console.log("time: "+this.phaseTime+"||   Inter: "+ig.game.phaseInter.delta());  
        if(ig.Timer.atick===0.04 ){
            
            // 1.0099999999999785
            
            ig.game.phaseInter.reset();
            ig.game.phaseInter.pause();
      
            
            /*
            aTick phase is disloged by being time dependent, use a static position instead in which
            that postition can be met. This is going to be somewhat semi-static as it has to be updated for
            every combo hit.The static postion will use sData as it retains the 0.04 timeline. 
            
            
            Try doing a time interval but expires "closely" to the static postion, once expired make the pojectile
            position equal to the static postion to correct on sData
            *NOTE this interval is dependable to the velocity may need to solve for approximate time. 
            
            
            -using projetile phantom method? the problem with this is that once aTick is changed to 0.01 it will
            no longer be part of the 0.04 timeline which makes is useless unless it was used for checking collsion
            to correct sData. Only other thing is trying to "mimic" a 0.04 velocities within a 0.01 period. 
            
            */
            
            
    //1.0099999999999785  1.0099999999999785
     //     1.0900000000005576
  //   1.0000000000000124     
   
     
       // ig.game.loadedBallType.pos.y-=(this.phaseOff.y-((this.adapter-1)+(0.045*4)+0.01 )) ;\
     //   ig.game.loadedBallType.pos.x+=.12;


   //55     (this.phaseOff.x==0)   
            
//        ig.game.loadedBallType.pos.x-=(ig.game.loadedBallType.pos.x-ig.game.loadedBallType.last.x);
//            
//        ig.game.loadedBallType.pos.y-=(( (ig.game.loadedBallType.vel.y-(300*0.01))*0.01))+.345    ;
//            
//            
//            
                     if(this.phaseOff.x!=0){//console.log(this.phaseOff.x);
     //   ig.game.loadedBallType.pos.x-=this.phaseOff.x;
            this.phaseOff.x=0; //console.log(this.phaseOff.x);
            }
            
            
                   if(this.phaseOff.y!=0){
       // ig.game.loadedBallType.pos.y-=this.phaseOff.y;
            this.phaseOff.y=0
            }
            
            
            
            
       //ig.game.loadedBallType.vel.y-=3; 
  //     -1809.0171881661793
        this.phaseOff.y=0;this.phaseOff.x=0;
    }
    
    
//ig.Timer.atick=1/25;// .04
    //ig.Timer.atick=.02;// .02
//ig.Timer.atick=1/100;// .01
//ig.Timer.atick=1/200; //.005

    
 //  ig.game.loadedBallType.gravityFactor=0.04/ig.Timer.atick;
    //0.04/ig.Timer.atick;
    
 //ig.game.gravity=60;
//console.log( ig.game.loadedBallType.gravityFactor=3.2)
    

    
     
 var  cam= ig.game.getEntitiesByType(EntityCamera)[0];
       
    
    var xF=0;
       var increment=   ((500/5)/500)
       // var dampening= 0;
    if (  ig.game.metamode==true){
      
       			ig.system.context.beginPath();// (yOffset-10)
        
        
//        
// var img= new ig.Image('media/tvButtons.png');        
//var  ani=  new ig.Animation( 'media/tvButtons.png', 0.1, [0,1,2,3] , 0);
//        
        
        
        //there is a total of 200 plots
        //the image being quatered by 5s the height is 100;
        //so scollS=index*height;
             var img2; //= new Image(125,500);
       
        (ig.system.scale==2 )? ( img2= new Image(125,500)):(   img2 = new Image(250,1000) ) ;  
        
        
        var img3,addIn;
        
        
        (ig.system.scale==2 )? ( img3= new Image(125,100)):(   img3 = new Image(250,200) ) ;  
       
        //img3= new Image(125,100);
        
        
       var increment=  (500/(500/5));
     var ease=false;
    var step=((  (img2.height) /(5)))/(ig.system.scale/2);
    
 //      this.scrollLock=((ig.game.sData[ig.game.plotter.select].indexOf*((  (img2.height) /(5)))));
        this.scrollLock=((ig.game.sData[ig.game.plotter.select].indexOf*step))
        
        
  
     //        
//        this.scrollS = (cam.srcSpeed > 0 ) ? 
//                
//                (  ( ((cam.srcSpeed)*increment)+(increment*this.dampening*2)   ) +(xF)) :
//             (   ( ((cam.srcSpeed)*increment)-(increment*this.dampening) ) +(xF)) ;
//        
       //  this.scrollS =this.scrollLock;
        
         //            
        
               // console.log( increment*this.dampening*2); 
        
        
        ///need greater threshold for ease -30 to 30
        
        
        if (cam.srcSpeed != 0 && cam.srcSpeed != -1 && cam.srcSpeed != 1) {this.slideFx=2.5*cam.srcSpeed;
        this.ease=false;
                                                                          }
        //cam.srcSpeed=2
        
         if (cam.srcSpeed.round()===1 || cam.srcSpeed.round()===-1){  // console.log("slowgo");
                          
        //     this.slideFx= -(this.scrollLock-100)+(10*cam.srcSpeed);
             this.slideFx= (10*cam.srcSpeed);
             
                           this.ease=true;
                                  }
        
         this.scrollS=(((this.slideFx))+(this.scrollLock));
        
        

       // console.log(this.scrollS+ " ::"+this.scrollLock);
        //console.log(cam.srcSpeed);
        //console.log(cam.srcSpeed);
        
        if (cam.srcSpeed===0 &&  this.ease ===false){  
         
            
            if (this.scrollS > this.scrollLock)//up
            {
              this.scrollT.unpause();
                
                
                this.slideFx -= Math.abs(this.scrollT.delta()-step/4);
                     
                if (this.slideFx < 0){ this.slideFx =0;  this.scrollT.reset();this.scrollT.pause();}
      
            }
            
            
                      if (this.scrollS < this.scrollLock)//up
            { 
              this.scrollT.unpause();
                
                
                this.slideFx += Math.abs(this.scrollT.delta()-step/4);
                     
                if (this.slideFx > 0){ this.slideFx =0;  this.scrollT.reset();this.scrollT.pause();}
      
            }
                
        }
        
              if (cam.srcSpeed===0 &&  this.ease ===true){ 
              
               if (this.scrollS > this.scrollLock)//up goto nearest hundreth
                   { 
                       this.scrollT.unpause();
                   this.slideFx += (this.scrollT.delta())*(step)/4;
                      
                       if (this.scrollS > this.scrollLock+step)
                           {this.slideFx =0;  this.scrollS = this.scrollLock+(step*2);this.scrollT.reset();this.scrollT.pause();  }
                       
                //   console.log(this.slideFx += this.scrollT.delta());
                   
                   }
                  
                     if (this.scrollS < this.scrollLock)//up goto nearest hundreth
                   { 
                       this.scrollT.unpause();
                   this.slideFx -= (this.scrollT.delta())*(step)/4;
                       
                       if (this.scrollS < this.scrollLock-step)
                           {this.slideFx =0;  this.scrollS = this.scrollLock-(step*2);this.scrollT.reset();this.scrollT.pause();  }
                       
                //   console.log(this.slideFx += this.scrollT.delta());
                   
                   }
                  
              
              } 
        
            
            

//   
 
    
    
        
        
       // console.log((this.scrollS).round()+":: "+this.scrollLock);
      //  console.log(     this.scrollS);
       
   // (ig.system.scale==2 )?(img2.src='media/scroll.png'):(img2.src='media/scroll2.png');  
        
        

        
        
        
        
        
        
    //    img2.src=this.scrollImg1.path;
        
        
        
        var imgPlotters= [this.colData.length];
        
        for (i=0;i<this.colData.length;i++)
{
    var imgPos = new Object(); 
//imgPos.bimg=this.bumperImg;    
    
 imgPos.img =this.plotImg1;
 imgPos.posX = 0
// imgPos.posY = 0
 imgPos.indexOf=i;
    
 imgPos.posY=  imgPos.img.y-((this.scrollS-(this.colData[i].orderOf*(100))-270));    

   imgPlotters[i]=imgPos
}

        
//          img2.width*=2;
//        img2.height*=2;

             atlias = ig.gui.element.action('getByName','insV');
  
        clipSt={x:100,y:0};
        pos={x:200,y:50}
        scale={x:( img2.width)*ig.system.scale/2, y: (img2.height/5)*ig.system.scale/2}
        
       
        //**** draw new image for each plot point and keep track of it 
        //*** better threshold for ease
        //*** active and inactive transparent
        //** hide all button when invsV is selected
        //on desktop detect when mouse is outside canvas

      //  imgPlotters[0].posY=  imgPlotters[0].img.y-((this.scrollS-(this.colData[0].orderOf*100)-270));
//         this.aviIns.src='media/avimg.png'; 
//      (ig.system.scale==2 )?(this.scrollImg1.src='media/scroll.png'):(this.scrollImg2.src='media/scroll2.png');  
//    (ig.system.scale==2 )?(this.plotImg1.src='media/plot.png'):(this.plotImg2.src='media/plot2.png');  
//    
     //   console.log(this.colData[0].orderOf);
  
        var img2=this.scrollImg1; //var imgPlotters=this.plotImg1;
        
        if (ig.game.sData[ig.game.plotter.select+1].invsVel===false || ig.input.state('click')===false || !atlias.within ){
    ig.system.context.fillStyle = ig.system.context.createPattern(img2, "repeat");
     ig.system.context.save();
     //ig.system.context.translate(img2.x+370, (img2.y-this.scrollS)+70);
            
            
     ig.system.context.translate(img2.x+(370*(ig.system.scale/2)), ((img2.y)-(this.scrollS*(ig.system.scale/2)))+70*(ig.system.scale/2));
            
     ig.system.context.fillRect(0, 0+this.scrollS*(ig.system.scale/2), (img2.width), (img2.height));
              //ig.system.context.scale(ig.system.scale/2,ig.system.scale/2);
     ig.system.context.restore();
        
        
   ig.system.context.fillStyle= "rgba(0, 0, 0, 0.3)";
             ig.system.context.save();
               ig.system.context.translate(0,0);
              // ig.system.context.fillRect(0, 0+this.scrollS*(ig.system.scale/2), (img2.width), (img2.height)); 
            
            
            ig.system.context.fillRect(img2.x+(375*(ig.system.scale/2)),70*(ig.system.scale/2), (img2.width), (img2.height/3)+30); 
            
            ig.system.context.fillRect(img2.x+(375*(ig.system.scale/2)),70*(ig.system.scale/2), (img2.width), (img2.height/5)); 
            
               ig.system.context.fillRect(img2.x+(375*(ig.system.scale/2)),375*(ig.system.scale/2), (img2.width), (img2.height/3)+30); 
               ig.system.context.fillRect(img2.x+(375*(ig.system.scale/2)),475*(ig.system.scale/2), (img2.width), (img2.height/5)); 
              ig.system.context.restore();
            
            
            
            
            
            
            /*
            use five instead 
            
            check from plotter index +2,-2 
            
            
            
            */
            
      
            
            
            for(i=0;i<ig.game.colData.length;i++){//ig.game.colData.length
                
             if(imgPlotters[i].posY*(ig.system.scale/2) >0 && imgPlotters[i].posY*(ig.system.scale/2) <570*(ig.system.scale/2) ){
                     ig.system.context.drawImage(imgPlotters[i].img,imgPlotters[i].img.x+(370*(ig.system.scale/2)),imgPlotters[i].posY*(ig.system.scale/2));}
                
                
                
              
                
                  //console.log(imgPlotters[i].posY*(ig.system.scale/2))
                
            }
            
            
                        ig.system.context.fillStyle="red";
             ig.system.context.font=(ig.system.scale/2)*40+"px Arial";
          ig.system.context.textAlign="center";
        ig.system.context.fillText(this.plotter.select,img2.x+(430*(ig.system.scale/2)),335*(ig.system.scale/2));    
            
            
            
            

        }
        
        
        
        
        
        

   //
  
     
      
           var mouse={
            x:((ig.game._rscreen.x/ig.system.scale)+ig.input.mouse.x),
            y:(ig.input.mouse.y)
            //y:(ig.input.mouse.y-(ig.game.screen.y*(2/ig.system.scale)))
        }
                     
                                
          var Var={x:(ig.game.plotter.x+(ig.game._rscreen.x/ig.system.scale)),y:(ig.game.plotter.y-(ig.game._rscreen.y))}
       
          var Var2={x: atlias.pos.x+(ig.game._rscreen.x/ig.system.scale),y:(atlias.pos.y+ig.game._rscreen.y)}


  
    
   
          var angle =0.001;
          

           
       
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

     
 
     
     
     var bx,by;
     var dist;
     
     
     
  
     
    var off=40;
     

        (ig.system.scale==2)? ( 
            bx=((  (ig.game.plotter.x-(ig.game.screen.x/ig.system.scale))  +(  140 ))), 
            by=((180 )+ig.game.plotter.y-ig.game.screen.y)*(ig.system.scale/2) )
        :(
            bx=((  (ig.game.plotter.x-(ig.game.screen.x/ig.system.scale))  +(  380 ))),
            by=((170 )+ig.game.plotter.y-ig.game.screen.y)*(ig.system.scale/2) )
        

     
        dist=Math.sqrt( Math.pow(ig.game.plotter.x-(atlias.pos.x+(ig.game.screen.x/ig.system.scale) ) ,2)+ Math.pow(ig.game.plotter.y-(atlias.pos.y+ig.game.screen.y ) ,2) )
//console.log( (dist/30).limit(.3,1) )
     
     var scale=(dist/(30)).limit((.5),(1)) ;
     
         if ( atlias.pos.x < ig.game.gameDimesion.xLevel/2) angle*=-1;
         if ( atlias.pos.x > ig.game.gameDimesion.xLevel/2) Math.abs(angle);
             
    if (ig.game.sData[ig.game.plotter.select+1].invsVel===true && ig.input.state('click')==true && atlias.within 
      // && atlias.active 
       
       ){
        
        
       //  ig.system.context.rotate(120*Math.PI/180);
        
        // ig.system.context.rotate(45);
        ig.system.context.save();
  
                   ig.system.context.translate((240*(ig.system.scale/2))-off, (320*(ig.system.scale/2))-off);
     
    // ig.system.context.translate(60, 60);
     ig.system.context.translate(60-15, 60-15);
    // ig.system.context.translate(111, 111);
     
        ig.system.context.rotate((angle).toRad());
        
        ig.system.context.scale(scale*(ig.system.scale) ,scale*(ig.system.scale) );

          ig.system.context.drawImage(this.aviIns,-111,-111);
     this.drawnAvi=true;
     
     

//        
       ig.system.context.restore();
        
   
        
        
      ig.system.context.beginPath();  
 
            	ig.system.context.moveTo(bx-15,by-15 );
        
                //   x:(dist3.limit(0,xLmt+1)) * Math.sin(angle.toRad()),
               // y:(dist3.limit(0,xLmt+1)) * Math.cos(angle.toRad())
 
              
                //ig.system.context.lineTo(atlias.pos.x+100,atlias.pos.y )
        
                (ig.system.scale==2)? ( 
        ig.system.context.lineWidth=5,
                ig.system.context.lineTo((bx-15 )+(170*scale) * Math.sin(angle.toRad()),(by-15 )+(170*scale) * Math.cos(angle.toRad() ))
        ) :(
                     ig.system.context.lineWidth=15,
                ig.system.context.lineTo((bx-15)+(330*scale) * Math.sin(angle.toRad()),(by-15)+(330*scale) * Math.cos(angle.toRad() ))
                
                )
        
        
        
        ig.system.context.stroke()
        
             ig.system.context.fillStyle="red";
             ig.system.context.font=(ig.system.scale/2)*20+"px Arial";
          ig.system.context.textAlign="center";
        ig.system.context.fillText(angle.round(),240*(ig.system.scale/2)+5,320*(ig.system.scale/2)+10);    
   }
        
     
        
        
        
        
        
               for (i=1; i <ig.game.sData.length-1;i+=1){
          
            
             if (typeof ig.game.sData[i-1]!='undefined' ){    
           ig.system.context.beginPath();  
       
            	ig.system.context.moveTo(
                  (((ig.game.sData[i-1].posX*ig.system.scale)-ig.game._rscreen.x)
                  )+ ig.game.loadedBallType.size.x/2
                    ,                             
                    (((ig.game.sData[i-1].posY)-ig.game._rscreen.y)*ig.system.scale
                    )+ ig.game.loadedBallType.size.x/2 
                    
                    )
                
                ig.system.context.lineTo(
            (((ig.game.sData[i].posX*ig.system.scale)-ig.game._rscreen.x)
            )+ ig.game.loadedBallType.size.x/2
                    ,
               (((ig.game.sData[i].posY)-ig.game._rscreen.y)*ig.system.scale
               )+ ig.game.loadedBallType.size.x/2
                )
                
              
                     if (ig.game.sData[i].collH === true ||ig.game.sData[i].collV === true 
                         || ig.game.sData[i].invsX===true || ig.game.sData[i].invsY===true  || ig.game.sData[i].invsVel===true)
              {    ig.system.context.strokeStyle = '#ff2222';}
          else{  ig.system.context.strokeStyle = '#ffffff';}
          
                 if (    ig.game.plotter.x==ig.game.sData[i].posX && ig.game.plotter.y===ig.game.sData[i].posY )
                     {  ig.system.context.strokeStyle = '#ff7600';}      //    else{  ig.system.context.strokeStyle = 'white';}
                 
                 
       ig.system.context.stroke();  
          
             }
//        ig.system.context.beginPath();  
//           ig.system.context.rect(
//               (((ig.game.sData[i].posX*ig.system.scale)-ig.game._rscreen.x))+ ig.game.loadedBallType.size.x/2
//               ,
//               (((ig.game.sData[i].posY)-ig.game._rscreen.y)*ig.system.scale)+ ig.game.loadedBallType.size.x/2
//               ,
//               
//               10*ig.system.scale,10*ig.system.scale);  
//       ig.system.context.stroke();
//          
     
      }
 
        

    }
    
    
    
    
    
   // ig.game.gameMode=4;
//EVENT

    
    if(ig.game.gameMode==4){
   var xLevel  = ig.system.width*ig.system.scale;
   var yLevel =  ig.system.height*ig.system.scale; 
   var camCom=ig.game.getEntitiesByType(EntityCamera)[0]
                 
                  //  this.comicImg2.src= this.cPanel[0]; 
                           
                 

                 
             if(ig.input.pressed('click')&&this.isRunning==false&& this.goNext==false ) {this.index++; this.isRunning=true; this.animEvent.rewind();this.animEvent2.rewind();
                                                                                        
                                                                                        }
             //  console.log( this.cmd[this.index][0])
              
                 
                       if (this.cmd[0][this.index][0]==="killBoss"){
                       
                       ig.game.getEntitiesByType(EntityBoss1)[0].death=true;
                   }
        
        
                 
                if ( this.cmd[0][this.index][0]==="moveTo" && this.isRunning==true){
                    
                    	
                    this.moveTo(this.cmd[0][this.index][1],this.cmd[0][this.index][2],this.cmd[0][this.index][3]);
                  
            //     console.log("here")
                    
                 }
                    if ( this.cmd[0][this.index][0]==="moveTo" && this.isRunning==false && this.cmd[0][this.index][4]===true   ){
                    
                        this.goNext=true;
                    }
                 
                 
                 if(this.goNext==true){this.index++;this.isRunning=true; this.goNext=false;}
                 
                 
               //  if(this.cmd[0][this.index][0]==="moveTo" && this.isRunning==false)this.index++;
                 
                    //ig.game.moveAnim(ig.game.animEvent,50,50,1);

        
        
                if ( this.cmd[0][this.index][0]==="drawAnim" ){
                    this.isRunning=true;
                   //  this.anim= new ig.Animation(  this.cmd[this.index][1], 1.5, [0,1] );
                    
                    this.animEvent.sheet= this.cmd[0][this.index][1];
                     this.animEvent.frameTime= this.cmd[0][this.index][4];
                     this.animEvent.sequence= this.cmd[0][this.index][5];
                    
                    this.animEvent.x = (this.cmd[0][this.index][2]);
                    this.animEvent.y = (this.cmd[0][this.index][3]);

                    
//                         if (this.orderCall ==this.index && this.cmd[0][this.orderCall][0]!=="callOut" && this.cmd[0][this.orderCall+1][0]==="callOut"){this.orderCall = this.index+1;}
                     if (this.orderCall < this.index ){this.orderCall = this.index;}
                 
                    
             if(ig.input.pressed('click') && 
                typeof this.cmd[0][this.orderCall+1] !== 'undefined' && this.cmd[0][this.orderCall+1][0]==="callOut"
               
               ) { 
                     
                 if (this.orderCall ==0){this.orderCall = this.index+1;}else
                     {this.orderCall++;}
                 
             }
                    
                        if (this.orderCall !=0){
                    this.drawCallout(
            this.cmd[0][this.orderCall][1],
            this.cmd[0][this.orderCall][2],
            this.cmd[0][this.orderCall][3],
            this.cmd[0][this.orderCall][4]
                                                   );         
                        }
               
                    
               if(this.cmd[0][this.orderCall][5]==true){
               this.isRunning=true;
               this.index= this.orderCall+1;
               this.orderCall=this.index+1;
                      
               }
                    
                    
                    
                    
 
            
//            if( typeof this.cmd[0][this.orderCall+1] !== 'undefined' && this.cmd[0][this.orderCall+1][0]==="callOut" ) {this.orderCall=this.index+1;
//                                                                                                                                                                                      
//                    this.drawCallout(
//            this.cmd[0][this.orderCall][1],
//            this.cmd[0][this.orderCall][2],
//            this.cmd[0][this.orderCall][3],
//            this.cmd[0][this.orderCall][4]
//                                                   );         
//                 
//               }
//                                  if(ig.input.pressed('click') && this.orderCall==this.index+1){
//                         this.orderCall++;
//                                    this.drawCallout(
//            this.cmd[0][this.orderCall][1],
//            this.cmd[0][this.orderCall][2],
//            this.cmd[0][this.orderCall][3],
//            this.cmd[0][this.orderCall][4]
//                                                   );  
//                         
//                     }
//     
        
                        //  this.animEvent.draw( this.animEvent.x,this.animEvent.y);   

      // this.animEvent.moveAnim(52,100,1);
  
                  ig.game.moveAnim( this.animEvent,60,150,2);
                    
                    if( this.animEvent.isMoving==false)
                      this.animEvent.draw( this.animEvent.x,this.animEvent.y);   
                    
                    
                    if(typeof this.cmd[0][this.index][6]!=='undefined'){//second anims
                        
                        this.animEvent2.x = (this.cmd[0][this.index][7]);
                    this.animEvent2.y = (this.cmd[0][this.index][8]);
                                this.animEvent2.sheet= this.cmd[0][this.index][6];

                     this.animEvent2.sequence= this.cmd[0][this.index][10];
                    this.animEvent2.frameTime= this.cmd[0][this.index][9];
                        
        // ig.game.moveAnim( this.animEvent2,60,150,2);
                        
                           if( this.animEvent2.isMoving==false)
                                    this.animEvent2.draw( this.animEvent2.x,this.animEvent2.y);  
              //  this.animEvent2.draw( (ig.game.screen.x/2)+(this.cmd[0][this.index][7]),(ig.game.screen.y/2)+(this.cmd[0][this.index][8]*1.45));     
                        
                        
                   // this.isRunning=false;
                   // 
                        
                    }else{   //this.isRunning=false;
                         }
                    
                 }
        
        
        
                 
                 
                 if(this.cmd[0][this.index][0]==="callOut") {this.orderCall=this.index;//this.index++; 
                                
                                                      this.isRunning=false;//  this.goNext=true;
                                                                     }
        
        
     
                 
                   
                 if(this.cmd[0][this.index][0]==="end") {ig.game.gameMode=0;
                                                         //ig.game.roundNum=0;
                                                         ig.game.isRunning=false
                                                         this.intro =false; this.index++;
                                                                 }
                 
 
                 
                 
                 
                 
                 
                 
             if ( this.cmd[0][this.index][0]==="shake" ){
                      if(this.shake===false){   
                          this.shakeCam(this.cmd[0][this.index][1]
                                        ,this.cmd[0][this.index][2]
                                        ,this.cmd[0][this.index][3]
                                        ,this.cmd[0][this.index][4]); this.goNext=true;}

                         
                     }
        
        
        
        
        
                                      
                 
                 if(this.shake===true){

   this.shakeTime.unpause();
 var speed=this.shakeTime.delta()*this.shSpeed;//100
  camCom.vel.x= (Math.sin(speed)).toDeg()*this.sMag.x;
  camCom.vel.y= (Math.sin(speed)).toDeg()*this.sMag.y;
    
    if (this.shakeTime.delta()> this.sTime){
        this.shakeTime.reset();
        this.shakeTime.pause();
        this.shake=false;
        camCom.vel.x= 0;
        camCom.vel.y= 0;
        
    }
                 
                 
   }     
               if(this.cmd[0][this.index][0]==="callOut") {
                                                   this.drawCallout(
            this.cmd[0][this.orderCall][1],
            this.cmd[0][this.orderCall][2],
            this.cmd[0][this.orderCall][3],
            this.cmd[0][this.orderCall][4]
                                                   
                                                   );         
                 
               }
                 
                 
                 //  this.animEvent2.update();    
       
        
                this.animEvent.scale.x=3;
                this.animEvent.scale.y=3;
                this.animEvent.update();
              
                   this.animEvent2.scale.x=3;
                this.animEvent2.scale.y=3;
                this.animEvent2.update();
//  this.animEvent.draw(0,0);
//          this.animEvent.update();
                  
      ig.system.context.restore();
    }
    

    
},    
    

     
     
Randomize : function (max){
        

    
    var rand = Math.floor(Math.random()*(max*2))-max
	return rand;
	},
	
RoundUpdas : function (){
  
    if(this.rSpawnManagement[this.roundNum][0]!="end"  && this.rSpawnManagement[this.roundNum][0]!="BOSS"  ){
for  (i =0 ; i < this.rSpawnManagement[this.roundNum].length; i++ ){
      
this.graceEntry=(this.rSpawnManagement[this.roundNum][i][1]/3).floor()-this.rSpawnManagement[this.roundNum][i][2]
this.standEntry = ((this.rSpawnManagement[this.roundNum][i][1]-this.graceEntry)/2).floor()-this.rSpawnManagement[this.roundNum][i][2]+this.rSpawnManagement[this.roundNum][i][3]
this.challEntry = this.rSpawnManagement[this.roundNum][i][1]-(this.graceEntry + this.standEntry)

this.spawnQuery=[this.graceEntry,this.standEntry,this.challEntry]

for (j=0; j != this.spawnQuery[this.wave]; j++){
    
ig.game.spawnEntity(this.rSpawnManagement[this.roundNum][i][0],0,-7000
                   )}


    
    

}}else if (this.rSpawnManagement[this.roundNum][0]=="end"  )  {  ig.system.setGame(EndGame);}
    
    
    if (this.rSpawnManagement[this.roundNum][0]=="BOSS" ){
      console.log(this.roundNum);
        
        ig.game.spawnEntity('EntityBoss1',240,-2000);
      this.countEnemy=1;
      this.wave=2;//this.orderCall+=1 
      this.gameMode=4; 
    }



},
       
BorderChecks : function (bxOne,bxTwo,byOne,byTwo,i,operator){
             //operator= ((bxOne!==null*1)+(bxTwo!==null*2)+(byOne!==null*4)+(byTwo!==null*8));
                 //through the formula all possible values do not equal the same
         //Results (1,2,3,4,5,6,7,8,9,10,11,ig.game.gRate,13,14,15)
             offset = ig.game.loadedBallType.size.x 
             offsetY = ig.game.loadedBallType.size.y
         
    adx = this.sData[i-2].posX;
    bdx = this.sData[i-1].posX;
    cdx = this.sData[i].posX;
        
        segDisd = Math.abs(adx - bdx);
        segDis2d= Math.abs(cdx - bdx);       
    
    ady = this.sData[i-2].posY;
    bdy = this.sData[i-1].posY;
    cdy = this.sData[i].posY;
        
        segDisdy = (-ady + bdy).round(0);
        segDis2dy= (-bdy + cdy).round(0);          
    
          //var aVar = 1/0.04
          var aVar = 1/ig.system.tick
          
 switch (operator){ //supposed to desginate type of collision however having problems
         //its asif it runs through previous cases despite the operator value

     
     
     case 3 :{   // both side X level walls 
         
         
              if((this.sData[i].posX)+(this.sData[i].velX/aVar )  
                 >  bxTwo    
              //   && segDisd <= segDis2d
                ) {   //this.sData[i].invsX=true;
               //this.sData[i].posY =  this.sData[i-1].posY 
                      
                  
                  
                  
                  if (this.sData[i].velY<0) {
//   this.sData[i].velY-=300*ig.system.tick;
                        }else{
  // this.sData[i].velY+=300*ig.system.tick;
    }
    
                  
                  
      //(bxTwo-offset); 
        this.sData[i].posX =  (bxTwo-offset); 
         this.sData[i].Fn.invsX(i);
                                                                                                        }
         
         
         
         if( this.sData[i].posX+(this.sData[i].velX/aVar)
            <  bxOne 
            
       //    && segDisd <= segDis2d
           )      {          
             //this.sData[i].posY =  this.sData[i-1].posY 
                             
                   
                   
                   if (this.sData[i].velY<0) {
  // this.sData[i].velY-=300*ig.system.tick;
                                 }else{
  // this.sData[i].velY+=300*ig.system.tick;
    }
    
                  
             
   
            this.sData[i].posX =  bxOne; 
        //      this.sData[i].invsX=true;
             this.sData[i].Fn.invsX(i);
         }
         
    
         
        
     
         

 }break;
         
     case 4:{ //just ground on the level
             if( this.sData[i].posY > byOne && this.sData[i-1].posY > byOne  && segDisdy.round(0)  <= segDis2dy.round(0) 
      ) {
this.sData[i].Fn.invsY(i)

      //     this.sData[i].collV = (segDisdy  >= segDis2dy );
       this.sData[i-1].posY =byOne;
        this.sData[i].posY =byOne;

    }
         
//         else{//this.sData[i].collV =false
//          this.sData[i].Fn.trace(i)
//         }
         
     }break;
         
    
     case 15:{ // full boxed collision what a fucking mess
    //fix corner collisions

        
		   if (this.sData[i].posX > bxOne && (this.sData[i].posX+offset) < bxTwo )  {
               
       //         hits  bottom of box works but with a unknown manual solution
            if (
                this.sData[i-1].posY > byTwo && 
               this.sData[i].posY < byTwo && 
                this.sData[i-1].posY-offsetY  > byOne  &&
               this.sData[i].posY-offsetY > byOne 
                
                && segDisdy <= segDis2dy 
               )  {

                this.sData[i].comColl=true
            this.sData[i].Fn.invsY(i);
           this.sData[i].posY =byTwo;
   
                 }else{   this.sData[i].comColl=false
                      }
                    //.144
               
 //hits top of box surfurce IMPERFECT COLLISION WHILE GLIDING SURFACE             
            if ( 
                this.sData[i-1].posY < byOne && 
               this.sData[i].posY+offsetY > byOne && 
                this.sData[i-1].posY  < byTwo  &&
               this.sData[i].posY < byTwo 
               && segDisdy  <= segDis2dy
                
                || this.sData[i].posY== byOne && this.sData[i-1].posY == byOne &&  this.sData[i-2].posY == byOne // when gliding surface
                
               )    {
     
                this.sData[i].comColl=true
            this.sData[i].Fn.invsY(i); 
            this.sData[i].posY =byOne-(offsetY)
            }else{   this.sData[i].comColl=false
                 }

               
               

               
           }else{   this.sData[i].comColl=false
                
                }////////////
                   
       
         
               
 
                if (	this.sData[i].posY+ offsetY <= byTwo && this.sData[i].posY >= byOne ){
                    
                    
                           if (
                               this.sData[i-1].posX+offset < bxOne &&  this.sData[i].posX+offset > bxOne
                     && segDisd<= segDis2d )  {//leftside
            
                //  this.sData[i].comColl=true
                   this.sData[i].Fn.invsX(i);
            this.sData[i].posX =bxOne;
            
            
        }
               
                            if (
                           this.sData[i-1].posX > bxTwo &&  this.sData[i].posX <= bxTwo
                && segDisd.round(0) <= segDis2d.round(0))  {//rightside
            
               //   this.sData[i].comColl=true
                   this.sData[i].Fn.invsX(i);
            this.sData[i].posX =bxTwo;
            
            
        }         
                
                
                if (    !(this.sData[i-1].posX+offset < bxOne) &&  !(this.sData[i].posX+offset > bxOne) && !(segDisd<= segDis2d) ||
                     !(this.sData[i-1].posX > bxTwo) &&  !(this.sData[i].posX <= bxTwo) &&   !(segDisd.round(0) <= segDis2d.round(0)))
                    {          this.sData[i].comColl=false}
                
                
                
                
                }/////////
         
         
       
        //is within it? well shit what are we gonna do 
         // getting distance from centre isnt right way to do it 
         // need to measure the overlaps instead somehow
         //Seprate Axis Theorem
//         
         if (	this.sData[i].posY+ offsetY < byTwo && 
             this.sData[i].posY > byOne  && 
         this.sData[i].posX + offset > bxOne
             && this.sData[i].posX < bxTwo
         ){    
             var xCenter,yCenter 
             xCenter =  (((bxTwo-bxOne)/2)+ bxOne);//-(this.sData[i].posX+ (offset/2) )
             yCenter =  ((byTwo-byOne)/2)+ -byTwo ;
                       //calculate which X or Y is closer to centers 
             //xDist= //Math.sqrt(Math.pow((this.sData[i].posX-xCenter),2)+(Math.pow(yCenter,2)));
             
             
//             ( this.sData[i].posX+(offset/2) > xCenter )?  
//             (xDist= Math.abs(this.sData[i].posX-bxTwo)  ) :
//             (xDist=  Math.abs((this.sData[i].posX+offset)-bxOne) );
//             
//             
//              ( this.sData[i].posY+(offsetY/2) < yCenter )?   
//             (yDist= Math.abs((this.sData[i].posY)-byTwo)  ) :// bottom of border
//             (yDist= Math.abs(byOne-(this.sData[i].posY+offsetY)) ); // top of border
             
             
                ( this.sData[i].posX+(offset/2) > xCenter )?  
             (xDist= Math.abs((this.sData[i].posX+(offset/2))-bxTwo)  ) :
             (xDist=  Math.abs((this.sData[i].posX+(offset/2))-bxOne) );
             
             
              ( this.sData[i].posY+(offsetY/2) < yCenter )?   
             (yDist= Math.abs((this.sData[i].posY+(offsetY/2))-byTwo)  ) :// bottom of border
             (yDist= Math.abs(byOne-(this.sData[i].posY+(offsetY/2))) ); // top of border
             
             
             
             
             
             //Math.sqrt(Math.pow((this.sData[i].posX-xCenter),2)+(Math.pow(yCenter,2)));
             //yDist=(Math.sqrt((Math.pow(xCenter,2)+Math.pow((yCenter-(this.sData[i].posY+1000)),2))));
             ///1000 is an offset due to level design, used it to initialize the posY!!!
   
       //     if (i === 40) console.log("x:"+xDist+"  y:    "+yDist);
             

             if (xDist < yDist){
             
                          
//             if (xCenter > this.sData[i].posX){       this.sData[i].posX =bxOne-offset; this.sData[i].Fn.invsX(i);}
//             if (xCenter < this.sData[i].posX){      this.sData[i].posX =bxTwo;  this.sData[i].Fn.invsX(i);}
                 
            (xCenter > this.sData[i].posX+(offset/2)) ?   (this.sData[i].posX =bxOne-offset, this.sData[i].Fn.invsX(i),   this.sData[i].comColl=true  ):
            ( this.sData[i].posX =bxTwo,  this.sData[i].Fn.invsX(i),   this.sData[i].comColl=true  );
                 
                 
             } 
             
             
              if (xDist > yDist){
                 {
               if (yCenter > this.sData[i].posY+(offsetY/2)  ){      this.sData[i].posY =byOne-(offsetY);  this.sData[i].Fn.invsY(i);   this.sData[i].comColl=true;  }         
               if (yCenter < this.sData[i].posY ){          this.sData[i].posY =byTwo; this.sData[i].Fn.invsY(i);   this.sData[i].comColl=true;  }
         
//            (yCenter > this.sData[i].posY) ? ( this.sData[i].posY =byTwo, this.sData[i].Fn.invsY(i)):
//            (this.sData[i].posY =byOne-(offsetY),  this.sData[i].Fn.invsY(i));
//                     
               }
              
              }
             

          //   this.sData[i].comColl=true
//             
//   /// my coding sucks...beautifully          
        }
//         
         
         
    
         
         
         
         

         
         
     }break;
         
    
     default:
         return;
 
 
 }
         
     },
             
//use this to acquire projectile as its set in sling 
getEntityByID: function(id) {
    for(var i=0; i<ig.game.entities.length; i++) {
        if(ig.game.entities[i].id == id) {
            return ig.game.entities[i];
        }
    }
},
//Im prob not going to use this 
isIntersecting: function(aX,aY,bX,bY,cX,cY,dX,dY){//is there a better way?
     var denominator,numerator1,numerator2,r,s;
    

//     denominator = ((b.X - a.X) * (d.Y - c.Y)) - ((b.Y - a.Y) * (d.X - c.X));
//     numerator1 = ((a.Y - c.Y) * (d.X - c.X)) - ((a.X - c.X) * (d.Y - c.Y));
//     numerator2 = ((a.Y - c.Y) * (b.X - a.X)) - ((a.X - c.X) * (b.Y - a.Y));
   denominator = ((bX - aX) * (dY - cY)) - ((bY - aY) * (dX - cX));
   numerator1 = ((aY - cY) * (dX - cX)) - ((aX - cX) * (dY - cY));
   numerator2 = ((aY - cY) * (bX - aX)) - ((aX - cX) * (bY - aY));
                                                               
                                                               
    // Detect coincident lines (has a problem, read below)
    if (denominator == 0) return numerator1 == 0 && numerator2 == 0;

     r = numerator1 / denominator;
     s = numerator2 / denominator;

    return (r >= 0 && r <= 1) && (s >= 0 && s <= 1);
    
},
//attempt to rebuild/refresh colData
rebuildColDat: function(sel,ind){


         var index=sel;
         var k= ind//ig.game.dirInc//ig.game.colData.length-1;    
        // var k= ig.game.colData.length-1;    
        
             
          this.colData[k].orderOf= index
    
          
          //grab index of sData 
        
      
    
/*
? use XOr switching for ordering? 

Decending order 

*/
        
                 //this.sData[ this.colData[k].orderOf].invsX = this.colData[k].invsX
            
          
//            temp=this.colData[k].orderOf;
//            this.colData[k].posX =this.sData[temp].posX;
//            this.colData[k].posY =this.sData[temp].posY;
//    
    
//if (this.colData[0].orderOf !== null || this.colData[1].orderOf !== null){
    
    
    //get rid of while loop
   //add in another ilterator j where j=i/length check if whole number by using j%1==0 
   // if j%1 == 0; i =0 (re-loop) unitl j==length  
    

    
    //improvised Sort method 
//    for (i=0,j=0,len=ig.game.colData.length ; j <len; i++) //ig.game.dirInc-1 len=ig.game.colData.length ;
//        {
//                  
//            
//      
//            
//            if (this.colData[i].orderOf !== null && i !==0 && this.colData[i].orderOf > this.colData[i-1].orderOf ){
//                
//            
//               
//            var prev; prev =this.colData[i-1]
//                
//                
//    //    (this.colData[i-1]^=this.colData[i]^(this.colData[i]=this.colData[i-1]));
//        
//            //
//            
//         //   (this.colData[i-1]^=this.colData[i]^(this.colData[i]=prev));
//            
//        this.colData[i-1] = this.colData[i];this.colData[i] = prev;
//                
//                
//               //(this.colData[i-1].orderOf^=this.colData[i].orderOf^(this.colData[i].orderOf=this.colData[i-1].orderOf));//switch indexes properties 
//
//        }
//            
//            
//                        temp=this.colData[i].orderOf;
//                          if (this.colData[i].orderOf !== null &&
//                       this.sData[temp].posX !== this.colData[i].posX  &&//  ig.game.loadedBallType.freeze === true
//                       this.sData[temp].posY !== this.colData[i].posY // &&  ig.game.loadedBallType.freeze === true
//                                   ){ 
//         
//                                    this.colData[i].posX =this.sData[temp].posX;
//                                    this.colData[i].posY =this.sData[temp].posY;
//                              
//                                    }   
////                   this.sData[temp].invsX = (1+(  this.sData[temp-1].posX+this.sData[temp-1].posY).round(4) === 
////                                (this.colData[j].posX +this.colData[j].posY).round(4)+this.colData[j].invsX) 
////                                                                   
//  
//            
//                j+= (i/len);//increment j so that it loops n^2
//                
//            if (j%1==0) i=0; //check if whole number (indicates i at length) then re-loop
//            
//            
//            
//           
//           
//            
//            
//
//        }
//         
    

    
    
//}   
    
     
  
                ig.game.colData.sort(function(a, b) {
                
                    //return a.orderOf > b.orderOf ? -1 : (a.orderOf < b.orderOf ? 1 : 0);
                
                return (b.orderOf) - (a.orderOf);
                    
                    
//                           temp=this.colData[k].orderOf;
////            this.colData[k].posX =this.sData[temp].posX;
////            this.colData[k].posY =this.sData[temp].posY;
                    
                               
                                                });
              
        

//   
         
   //      console.log( this.colData[k].invsX) 
        //  console.log( ig.game.colData[0].orderOf) 
        // console.log("0: "+ (this.sData[this.colData[0].orderOf].posX+this.sData[this.colData[0].orderOf].posY).round(4)+"||     "+(this.colData[0].posX +this.colData[0].posY).round(4))
        //console.log("0: "+ (this.sData[this.colData[0].orderOf].posX+this.sData[this.colData[0].orderOf].posY).round(4)+"||     "+(this.colData[0].posX +this.colData[0].posY).round(4))

  
         
     },
    
xOrSwap: function(a,b) {
  return   a^=b^(b=a);
 // return ( a || b ) && !( a && b );
},     
 
//cacheArrayClear: function(){
//  
//    this.colData=[];    
//    this.sData=[];
//    
//this.plotter.select=0;    
//ig.game.dirInc=0;
//
//    
//  this.colData.length=20;//5
//for (i=0;i<this.colData.length;i++)
//{
//    var sPos = new Object(); 
// sPos.posX = 0
// sPos.posY = 0
// sPos.invsX= false
// sPos.invsY= false
// sPos.invVel=false
// sPos.xBouy=0
// sPos.yBouy=0 
// sPos.orderOf=null// priority to the point nearest to "FUTURE POSITION" projectile 
//    this.colData[i]=sPos
//}  
//    
//    
//    
//this.sData.length =200;// new Array(480) sdata meaning stationary data (now realtime data/hybrid)
//for (i=0;i<this.sData.length;i++)
//{
//   
//    var sPos = new Object(); 
//    var upper= ig.game;
// sPos.posX = 0
// sPos.posY = 0
// sPos.velX =0
// sPos.velY =0
// 
// sPos.invsX=false
// sPos.invsY=false
// sPos.invsVel=false
// sPos.xBouy=0
// sPos.yBouy=0
//
// sPos.comColl= false //collides with isolated compoenet
// 
// 
// sPos.indexOf = i; 
//    
//  
// 
//     sPos.Fn = {    //JUST FUCKING BEAUTIFULL IT MUCH MORE RESPONSIVE NOW>>>>>>> :D 
//         //implement collision type specifically for component collision
//        
//         
////         boostV: function(){
////            
////             upper.loadedBallType.vel.x*=1.5 
////             upper.loadedBallType.vel.y*=1.5
////       //          upper.sData[i].posX =upper.sData[i-1].posX-(upper.sData[i].velX*-ig.game.aTick)
////   // upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*ig.game.aTick)
////         },
////         
//         
//         
//         
//        invsX : function (i){
//         //defualting parameter e = e || 'default';
//         if  (i > 0){
//                if ( upper.sData[i].invsX===false && upper.sData[i].comColl===false){
//                   
//                    
//                 
//                 
//                    upper.sData[i].velY = upper.sData[i-1].velY-upper.gRate;
//                       upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*ig.game.aTick);
//                    upper.sData[i].velX=(upper.sData[i-1].velX)*-upper.loadedBallType.bounciness;
//                    
//                    
//                    
//                    
//                    
////                      upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*ig.game.aTick)
////                    upper.sData[i].velY = upper.sData[i-1].velY-ig.game.gRate    
////                    
////                   
////                    upper.sData[i].velX=(upper.sData[i-1].velX)*-upper.loadedBallType.bounciness
//               //  upper.sData[i].posX =upper.sData[i-1].posX-(upper.sData[i].velX*-ig.game.aTick)
//                    /*
//                    
//                    misscalcuation when a node[1] is inversed deriving from three walls inverses
//                    and then affected by an node[0] inverse 
//                    - x is solved too early
//                    
//                    */
//                    
//                    
//                    /*
//                    miscalcuation when a node[0] is inversed into the wall it derived from and
//                    the node[1] is plotted after the second bounce off 
//                    
//                    -y step too late or x step too early
//                    
//                    -POSSIBLILITY OF VINVERSION OFFSET INTENSITY!!!!
//                    
//                    */
//                    
//                    
//                    
//                    
//        /*            
//                              upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*ig.game.aTick)  
//            upper.sData[i].velX=(upper.sData[i-2].velX)*-upper.loadedBallType.bounciness
//            
//            works when a upmost node is affected by previous node before hitting wall
//            however does not work if one node is inversed after hitting wall
//            resulting
//            the col.y is solved a step too early
//            
//               */     
//                    
//                    }
//             
//             if (upper.sData[i].invsX===true ){
//                        upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*upper.aTick);
//                        upper.sData[i].velX=(upper.sData[i-1].velX)*-(upper.loadedBallType.bounciness);
//                        upper.sData[i].velY = upper.sData[i-1].velY-upper.gRate;
//                        upper.sData[i].posX =upper.sData[i-1].posX-(upper.sData[i].velX*-upperaTick);
//      }
//         
//                 if ( upper.sData[i].comColl===true){
//                   // upper.sData[i].velX=(upper.sData[i-1].velX)*-upper.loadedBallType.bounciness
//                    upper.sData[i].velX=(upper.sData[i-1].velX)*-upper.loadedBallType.bounciness//-ig.game.gRate
//                     upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*upper.aTick)
//                    //upper.sData[i].posY =  upper.sData[i-1].posY//-(upper.sData[i].velY*ig.game.aTick)
//                  //   upper.sData[i].comColl=false
//                    }
//         
//         }
////             
////             return console.log("gulp");
//             
//         },
//         
//        invsY: function (i){ 
//         //defualting parameter e = e || 'default';
//        if  (i > 0){
//                if ( upper.sData[i].invsY===false &&  upper.sData[i].comColl===false){
//                upper.sData[i].posX =  upper.sData[i-1].posX//-(upper.sData[i].velX*-ig.game.aTick)
//                upper.sData[i].velX=   upper.sData[i-1].velX 
//                upper.sData[i].velY = (upper.sData[i-1].velY)*-upper.loadedBallType.bounciness
//                }
//            if (upper.sData[i].invsY===true ) {
//              upper.sData[i].velY = (upper.sData[i-1].velY*-(upper.loadedBallType.bounciness))-upper.gRate
//              upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*upper.aTick)
//              upper.sData[i].posX =  upper.sData[i-1].posX-(upper.sData[i-1].velX*-upper.aTick)// fixes the trajecotry pathway after unfreeze but disloges on inverse when node is strained from border collision
//      }
//        
//        
//        
//        
//                  if ( upper.sData[i].comColl===true){
//                   // upper.sData[i].velX=(upper.sData[i-1].velX)*-upper.loadedBallType.bounciness
//                    upper.sData[i].velY = (upper.sData[i-1].velY-ig.game.gRate)*-upper.loadedBallType.bounciness//-ig.game.gRate
//                    upper.sData[i].posX =upper.sData[i-1].posX-(upper.sData[i].velX*-upper.aTick)
//                    upper.sData[i].posY =  upper.sData[i-1].posY//-(upper.sData[i].velY*ig.game.aTick)
//                    // upper.sData[i].comColl=false
//                    }
//         
//        
//        
//        }
//        },
//          
//        invsVel: function(i,xBouy,yBouy) {    
//          
//          
//                  
//            
//           
//
////                    
//          
//                       //upper.sData[i].posY= upper.sData[i-1].posY-(upper.sData[i].velY*upper.aTick)  
//                       
////                         upper.sData[i].velX= (upper.sData[i-1].velX)*-(upper.sData[i].xBouy)
////            upper.sData[i].velY= (upper.sData[i-1].velY*-(upper.sData[i].yBouy))-this.gRate
//                       
//                   upper.sData[i].velX= (upper.sData[i-1].velX)*-(xBouy)
//              upper.sData[i].velY= (upper.sData[i-1].velY*-(yBouy))-upper.gRate
//                       
//
//    //     upper.sData[i].velX=(upper.sData[i-1].velX)*-(upper.sData[upper.colData[upper.dirInc-1].orderOf].xBouy);
//  //      upper.sData[i].velY=(upper.sData[i-1].velY*-(upper.sData[upper.colData[upper.dirInc-1].orderOf].yBouy))-12;
//              
//           //    upper.sData[i].velX=(upper.sData[i-1].velX)*-(upper.colData[upper.dirInc].xBouy);
//             //  upper.sData[i].velY=((upper.sData[i-1].velY)*-(upper.colData[upper.dirInc].yBouy))-12;
//              
//              
//              upper.sData[i].posX= upper.sData[i-1].posX-(upper.sData[i].velX*-upper.aTick)
//              upper.sData[i].posY= upper.sData[i-1].posY-(upper.sData[i].velY*upper.aTick)
//
//              
//          
//              
//              
//            
//              
//                       //   ((upper.sData[i-1].velX)*-(upper.loadedBallType.bounciness*upper.sData[i-1].xBouy))==0 ? upper.sData[i].velX=(upper.sData[i-1].velX) : upper.sData[i].velX=(upper.sData[i-1].velX)*-(upper.loadedBallType.bounciness*upper.sData[i-1].xBouy);
//             // ((upper.sData[i-1].velY)*-(upper.loadedBallType.bounciness*upper.sData[i-1].yBouy))==0 ? upper.sData[i].velY=(upper.sData[i-1].velY-ig.game.gRate) : upper.sData[i].velY=(upper.sData[i-1].velY)*-(upper.loadedBallType.bounciness*upper.sData[i-1].yBouy);
//             
//                  
//            //  upper.sData[i].velX= (upper.sData[i-1].velX)*-(upper.loadedBallType.bounciness*upper.sData[i-1].xBouy)
//            //  upper.sData[i].velY= (upper.sData[i-1].velY*-(upper.loadedBallType.bounciness*upper.sData[i-1].yBouy))-ig.game.gRate
//            
//                  
//                  
//                ///VVV have extra pos.y on top to keep calibaration  
//                  
//                        //    upper.sData[i].posY= upper.sData[i-1].posY-(upper.sData[i].velY*ig.game.aTick) 
//                  
////                  upper.sData[i].velY= ((upper.sData[i-2].velY-(ig.game.gRate))*-(upper.sData[i-1].yBouy))
////            
////                        upper.sData[i].posY= upper.sData[i-1].posY-(upper.sData[i].velY*ig.game.aTick) 
////                       upper.sData[i].posX= upper.sData[i-1].posX-(upper.sData[i].velX*-ig.game.aTick)
////                       
////                       upper.sData[i].velX= (upper.sData[i-1].velX)*-(upper.sData[i-1].xBouy)        
//                  
//          /*
//                       upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*ig.game.aTick)
//                        upper.sData[i].velX=(upper.sData[i-1].velX)*-(upper.loadedBallType.bounciness)
//                        upper.sData[i].velY = upper.sData[i-1].velY-ig.game.gRate
//                        upper.sData[i].posX =upper.sData[i-1].posX-(upper.sData[i].velX*-ig.game.aTick)
//          
//          
//          */
//          
//          
//          
//          
//          
//        //  upper.sData[i].posY= upper.sData[i-1].posY-(upper.sData[i].velY*ig.game.aTick)
//                      
//    
//              //upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*ig.game.aTick)
//              //upper.sData[i].posX =  upper.sData[i-1].posX-(upper.sData[i-1].velX*-ig.game.aTick)// fixes the trajecotry pathw
//              
//              
//              /*
//              \
//               upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*ig.game.aTick)
//                        upper.sData[i].velX=(upper.sData[i-1].velX)*-(upper.loadedBallType.bounciness)
//                        upper.sData[i].velY = upper.sData[i-1].velY-ig.game.gRate
//                        upper.sData[i].posX =upper.sData[i-1].posX-(upper.sData[i].velX*-ig.game.aTick)
//              
//              
//              */
//              
//              
//              
//            
//            
//            
//         
//     },
//         
//        trace: function(i){
//             
//               
//    upper.sData[i].velX = upper.sData[i-1].velX        
//    upper.sData[i].velY = upper.sData[i-1].velY-upper.gRate
//    upper.sData[i].posX =upper.sData[i-1].posX-(upper.sData[i].velX*-upper.aTick)
//    upper.sData[i].posY =  upper.sData[i-1].posY-(upper.sData[i].velY*upper.aTick)
//
//             //upper.sData[i].comColl=false
//             
//             
//             
//         } 
//     }///////////////// this.sData.Fn.invsX(i)
//
//
//     
//     
//     
//    this.sData[i]=sPos
//}
//    
//    
//},
//  
//    
drawCallout: function(posX=0,posY=0,txt="a",atXt=15){
        
        var tSize=25;
                ig.system.context.font=tSize+"px Arial";
                ig.system.context.textAlign="center";
            var widthTx=((txt.length+1)*tSize);
            var lmt=atXt;
   
        
         txt2=txt.slice(0,(lmt)-1);
         txt3=txt.slice(lmt,txt.length);
        
             var ln=(widthTx/(lmt*tSize)).round()+1
        
             var rec={x:posX,y:posY};
     
             ig.system.context.fillStyle="white";
        
        var radius =20;
        var x =rec.x//+ig.game.screen.x;
        var y=rec.y-(tSize)//+ig.game.screen.y;
        var width=(lmt*tSize)-((tSize*4)+(lmt*6));
        var height=(tSize*2)+(ln*(tSize));
        
           ig.system.context.beginPath();
   ig.system.context.moveTo(x + radius, y);
   ig.system.context.lineTo(x + width - radius, y);
   ig.system.context.quadraticCurveTo(x + width, y, x + width, y + radius);
   ig.system.context.lineTo(x + width, y + height - radius);
               
        //right
       // ig.system.context.lineTo(x+(width), y+160);  
    //    ig.system.context.lineTo(x+(width), y+160);  
        //
        
   ig.system.context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        
        //middle
     //   ig.system.context.lineTo(x+(width/2), y+160);  
    //    ig.system.context.lineTo(x+(width/2), y+160);  
        
    ig.system.context.lineTo(x + radius, y + height);
                     //left
     //   ig.system.context.lineTo(x+40, y+160);  
     //   ig.system.context.lineTo(x+40, y+160);  
      //
        

   ig.system.context.quadraticCurveTo(x, y + height, x, y + height - radius);
   
        
   ig.system.context.lineTo(x, y + radius);
   ig.system.context.quadraticCurveTo(x, y, x + radius, y);

        
   ig.system.context.closePath();

     ig.system.context.fill();
  

     ig.system.context.stroke();
  
        
        
        
        
        
      //  ig.system.context.fillRect(rec.x+ig.game.screen.x,rec.y+ig.game.screen.y,(lmt*10)-60,50+(ln*5));
        
        
 
       ig.system.context.fillStyle="black";
             
             var speak=[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]];
             
        
        //detect the nearest space
        
            if(widthTx>lmt*tSize){
                
                    for(i=0;i<=ln;i++){
                     //   console.log(i);
                         {
                               
                              if(i==0){
                                  
                        speak[i][0]+=txt.slice(0,(lmt))
                                       
                            
                              }else{
                                  
                                  
                        speak[i][0]+=txt.slice(lmt*(i),(lmt)*(i+1))
                                  
                              
                              }
                           }
                        
                ig.system.context.fillText(speak[i], (rec.x+(lmt*tSize)/2)-((tSize*2)+(lmt*3)),(rec.y+tSize)+tSize*i);    
                        
                        
                        
                        
                    }
                
            }else{     ig.system.context.fillText(txt, (rec.x+(lmt*tSize)/2)-((tSize*2)+(lmt*3)),(rec.y+tSize)+tSize); }
   
        

        
        
    },

moveTo: function(x=0,y=0,rate=1){
        
        var camCom=ig.game.getEntitiesByType(EntityCamera)[0];
 
    
       if(camCom.viewPrev.x==0){camCom.viewPrev.x=camCom.view.x;}
       if(camCom.viewPrev.y==0){camCom.viewPrev.y=camCom.view.y;}
        
           console.log(camCom.viewPrev.x)
        
    
        var distance = Math.sqrt(Math.pow(x-camCom.viewPrev.x,2)+Math.pow(y-camCom.viewPrev.y,2));
        
        
        var directionX= (x-camCom.viewPrev.x)/distance;
        var directionY= (y-camCom.viewPrev.y)/distance;
        
      //  console.log("d:"+directionX)
     //  console.log(distance)
        
        camCom.view.x+= directionX*rate;
        camCom.view.y+= directionY*rate;
        
        if(Math.sqrt(Math.pow(camCom.view.x-camCom.viewPrev.x,2)+Math.pow(camCom.view.y-camCom.viewPrev.y,2)) >=distance   )
        {camCom.viewPrev.y=0;camCom.viewPrev.x=0;return this.isRunning=false;}
        
        
        //console.log("var1: "+Math.sqrt(Math.pow(camCom.view.x-camCom.viewPrev.x,2)+Math.pow(camCom.view.y-camCom.viewPrev.y,2))+" var2: "+distance)

//    if (x!==0 && y==0){    
//   if (x>0){
//   if(camCom.view.x<x+camCom.viewPrev.x){camCom.view.x+=rate; }else{camCom.viewPrev.x=0;return this.isRunning=false;}
//   }else{  if(camCom.view.x>=x+camCom.viewPrev.x){camCom.view.x-=rate; }else{camCom.viewPrev.x=0;return this.isRunning=false;}}
//    }
//
//        
//         if (y!==0 && x==0){    
//   if (y>0){
//   if(camCom.view.y<y+camCom.viewPrev.y){camCom.view.y+=rate; }else{camCom.viewPrev.y=0;return this.isRunning=false;}
//   }else{  if(camCom.view.y>=y+camCom.viewPrev.y){camCom.view.y-=rate; }else{camCom.viewPrev.y=0;return this.isRunning=false;}}
//    }
//        
//        
//        if (y!==0 && x!==0){ 
//        
//        if(y>0 && x>0){
//            
//            if(camCom.view.y<y+camCom.viewPrev.y || camCom.view.x<x+camCom.viewPrev.x){
//               if(camCom.view.y<y+camCom.viewPrev.y){camCom.view.y+=rate; }
//               if(camCom.view.x<x+camCom.viewPrev.x){camCom.view.x+=rate; }}else{camCom.viewPrev.y=0;camCom.viewPrev.x=0;return this.isRunning=false;}
//
//        }
//        
//           if(y<0 && x<0){
//            
//            if(camCom.view.y>=y+camCom.viewPrev.y || camCom.view.x>=x+camCom.viewPrev.x){
//               if(camCom.view.y>=y+camCom.viewPrev.y){camCom.view.y-=rate; }
//               if(camCom.view.x>=x+camCom.viewPrev.x){camCom.view.x-=rate; }}else{camCom.viewPrev.y=0;camCom.viewPrev.x=0;return this.isRunning=false;}
//
//        }
//        
//        
//        
//        }   
//        
        

        
        
  },
    
moveAnim: function(anim,x=0,y=0,rate=1){
        
var prev= {x:0,y:0};
  
anim.isMoving=true
        
     if(prev.x==0){prev.x= anim.x;}
      if(prev.y==0){prev.y=anim.y;}
        
      if( anim.mvx==0){anim.mvx= anim.x;}
      if(anim.mvy==0){anim.mvy=anim.y;}
        
        
        var distance = Math.sqrt(Math.pow(x-(anim.x),2)+Math.pow(y-(anim.y),2));
   
        var directionX= (x-(anim.x))/distance;
        var directionY= (y-(anim.y))/distance;
        
        


        if(Math.sqrt(Math.pow(anim.mvx-anim.x,2)+Math.pow(anim.mvy-anim.y,2)) >= distance   )
        { //1.5 desktop //1.25 mobile
  anim.x=(anim.mvx*1.5);anim.y=(anim.mvy*1.5);
         return anim.isMoving=false;
        }else{
                
anim.mvx+= directionX*rate;
anim.mvy+= directionY*rate;
            
ig.system.context.save();
ig.system.context.translate(  anim.mvx, anim.mvy);
ig.game.animEvent.draw(anim.mvx, anim.mvy);   
ig.system.context.restore();
              //ig.game.animEvent.moveAnim(x,y,1);
        }
      
    
  },
    
 
    
//        checkParticleCount: function (count) {
//        if (this.entities.length < count) {
//            this.spawnParticles(count - this.entities.length);
//        } else if (this.entities.length > count) {
//            this.entities.length = count;
//        }
//    },
    
    
    // skip over spawnEntity since it does
    // more than we need
//    spawnParticles: function (count,x,y) {
//        var particleWidth = EntityParticleFast.prototype.size.x;
//        var particleHeight = EntityParticleFast.prototype.size.y;
//
//
//        for (var i = 0; i < count; i++) {
//            
//            this.entities.push(
//                new EntityParticleFast(x,y)
//            );
//
//        
//           
//                //  ig.game.entities[i]._killed=false;
//      
//        }
//        
//        
//    },
    
//    
//    	removeParticles: function( ) {
//
//            for(var i=0; i < ig.game.entities.length;i++)
//                {
//                    if ( ig.game.entities[i].particle===true 
//                    ){
//                        
//                        ig.game.entities[i]._killed=true;
//                    
//
//                     }
//                    
//                }  
//            
//	},
//    
//    
//        reactivateParticles: function(){
//               
//                       for(var i=0; i < ig.game.entities.length;i++)
//                {
//                    if ( ig.game.entities[i].particle===true 
//                    ){
//                        
//                        ig.game.entities[i]._killed=false;
//                    
//
//                     }
//                    
//                }  
//               
//           }, 
    

    // ig.Game.run calls update and draw separately
    // let's override that and call them both in one loop
    // let's remove collision detection/resolution, background maps
    // and entities array management
//    run: function () {
//        this.checkParticleCount(~~this.TOTAL_PARTICLES);
//
//        // in-line clear canvas call to remove
//        // overhead of function call
//        // use clearRect vs fillRect
//        ig.system.context.clearRect(0, 0, ig.system.realWidth, ig.system.realHeight);
//
//        // update and draw in one go!
//        for (var i = 0, len = this.entities.length; i < len; i++) {
//            var ent = this.entities[i];
//            ent.update();
//            ent.draw();
//        }
//
//        //this.fps.tick();
//    },
//    
//     
	});

	
MainMenu = ig.Game.extend({
menuText: new ig.Font ('media/04b03.font.png'),
background: new ig.Image('media/titleScreen.png'),
newGame_b: {x:50,y:150,w:150,h:50},
loadGame_b: {x:50,y:150,w:150,h:50},
movieGame_b:{x:50,y:205,w:150,h:50},
newGame: false,
loadGame: false, 
movieGame: false,
test:false,
    
init: function(){

ig.input.bind(ig.KEY.MOUSE1, 'click');

},

update: function() {
	
	  var scale= ig.system.scale/2;
	
	if (ig.input.pressed ('click')&&
        this._inParameter(this.newGame_b.x,this.newGame_b.y,this.newGame_b.w,this.newGame_b.h)==true)
	{
		storage.set('points',0)
		storage.set('gameMode',0)
		storage.set('round',0)
		ig.system.setGame(MyGame)

    } 
		

	if (ig.input.pressed ('click')
		&& this._inParameter(this.loadGame_b.x,this.loadGame_b.y,this.loadGame_b.w,this.loadGame_b.h,))
	
	{
		ig.system.setGame(MyGame)} 
		
    
    	if (ig.input.pressed ('click')
		&& this._inParameter(this.movieGame_b.x,this.movieGame_b.y,this.movieGame_b.w,this.movieGame_b.h))
	
	{
		ig.system.setGame(MoviePlays)} 
		
	
	this.parent();

},
    
draw: function() {
        this.parent();
//if(ig.gui.show ) ig.gui.draw();
    
    var scale= (ig.system.scale);
  //  var offset= 2//(this.newGame_b.w/this.newGame_b.x)/(4/ig.system.scale) //((ig.system.scale)/4)==1 ? (1.5) :1;
  //  var offsetSc=2//(this.newGame_b.x/4)*ig.system.scale/2;
 //  console.log(ig.game._rscreen.x)
    
    this.background.draw(0,0);
    
//		ig.system.context.beginPath();// (yOffset-10)
//				ig.system.context.rect(0,0,240*ig.system.scale,320*ig.system.scale);
//				ig.system.context.fillStyle="white";
//				ig.system.context.fill();	
//				
			ig.system.context.beginPath();// (yOffset-10)
				ig.system.context.rect(this.newGame_b.x*scale,this.newGame_b.y*scale,
                                       (this.newGame_b.w*scale),
                                       this.newGame_b.h*scale);
				ig.system.context.fillStyle="#c04809";
				ig.system.context.fill();	
    
    
//    		ig.system.context.beginPath();// (yOffset-10)
//				ig.system.context.rect(this.loadGame_b.x*scale,this.loadGame_b.y*scale,
//                                       (this.loadGame_b.w*scale),
//                                       this.loadGame_b.h*scale);
//				ig.system.context.fillStyle="blue";
//				ig.system.context.fill();	
//    
    
    		ig.system.context.beginPath();// (yOffset-10)
				ig.system.context.rect(this.movieGame_b.x*scale,this.movieGame_b.y*scale,
                                       (this.movieGame_b.w*scale),
                                       this.movieGame_b.h*scale);
				ig.system.context.fillStyle="#c04809";
				ig.system.context.fill();	
    
    
    
//			ig.system.context.beginPath();// (yOffset-10)
//				ig.system.context.rect(this.loadGame_b.x-100,this.loadGame_b.y,200*scale,100*scale);
//				ig.system.context.fillStyle="blue";
//				ig.system.context.fill();	
//					ig.system.context.beginPath();// (yOffset-10)
//				ig.system.context.rect(this.movieGame_b.x-100,this.movieGame_b.y,200*scale,100*scale);
//				ig.system.context.fillStyle="yellow";
//				ig.system.context.fill();	
//				
        this.menuText.draw( "Play Game",this.newGame_b.x+(this.newGame_b.w/2), this.newGame_b.y+(this.newGame_b.h/2), ig.Font.ALIGN.CENTER );
//		 this.menuText.draw( "Load Game",this.loadGame_b.x+(this.loadGame_b.w/2), this.loadGame_b.y+(this.loadGame_b.h/2), ig.Font.ALIGN.CENTER );
    
    
		 this.menuText.draw( "How to Play",this.movieGame_b.x+(this.movieGame_b.w/2), this.movieGame_b.y+(this.movieGame_b.h/2), ig.Font.ALIGN.CENTER );

},

_inParameter: function(b_posX,b_posY,wide,height) {
return (
//ig.input.mouse.x + ig.game.screen.x > b_posX-(wide/2) &&
 
//ig.input.mouse.x + ig.game.screen.x < b_posX+(wide/2) &&
    
ig.input.mouse.x + ig.game.screen.x > b_posX &&
 
ig.input.mouse.x + ig.game.screen.x < b_posX+(wide) &&
    
ig.input.mouse.y + ig.game.screen.y > b_posY &&

ig.input.mouse.y + ig.game.screen.y < b_posY+height

)},




});	
	
    
MoviePlays = ig.Game.extend({
    
init: function(){
this.loadLevel(LevelMovieTestlvl);
ig.input.bind(ig.KEY.MOUSE1, 'click');
        if ( this.getEntitiesByType( 'EntityVideo' ) == 0){
	    ig.game.spawnEntity("EntityVideo",-125,0)
        
        }
  
    
    

	
},    
    


   
    

    
});    
    
EndGame = ig.Game.extend({
menuText: new ig.Font ('media/04b03.font.png'),
background: new ig.Image('media/titleScreen.png'),
newGame_b: {x:50,y:230,w:150,h:50},
score: {x:25,y:100,w:200,h:120},
comboRText:  new ig.Font('media/comboRed.font.png'),
newGame: false,
movieGame: false,
test:false,
    
init: function(){

ig.input.bind(ig.KEY.MOUSE1, 'click');
   
//    console.log(canvas);
   
 //   document.write('<img src="'+img+'"/>');
    
},

update: function() {
	
	  var scale= ig.system.scale/2;
	
	if (ig.input.pressed ('click')&&
        this._inParameter(this.newGame_b.x,this.newGame_b.y,this.newGame_b.w,this.newGame_b.h)==true)
	{
		storage.set('points',0);
		storage.set('gameMode',0);
		storage.set('round',0);
		ig.system.setGame(MyGame)

    } 
		
	if (ig.input.pressed ('click')&&
        this._inParameter(this.score.x,this.score.y,this.score.w,this.score.h)==true)
        
	{ 
        
        var canvas= document.getElementById("canvas");
   //  var img    = canvas.toDataURL("image/png");
         var img    = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    // window.location.href=img;
   
 //  var ref=window.href=img;     
        
   // var window = window.open();
//window.document.write('<img src="'+img+'"/>');
        
     
        ig.global.shareImg(img);
        

//        

        
        
//           document.write('<img id="score" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0;margin: auto;	" src="'+img+'"/> <script>async src="https://static.addtoany.com/menu/page.js";a2a_config.overlays = a2a_config.overlays || [];a2a_config.overlays.push({ services: ['pinterest', 'facebook', 'houzz', 'tumblr'],   size: '50',style: 'horizontal',  position: 'top center'});</script>');
        

     //  var u=document.getElementById("score");
       //var u='http://localhost:8080'
////        
//            document.write('   <a href="http://www.facebook.com/sharer.php?u='+window.location.href+'"><img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" /> </a>')
//        
            //   document.write('   <a href="http://www.facebook.com/sharer.php?u='+ref+'"><img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" /> </a>')
//        
        
//           
//        document.write('   <a href=https://www.facebook.com/dialog/share?app_id={app-id}&display=popup&href={'+encodeURIComponent(u)+'}&redirect_uri={redirect-uri}><img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" /> </a>')
//        
//        
        
	//ig.system.setGame(PostScore);href="http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'
    } 
		
	
	this.parent();

},
    
draw: function() {
        this.parent();
//if(ig.gui.show ) ig.gui.draw();
    
    var scale= (ig.system.scale);

    
//                var para = document.createElement("P");
//    var t = document.createTextNode("This is a paragraph.");
//    para.appendChild(t);
//    document.body.appendChild(para);

    this.background.draw(0,0);
    
    			ig.system.context.beginPath();// (yOffset-10)
				ig.system.context.rect(this.score.x*scale,this.score.y*scale,
                                       (this.score.w*scale),
                                       this.score.h*scale);
				ig.system.context.fillStyle="grey";
				ig.system.context.fill();	
    
   

			ig.system.context.beginPath();// (yOffset-10)
				ig.system.context.rect(this.newGame_b.x*scale,this.newGame_b.y*scale,
                                       (this.newGame_b.w*scale),
                                       this.newGame_b.h*scale);
				ig.system.context.fillStyle="#c04809";
				ig.system.context.fill();	
    
    

//				
        this.menuText.draw( "Play Again?",this.newGame_b.x+(this.newGame_b.w/2), this.newGame_b.y+(this.newGame_b.h/2), ig.Font.ALIGN.CENTER );
    
        this.menuText.draw( "Thanks for playing your Score was:",this.score.x+(this.score.w/2), 
                           this.score.y+((this.score.h/2)-50), ig.Font.ALIGN.CENTER );
    ig.game.comboRText.scaleFont = .5;
 this.comboRText.draw(storage.getInt('points'),this.score.x+(this.score.w/2), 
                           this.score.y+((this.score.h/2)), ig.Font.ALIGN.CENTER );


},

_inParameter: function(b_posX,b_posY,wide,height) {
return (
//ig.input.mouse.x + ig.game.screen.x > b_posX-(wide/2) &&
 
//ig.input.mouse.x + ig.game.screen.x < b_posX+(wide/2) &&
    
ig.input.mouse.x + ig.game.screen.x > b_posX &&
 
ig.input.mouse.x + ig.game.screen.x < b_posX+(wide) &&
    
ig.input.mouse.y + ig.game.screen.y > b_posY &&

ig.input.mouse.y + ig.game.screen.y < b_posY+height

)},




});	
	


    
 MyLoader = ig.Loader.extend({

    draw: function() {
ig.system.resize(240,320,2)
    }
});
    
    

    
//ig.main( '#canvas', MainMenu, 30, 640, 480, 1);
    

    
    
 if( ig.ua.mobile ) {
    ig.Sound.enabled = true;
     /*
     THIS IS GOING TO REQUIRE A COMPLETE OVERHAUL FOR 
     MOBILE IMPENMENTATION
     
     */
     var canvas = document.getElementById('canvas');
     
     window.innerHeight.limit(1740,1800);
    
     if(window.innerHeight > 1800)window.innerHeight = 1800;
     
     
     
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';

window.addEventListener('resize', function() {
    if (!ig.system) { return; }

    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
}, false);

//    
//
//     
     
    // All other mobile devices
   //  ig.main( '#canvas', ComicAnim, 60, 240, 320,4);
 //    ig.main( '#canvas', ComicAnim, 60, 240, 320,4,MyLoader);
    //ig.main('#canvas', MyGame, 60, 240, 320, 4);
    ig.main('#canvas', MainMenu, 60, 240, 320, 4);
    //  ig.system.context.scale( 2, 2 );
    // ig.system.context.restore();
      //           width: 960px;
	//height: 1280px;

     
}
else {
    // Desktop browsers
    //ig.main( '#canvas', ComicAnim, 60, 240, 320, 2);
  ig.main( '#canvas', MainMenu, 60, 240, 320, 2);
 //  ig.main( '#canvas', MyGame, 60, 240, 320, 2);
//    ig.system.context.scale( 2, 2 );
    //     ig.system.context.restore();
//      ig.system.context.restore();
}
  
    //320x240
    // 480, 640
    
//ig.main( '#canvas', MyGame, 60, 640, 480, 1);
    
//   ig.main( '#canvas', MyGame, 60, 240, 320, 2);
});


























///JUNKED 



//rebuildColDat: function(sel,ind){
//
//
//         var index=sel;
//         //var k= ig.game.dirInc//ig.game.colData.length-1;    
//         var k= ig.game.colData.length-1;    
//        
//             
//          this.colData[k].orderOf= sel//grab index of sData 
//        
//          this.colData[k].posX =this.sData[sel-1].posX;
//          this.colData[k].posY =this.sData[sel-1].posY;
//        
//    
///*
//? use XOr switching for ordering? 
//
//Decending order 
//
//*/
//    
//    
////if (this.colData[0].orderOf !== null){
////    
//////    if (this.colData[k].orderOf >
//////        this.colData[0].orderOf )
//////        {
////////            this.XOR(this.colData[0].orderOf,this.colData[k].orderOf)
////////            this.XOR(this.colData[0].orderOf,this.colData[k].orderOf)
////////            this.XOR(this.colData[0].orderOf,this.colData[k].orderOf)
////////           
//////                
//////                
//////                this.colData[k].orderOf^=this.colData[0].orderOf^(this.colData[0].orderOf=this.colData[k].orderOf);
//////            
////////          this.colData[0].orderOf= 0
////////          this.colData[0].posX =0
////////          this.colData[0].posY =0
//////            
//////            console.log(     this.colData[k].orderOf)
//////            
//////            
//////        }
////
////    
////    
////    
////var j =0;    
//    
//    //get rid of while loop
//   //add in another ilterator j where j=i/length check if whole number by using j%1==0 
//   // if j%1 == 0; i =0 (re-loop) unitl j==length  
//    
////while (j < ig.game.colData.length * ig.game.colData.length)    {
////    for (i=0; i <ig.game.colData.length; i++)
////        {
////            
////            
////            if (this.colData[i].orderOf !== null && i !==0 && this.colData[i].orderOf > this.colData[i-1].orderOf ){
////                
////               
////                 //this.xOrSwap(this.colData[i].orderOf,this.colData[i-1].orderOf )   
////                
////               
////                (this.colData[i-1].orderOf^=this.colData[i].orderOf^(this.colData[i].orderOf=this.colData[i-1].orderOf));
////                 
////
////        }
////            
////            if (this.colData[i].orderOf !== null){
//////                   this.colData[i].posX =this.sData[this.colData[i].orderOf].posX;
//////    this.colData[i].posY =this.sData[this.colData[i].orderOf].posY;
//////                
//////            var temp; temp= this.colData[i].orderOf    
//////                
//////                            this.sData[temp].invsX = (
//////                              1+(  this.sData[temp].posX+this.sData[temp].posY).round(4) === 
//////                                (this.colData[i].posX +this.colData[i].posY).round(4)+this.colData[i].invsX) 
//////                
//////                //this.sData[this.colData[i-1].orderOf].invsX=true;
////            }
////                j++
////            
////            
////            
////        }
////         
////    
////
////}
////    
////    
////   
////    
////    
////    
////}else
////    {         
////        
////        
//////        this.colData[0].orderOf= sel//grab index of sData 
//////          this.colData[0].posX =this.sData[sel-1].posX;
//////          this.colData[0].posY =this.sData[sel-1].posY;
//////        
////        }
////  
////    var tempa;
////    tempa = (ig.game.dirInc)
////    
////    
////    this.colData[ig.game.dirInc].posX =this.sData[index].posX;
////    this.colData[ig.game.dirInc].posY =this.sData[index].posY;
////                
////            var temp; temp= this.colData[ig.game.dirInc].orderOf    
////                
////                            this.sData[index].invsX = (
////                              1+(  this.sData[index].posX+this.sData[index].posY).round(4) === 
////                                (this.colData[ig.game.dirInc].posX +this.colData[ig.game.dirInc].posY).round(4)+this.colData[ig.game.dirInc].invsX) 
////                
//                //this.sData[this.colData[i-1].orderOf].invsX=true;
//    
//    
//    
//    
//    
////                  this.colData[ig.game.dirInc].posX =this.sData[this.colData[ig.game.dirInc].orderOf].posX;
////    this.colData[ig.game.dirInc].posY =this.sData[this.colData[ig.game.dirInc].orderOf].posY;
////    
////    
////  if   ( this.colData[ig.game.dirInc].invsX ===true) this.sData[this.colData[ig.game.dirInc].orderOf].invsX = true;
//    
////    this.sData[i].invsX = (
////                              1+(  this.sData[i-1].posX+this.sData[i-1].posY).round(4) === 
////                                (this.colData[j].posX +this.colData[j].posY).round(4)+this.colData[j].invsX) 
//    
//    
//   // console.log(this.sData[this.colData[ig.game.dirInc].orderOf].invsX )
//    
//            ig.game.colData.sort(function(a, b) {
//                
//                    //return a.orderOf > b.orderOf ? -1 : (a.orderOf < b.orderOf ? 1 : 0);
//                
//                return (b.orderOf) - (a.orderOf);
//                               
//                                                });
////   
//         
//        // console.log( this.colData[k].orderOf) 
//        //  console.log( ig.game.colData[0].orderOf) 
//        // console.log("0: "+ (this.sData[this.colData[0].orderOf].posX+this.sData[this.colData[0].orderOf].posY).round(4)+"||     "+(this.colData[0].posX +this.colData[0].posY).round(4))
//        //console.log("0: "+ (this.sData[this.colData[0].orderOf].posX+this.sData[this.colData[0].orderOf].posY).round(4)+"||     "+(this.colData[0].posX +this.colData[0].posY).round(4))
//
//  
//         
//     },
//  



























//     case 15:{ // full boxed collision what a fucking mess
//    //fix corner collisions
////	if(
////           // this.sData[i].posX + offset < bxTwo &&
////        //    this.sData[i].posX > bxOne &&
////			this.sData[i].posY <= byTwo &&
////			this.sData[i].posY + offsetY >= byOne  
////    
////    )
//               //{     
//                   
//        
//		   if (this.sData[i].posX > bxOne && (this.sData[i].posX+offset) < bxTwo 
//               
//              // && this.sData[i].posY <= byTwo
//           //    && this.sData[i].posY + offsetY >= byOne  
//              
//              )  {
//               
//       //         hits  bottom of box works but with a unknown manual solution
//            if (//this.isIntersecting(this.sData[i-2].posX,this.sData[i-2].posY,this.sData[i].posX,this.sData[i].posY, bxOne,byTwo,bxTwo,byTwo)
//                this.sData[i-1].posY > byTwo && 
//               this.sData[i].posY < byTwo && 
//                this.sData[i-1].posY-offsetY  > byOne  &&
//               this.sData[i].posY-offsetY > byOne 
//                
//                && segDisdy.round(0)  <= segDis2dy.round(0) 
//               )  {
//     // this.sData[i].invsY=true
//      
//                  //this.sData[i].posY =byTwo;
//                this.sData[i].comColl=true
//            this.sData[i].Fn.invsY(i);
//         //   this.sData[i].velY+=8.4  //???? a>6 a>8(-.16)  a<8.8(.16) a<9(.024)
//           this.sData[i].posY =byTwo;
//      //      this.sData[i].posX =  this.sData[i].posX-(this.sData[i].velX*-ig.game.aTick);
//                 }
//                    //.144
//               
// //hits top of box surfurce IMPERFECT COLLISION WHILE GLIDING SURFACE             
//            if ( //this.isIntersecting(this.sData[i-2].posX,this.sData[i-2].posY+offsetY,this.sData[i].posX,this.sData[i].posY+offsetY, bxOne,byOne,bxTwo,byOne)
//                
//                this.sData[i-1].posY < byOne && 
//               this.sData[i].posY+offsetY > byOne && 
//                this.sData[i-1].posY  < byTwo  &&
//               this.sData[i].posY < byTwo 
//                
//                
//                
//               && segDisdy.round(0)  <= segDis2dy.round(0) 
//               )    {
//               //   this.sData[i].invsY=true
//                this.sData[i].comColl=true
//            this.sData[i].Fn.invsY(i); 
//            this.sData[i].posY =byOne-(offsetY)
//            }
//
//           }
//                   
//                   
////        if (	this.sData[i].posY+ offsetY > byTwo && this.sData[i].posY < byOne ){
////              
////            if (this.isIntersecting(this.sData[i-1].posX+offset,this.sData[i-1].posY,this.sData[i].posX+offset,this.sData[i].posY, bxOne,byOne,bxOne,byTwo)
////                && segDisd >= segDis2d)  {//leftside
////            
////                  this.sData[i].comColl=true
////                   this.sData[i].Fn.invsX(i);
////            this.sData[i].posX =bxOne-offset;
////            
////            
////        }
////        
////        
////        }
////               
////               
//               
//               
//             // }//
// 
//                if (	this.sData[i].posY+ offsetY <= byTwo && this.sData[i].posY >= byOne ){//30
//                    
//                    
//                           if (// this.isIntersecting(this.sData[i-1].posX+offset,this.sData[i-1].posY,this.sData[i].posX+offset,this.sData[i].posY, bxOne,byOne,bxOne,byTwo)  
//                               this.sData[i-1].posX+offset < bxOne &&  this.sData[i].posX+offset > bxOne
//                     && segDisd.round(0) >= segDis2d.round(0) )  {//leftside
//            
//                  this.sData[i].comColl=true
//                   this.sData[i].Fn.invsX(i);
//            this.sData[i].posX =bxOne-offset;
//            
//            
//        }
//               
//                            if (//       this.isIntersecting(this.sData[i-1].posX,this.sData[i-1].posY,this.sData[i].posX,this.sData[i].posY, bxTwo,byOne,bxTwo,byTwo)
//                           this.sData[i-1].posX > bxTwo &&  this.sData[i].posX <= bxTwo
//                && segDisd.round(0) >= segDis2d.round(0))  {//rightside
//            
//                  this.sData[i].comColl=true
//                   this.sData[i].Fn.invsX(i);
//            this.sData[i].posX =bxTwo;
//            
//            
//        }             }
//         
//         
//         
//        //is within it? well shit what are we gonna do 
//         
//         if (	this.sData[i].posY+ offsetY <= byTwo && 
//             this.sData[i].posY >= byOne  && 
//         this.sData[i].posX + offset > bxOne
//             && this.sData[i].posX < bxTwo
//         ){              
//             var xCenter,yCenter 
//             xCenter =  ((bxTwo-bxOne)/2)+ bxOne
//             yCenter = ((byTwo-byOne)/2)+ -byTwo 
//                       //calculate which X or Y is closer to centers 
//             xDist= Math.sqrt(Math.pow((this.sData[i].posX-xCenter),2)+(Math.pow(yCenter,2)));
//             yDist=Math.sqrt((Math.pow(xCenter,2)+Math.pow((this.sData[i].posY-yCenter),2)));
//             
//   
////             if (i === 80)
////                 {console.log(
////                //    "offX:  "+  Math.abs(this.sData[i].posX-(xCenter+yCenter))
////                // +"    offY:    "+ Math.abs((xCenter+yCenter)-this.sData[i].posY
////                  
////                      "offX:  "+Math.sqrt(Math.pow((this.sData[i].posX-xCenter),2)+(Math.pow(yCenter,2)))+
////                      "    offY:    "+Math.sqrt((Math.pow(xCenter,2)+Math.pow((this.sData[i].posY-yCenter),2))
////                                           
////                                           )
////                     
////                     
////                     
////                 )
////                 console.log(xCenter)
////                 
////                 }
//             
//             if (xDist < yDist){
//             
//             
//             if (xCenter > this.sData[i].posX){       this.sData[i].posX =bxOne-offset; this.sData[i].Fn.invsX(i);}
//             if (xCenter < this.sData[i].posX){      this.sData[i].posX =bxTwo;  this.sData[i].Fn.invsX(i);}
//             }else
//                 {
//            
//             if (yCenter > this.sData[i].posY){          this.sData[i].posY =byTwo; this.sData[i].Fn.invsY(i);}
//             if (yCenter < this.sData[i].posY){      this.sData[i].posY =byOne-(offsetY);  this.sData[i].Fn.invsY(i);}
//                     
//                     
//                     
//                 }
//             
//             
//             //
//            // if ()// use center of compoement as reference 
//             //((bxTwo-bxOne)/2)+bxOne //xCenter 
//            // ((byTwo+byOne)/2)-byTwo //yCenter 
//             
//             
//             this.sData[i].comColl=true
//             
//             
//         }
//         
         
         
    
         
         
         
         
        
           /// if (	this.sData[i].posY+ offsetY > byTwo && this.sData[i].posY < byOne ){
                   
//                if (this.isIntersecting(this.sData[i-1].posX+offset,this.sData[i].posY,this.sData[i].posX+offset,this.sData[i].posY, bxOne,byOne,bxOne,byTwo)
//                && segDisd >= segDis2d)  {
//    
//            this.sData[i].Fn.invsX(i);
//            this.sData[i].posX =bxOne-offset;
//            this.sData[i].posY =  this.sData[i-1].posY//-(this.sData[i-1].velY*ig.game.aTick)
//       
//         
//                 }//}
                    //.144
               
 //hits top of box surface contact is messup              
//            if ( this.isIntersecting(this.sData[i-1].posX,this.sData[i-1].posY,this.sData[i].posX,this.sData[i].posY, bxOne,byOne,bxTwo,byOne))    {
//            this.sData[i].Fn.invsY(i); 
//            this.sData[i].posY =byOne-(offsetY)
//            }
                
                

               
	// Horizontal collision
//	else if(
//		this.pos.y + this.size.y > testC.pos.y &&
//		this.pos.y < testC.pos.y + testC.size.y
//	){
//		// Which one is on the left?
//		if( this.pos.x < testC.pos.x ) {
//		this.pos.x = testC.pos.x
//		}
//		else {
//		this.pos.x = testC.pos.x + testC.size.x
//		}
//this.vel.x  *=-this.bounciness;
//	}
//         
         
         
         
   //  }break;
         
    



//
//	if(
//         
////                this.sData[i].posX <= bxTwo &&
////			this.sData[i].posX + offset >= bxOne &&
//            this.sData[i].posX + offset < bxTwo &&
//            this.sData[i].posX > bxOne &&
//			this.sData[i].posY <= byTwo &&
//			this.sData[i].posY + offsetY >= byOne 
//        
////	//	this.pos.x + this.size.x > testC.pos.x &&
////        this.sData[i].posX + offset < bxTwo &&
////	//	this.pos.x < testC.pos.x + testC.size.x &&
////		this.sData[i].posX > bxOne 
//      
//
//      )
//               {     
//                   
//        
//		   if (this.sData[i].posX + offset > bxOne && this.sData[i].posX < bxTwo )  {
//           
//               
//               
//               
//       //         hits  bottom of box works but with a unknown manual solution
//            if (
////                this.sData[i-1].posY < byTwo && segDisdy <= segDis2dy && 
////               this.sData[i].posY < byTwo && 
////                this.sData[i-1].posY-offsetY  > byOne  &&
////               this.sData[i].posY-offsetY > byOne &&
//                   this.isIntersecting(this.sData[i-2].posX,this.sData[i-2].posY,this.sData[i].posX,this.sData[i].posY, bxOne,byTwo,bxTwo,byTwo)
//                && segDisdy <= segDis2dy 
//                
//                //&& this.sData[i-1].velY > 0 
//                
//               )  {
//            //this.sData[i-1].posY =byTwo//reason for this is to resync with xPos 
//            //this.sData[i-2].posY =byTwo 
//           // this.sData[i].posX = this.sData[i-1].posX
//                 
//           this.sData[i].Fn.invsY(i);
//            this.sData[i].velY+=8.4  //???? a>6 a>8(-.16)  a<8.8(.16) a<9(.024)
//            this.sData[i].posY =byTwo;
//          //.0336
//           
//                  this.sData[i].posX =  this.sData[i].posX-(this.sData[i].velX*-ig.game.aTick);
//                
//            }
//                    //.144
//               
// //hits top of box surface contact is messup              
//            if ( //segDisdy >= segDis2dy &&
//                    this.isIntersecting(this.sData[i-1].posX,this.sData[i-1].posY,this.sData[i].posX,this.sData[i].posY, bxOne,byOne,bxTwo,byOne)
////                this.sData[i-1].posY > byOne-(offsetY) && segDisdy >= segDis2dy &&
////               this.sData[i].posY >  byOne-(offsetY) &&
////                this.sData[i-1].posY < byTwo && 
////               this.sData[i].posY < byTwo
////                && this.sData[i-1].velY < 0
////                
//                
//               )    {
//            this.sData[i].Fn.invsY(i); //this.sData[i].velY-=8.4 
//            //this.sData[i-1].posY =byOne-(offsetY)//reason for this is to resync with xPos 
//            this.sData[i].posY =byOne-(offsetY)
//            }
//
//           }
//                   
//                   
//                   
//                   //else{ this.sData[i].collV =false;}
//
//	
//                   
//                   
//                   
//               }






























//         if (this.sData[i].posX <= xlft && this.sData[i-1].posX >  xlft ||
//             this.sData[i].posX+45 >=  xrht && this.sData[i-1].posX+45 <  xrht ||
//             this.sData[i].posY >= yblw && this.sData[i].posY != yblw ||
//             this.sData[i].posY <= yabv && this.sData[i].posY != yabv
//            ){}
         
            
//    if( this.sData[i].posX <=  0  && this.sData[i-1].posX >  0
//       ||this.sData[i].posX+45 >=  ig.game.gameDimesion.xLevel && this.sData[i-1].posX+45 <  ig.game.gameDimesion.xLevel)
//        
        
//         switch (operation) {
//         
//             case 1: {          
//        if (this.sData[i].posX <= xlft && this.sData[i-1].posX >  xlft )
//              {    
//                  if (segDisd.round(0) >= segDis2d.round(0) ){
//                      this.sData[i].posX = xlft; this.sData[i].collH = true;
//              }else{this.sData[i].collH = false;  }}else{this.sData[i].collH = false;  }}
//         break;
//            
//             case 2: {           
//        if (this.sData[i].posX+45 >= xrht && this.sData[i-1].posX+45 <  xrht )
//              {   
//                  if (segDisd.round(0) >= segDis2d.round(0) ){this.sData[i].posX = xrht;
//                      this.sData[i].collH = true;
//              }else{this.sData[i].collH = false;  }}else{this.sData[i].collH = false;   }}
//         break;
//            
//            
//            case 3: {  
//             if( this.sData[i].posY >= yblw && this.sData[i-2].posY < yblw ) {
//        if (segDisdy  >= segDis2dy ){ 
//        this.sData[i].posY =yblw; this.sData[i-1].posY =yblw; this.InverseVvel(i);
//}else {this.TraceNodes(i);    }}else {this.TraceNodes(i);    }} break;
//        
//             case 4:{// this is not going to be used 
//         }break;
//                
//            case 10: {
//                
//                
//                
//            }break;
//         }



   //vRate = 300*ig.game.loadedBallType.phyTime.delta()
    //hRate = -5*ig.game.loadedBallType.phyTime.delta()
    
    
   
    
      //  if (this.sData[i-1].collH ===false && this.sData[i-1].collV ===false )        
     // { this.sData[i].tail =this.sData[i-1].tail }
    


    
//    if(this.sData[i].collH ===true){
//    this.sData[i].velX=(this.sData[i-1].velX*-ig.game.loadedBallType.bounciness)
//    this.sData[i].velY = this.sData[i-1].velY-ig.game.gRate
//    this.sData[i].posY =  this.sData[i-1].posY+(-this.sData[i].velY*ig.game.aTick)
//
//    }
////            this.sData[i-1].velX > 0 ?( 
////    this.sData[i].posX =(this.sData[i-1].posX-((this.sData[i].velX*-ig.game.aTick)
////                                              ))):
////  this.sData[i].posX =(this.sData[i-1].posX-((this.sData[i].velX*-ig.game.aTick)
////                                            ))
//
//    if (this.sData[i].collH ===false && this.sData[i].collV ===false){
//       hRate = 5*(ig.game.loadedBallType.phyTime);
//        vRate =(300*ig.game.loadedBallType.phyTime);
//        
//this.sData[i].velX =    ig.game.getEntitiesByType(EntitySling)[0].maxVelocityX+(hRate+.2*i)       
//this.sData[i].velY =    ig.game.getEntitiesByType(EntitySling)[0].maxVelocity-(vRate+(ig.game.gRate*i))   
//    this.sData[i].posX =this.sData[i-1].posX-(this.sData[i].velX*-ig.game.aTick)
//    this.sData[i].posY =  this.sData[i-1].posY-(this.sData[i].velY*ig.game.aTick)
//    }
    
    
    
//////////////////////////////////////////////////////////////////////////////////////////////
     
//checkBorders : function(i,xlft,xrht,yabv,yblw){
//         
//             var adx,ady,bdx,bdy,cdx,cdy,segDisd,segDis2d,segDisdy,segDis2dy,operation
//             
//             
//             
//operation =
//    ((typeof xlft !== 'undefined')*1)+
//    ((typeof xrht !== 'undefined')*2)+
//    ((typeof yabv !== 'undefined')*3)+
//    ((typeof yblw !== 'undefined')*4)
////console.log(operation)
//
//// 1 - right border only   10 - box 
//// 2 - left border only
//// 3 - above border only
//// 4 - below border only 
//// rest of the numbers are usless              
//            
//    
//    
// /*
// DEPRECATED THE (2-d) DISTANCE EQUATION 
// the 2-d distance equation of x & y seems more buggish than 
// the 1-d distance x & x.
// 
// 1-D checking , 2-D checking 
// border         box
// 
// */   
//        
//          
//    
//    adx = this.sData[i-2].posX;
//    bdx = this.sData[i-1].posX;
//    cdx = this.sData[i].posX;
//        
//        segDisd = Math.abs(adx - bdx).round(0);
//        segDis2d= Math.abs(cdx - bdx).round(0);         
//         
//    ady = this.sData[i-2].posY;
//    bdy = this.sData[i-1].posY;
//    cdy = this.sData[i].posY;
//        
//        segDisdy = (-ady + bdy).round(0);
//       segDis2dy = (-bdy + cdy).round(0);      
//         
//
//            
//     },
     /*
     Assimulate a list of borders from both components and pre-defined borders 
     and use as means of checking collisions 
     xrht,xlft,yabv,yblw
     
     
     */




         
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//         for(j=0;j<this.componentArchive2.length;j++){
//             
//          var compoent2;
//             
//             if(this.componentArchive2[j]){
//                
//                   component2 = this.getEntityByID(this.componentArchive2[j]) ;
//             
//                 
//if ( this.sData[i].posX <=  (component2.pos.x+component2.size.x)  && this.sData[i-1].posX >  (component2.pos.x+component2.size.x) 
//    || this.sData[i].posX+45 >=  component2.pos.x && this.sData[i-1].posX+45 <  component2.pos.x)
//{
//if (typeof this.componentArchive[this.sData[i].tail-1]!== 'undefined' &&
//   ig.game.componentArchive[this.sData[i].tail-1] != this.id ||
//    this.sData[i].tail === 0
//   )
//ig.game.componentArchive[this.sData[i].tail]= this.componentArchive2[j];}}}
//    
//var component; component = null; 
//         if (ig.game.componentArchive[this.sData[i].tail]){
//          component = ig.game.getEntityByID(ig.game.componentArchive[this.sData[i].tail])       }

                 
//if (component){
//
//        
//    ax = this.sData[i-2].posX;
//    bx = this.sData[i-1].posX;
//    cx = this.sData[i].posX;
//        
//        segDis = Math.abs(ax - bx).round(0);
//        segDis2= Math.abs(cx - bx).round(0);
//       
//    if( this.sData[i].posX <=  (component.pos.x+component.size.x)  && this.sData[i-1].posX >  (component.pos.x+component.size.x) 
//       ||this.sData[i].posX+45 >=  component.pos.x && this.sData[i-1].posX+45 <  component.pos.x) {
//
//
//        if (segDis >= segDis2){
//
//        //left side
//           if (  this.sData[i].posX <=  (component.pos.x+component.size.x)  && this.sData[i-1].posX >=  (component.pos.x+component.size.x)
//              ) {
//            this.sData[i].posX =  (component.pos.x+component.size.x);
//            }
//            
//            //right side
//           if (this.sData[i].posX >=  component.pos.x-45 && this.sData[i-1].posX <  component.pos.x-45) {       
//        this.sData[i].posX =  (component.pos.x-45);
//           }
//            
//         
//        this.sData[i].collH = true;
//            
//                    this.sData[i].velX=(this.sData[i-1].velX*-ig.game.loadedBallType.bounciness)    
//     
//     this.sData[i].velY =  maxV.y - (300*this.sData[i].inTime);
//  
//          // this.sData[i-1].posY+(-this.sData[i].velY*ig.game.aTick)
//     this.sData[i].posY =  this.sData[i-1].posY+(-this.sData[i].velY*ig.game.aTick)
//            
//        }
//         else {this.sData[i].collH = false; }
//
//   
//
//    }else{       

//          }
//
//
//
//}else{
    
//PLOTTER: SPAWN OBJECTS? OR USE PURE DATA?          
//USE SPAWN OBJECTS FOR PROJECTILE && AND USE FUNCTIONALITY FOR SDATA 
         

