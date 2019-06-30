var CC = {

  
  cvs: document.createElement('canvas'),
  ctx: 0,
  w: 0,
  h: 0,
  midX: 0,
  midY: 0,
  time: 0,
  tick: 0,
  

  
  _initialized: false,
  _starters: [],
  _loopers: [],
  
  

  
  Color: function(r,g,b,a){
    return 'rgb'+(a?'a':'')+'('+r+','+g+','+b+(a?','+a:'')+')';
  },
  
  DegToVector: function(deg){
    var rad = deg * (Math.PI / 180);
    
    return { x: -Math.sin(rad), y: Math.cos(rad) };
  },
  
  RoundedRect: function(x,y,width,height,radius){
    CC.ctx.beginPath();
    CC.ctx.moveTo(x,y+radius);
    CC.ctx.lineTo(x,y+height-radius);
    CC.ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
    CC.ctx.lineTo(x+width-radius,y+height);
    CC.ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
    CC.ctx.lineTo(x+width,y+radius);
    CC.ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
    CC.ctx.lineTo(x+radius,y);
    CC.ctx.quadraticCurveTo(x,y,x,y+radius);
  },
  
  RotateAroundPoint: function(x,y,deg){
    //Laipsniai -> radianai
    var rad = deg * Math.PI / 180;

    CC.ctx.translate(x, y);
    CC.ctx.rotate(rad);
  },
  
  AddStarter: function(startfcn) {
    if (!CC._initialized){
      CC._Init();
    }
    
    var index = CC._starters.length;
    
    CC._starters.push(startfcn);
    CC._MainStatic();
    
    return index;
  },
  
  AddLooper: function(startX, startY, loopfcn) {
    if (!CC._initialized){
      CC._Init();
    }

    var loopObj = new CC._LoopObject(startX, startY, loopfcn);
    CC._loopers.push(loopObj);
    
    return loopObj;
  },
  
  RemoveStarter: function(index) {
    if (!(index in CC._starters)){
      index = CC._starters.indexOf(index);
    }
    if (index > -1){
      CC._starters.splice(index);
      CC._MainStatic();
    }   
  },
  
  RemoveLooper: function(index) {
    if (!(index in CC._loopers)){
      index = CC._loopers.indexOf(index);
    }
    if (index > -1){
      CC._loopers.splice(index);
      CC._MainStatic();
    }   
  },
  
  EnableAutoResize: function(enable) {
    if (enable){
      window.addEventListener('resize', CC._SetMargins, false);
    }
    else{  
      window.removeEventListener('resize', CC._SetMargins, false);
    } 
  },
  

  
  _LoopObject: function(startX, startY, fcn){
    this.x = startX;
    this.y = startY;
    this.fcn = fcn;
    
    this._components = [];
    
    this.AddComponent = function(fcn){
      var comp = new CC._Component(this._components.lenth, fcn);
      
      this._components.push(comp);
      return comp;
    };
    
    this.RemoveComponent = function(index){
      if (!(index in this._components)){
        index = index.index;
      }
      if (index > -1){
        CC._components.splice(index);
      }   
    };
    
    this.Update = function(){
      CC.ctx.save();      
      
      if (this.fcn != null){
        this.fcn();
      }
      
      for(var j = 0, len = this._components.length; j < len; j++)
      {
        this._components[j].x = this.x;
        this._components[j].y = this.y;
        this._components[j].Fcn();
      }
      
      CC.ctx.restore();
    }
  },
  
  _Component: function(index, fcn){
    this.index = index;
    this.x = 0;
    this.y = 0;
    this.Fcn = fcn;
  },
  
  _SetMargins: function() {
    var bodyW = Math.max(600, document.documentElement.clientWidth),
        bodyH = document.documentElement.clientHeight;

    if (bodyW != CC.w || bodyH != CC.h) {
      CC.w = CC.cvs.width = bodyW;
      CC.h = CC.cvs.height = bodyH;
      
      CC.midX = CC.w/2;
      CC.midY = CC.h/2;

      CC.cvs.style.top = CC.cvs.style.bottom = 0;
      CC.cvs.style.left = CC.cvs.style.right = 0;
     
      CC._MainStatic();
    }
  },

  _Init: function() {
    CC._intialized = true;
    
    document.getElementsByTagName('body')[0].appendChild(CC.cvs);
    CC.cvs.style.position = "fixed";
    CC.ctx = CC.cvs.getContext('2d');

  
    CC._SetMargins();
    
    CC._MainStatic();
    CC._MainLooping();
  },  

  _MainStatic: function() {
    CC.time = Date.now();
    
    for(var i = 0, len = CC._starters.length; i < len; i++)
    {
      CC._starters[i]();
    }    
  },
  
  _MainLooping: function() {
    var newTime = Date.now();
    
    CC.tick = newTime - CC.time;
    CC.time = newTime;
    
    for(var i = 0, len = CC._loopers.length; i < len; i++)
    {
      CC._loopers[i].Update();
    }

    requestAnimationFrame(CC._MainLooping);
  }
}