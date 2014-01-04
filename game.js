var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var game = {
  createCanvas : function(){
    // 创建界面
    this.c = document.createElement('canvas');
    this.ctx = this.c.getContext('2d');
    this.c.id = 'canvas';
    this.c.width = WIDTH;
    this.c.height = HEIGHT;
    document.body.appendChild(this.c);
  },
  init : function(){
    this.createCanvas();
    this.gravity = true;
    map.init(WIDTH,HEIGHT);
    this.drawAll();
    document.onkeydown = this.checkKeydown;

    this.start();
  },
  start : function(){
    // animationFrame = window.requestAnimationFrame(game.animate,game.c);
    animationFrame = setInterval(game.animate,30)
  },
  checkGravity : function(){
    if(this.gravity){
      var ph = player.y+player.h - map.grounds[0].y;
      if(ph < 0){
        this.movePlayerTo(player.x,player.y+10);
        if(ph >= -player.h/7){
          this.movePlayerTo(player.x,map.grounds[0].y-player.h);
        }
      }
    }
  },
  checkKeydown : function(event){
    game.gravity = false;
    var e = event||window.event;
    switch(e.keyCode){
      case 65:
      case 37:player.left = true;break;
      case 87:
      case 38:player.top = true;break;
      case 68:
      case 39:player.right = true;break;
      case 83:
      case 40:player.bottom = true;break;
    }
    return false;
  },
  controlPlayer : function(){
    if(player.top){
      player.y -= player.h/2;
      player.y = player.y<0 ? 0 :player.y;
    }
    if(player.left){
      player.x -= player.w;
      player.x = player.x<0 ? 0 :player.x;
    }
    if(player.right){
      player.x += player.w;
      player.x = player.x+player.w>WIDTH ? WIDTH-player.w :player.x;
    }
  },
  movePlayerTo : function(x,y){
    player.x = x;
    player.y = y;
  },
  createRect : function(x,y,w,h,color){
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x,y,w,h);
  },
  animate : function(){
    game.ctx.clearRect(0,0,WIDTH,HEIGHT);
    game.checkGravity();
    game.controlPlayer();
    game.drawAll();
  },
  drawAll : function(){
    var i;
    for(i=0; i<map.grounds.length; i++){
      this.createRect(map.grounds[i].x,map.grounds[i].y,map.grounds[i].w,map.grounds[i].h,'green');
    }
    this.createRect(player.x,player.y,player.w,player.h,'lightblue');
    player.top = player.left = player.right = player.bottom = false;
  }

}
var map = {
  world : {},
  grounds : [],
  // player : [],
  init : function(w,h){
    this.world.width = w;
    this.world.height = h;
    this.grounds.push({x:0,y:Math.round(h-h/30),w:w,h:h/30});
  },
}
var player = {
  x:0,
  y:0,
  w:20,
  h:100,
  top:false,
  left:false,
  right:false,
  top:false
}
window.onload = function(){
  game.init();
  // console.log('----------------\n有的时候\n觉得自己不断在努力\n但是事实上\n一直没走出那个枷锁\nBy Fakefish\n----------------');
}
