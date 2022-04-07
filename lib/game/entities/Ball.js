
ig.module(
	'game.entities.Ball'
)
.requires(
'impact.game',
'impact.entity'
)
.defines(function(){


EntityBall = ig.Entity.extend({

//bluntAmmoSheet: new ig.AnimationSheet('media/rock1.png',20,20),//48 43
  bluntAmmoSheet: new ig.AnimationSheet('media/ballMorph2.png',27,27),//48 43    try 27 
name: 'BluntB',

ballType: new Array(4),      
//size:{x:45, y:45},						//uni
offset: {x:0, y:0},						//uni
maxVel: {x:1000,y:1000},		        //uni
weight: 25,								//uni
bounciness: 0,						//uni
damage: 0,								//uni
heatlh:10,
gravityFactor:1,
zIndex:7,//-1
maxHeight: 0,
friction: {x:0, y:0},//5
parOffset:{x:0, y:0},
ball: 'buntProjectile',
imgSize: {x:0, y:0},
playerTurn:false,
hold: false,
grounded: false,
sling: null,
    cam:null,
select: null,
phyTime:0,
hoverDwn: false,
freeze: false,
orderCol:0,
    hit:false,
    
rotAnimT:null,    
    
angTrec:0,
hitSide:{up:false,down:false,left:false,right:false},
    
//expoAnim: new ig.AnimationSheet( 'media/hitexpo.png', 56, 57 ),
//    animExpo:null,
init: function(x,y,settings){

this.parent(x,y,settings);
    
 //  this.animExpo =new ig.Animation( this.expoAnim, .2, [0] );
    
    
this.anims.ballspinR = new ig.Animation(this.bluntAmmoSheet, 0.1, [0,1,2,3,4,5,6,7,8,9,10,11,12,13]);
this.anims.ballspinL = new ig.Animation(this.bluntAmmoSheet, 0.1, [13,12,11,10,9,8,7,6,5,4,3,2,1,0]);
    
  this.anims.ballidle = new ig.Animation(this.bluntAmmoSheet, 0, [7],true);  
    
    
    this.rotAnimT = new ig.Timer();

this.orderCol =3;

this.hold = true;
    
this.currentAnim = this.anims.ballidle   
 //this.currentAnim
 
  ig.game.tickSwitch=false;  
    
},
 

update: function(){
    this.sling =ig.game.getEntitiesByType(EntitySling)[0];//disable
    this.cam =ig.game.getEntitiesByType(EntityCamera)[0];//disable
    
    //console.log("X: "+ig.game.sData[4].posX+"  Y:"+ig.game.sData[4].posY);
// console.log(this.hit);

this.parent();
    
    
   // this.hit=this.touches( other );
    
    if(ig.game.prefMode)this.disableAnim=true;
    

//this.gravityFactor = 1;
	  
//if (this.pos.y == ig.game.getEntitiesByType(EntitySling)[0].appoxHeight)
    
    
    
//console.log(""+(ig.game.getEntitiesByType(EntitySling)[0].appoxHeight-1000)+ "    "+this.pos.y);


if(this.vel.y!=0 && this.freeze === false){
         //    console.log(this.vel.y);
//    this.phyTime+=.04
//this.phyTime.round(2)
}//console.log(this.phyTime.round(2));
	

  

    (this.hold === false && this.vel.y > 0 && this.maxHeight == 0) ? 
        ( this.maxHeight =  (1000 - this.pos.y)	
    ):(this.hold === true) ?
    (this.maxVel.x= 0,this.maxVel.y=0):(this.maxHeight =0)    
   
 

    
	if (this.sling.release === true && this.vel.y ==0 && this.grounded == false)  { 
        
		this.vel.y -= (this.sling.maxVelocity)   
		this.vel.x=this.sling.maxVelocityX;
//this.freeze=true;
        
        
 //   ig.game.metamode= true 
 //   this.freeze=true;

	  }
     
      
	if (this.grounded === true &&
        ig.game.loadedBallType !=  ig.game.getEntityByID(this.id)
       && this.pos.x+this.pos.y != this.sling.pos.x+this.sling.pos.y
       // && this.vel.x !=0
       ){this.bounciness = 0 ;
this.kill();return;
	}
    
if (this.freeze ==true &&
    ig.game.loadedBallType !=  ig.game.getEntityByID(this.id)
   )
    {
        this.kill();return; }

    
    
    
            


    
    
    
    this.imgSize.x =this.bluntAmmoSheet.width ;this.imgSize.y = this.bluntAmmoSheet.height
	this.offset.x =0  ; this.offset.y =0 ;
	//this.size.x=20;
    
  
    
	this.size.x= this.imgSize.x;
    this.size.y= this.imgSize.y;
    
    
    this.parOffset.x = this.size.x/2; this.parOffset.y=0;
    
    
    this.immunity = false       
    this.bounciness = .9
  //console.log("x: "+this.pos.x+" y: "+this.pos.y);
    
   // console.log(": "+(this.pos.y -ig.game.sData[1].posY ) )  ;
    
	if (this.hold === true){
     this.pos.x = (this.sling.pos.x)-this.parOffset.x;
     this.pos.y = (this.sling.pos.y);
     this.weight =40;//70
        if (this.sling.release === true){ 
       
            
            //this.friction.x = 0
			this.damage =50
			this.hold = false
			this.maxVel.x= 50000
			this.maxVel.y= 60000
   
        
        }  }
    
//    if(this.pos.x==33.4560909321476 && this.pos.y ==  938.479045101879){
//        
//               ig.game.metamode= true 
//     this.freeze=true;
//    }
     
    
 //  console.log( " "+this.vel.y.round(3)+" "+ (-((12/(this.bounciness+1) ))).round(3)   );
  // console.log( 12-(12/(this.bounciness+1) ));
   // console.log((this.vel.y.round(2)==-((12-(12/(this.bounciness+1))).round(2)) ))
  // this.minBounceVelocity=0       
 //console.log(this.minBounceVelocity)
     if(this.vel.y.round(5)===(  (12/(this.bounciness+1))).round(5) ){
//       //this.friction.x =20; THIS BASTARD CAUSES DISPLACEMENT BE CAREFULL 
         this.grounded= true; //this.bounciness = 0; this.maxVel.y= 0; this.vel.y=0;          
     }
    
     var aVar = 1/ig.system.tick;
    
 if ((this.pos.x)+(this.vel.x/aVar)  
     > ig.game.gameDimesion.xLevel
     //&& this.vel.x > 0
    ){ 
 //    if (  ig.Timer.atick==0.01)
        // ig.game.adapter-=0.045;
     
  // this.pos.y = this.last.y;  
     this.pos.x =ig.game.gameDimesion.xLevel-this.size.x ;
     this.vel.x  *=-this.bounciness;
       
//    if (this.vel.y<0) {
//    this.vel.y-=300*ig.system.tick}else{
//         this.vel.y+=300*ig.system.tick;
//    }
//                                                                              
                                             this.hitSide.right = true;        ig.game.thudHitSound.play();
                                          //    console.log(this.vel.x);  
                                         if (this.vel.x<-100)                                 
                                        this.cam.shakeCam(5,0,.4);                           
;
 } 
        
    
       if (ig.game.dirInc - 1 !== -1){
   // if(ig.system.tick == .02 && this.vel.y!==0 )   ig.game.colData[ig.game.dirInc-1].posY+=.12;
       }
    
if (this.pos.x+(this.vel.x/aVar) 
    < 0 
    //&& this.vel.x < 0
   ){
  //    if (  ig.Timer.atick==0.01)
   //      ig.game.adapter-=0.045;
     
   // this.pos.y = this.last.y;    
   // this.pos.x = this.last.x+(1/0.04);
   // console.log("hit: "+this.last.x)
  //this.pos.x=this.last.x-((this.vel.x/aVar)-((this.vel.x*this.bounciness)/aVar));
    this.pos.x=0;
    
    //this.vel.y-=300*ig.system.tick;
//      if (this.vel.y<0) {
//    this.vel.y-=300*ig.system.tick}else{
//         this.vel.y+=300*ig.system.tick;
//    }
//    
    this.vel.x *=-this.bounciness;
   // this.pos.x =0;      
                                     this.hitSide.left = true;   ig.game.thudHitSound.play();
                                  //      console.log(this.vel.x);    
                                            if (this.vel.x>100)      
                                       this.cam.shakeCam(5,0,.4);      
                                       
                                      }
   
 //   var bframe=  this.anims.ballspinR.frame;
    
      if (this.vel.x ==0 || this.freeze)    {   this.rotAnimT.pause(); ;this.anims.ballidle}else{ this.rotAnimT.unpause(); 
    
//                        if (ig.ua.mobile === false){                                                                             
//                                                                                                 
//(this.vel.x<0) ? ((this.rotAnim(-1)),(this.currentAnim = this.anims.ballspinR) ):
//    ( (this.rotAnim(1)),(this.currentAnim = this.anims.ballspinL));
//                                                                                                 
//                        }else{
//                            
//                                                                                                                             
//(this.vel.x<0) ? ((this.rotAnim(-1)) ):
//    ( (this.rotAnim(1)));
//                                                                        
//                        }
                 
                                                                                                 
                   if(ig.game.prefMode===false){                                                                            
            (this.vel.x<0) ? ((this.rotAnim(-1)),(this.currentAnim = this.anims.ballspinR) ):
    ( (this.rotAnim(1)),(this.currentAnim = this.anims.ballspinL));                                                                                     }else{
                (this.vel.x<0) ? ((this.rotAnim(-1)) ):
    ( (this.rotAnim(1)));   
                
            }
                                                                                                 
                                                                                                 
                                                                                                 
                                                                                                 
    }

    //13567.325480433956
    
    
//    testC =  ig.game.getEntitiesByType(EntityPlatform)[0]
//    
//    if (typeof testC !== 'undefined' && this.touches(testC) ){
//        
//    if(
//		//this.pos.x + this.size.x > testC.pos.x &&
//        this.pos.x + this.size.x < testC.pos.x + testC.size.x &&
//	//	this.pos.x < testC.pos.x + testC.size.x &&
//		this.pos.x > testC.pos.x  
//	) {
//		// Which one is on top?
//		if( this.last.y-this.size.y < testC.pos.y ) {
//			this.pos.y = testC.pos.y-this.size.y}
//		else {	this.pos.y = testC.pos.y + testC.size.y}
//        
//	this.vel.y  *=-this.bounciness;
//	}
//	else    if(
//		//this.pos.y + this.size.y > testC.pos.y &&
//        this.pos.y + this.size.y < testC.pos.y + testC.size.y &&
//	//	this.pos.y < testC.pos.y + testC.size.y &&
//		this.pos.y > testC.pos.y  
//	)
//	// Horizontal collision
//	 {
//		// Which one is on the left?
//
//        if ( this.pos.x < testC.pos.x + testC.size.x && this.pos.x+this.size.x > testC.pos.x + testC.size.x){
//		this.pos.x = testC.pos.x + testC.size.x}
//        else 
//        if ( this.pos.x+this.size.x > testC.pos.x && this.pos.x < testC.pos.x) {
//		this.pos.x = testC.pos.x -this.size.x}
//		
//         
//         this.vel.x  *=-this.bounciness;
//	}
//    }
//    
    
    
    for (i=0,len=ig.game.componentArchive.length; i < len; i++){
              if (typeof ig.game.componentArchive[i] !== 'undefined' ){   
        
        var compoent;
        compoent = ig.game.getEntityByID(ig.game.componentArchive[i])
        
        this.customCC(compoent,i)
              }
        
//      if (typeof ig.game.componentArchive[i] !== 'undefined' ){   
//        
//        var compoent;
//        compoent = ig.game.getEntityByID(ig.game.componentArchive[i])
//        
//        
//        if (this.touches(compoent) ){
//        
//    if(
//		//this.pos.x + this.size.x > testC.pos.x &&
//        this.pos.x + this.size.x < compoent.pos.x + compoent.size.x &&
//	//	this.pos.x < testC.pos.x + testC.size.x &&
//		this.pos.x > compoent.pos.x  
//	) {
//		// Which one is on top?
//		if( this.last.y-this.size.y < compoent.pos.y ) {
//			this.pos.y = compoent.pos.y-this.size.y}
//		else {	this.pos.y = compoent.pos.y + compoent.size.y}
//        
//	this.vel.y  *=-this.bounciness;
//	}
//	else    if(
//		//this.pos.y + this.size.y > testC.pos.y &&
//        this.pos.y + this.size.y <= compoent.pos.y + compoent.size.y &&
//	//	this.pos.y < testC.pos.y + testC.size.y &&
//		this.pos.y >= compoent.pos.y   
//	)
//	// Horizontal collision
//	 {
//		// Which one is on the left?
//
//        if ( this.pos.x < compoent.pos.x + compoent.size.x && this.pos.x+this.size.x > compoent.pos.x + compoent.size.x){
//		this.pos.x = compoent.pos.x + compoent.size.x}//note when projecitle is gorunded on another compoent top this slide through unless comp is lowered 
//        else 
//        if ( this.pos.x+this.size.x > compoent.pos.x && this.pos.x < compoent.pos.x) {
//		this.pos.x = compoent.pos.x -this.size.x}
//		
//         
//         this.vel.x  *=-this.bounciness;
//	}
//    }
//   
//    }
    }
    
    //995.6526967345859
    //995.532696734586
    
//console.log(this.orderCol)
//console.log(ig.game.dirInc)
//orderCol
    
//if(this.vel.y!==0){     // console.log(ig.game.gravity * ig.system.tick * this.gravityFactor);
//  //   console.log("X: "+this.vel.x+"  Y:"+this.vel.y);
//// console.log("X: "+(ig.game.sData[3].posX+((ig.game.sData[3].posX-ig.game.sData[2].posX)/.3125))+"  Y:"+ig.game.sData[2].posY+"  X: "+(this.pos.x)+"  Y:"+this.pos.y);
// console.log("X: "+ig.game.sData[2].posX+"  Y:"+ig.game.sData[2].posY+"  X: "+(this.last.x-(ig.game.sData[1].velX*-0.0125)*3.2)+"  Y:"+((this.last.y+.48)-(ig.game.sData[1].velY*0.0125)*3.2));
//// console.log("X: "+ig.game.sData[2].velX+"  Y:"+ig.game.sData[2].velY+"  X: "+this.vel.x+"  Y:"+this.vel.y);
//
//}
//    
    //[x:127.772,y:-20.79]
//    if (this.pos.x.round(3) == 127.772 && this.pos.y.round(3) ==-20.79){this.freeze=true;ig.game.metamode= true                                                                }
  //console.log("ball [x:"+this.pos.x.round(3)+",y:"+this.pos.y.round(3)+"]"    );
  
    
    if(this.vel.y!=0 && this.freeze==false)
    ig.game.TestVar+=1;
    
    
    
    //[x:47.941,y:-521.16] 17
     if (ig.game.dirInc - 1 !== -1){
    
    
//console.log(" col [x: "+ig.game.colData[ig.game.dirInc-1].posX.round(3)+",y:"+ig.game.colData[ig.game.dirInc-1].posY.round(3)            );  
         

         
/*   console.log(
       
       (((ig.game.colData[ig.game.dirInc-1].orderOf-2)*.12)*Math.sign(this.vel.y)  )
   
   ) */    

      
//         
//         console.log(     "ball [x:"+this.pos.x+" y: "+this.pos.y+ "] sData [x:"+ig.game.sData[2].posX+" y: "+ig.game.sData[2].posY);
//         
         
         
         //console.log(ig.game.syncTime.delta().round(2)*4  );
         
         
//               console.log(
//          "ball [x:"+this.pos.x+" y: "+this.pos.y +"  sol [x:"+
//                   ((ig.game.colData[ig.game.dirInc-1].posX))
//                  // ((ig.game.colData[ig.game.dirInc-1].posX+ (  (ig.game.colData[ig.game.dirInc-1].posX)-this.pos.x) ) )
//                   
//                   +"  y:"+
//            
//            
//            (
//                
//             ig.game.colData[ig.game.dirInc-1].posY-ig.game.adapter//+((ig.game.colData[ig.game.dirInc-1].orderOf-1)*.4)
//                //- (  (ig.game.colData[ig.game.dirInc-1].posY)-this.pos.y)
//                ) +"]"
//      
//                 );
////         
         
         
         
         
         
         
         
         
//         
         //126 -9463.772908176756  412908176753 .36 /.04 =18
         //-9448.412908176753
//  [x:182.03419466798186 y: -6709.551006239213  sol [x:123.97330967044786  y:-6709.551006239213]
       //128.89516469452536
//console.log(ig.game.TestVar);
         
//        console.log(
//          "ball [x:"+this.pos.x+" y: "+this.pos.y+ "  sol [x:"+((
//             
//              
//             // ig.game.sData[ig.game.colData[ig.game.dirInc-1].orderOf-2].posX
//              ig.game.colData[ig.game.dirInc-1].posX
//        //   ig.game.colData[ig.game.dirInc-1].posX+((this.vel.x*.02)*3)
//              
//              
//              
//          
//          ))+"  y:"+
//            
//            
//            ((ig.game.colData[ig.game.dirInc-1].posY)
//             
//             
//             
////             -
////             
////             
////            (((12*0.02)*
////                (ig.game.colData[ig.game.dirInc-1].orderOf)))
//               //  -((ig.game.colData[ig.game.dirInc-1].orderOf-1)*.12)
//        
//            ) +"]"
//      
//                 );

         
         // 995.532696734586  995.6526967345859
     //     99.71427061127349 
         
   }
//    
//    console.log("ball [x:"+this.pos.x.round(3)+",y:"+this.pos.y.round(3) )
//    
    
    
    if (ig.game.dirInc - 1 !== -1 &&
        this.pos.x.round(6) === ig.game.colData[ig.game.dirInc-1].posX.round(6) &&
     this.pos.y.round(6) === ig.game.colData[ig.game.dirInc-1].posY.round(6)&&
   ig.game.colData[ig.game.dirInc-1].invsX===true
   ) { this.vel.x *=-this.bounciness; //this.vel.y-12//??
      ig.game.colData[ig.game.dirInc-1].orderOf=null; 
    ig.game.colData[ig.game.dirInc-1].invsX=false;
      ig.game.colData[ig.game.dirInc-1].posX =0;
      ig.game.colData[ig.game.dirInc-1].posY =0;
     
      ig.game.dirInc--
     
      
      
}     
    
      if (ig.game.dirInc - 1 !== -1 &&
          this.pos.x.round(6) === ig.game.colData[ig.game.dirInc-1].posX.round(6) &&
     this.pos.y.round(6) === ig.game.colData[ig.game.dirInc-1].posY.round(6)&&
   ig.game.colData[ig.game.dirInc-1].invsY===true
   ) { this.vel.y *=-this.bounciness; //this.vel.y-12//??
    ig.game.colData[ig.game.dirInc-1].invsY=false;
      ig.game.colData[ig.game.dirInc-1].orderOf=null; 
            ig.game.colData[ig.game.dirInc-1].posX =0;
      ig.game.colData[ig.game.dirInc-1].posY =0;
      ig.game.dirInc--
}       

    
    
    /*
    does nto work bouncing off walls
    mostly works when velocity is negative, projectle is upwards
    
    */
    
    
    
   // (this.last.x-(ig.game.sData[1].velX*-0.0125)*3.2)
    
    //((this.last.y+.48)-(ig.game.sData[1].velY*0.0125)*3.2));
    
    
    
    /*
    DISPLACEMENT OCCURS WHEN THE colData is equal to wall border and game is tranistioned to slower time
    frame upon hitting monster
    
    
    [x:155.48487351491337 y: -3512.6866961222454  sol [x:155.48487351491337  y:-3512.6866961222454]

    [x:98.05444754245002 y: -3571.723928939391  sol [x:98.05444754245002  y:-3570.8239289393914]0.9********
    [x:184.20008650114505 y: -3562.4543901365337  sol [x:184.20008650114505  y:-3559.9343901365337]2.52


    colData can be tranfered to the walls despite having a restrictive manipuation aceess when the sData is at walls
    solution for hitting walls when a colData is transfered there, set bouy values to that equal to wall collision
    
    
    */
    
//    if( ig.game.dirInc - 1 !== -1){
//    if ((ig.game.colData[ig.game.dirInc-1].posX) < 0)ig.game.colData[ig.game.dirInc-1].posX=0;
//    if ((ig.game.colData[ig.game.dirInc-1].posX) > ig.game.gameDimesion.xLevel)ig.game.colData[ig.game.dirInc-1].posX=ig.game.gameDimesion.xLevel;}
    
        //this.pos.x.round(6) === (ig.game.colData[ig.game.dirInc-1].posX).round(6) &&
              
              //[x:148.69567002681848 y: -9373.724084763355  sol [x:152.15370886465152  y:-9369.224084763353]
              //I DONT LIKE THIS BUT ITS THE EASIEST WAY TO SOLVE THIS DAMNED TIME SCALE ADJUSTMENT
        // this.pos.x.round(6)   ===     (ig.game.colData[ig.game.dirInc-1].posX+((this.vel.x*.02)*3)).round(6) &&
          if (
              
              
              
              
              
              ig.game.dirInc - 1 !== -1 &&
              this.pos.x.round(6) === (ig.game.colData[ig.game.dirInc-1].posX).round(6) &&
              this.pos.y.round(6) === (ig.game.colData[ig.game.dirInc-1].posY-ig.game.adapter).round(6) && 
              ig.game.colData[ig.game.dirInc-1].invsVel===true
//        ||         
//              
//              ig.game.dirInc - 1 !== -1 &&
//             this.pos.x.round(6) === (ig.game.colData[ig.game.dirInc-1].posX+ (  (ig.game.colData[ig.game.dirInc-1].posX)-this.pos.x) ).round(6) &&
//             this.pos.y.round(6) === (ig.game.colData[ig.game.dirInc-1].posY- (  (ig.game.colData[ig.game.dirInc-1].posY)-this.pos.y) ).round(6)
//                           //   -((ig.game.colData[ig.game.dirInc-1].orderOf-1)*.12 )).round(6)
//              && ig.game.colData[ig.game.dirInc-1].invsVel===true 
//              
//              
//              
//        ||    
//              ig.game.dirInc - 1 !== -1 && 
//              this.pos.x.round(6) === (ig.game.colData[ig.game.dirInc-1].posX).round(6)  &&
//             this.pos.y.round(6) === (ig.game.colData[ig.game.dirInc-1].posY- (  (ig.game.colData[ig.game.dirInc-1].posY)-this.pos.y) ).round(6)
//              &&ig.game.colData[ig.game.dirInc-1].invsVel===true 
              
//              ||
//
//              ig.game.dirInc - 1 !== -1 &&
//              this.pos.x.round(6) === (ig.game.colData[ig.game.dirInc-1].posX).round(6) &&
//            this.pos.y.round(6) === (ig.game.colData[ig.game.dirInc-1].posY- (  (ig.game.colData[ig.game.dirInc-1].posY)-this.pos.y) ).round(6)&&
//            ig.game.colData[ig.game.dirInc-1].invsVel===true
//              
//            ||
//              
//            ig.game.dirInc - 1 !== -1 &&
//            this.pos.x.round(6) === (ig.game.colData[ig.game.dirInc-1].posX+ (  (ig.game.colData[ig.game.dirInc-1].posX)-this.pos.x) ).round(6) &&
//            this.pos.y.round(6) === (ig.game.colData[ig.game.dirInc-1].posY- (  (ig.game.colData[ig.game.dirInc-1].posY)+Math.abs(this.pos.y) ) ).round(6) &&
//                  ig.game.colData[ig.game.dirInc-1].invsVel===true
//              
//                  ||
//              
//            ig.game.dirInc - 1 !== -1 && this.freeze == false &&
//            this.pos.x.round(6) === (ig.game.colData[ig.game.dirInc-1].posX- (  (ig.game.colData[ig.game.dirInc-1].posX)-this.pos.x) ).round(6)&&
//               this.pos.y.round(6) === (ig.game.colData[ig.game.dirInc-1].posY).round(6) && 
//                        ig.game.colData[ig.game.dirInc-1].invsVel===true
              
//              ig.game.dirInc - 1 !== -1 &&
//              this.pos.x.round(6) === (ig.game.colData[ig.game.dirInc-1].posX- (  (ig.game.colData[ig.game.dirInc-1].posX)-this.pos.x) ).round(6) &&
//              this.pos.y.round(6) === (ig.game.colData[ig.game.dirInc-1].posY- (  (ig.game.colData[ig.game.dirInc-1].posY)+Math.abs(this.pos.y) ) ).round(6) &&
         
//              ig.game.dirInc - 1 !== -1 &&
//               this.pos.x.round(6) === (ig.game.colData[ig.game.dirInc-1].posX- (  (ig.game.colData[ig.game.dirInc-1].posX)-this.pos.x) ).round(6) &&
//               this.pos.y.round(6) === (ig.game.colData[ig.game.dirInc-1].posY- (  (ig.game.colData[ig.game.dirInc-1].posY)-this.pos.y ) ).round(6) &&
       
              
              
/*

THIS IS HORRIFIC AS HELL BUT IT TOOK CARE OF MOST OF BUGS WILL NEED TO REVISIT FOR ACTUAL SOLUATION
*/
              
              
              
              
              
//              
   ) {      this.vel.x *=-ig.game.sData[ig.game.colData[ig.game.dirInc-1].orderOf].xBouy;
            this.vel.y *=-ig.game.sData[ig.game.colData[ig.game.dirInc-1].orderOf].yBouy; //this.vel.y-12//??
    
      this.cam.shakeCam(5,5,.5);                           
//ig.game.adapter-=0.045;
      
      //console.log(this.angTrec.toDeg());
      //this.hitSide
      var angle = this.angTrec.toDeg();
    
      ig.game.thudHitSound.play();
      
       //console.log(          ig.game.sData[ig.game.colData[ig.game.dirInc-1].orderOf].yBouy); //this.vel.y-12//??

      
              
          if (angle >90 && angle < 215 && this.vel.y < 0 && this.vel.x > 0)
              {this.hitSide.left = true;     console.log(""+this.hitSide.left+"|||"+this.hitSide.right);  };
          if (angle >90 && angle < 215 && this.vel.y < 0 && this.vel.x < 0)
              {this.hitSide.right = true;     console.log(""+this.hitSide.left+"|||"+this.hitSide.right); };
        
      
      if (angle <= 180 && this.vel.y > 0 &&
              this.vel.x < 0 || angle <= 180 && 
              this.vel.y > 0 && 
              this.vel.x > 0 || angle > 180 &&
              this.vel.x > 0 && angle < 270){
              this.hitSide.up = true;// console.log(""+this.hitSide.up+"|||"+this.hitSide.down);
          }

      
   
      
      
      
//      // console.log((angle > 180 && this.vel.x > 0) );
      
     // ig.game.killParticles.unpause();
         //  ig.game.spawnParticles(ig.game.TOTAL_PARTICLES,0,0);
//
      
      
      
// for(i=0;i<50;i++)
  //   ig.game.spawnEntity("EntityParticleFast", ig.game.colData[ig.game.dirInc-1].posX,ig.game.colData[ig.game.dirInc-1].posY);
//      
      
      
//      console.log("X: "+-ig.game.sData[ig.game.colData[ig.game.dirInc-1].orderOf].xBouy
//                 +" Y:"+-ig.game.sData[ig.game.colData[ig.game.dirInc-1].orderOf].yBouy
//                 
//                 )
      
      
      ig.game.colData[ig.game.dirInc-1].orderOf=null; 
      
     ig.game.colData[ig.game.dirInc-1].xBouy =0;
       ig.game.colData[ig.game.dirInc-1].yBouy =0;
      ig.game.colData[ig.game.dirInc-1].invsVel=false;
    ig.game.colData[ig.game.dirInc-1].posX =0;
      ig.game.colData[ig.game.dirInc-1].posY =0;
      ig.game.dirInc--
}else{
    
    
}       
    
    if( ig.game.killParticles.delta() >2)
{ 


    ig.game.killParticles.reset();
    ig.game.killParticles.pause();
    
}
    
    
    
//if (this.pos.x.round(6) === ig.game.colData[2].posX.round(6) &&
//     this.pos.y.round(6) === ig.game.colData[2].posY.round(6)&&
//   ig.game.colData[2].invsX===true
//   ) { this.vel.x *=-this.bounciness; //this.vel.y-12//??
//    ig.game.colData[2].invsX=false;
//      // console.log("hit")
//}  
//if (this.pos.x.round(6) === ig.game.colData[3].posX.round(6) &&
//     this.pos.y.round(6) === ig.game.colData[3].posY.round(6)&&
//   ig.game.colData[3].invsX===true
//   ) { this.vel.x *=-this.bounciness; //this.vel.y-12//??
//    ig.game.colData[3].invsX=false;
//      
//}  
//    if (this.pos.x.round(6) === ig.game.colData[4].posX.round(6) &&
//     this.pos.y.round(6) === ig.game.colData[4].posY.round(6)&&
//   ig.game.colData[4].invsX===true
//   ) { this.vel.x *=-this.bounciness; //this.vel.y-12//??
//    ig.game.colData[4].invsX=false;
//      
//}      
//   

    
//if (this.pos.x.round(6) === ig.game.colData[2].posX.round(6) &&
//     this.pos.y.round(6) === ig.game.colData[2].posY.round(6)&&
//   ig.game.colData[2].invsY===true
//   ) { this.vel.y *=-this.bounciness; //this.vel.y-12//??
//    ig.game.colData[2].invsY=false;
//}      
//if (this.pos.x.round(6) === ig.game.colData[3].posX.round(6) &&
//     this.pos.y.round(6) === ig.game.colData[3].posY.round(6)&&
//   ig.game.colData[3].invsY===true
//   ) { this.vel.y *=-this.bounciness; //this.vel.y-12//??
//    ig.game.colData[3].invsY=false;
//}          
//if (this.pos.x.round(6) === ig.game.colData[4].posX.round(6) &&
//     this.pos.y.round(6) === ig.game.colData[4].posY.round(6)&&
//   ig.game.colData[4].invsY===true
//   ) { this.vel.y *=-this.bounciness; //this.vel.y-12//??
//    ig.game.colData[4].invsY=false;
//}      
    
    
if (this.pos.y > ig.game.gameDimesion.ground && this.vel.y >0 //&&  this.bounciness > 0 && this.vel.y > this.minBounceVelocity 
   ){this.pos.y = ig.game.gameDimesion.ground
    
        ///  if (this.vel.y >1) ig.game.thudHitSound.play();
     this.vel.y *=-this.bounciness 
     
  
//this.freeze=true;
    }

    
   // 
    
   
        
                              
//        for(i =0; i <= ig.game.enemyArchive.length; i++)
//    {
//		if (typeof ig.game.getEntityByID(ig.game.enemyArchive[i])!= 'undefined')
//            { 
//             this.hit=
//            }
//            
//            }
        

    

    this.hit = false;
    
},
	

rotAnim(speed){
    
      this.rotAnimT.unpause();   

    if (!this.dead){

var degrees=(this.rotAnimT.delta()*speed);
 //   console.log(  (Math.sin(degrees)).toDeg());
 this.currentAnim.angle= ((degrees));
  //  this.currentAnim.angle=((this.rotAnimT.delta())*25).toRad();
    
    }
    
    
    
},    
    
    
    
draw: function(){
//      var mathR={x: (Math.cos(angleR)*(  ig.game.sData[1].posX- ig.game.loadedBallType.pos.x)-
//        Math.sin(angleR)*( ig.game.sData[1].posY-ig.game.loadedBallType.pos.y))+ig.game.loadedBallType.pos.x,
//            y: (Math.sin(angleR)*(  ig.game.sData[1].posX- ig.game.loadedBallType.pos.x)+
//               Math.cos(angleR)*( ig.game.sData[1].posY- ig.game.loadedBallType.pos.y))+ig.game.loadedBallType.pos.y
//             };
    
//    var vel=(ig.game.loadedBallType.vel.x+ig.game.loadedBallType.vel.y)
//    var g=ig.game.gravity;
//    var x= ig.game.sData[1].posX;
//    var y= ig.game.sData[1].posY;
    
   // var angle= Math.atan2(Math.pow(vel,2)*Math.sqrt(Math.pow(vel,4)-g*(g)  ) )
    
var  fpos,angle,calib,bx,by;

    
    fpos=ig.game.sData[3];
 

    
    
       angle=  ( Math.abs((( Math.atan2( (this.pos.x-fpos.posX),(this.pos.y-fpos.posY)))-(180).toRad())));; 

    //console.log(angle);
//    this.animExpo.angle=angle;//this.currentAnim.angle;
//    this.animExpo.pivot.x=27
//    this.animExpo.pivot.y=44
//    
    
this.angTrec=angle;
    
   
for (i=0; ig.game.colData[i].posX!=0;i++){
   // console.log("here")
   //  this.animExpo.draw( ig.game.colData[i].posX,  (ig.game.colData[i].posY.round(6)-ig.game._rscreen.y)   );
   
//    ig.system.context.drawImage(ig.game.bumperImg,
//                                ig.game.colData[i].posX,
//                                ig.game.colData[i].posY-ig.game._rscreen.y);
//                
              //  ig.system.context.save();    
    
        ///  ig.system.context.translate((240*(ig.system.scale/2)), (320*(ig.system.scale/2)));
    
 //   ig.system.context.rotate((angle).toRad());
  
//    
//        ig.system.context.drawImage(ig.game.bumperImg,
//                               ( ig.game.colData[i].posX*ig.system.scale)-ig.game._rscreen.x,
//                                (ig.game.colData[i].posY-ig.game._rscreen.y )*ig.system.scale );

//     ig.system.context.restore();
}
  // ig.game._rscreen.y)*ig.system.scale
    
// this.animExpo.draw(this.pos.x-14,((((this.pos.y)-(ig.game._rscreen.y))-31)));    
    
//         if (ig.game.dirInc - 1 !== -1 &&
//          this.pos.x.round(6) === ig.game.colData[ig.game.dirInc-1].posX.round(6) &&
//     this.pos.y.round(6) === ig.game.colData[ig.game.dirInc-1].posY.round(6)&&
//   ig.game.colData[ig.game.dirInc-1].invsVel===true
//   ) {          
//}       
//    if (ig.game.dirInc - 1 !== -1 ){
//      this.animExpo.draw( ig.game.colData[ig.game.dirInc-1].posX.round(6),     this.pos.y.round(6) === ig.game.colData[ig.game.dirInc-1].posY.round(6)); }
//    
   // ig.system.context.rect(ig.game.sData[3].posX,ig.game.sData[3].posY-1000,10,10)

    if (  ig.game.metamode==true && this.disableAnim===false ){

		if( this.currentAnim ) {
            
            
            
            
			this.currentAnim.draw(
				this.pos.x - this.offset.x- (ig.game._rscreen.x/ig.system.scale),// /ig.system.scale for freeze
				this.pos.y - this.offset.y - ig.game._rscreen.y
			);
            

  
//            
//   ig.system.context.drawImage(img, ((this.pos.x*ig.system.scale)-5)- (ig.game._rscreen.x), ((this.pos.y-ig.game._rscreen.y)*ig.system.scale));   
//        
            
            
}
    
    }else{
        
       
        if (ig.game.gameMode ==1){
        		this.currentAnim.draw(
				this.pos.x - this.offset.x- (ig.game._rscreen.x),
				this.pos.y - this.offset.y - ig.game._rscreen.y
			);
        }
        
       //   ig.system.context.drawImage(img, this.pos.x*ig.system.scale, ((this.pos.y-ig.game._rscreen.y)*ig.system.scale));      
    
    }
    
  
    
    
        
   
    
}  ,  
//    
    
type: ig.Entity.TYPE.A,
checkAgainst: ig.Entity.TYPE.B,
collides: ig.Entity.COLLIDES.PASSIVE,//PASSIVE


check: function( other ){

	if (this.immunity == false && this.freeze==false ) {other.receiveDamage(this.damage, this);
                                        }
    
    
    
		},

//touches: function( other ){
//	//   return true;
//	
//		},

//handleMovementTrace: function( res ){
//this.parent( res );
//
//},

/*

Projectile bounces off a manipulated node towards right side component wall
then hit
then bownces on top of component 
then hit
offset future node thereafter


SIMULATION 

                 HITS .1
 +-----------------------------
 |                ..
 |              .. ..
 |            ..    ..
 |           ..      ..
 |          ..        ..
 |         ..          ..
 |        ..            .
 |       ..             ..
 |       .               ..
 |  ..   .                .
 | .  . .                 ..
 | .   ..                  ..
H| ..   0  NODE[0]          .
I|  ..       .2             ..
T|   ..                      .
S|    ..                     .. -START
.|     .
3|     ..
 |      .
 |      ..
 |       .
 |       .      OFFSET NODE[1]
 |       ..   0   .5
 |        .  ..
 |        . ..
 |        . .
 |        ..
 +------------------+
         HITS .4








note x position when hit top repeated(2)
ball [x:332.517,y:-2011.6
Ball.js:388 hit
Ball.js:381 ball [x:332.517,y:-2020

FIXED? 

*/    
    
    

customCC: function (compoent,i){
         
 //console.log("ball [x:"+this.pos.x.round(3)+",y:"+this.pos.y.round(3) )
       
    //    var compoent;
    //    compoent = ig.game.getEntityByID(ig.game.componentArchive[i])
        
        
        if (this.touches(compoent) ){
         
    if(
		//this.pos.x + this.size.x > testC.pos.x &&
        this.pos.x + this.size.x < compoent.pos.x + compoent.size.x &&
	//	this.pos.x < testC.pos.x + testC.size.x &&
		this.pos.x >= compoent.pos.x  
	) {
		// Which one is on top?
		if( this.last.y-this.size.y < compoent.pos.y ) {
            
			this.pos.y = compoent.pos.y-this.size.y
            
        //    this.pos.x=this.last.x+(this.vel.x*0.08); 
            
      //     console.log("hit")
     //      console.log("x1: "+ig.game.sData[30].posX+"  x2:"+ig.game.sData[30].posX)
        
        }
		else {	this.pos.y = compoent.pos.y + compoent.size.y}
        
	this.vel.y  *=-this.bounciness;
	}
	else    if(
		//this.pos.y + this.size.y > testC.pos.y &&
        this.pos.y + this.size.y < compoent.pos.y + compoent.size.y &&
	//	this.pos.y < testC.pos.y + testC.size.y &&
		this.pos.y >= compoent.pos.y   
	)
	// Horizontal collision
	 {
		// Which one is on the left?

        if ( this.pos.x < compoent.pos.x + compoent.size.x && this.pos.x+this.size.x > compoent.pos.x + compoent.size.x){
		this.pos.x = compoent.pos.x + compoent.size.x}//note when projecitle is gorunded on another compoent top this slide through unless comp is lowered 
        else 
        if ( this.pos.x+this.size.x > compoent.pos.x && this.pos.x < compoent.pos.x) {
		this.pos.x = compoent.pos.x -this.size.x
     
    
        
        
        }
		
         
         this.vel.x  *=-this.bounciness;
	}
    }
   
    
    
    
    
    
    
}


    
    
    
})


EntitySlingShot = ig.Entity.extend({

//animSheet: new ig.AnimationSheet('media/slingshot2.png',443,234),
offset: {x: 221.5, y:80},
maxVel: {x:0,	y:0},
zIndex:0,
size:{x:0 , y:0},

init: function(x,y,settings){
    

    
this.pos.x =ig.game.gameDimesion.sndSec//	ig.game.gameDimesion.sndSec
this.parent(x,y,settings);

    
},

update: function(){
var sling = ig.game.getEntitiesByType(EntitySling)[0];
},

 draw: function() {
 //*
 this.parent();
       if (ig.game.gameMode ==1){
 var sling = ig.game.getEntitiesByType(EntitySling)[0];
  ig.system.context.lineWidth = 4;
 
          var startX = ig.system.getDrawPos((sling.pos.x*ig.system.scale) - ig.game._rscreen.x);
          var startY = ig.system.getDrawPos((sling.pos.y*ig.system.scale) - ig.game._rscreen.y);
                
          var endX = ig.system.getDrawPos((this.pos.x-50)-ig.game._rscreen.x);
          var endY = ig.system.getDrawPos((this.pos.y)-ig.game._rscreen.y);
                
		//  var startX2 = ig.system.getDrawPos((sling.pos.x+27) - ig.game.screen.x);
       //   var startY2 = ig.system.getDrawPos((sling.pos.y+20) - ig.game.screen.y);
                
          var endX2 = ig.system.getDrawPos((this.pos.x+50)-ig.game._rscreen.x);
          var endY2 = ig.system.getDrawPos((this.pos.y)-ig.game._rscreen.y);
                
     
   
          var tpointX = ((sling.pos.x*ig.system.scale) - ig.game._rscreen.x);
          var tpointY = ((sling.pos.y) - (ig.game._rscreen.y))+ig.game.loadedBallType.size.x;
     
          var sPointX = (tpointX) *2 -(endX2+endX) /2
          var sPointY=  (tpointY*ig.system.scale) *2 -(endY2+endY) /2
     
				
          ig.system.context.strokeStyle = "#FFFFE0";
		
          ig.system.context.beginPath(); // 
          ig.system.context.moveTo(endX2,endY2);
     ig.system.context.quadraticCurveTo(sPointX,sPointY,endX,endY)
//ig.system.context.lineTo(endX,endY);
	//	  ig.system.context.moveTo(startX2,startY2);
     //     ig.system.context.lineTo(endX2,endY2);
          ig.system.context.stroke();
          ig.system.context.lineWidth = 5;
          
          ig.system.context.closePath();
		  
        }}
});
   
EntityGhostBall = ig.Entity.extend({


init: function(x,y,settings){

this.parent(x,y,settings);

 
},
 

update: function(){
  


},
	


draw: function(){

    
    
  
    

    
}  ,  
//    
    
type: ig.Entity.TYPE.NONE,
checkAgainst: ig.Entity.TYPE.NONE,
collides: ig.Entity.COLLIDES.NEVER,//PASSIVE



    
})

    
});

/*
let Main sData handle collision or Objects ?

-sData will aquire id upon collision and treat all collisions universially 
depending on the direction of collision 

-use endNode of sData as means of checking for collision  



*/

/*
UPDATE 
initially the first index of the componentArchive will be checked 
until a collision node is made and
after that collision node all nodes thereafter will 
look for the next index of the componentArchive until another collision
node is met then it proceeds therafter to check the next index
of the componentArchive and so on

*Therefore all boundaries of components will be universally defined rather
descretely uniquie of its collision relationship with sData 
*components will only be uniquie in the size it occupies in space
*componentArchive is ordered by the first collision of sData to the
next collision of sData
*? use velocity of node as a case to define different collision conditions

*/



/*
OKAY this is how its going to work since one entity at a time 
can only check sdata:

the last index of sData meets  
walls its id is captured into an Comarray which is then checked 
by the part where sData is within the inner boundaries of the wall, the 
first index of Comarray will be checking for sData. Once the
ball collides with the wall the array is shifted so that the next 
wall/next index(which is the first now) is checking the sData



*/



/*
//MAXIMUM HEIGHT CALCULATION
/*
A very Complex formulation for solving Maximum height 

since the system time is based on 0.04 increments 
and not real time then the original maximum height 
equation requires optimization.

Cannot Completely understand why this works 
but its fairly accurate 


Significant numbers 

12 
300*0.04 = 12* 
after every increment(0.04) velocity - 12 
may explain "12 incremented velocities"

.48
12*.04 =.48
a number used in the variable c to 
strand the de-increments of Height Differentiation



var a, b, c, d, e, f, g,eSum, h,k; 
eSum = new Array(300)//800


h=12
k=.48

	if (this.vel.y == 0){
		
		for (i= 1; ;i++)
		{	
	
a = (0.04*i)//	Time Frames  eg. 0.04, 0.08, 0.12 
			
b= (0.04*i)*ig.game.gravity - this.maxVelocity 

(0.04*i)*ig.game.gravity < gravity acting against maxVelocity per .04 
    
				Explanation for b 
		
			Velocity++ 12 increment sections ( 12-----------24------------32 ) -
			minus where velocity lies in that section 
			for section of 24 >> a velocity of 20 would be 4 
			    (20)---24--------32 
            
            
			I therefore find a 12 section where maxVelocity lies
			and find the range between the increment 12 Vel and 
			maximum Velocity 
			
c=k-(( (h*i)/h)*.04)//.36
			
				Explanation for c
		
			for every 12 section velocity a phenomenon happens 
			where Height Differentiation is subtracted by c 
			this starts from .48 and de-increments .04 every 
			12 section velocity 
		
			eg(.4,.36,.32)
			
			
d=(a*11-c)//optimize for accuracy
			
				Explanation for d
		
			Height Differentiation for 12 incremented Velocities  
			subtracted by c (where the offset phenomenon happens
            and thus c subtracts)
			eg(.96,2.4)
			
			
			
			
f = eSum.reduce( function(total, num){ return total + num }, 0);//SUM
			
			 Explanation for f
		
			the sum of all Height Differentiation at every 12 incremented velocities 
			solved at the start of current 12 section
			
			
			
			
		
			if ( (i)*h >this.maxVelocity-12)
		 {		

 e = (a*(h-b)+f)

(a*(h-b))>> current sum Height Diff w/out offset phenomenon
f readjusts the e equation 
         
		 		Explanation for e
		
			The solved offset for the maximum height equation  

			
	
				break;}
				
			else{	
			if (i*h >= (h*3)-1   //36 12*3
			)
//36 ? suppose its a starting postition given the fact that at 
//24th position Height Differentitation is 0

				{
				
			eSum[i]=d
			
			/*	Explanation for eSum
		
			an collecting array for Height Differentiation

			
			
			
			}
				}
	
	}

this.appoxHeight = (this.disPosition-e)*-1//Solution 

	console.log(eSum.length)	
}
*/

