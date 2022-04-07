ig.module(
	'game.entities.Sling'
)
.requires(
'impact.game',
'impact.entity'
)
.defines(function(){

/*
NOTE IF SLING COLLIDES WITH WALLBORDERS IT WILL CAUSE ERROR 
*/

EntitySling = ig.Entity.extend({

//animSheet: new ig.AnimationSheet('media/Sling.png',56,36),
zIndex:10,
unId: null,
ballType:null,
offset: {x: 28, y:0},//-16
size:{x:10 , y:10},

    
maxVel: {x:20000,y:20000},
gravityFactor: 0,

initalPos : null,
potEnergy:null, //potentail energy
kenEnergy: null,//kenetic energy
pull: null,     //constant displacement
//amplitude:0,    //extreme position of Oscillation
//amplitudeX:0,   //extreme position of Oscillation x
amplitude:{x:0,y:0},    

//frequency: 0,   //rate of Amp due to time 0.04
//frequencyX:0,	//rate of Amp due to time 0.04 x
frequency:{x:0,y:0},    
    
period: 0,	//time between Oscillation 
stiffness:14  ,//6 , 12

magitude: 600 ,//sling is unstable at high maginitude and low stiffness and low ball weight
//100
//event 
hold : false,
atRest: false,
release: false,
delayTrigger:0,
stableTrigger:0,

//this.stableTigger = new ig.Timer();

//analytical
//initalVel:0,
//initalVelX:0,
initalVel:{x:0,y:0},  
    
prePositionY:0,//solved positioning
prePositionX:0,     
    
sumAmp: [],
sAmp:[],
prePhys:[],// [3,20], amp,vel,pos pre-determined physics
appoxTime: 0,
appoxHeight:0,
maxVelocity:0,

maxVelocityX:0,

tension:1.5,
reliefTime:null,

init: function(x,y,settings){
	//ig.game.gameDimesion.sndSec
	this.parent(x,y,settings);

//ig.game.spawnEntity("EntitySlingShot",	(ig.system.width*ig.system.scale)/(2*ig.system.scale) , 1000);//disable to edit
//this.initalPos = {x: 480, y: 1000}

this.pos.x = 	((ig.system.width)/2)-5 //ig.game.gameDimesion.sndSec;
this.pos.y =(ig.system.height+(760)) // 1000
    //640 offset 360 of 1000
    
this.reliefTime=new ig.Timer();
  this.reliefTime.set( this.tension);  
//
this.reliefTime.pause();
//ig.game.spawnEntity("EntitySlingShot",	this.pos.x, this.pos.y);//disable to edit
ig.game.spawnEntity("EntitySlingShot",	this.pos.x, this.pos.y);//disable to edit
    
    
this.stableTrigger = new ig.Timer();
//this.addAnim('sling', 1, [0]);
    
this.initalPos = {x: this.pos.x, y: this.pos.y}
//this.initalPos = {x: this.pos.x, y: this.pos.y}
    
    
this.pull = {x: 0, y: 0};
this.potEnergy= {x: 0, y: 0};
this.kenEnergy= {x: this.pull.x, y: this.pull.y}
this.vel.y = 0 ;
this.vel.x = 0;

this.prePhys= new Array(3)
for( i = 0; i <3; i++){
this.prePhys[i] = new Array(70)
    for (j=0; j<this.prePhys[i].length;j++){
        var sPos = new Object(); 
 sPos.x = 0
 sPos.y = 0
    this.prePhys[i][j]=sPos
    }
}
this.sumAmp= new Array(40)
this.sAmp= new Array(40) 
this.stableTrigger.pause()
this.atRest = true

for (i=0;i<this.sumAmp.length;i++)
{var sPos = new Object(); 
 sPos.x = 0
 sPos.y = 0
    this.sumAmp[i]=sPos}
    
//
//    this.initalPos.x*=ig.system.scale;
//    this.initalPos.y*=ig.system.scale;
    
    
},

  

    
update: function(){
this.parent();

var ball; //< make this globally available 
var slingshot = ig.game.getEntitiesByType(EntitySlingShot)[0];


this.ballType === null ?   ig.game.loadedBallType = ig.game.getEntitiesByType(EntityBall)[0] : ig.game.loadedBallType = this.ballType;

ball = ig.game.loadedBallType;

this.period = (2*Math.PI)/ Math.sqrt(this.stiffness/ball.weight)
this.amplitude.y = (((this.pos.y - this.initalPos.y)/this.period)/this.stiffness) 
this.amplitude.x = (( (this.initalPos.x-this.pos.x)/this.period)/(this.stiffness))

ig.game.reloadBallrdy = (this.atRest === true && ball.vel.y!=0);
        
 //console.log(""+(Math.atan2(this.initalVel.y,0)+(449).toRad()) )//  6.265732014659643 = 359
 
 //console.log(""+(Math.atan2(this.initalVel.y,0)+(180).toRad()).toDeg() )//90 = 3.141592653589793

    
  //  console.log(""+(Math.atan2(this.initalVel.y,this.initalVel.x)+(360).toRad()).toDeg() )
  //  console.log("   " +this.pos.x+"     "+this.pos.y)
    
    //console.log((270).toRad())//4.71238898038469

//STABLEIZE  BEGIN			

	if (this.vel.y == 0 && this.vel.x== 0 && this.hold == false || this.stableTrigger.delta() >= 3 && this.hold == false
	) {
	  this.stableTrigger.set(0)
	        this.stableTrigger.pause()
		
		this.atRest = true;
		this.frequency.y = 0
		this.frequency.x =0
		this.amplitude.y = 0
		this.amplitude.x = 0
		this.vel.y =0;
	        this.vel.x =0;
		this.hold =false 
		this.kenEnergy.y =0;
		this.kenEnergy.x =0;
		this.potEnergy.x = 0
		this.potEnergy.y = 0
		this.pos.y = this.initalPos.y;
		this.pos.x = this.initalPos.x;
		this.maxVel.x =0 ;
		this.maxVel.y= 0;
       this.reliefTime.set(this.tension);
                 this.reliefTime.pause();
		 }else {this.atRest = false}
//END

//FLIP ANIMATION BEGIN			

this.pos.y > slingshot.pos.y-10 ? (//-10
//this.currentAnim.flip.y = false, 
    this.offset.y =-18) :( 
//this.currentAnim.flip.y = true,
    this.offset.y =18);//END
//end
    
//RELEASE  BEGIN			          
 
//console.log(""+(this.prePositionY+1000)+"      "+this.pos.y)    
//console.log(""+(this.prePositionX)+"      "+this.pos.x)    
 //   console.log(this.prePositionY.round() == this.pos.y.round() )
	if (//this.prePositionY.round() == this.pos.y.round()  //  this.prePositionX == this.pos.x &&
         this.hold == false //< causes inaccracies?
	    && this.atRest==false 
        && ball.vel.y== 0  
//        && ball.grounded ==false
       
       )
	{
		
	
		
//	  console.log(""+this.pos.x+"  "+ this.ballType.pos.x)
       this.pos.x = this.prePositionX
		this.pos.y = this.prePositionY//< correcting position
        
        this.ballType.pos.x =  this.prePositionX
        this.ballType.pos.y =  this.prePositionY//this.pos.y
        
//NOTE : correcting position causes maxVel not exist on sling
//however this value is passed onto the ball 
        
		this.release = true;//<
		
//this.stableTrigger.unpause()
}
	else if (ball.vel.y != 0 || ball.vel.y == 0 && ball.stick2Wall == true ) this.release = false;
//END	

//MOUSE CLICK EVENTS  BEGIN		 
	if (ig.game.gameMode == 1){
	ig.input.pressed('click') 
	&& this.atRest== true
	
	?(
	this.hold =this._inParameter() , 
	this.vel.x= 0,
	this.vel.y=0,
	this.frequency.x=0,
	this.frequency.y= 0

	):
	
	
// for  y	
	(ig.input.released('click')
	&& this.pos.y >= this.initalPos.y) ?
	(this.hold = false, this.pull.y = (this.pos.y-this.initalPos.y)
	): (this.vel.y = this.vel.y);

		

// for x 	

	(ig.input.released('click')
	&& this.pos.x > this.initalPos.x)   ? 
	(this.pull.x = (this.pos.x-this.initalPos.x)) :

	(ig.input.released('click')
	&& this.pos.x < this.initalPos.x)	?
	(this.pull.x = (this.initalPos.x - this.pos.x)) : (this.pull.x = this.pull.x)




 
		}
//END of Mouse Event 

//HOLD AND LAUNCH EVENT BEGIN		

    
//may use pointer lock and use an "artifical dpi" movement as tension increases   
    
//limit the sling pull Y axis
	if (this.hold == true //&& this.pos.y.round() <= 1230 
   // && (ig.game.screen.y+(ig.input.mouse.y)).round()<=1230
       )
	{	
        	
    this.potEnergy.y = (this.pos.y - this.initalPos.y);
	this.potEnergy.x = (this.pos.x - this.initalPos.x);
 
        
	this.appoxTime=( -this.maxVelocity / 300);
        
    /* posistions for diagnostics
  376     1225.3333333333335
      333   y  1226.6666666666665
    */    
        
        
    // 266.33331298828125 | 1215.3333333333333

        
  //   console.log("   "+this.pos.x+" | "+this.pos.y);
//	ig.game.gameDimesion.sndSec //1200//x 333   y  1226.6666666666665
        
//          var angle=   Math.abs((( Math.atan2( (this.pos.x - (ig.game.screen.x+ig.input.mouse.x)),(this.pos.y -(ig.game.screen.y+ig.input.mouse.y))))-(180).toRad())).toDeg(); 
        
     
        
       // T = mg + ma
        
        //g =12 as 300*0.04 gravity*timeStep
        
        
        var mouse={
            x:(ig.game.screen.x+ig.input.mouse.x),
            y:(ig.game.screen.y+ig.input.mouse.y)
        }
        
      //   var angle=   Math.abs((( Math.atan2( (this.pos.x - this.initalPos.x),(this.pos.y -this.initalPos.y)))+(0).toRad())).toDeg();      
    var angle=0.001;
        
        
        if (mouse.x > this.initalPos.x && this.pos.x > this.initalPos.x) {
         angle=   Math.abs((( Math.atan2( (mouse.x-this.initalPos.x),(mouse.y-this.initalPos.y)))-(0).toRad())).toDeg();       
        }
        
                  if (mouse.x < this.initalPos.x && this.pos.x > this.initalPos.x){
        angle=-2;;
                  //angle=   Math.abs((( Math.atan2( (this.initalPos.x-mouse.x),(mouse.y-this.initalPos.y)))-(0).toRad())).toDeg();
        }
        
        if (mouse.x < this.initalPos.x && this.pos.x < this.initalPos.x){
          angle=   Math.abs((( Math.atan2( (this.initalPos.x-mouse.x),(mouse.y-this.initalPos.y)))-(0).toRad())).toDeg();
        }

              if (mouse.x > this.initalPos.x && this.pos.x < this.initalPos.x){
         angle=-1;
                  //angle=   Math.abs((( Math.atan2( (this.initalPos.x-mouse.x),(mouse.y-this.initalPos.y)))-(0).toRad())).toDeg();
        }
        
//console.log(""+angle.round()+"  "+angle2);

        
var dist=  Math.sqrt(
Math.pow((this.pos.x - (ig.game.screen.x+ig.input.mouse.x)),2)+
Math.pow((this.pos.y -(ig.game.screen.y+ig.input.mouse.y)),2)
        ) ;
var dist2=  Math.sqrt(
Math.pow(((this.pos.x) - this.initalPos.x),2)+
Math.pow(((this.pos.y ) -this.initalPos.y),2)
        ) ;        
 var dist3=  Math.sqrt(
Math.pow(( this.initalPos.x-(ig.game.screen.x+ig.input.mouse.x) ),2)+
Math.pow((this.initalPos.y-(ig.game.screen.y+ig.input.mouse.y ) ),2)
        ) ;               
        
//      console.log("   "+this.pos.x.round()+
//                  " | "+this.pos.y.round()+
//                  "   "+(ig.game.screen.x+ig.input.mouse.x).round()+
//                  " | "+(ig.game.screen.y+ig.input.mouse.y).round()
//                 
//                 );
        
  //  this.pos.x +=dist.round(0) * Math.cos(0).round(0);
        
        //increase tension based on length!! instead of mouse
   //    var tension = 50;
//      
//   
        //console.log(angle)
        
        //if (this.pos.x.round(0) != (ig.game.screen.x+ig.input.mouse.x).round(0) && this.pos.y.round(0) != (ig.game.screen.y+ig.input.mouse.y).round(0) ){
        
  //  var speed_x = dist2 *  Math.cos(angle);
//var speed_y = dist2 * Math.sin(angle);    

        var dist4={
            x:Math.abs(this.initalPos.x-(ig.game.screen.x+ig.input.mouse.x)),
            y:Math.abs(this.initalPos.y-(ig.game.screen.y+ig.input.mouse.y))
            
        }
        
        
        
      var  posAdis={
           y:(dist2) * Math.cos(angle.toRad()),
           x:(dist2) * Math.sin(angle.toRad())
             
             };
        
//var  xAd =  dist2 * Math.cos(angle.toRad());
 //var yAd = dist2 *  Math.sin(angle.toRad());
        
        if(this.pos.x < this.initalPos.x)posAdis.x*=-1;
        if(this.pos.x > this.initalPos.x)Math.abs(posAdis.x);

      // if (dist2<110)
       {   
           
          // console.log(dist2)
           
//this.pos.x =ig.game.screen.x+(ig.input.mouse.x);//this.initalPos.x+50//ig.game.screen.x+(ig.input.mouse.x);
//this.pos.y =(ig.game.screen.y+(ig.input.mouse.y))-(dist3/2.2);//1190//ig.game.screen.y+(ig.input.mouse.y);
//           
//           
//this.pos.x =this.initalPos.x+.1//ig.game.screen.x+(ig.input.mouse.x);
//this.pos.y =1190//ig.game.screen.y+(ig.input.mouse.y);
////           
           
           
           if(ig.game.gameMode !=4){
           this.pos.x =ig.game.screen.x+(ig.input.mouse.x);
this.pos.y =ig.game.screen.y+(ig.input.mouse.y);}
      }
        
//        else {
//          
//this.pos.x =posAdis.x+(this.initalPos.x);//this.initalPos.x+50//posAdis.x+(this.initalPos.x);
//this.pos.y =posAdis.y+(this.initalPos.y);//1190//posAdis.y+(this.initalPos.y);
//          
////this.pos.x =this.initalPos.x+50//posAdis.x+(this.initalPos.x);
////this.pos.y =1190//posAdis.y+(this.initalPos.y);
//
//     }
////       
        

        
//
/*LOCK MOUSE ONTO OBJECTS USE DISPOSTION EFFECT VARIABLE
this is only applicable to desktop version

                    [0]---LOCKED CURSOR
                     |
                     | <-TRACK MOVEMENT DISPOSITION
                     |
                    [x] mouse.pos
*/
        
        
        
        
    //  this.pos.x =ig.game.screen.x+(ig.input.mouse.x)
        //speed_y = speed_length * sin (speed_angle);   
        
        
           
        
        
        
        
        
//if (this.pos.x.round(0) === ig.game.screen.x+ig.input.mouse.x.round(0) )console.log("here");
//               
//       if (this.pos.x < ig.game.screen.x+ig.input.mouse.x && this.pos.y < ig.game.screen.y+ig.input.mouse.y )
//           {this.pos.x+=dist2/tension;this.pos.y+=(dist3/tension).round(0);}
////        
//        if (this.pos.x > ig.game.screen.x+ig.input.mouse.x && this.pos.y > ig.game.screen.y+ig.input.mouse.y )
//           {this.pos.x-=dist2/tension;this.pos.y-=(dist3/tension).round(0);}
////
//        if (this.pos.x < ig.game.screen.x+ig.input.mouse.x && this.pos.y > ig.game.screen.y+ig.input.mouse.y )
//           {this.pos.x+=dist2/tension;this.pos.y-=(dist3/tension).round(0);}
//   
//        if (this.pos.x > ig.game.screen.x+ig.input.mouse.x && this.pos.y < ig.game.screen.y+ig.input.mouse.y )
//           {this.pos.x-=dist2/tension;this.pos.y+=(dist3/tension).round(0);}
//
//        if (this.pos.x.round(0)  === (ig.game.screen.x+ig.input.mouse.x).round(0)  && this.pos.y < ig.game.screen.y+ig.input.mouse.y )
//           {this.pos.y+=(dist2/tension);console.log("here")}
//        
//        if (this.pos.x.round(0)  === (ig.game.screen.x+ig.input.mouse.x).round(0)  && this.pos.y > ig.game.screen.y+ig.input.mouse.y )
//           {this.pos.y-=(dist2/tension);console.log("here")}
////               
//        
     //   }
        //else{this.pos.y = ig.game.screen.y+(ig.input.mouse.y);this.pos.x =ig.game.screen.x+(ig.input.mouse.x)}
        
        
//        
//        if (this.pos.x < ig.game.screen.x+ig.input.mouse.x
//         
//           ){
//            this.pos.x+=dist3/tension.round(0);;
//        }else if (this.pos.x > ig.game.screen.x+ig.input.mouse.x){
//            this.pos.x-=dist3/tension.round(0);;}else
//            {this.pos.x =ig.game.screen.x+(ig.input.mouse.x)}
//            
//            
//            if (this.pos.y < ig.game.screen.y+ig.input.mouse.y 
//           ){
//            this.pos.y+=(dist3/tension).round(0);
//        }else
//            if (this.pos.y > ig.game.screen.y+ig.input.mouse.y ){
//            this.pos.y-=(dist/(tension)).round(0);}
//        
//        else{this.pos.y = ig.game.screen.y+(ig.input.mouse.y)}
//       
            
//        
        
  // this.pos.y = dist.round(0) * Math.sin(angle).round(0);   
//speed_y = speed_length * sin (speed_angle);            
       
        
        /*
        
        var dist=  Math.sqrt(
Math.pow((this.pos.x - (ig.game.screen.x+ig.input.mouse.x)),2)+
Math.pow((this.pos.y - (ig.game.screen.y+ig.input.mouse.y)),2)
        )
        
        
        var angle=   Math.abs((( Math.atan2( (this.pos.x - (ig.game.screen.x+ig.input.mouse.x)),(this.pos.y -(ig.game.screen.y+ig.input.mouse.y))))-(180).toRad())).toDeg();
        
        var angle=   Math.abs((( Math.atan2( ( (ig.game.screen.x+ig.input.mouse.x)-this.pos.x),((ig.game.screen.y+ig.input.mouse.y)-this.pos.y)))-(180).toRad())).toDeg();
        
        
        
        */
        
        
        
        
        //follows
//        console.log(
//""+dist.round(0)+"| "+(ig.game.screen.x+ig.input.mouse.x).round(0)
//        );
        
        
        
       
//     if (this.pos.y > 1200){this.pos.y =1200;}
//    if (this.pos.x > this.initalPos.x+50){this.pos.x= this.initalPos.x+50 }    
//    if (this.pos.x < this.initalPos.x-50){this.pos.x= this.initalPos.x-50 }    
        
//1300s
//1100    
//	this.pos.x =376//ig.game.screen.x+(ig.input.mouse.x)
 //   this.pos.y = 1225.3333333333335//g.game.screen.y+(ig.input.mouse.y)
        
        
//Accuracy is off when sling is released too fast !!   
    this.initalVel.y =   -1*((this.potEnergy.y+(this.amplitude.y*this.potEnergy.y))*this.magitude)/ball.weight    
     
     
this.initalPos.x < this.pos.x ?  (
   this.initalVel.x = -1*((this.potEnergy.x-(this.amplitude.x*this.potEnergy.x))*this.magitude)/ball.weight    
     )
    :(
    this.initalVel.x= ((this.potEnergy.x+(this.amplitude.x*this.potEnergy.x))*this.magitude)/ball.weight       )

	} 


    
                                    
    else if (this.hold == false //&& this.appoxHeight >0
            )//300
	
	{
	this.stableTrigger.unpause()
	  
	this.maxVel.x = Infinity;
	this.maxVel.y = Infinity;

	this.frequency.x -= -this.amplitude.x;//rate of amps per .04 sec frequency?
	this.frequency.y  -= this.amplitude.y;
	
	this.kenEnergy.y =this.pull.y*(this.frequency.y);//displacemnt * frequency = KE ??  
	this.kenEnergy.x =this.pull.x*(this.frequency.x);
        
        this.vel.x = ((this.magitude*((this.kenEnergy.x) - (this.potEnergy.x)))/ball.weight);//<
        this.vel.y =((-this.magitude*((this.potEnergy.y) - (this.kenEnergy.y)))/ball.weight);//<
	  
	  
	}
	
if (this.hold== false && this.pos.y != this.initalPos.y ){}
	
	//END

	if (this.hold == false) {
        
        
        this.potEnergy.y = (this.pos.y - this.initalPos.y);							
        this.potEnergy.x = (this.pos.x - this.initalPos.x);
                               
                               
                               }

//CALCULATION FOR MAX VELOCITY BEGIN  

  //console.log( this.prePhys[1][6].y) //vel
  //  console.log( this.prePhys[2][2].y) //pos
  //console.log(  this.prePhys[0][2].y)//amp
 // console.log(this.sumAmp[1].y )//sumamp

    


    	var sumOf =0;
    
	if (this.hold == true ){

//THIS HAS INNACCURATICES NEEDS TO BE LOOKED AT 
//Y Velocity Begin

//PRE CALIBRATIONS BEGIN 
//	this.prePhys[0][0].y = this.amplitude.y;// 1st Amp
//		this.prePhys[1][0].y = this.initalVel.y;// 1st Vel
//		this.prePhys[1][1].y = this.initalVel.y;// 2nd Vel
//		this.prePhys[2][0].y= this.potEnergy.y;// 1st or 2nd Pos
//		this.prePhys[2][1].y = this.potEnergy.y//+(this.initalVel.y*.04)
    
        //sum  Amp
        this.sumAmp[0].y = this.amplitude.y
        //solve Vel
        this.prePhys[1][0].y = -this.initalVel.y
        //solve Pos 
        this.prePhys[2][0].y = this.potEnergy.y
        //solve Amp
        this.prePhys[0][0].y = this.amplitude.y
        
        
        //solve Pos 
        this.prePhys[2][1].y =  (this.prePhys[2][0].y)-(this.prePhys[1][0].y*ig.game.aTick)
        //solve Amp
        this.prePhys[0][1].y =  (this.prePhys[2][1].y)/this.period/this.stiffness
        //sum  Amp
        this.sumAmp[1].y = this.sumAmp[0].y+this.prePhys[0][1].y
        //solve Vel
        this.prePhys[1][1].y = ((this.prePhys[2][0].y)+((this.prePhys[2][0].y)* this.sumAmp[1].y))*this.magitude/ball.weight
        
  
                 for (i= 2 ; i < 10;i++)
        {    
        //solve Pos 
        this.prePhys[2][i].y =  (this.prePhys[2][i-1].y)-(this.prePhys[1][i-1].y*ig.game.aTick)
        //solve Amp
        this.prePhys[0][i].y =  (this.prePhys[2][i].y)/this.period/this.stiffness
        //sum  Amp
        this.sumAmp[i].y = this.sumAmp[i-1].y+this.prePhys[0][i].y
        //solve Vel
        this.prePhys[1][i].y = ((this.prePhys[2][i-1].y)+((this.prePhys[2][0].y)* this.sumAmp[i].y))*this.magitude/ball.weight
        } 
        
        
        		for (i= 1 ; i < this.prePhys[0].length ; i ++){
			
			if (typeof this.prePhys[1][i].y != 'undefined'){
                
(this.prePhys[1][i].y > this.prePhys[1][i-1].y) ? 
    
    (this.maxVelocity =this.prePhys[1][i].y, this.prePositionY=this.prePhys[2][i].y+1000 ):	

    (this.maxVelocity  = this.prePhys[1][i-1].y, this.prePositionY=this.prePhys[2][i-1].y+1000) }
            
	else 	{this.maxVelocity = this.prePhys[1][i-1].y; this.prePositionY=this.prePhys[2][i-1].y+1000;break;}

		if (this.prePhys[1][i-1].y > this.prePhys[1][i].y ) break;
                }
//end        
        
//end        
        
        
//X Velocity begin
 if (this.potEnergy.x < 0) {    
        //sum  Amp
        this.sumAmp[0].x = this.amplitude.x
        //solve Vel
        this.prePhys[1][0].x = this.initalVel.x
        //solve Pos 
        this.prePhys[2][0].x = -this.potEnergy.x
        //solve Amp
        this.prePhys[0][0].x = this.amplitude.x
        
        
 
        //solve Pos 
        this.prePhys[2][1].x =  (this.prePhys[2][0].x)+(this.prePhys[1][0].x*ig.game.aTick)
        //solve Amp
        this.prePhys[0][1].x =  (this.prePhys[2][1].x)/this.period/this.stiffness
        //sum  Amp
        this.sumAmp[1].x = this.sumAmp[0].x+this.prePhys[0][1].x
        //solve Vel
        this.prePhys[1][1].x = ((this.prePhys[2][0].x)+((this.prePhys[2][0].x)*this.sumAmp[1].x))*this.magitude/ball.weight
        
        
        for (i= 2 ; i < 10 ; i ++){     
                 //solve Pos 
        this.prePhys[2][i].x =  (this.prePhys[2][i-1].x)-(this.prePhys[1][i-1].x*ig.game.aTick)
        //solve Amp
        this.prePhys[0][i].x =  (this.prePhys[2][i].x)/this.period/this.stiffness
        //sum  Amp
        this.sumAmp[i].x = this.sumAmp[i-1].x+this.prePhys[0][i].x
        //solve Vel
        this.prePhys[1][i].x = ((this.prePhys[2][i-1].x)+((-this.potEnergy.x)* this.sumAmp[i].x))*this.magitude/ball.weight  
                }
        
 }
        
 if (this.potEnergy.x > 0) { 
 
         //sum  Amp
        this.sumAmp[0].x = this.amplitude.x
        //solve Vel
        this.prePhys[1][0].x = this.initalVel.x
        //solve Pos 
        this.prePhys[2][0].x = this.potEnergy.x
        //solve Amp
        this.prePhys[0][0].x = -this.amplitude.x
        
        
 
        //solve Pos 
        this.prePhys[2][1].x =  ((this.prePhys[2][0].x)+(this.prePhys[1][0].x*ig.game.aTick))
        //solve Amp
        this.prePhys[0][1].x =  (-this.prePhys[2][1].x)/this.period/this.stiffness
        //sum  Amp
        this.sumAmp[1].x = this.sumAmp[0].x+this.prePhys[0][1].x
        //solve Vel
        this.prePhys[1][1].x = ((-this.prePhys[2][0].x)+((this.prePhys[2][0].x)* this.sumAmp[1].x))*this.magitude/ball.weight

		
           for (i= 2 ; i < 10 ; i ++){     
                 //solve Pos 
        this.prePhys[2][i].x =   ((this.prePhys[2][i-1].x)+(this.prePhys[1][i-1].x*ig.game.aTick))
        //solve Amp
        this.prePhys[0][i].x =  (-this.prePhys[2][i].x)/this.period/this.stiffness
        //sum  Amp
        this.sumAmp[i].x = this.sumAmp[i-1].x+this.prePhys[0][i].x
        //solve Vel
        this.prePhys[1][i].x = ((-this.prePhys[2][i-1].x)+((this.potEnergy.x)* this.sumAmp[i].x))*this.magitude/ball.weight  
                }
  
 
 
 }             
        
        
        
        		for (i= 1 ; i < this.prePhys[0].length ; i ++){
			
			if (typeof this.prePhys[1][i].x != 'undefined'){
    		 
(Math.abs(this.prePhys[1][i].x) > Math.abs(this.prePhys[1][i-1].x)) ? 
    
    (this.maxVelocityX =this.prePhys[1][i-1].x, this.prePositionX=Math.abs(this.prePhys[2][i-1].x-	ig.game.gameDimesion.sndSec) ):	

    (this.maxVelocityX  = this.prePhys[1][i-1].x, this.prePositionX=Math.abs(this.prePhys[2][i-1].x-	ig.game.gameDimesion.sndSec)
     )
			
	 
	 
	 }
            
	else 	{this.maxVelocityX = this.prePhys[1][i-1].x; this.prePositionX=Math.abs(this.prePhys[2][i-1].x-	ig.game.gameDimesion.sndSec);break;}

		if (Math.abs(this.prePhys[1][i-1].x) > Math.abs(this.prePhys[1][i].x) ) break;

		
		
//end		
        
        }
        

    //   if (this.pos.x > this.initalPos.x) this.maxVelocityX*=-1;
        
        
        
        
    }
   
    
     
   //console.log(this.maxVelocityX)
  //    console.log(this.prePositionX)        
    
     //console.log(""+this.prePhys[2][1].x+"     "+this.potEnergy.x)
     //console.log(""+this.prePhys[1][9].x+"     "+this.vel.x)
  // console.log(""+ this.prePhys[0][0].x+"       "+this.amplitude.x )
  // console.log(this.sumAmp[2].x)
   
   
//END Of Max Velocity Calculation 

//////////////////////////////////////////////////////////////////////////
//THIS HAS PREFORMANCE ISSUES THE MORE INTENSITY OF HEIGHT THE WORSE
//MAXIMUM HEIGHT CALCULATION BEGIN 


var a, b, c, d, e, f, g,eSum, h,k, z,x, i; //because I cant come up with a better terminology

eSum = []//new Array(50)//360
z=0
x=800
f=0



h=ig.game.gRate //12 steps before HieghtDiff - Time frame(starting from .48 -ig.game.aTick)
k=ig.game.gRate*ig.game.aTick;//.48 // reAdjust the HeightDiff at 24 Velocity

	if (this.vel.y == 0){
		
		

		for (i= 1;  ;i++)
      //  do
		{	
	
a = (ig.game.aTick*i)//	Time Frames  eg. 0ig.game.aTick, 0.08, 0.12 
b= (ig.game.aTick*i)*ig.game.gravity - this.maxVelocity//
	
c=k-(( ((h*i)/h))*ig.game.aTick)
d=(a*(ig.game.gRate -1)-c)
//<this slowed things down dramatically now fixed
//f = eSum.reduce( function(total, num){ return total + num }, 0);//SUM of HieghtDiff
// eSum.reduce((pv, cv) => pv+cv, 0);
            
//MODIFY THE CONDITION TO EXCLUDE THE LAST INDEX! this.maxVelocity-12            
            if ( (i)*h > this.maxVelocity-ig.game.gRate){e = (a*(h-b)+f)//Solution 
 	break;}
				
			else{if (i*h >= h*3) f += d;//SUM of HieghtDiff <<simple alternative and effective//eSum[i]=d 
			}
	
	} //while(i++);

this.appoxHeight = ((this.prePositionY-1000)-e)*-1//Solution 


//this.appoxHeight = (this.pos.y+(this.prePositionY-1000)-e)*-1

}

//END



//////////////////////////////////////////////////////////////////////////







},



    
type: ig.Entity.TYPE.A,
checkAgainst: ig.Entity.TYPE.A,
collides: ig.Entity.COLLIDES.NEVER,




_inParameter: function() {var ball =  ig.game.loadedBallType;
if (this.atRest && ball.vel.y == 0) {
return (
ig.input.mouse.x + ig.game.screen.x > this.pos.x-24 &&
 
ig.input.mouse.x + ig.game.screen.x < this.pos.x+48 &&

ig.input.mouse.y + ig.game.screen.y > this.pos.y &&

ig.input.mouse.y + ig.game.screen.y < this.pos.y+48 
)



}
},

check: function( other )
	{
if (other.vel.y ==0){
	this.unId = other.id//ig.game.getEntityByID(other.id)
	this.ballType = ig.game.getEntityByID(this.unId)//unId
}
		},
		





});

});
