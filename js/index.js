CC.EnableAutoResize(true);

var SpaceObj = function(radius,fillStyle,orbitObj,orbitSpeed,orbitDist,offset){
  return (CC.AddLooper(null,null,function(){    
    this.x = orbitObj.x + Math.sin((CC.time/1000+offset) * orbitSpeed) * orbitDist;
    this.y = orbitObj.y + Math.cos((CC.time/1000+offset) * orbitSpeed) * orbitDist;
    
    CC.ctx.beginPath();
    CC.ctx.arc(this.x, this.y, radius, 0, Math.PI*2, false);   
    
    CC.ctx.fillStyle = fillStyle;
    CC.ctx.fill();
  }));
};

var RingObj = function(radius,strokeStyle,lineWidth,orbitObj){
  return (CC.AddLooper(null,null,function(){    
    this.x = orbitObj.x;
    this.y = orbitObj.y;
    
    CC.ctx.beginPath();
    CC.ctx.arc(this.x, this.y, radius, 0, Math.PI*2, false);   
    
    CC.ctx.lineWidth = lineWidth;
    CC.ctx.strokeStyle = strokeStyle;
    CC.ctx.stroke();
  }));
};



var Background = CC.AddLooper(0,0,function(){
  this.x = CC.midX;
  this.y = CC.midY;
  
 CC.ctx.fillStyle = "rgb(20,19,22)";
  CC.ctx.fillRect(0,0,CC.w,CC.h);
});


var Sun = new SpaceObj(40,"rgb(255,160,0)",Background,0,0,0);


var PathMercury = new RingObj(65,"rgb(64,64,64)",1,Sun),
    PathVenus = new RingObj(85,"rgb(64,64,64)",1,Sun),
    PathEarth = new RingObj(120,"rgb(64,64,64)",1,Sun),
    PathMars = new RingObj(145,"rgb(64,64,64)",1,Sun),
    PathJupiter = new RingObj(230,"rgb(64,64,64)",1,Sun),
    PathSaturn = new RingObj(305,"rgb(64,64,64)",1,Sun),
    PathUranus = new RingObj(380,"rgb(64,64,64)",1,Sun),
    PathNeptune = new RingObj(460,"rgb(64,64,64)",1,Sun),
    
    Mercury = new SpaceObj(3,"rgb(160,112,112)",Sun,2,65,0),    
    Venus = new SpaceObj(5,"rgb(192,172,160)",Sun,1.5,85,0),    
    Earth = new SpaceObj(6,"rgb(96,232,255)",Sun,1.1,120,0),       
    Mars = new SpaceObj(5,"rgb(190,128,112)",Sun,0.9,145,0),
    Jupiter = new SpaceObj(20,"rgb(216,160,128)",Sun,0.4,230,0),      
    Saturn = new SpaceObj(12,"rgb(232,200,160)",Sun,0.45,305,0),        
    Uranus = new SpaceObj(10,"rgb(96,232,224)",Sun,0.35,380,0),
    Neptune = new SpaceObj(8,"rgb(0,152,188)",Sun,0.2,460,0);


var EarthLand = [
      new SpaceObj(3,"rgb(96,200,32)",Earth,8,3,1),
      new SpaceObj(2,"rgb(96,200,32)",Earth,8,1,2.5),
      new SpaceObj(3,"rgb(96,200,32)",Earth,8,-3,0),
      new SpaceObj(2,"rgb(96,200,32)",Earth,8,2,.6)
    ],
    EarthMoon = new SpaceObj(2,"rgb(216,208,208)",Earth,3,9,0),
    MarsMoon = new SpaceObj(1.44,"rgb(145,201,204)",Mars,8,9,5),
    MarsMoon = new SpaceObj(0.7,"rgb(90,195,200)",Mars,2,11,5),
    SaturnRing = new RingObj(15,"rgb(200,180,152)",3,Saturn);