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
    this.jumpFrame = 0;
    this.preAction = false;
    this.checkKeydown();
    this.checkKeyup();
    map.init(WIDTH,HEIGHT);
    this.drawAll();

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
          player.canControl = true;
        }
      }
    }
  },
  checkKeydown : function(event){
    document.onkeydown = function(event){
      switch(e.keyCode){
          case 65:
          case 37:player.left = 1;break;
          case 87:
          case 38:player.isJumping = true;player.top = 1;break;
          case 68:
          case 39:player.right = 1;break;
          case 83:
          case 40:player.bottom = 1;break;
      }   
    };
  },
  checkKeyup : function(event){
    document.onkeyup = function(event){
      var e = event||window.event;
      switch(e.keyCode){
        case 65:
        case 37:player.left = 0;break;
        case 87:
        case 38:player.top = 0;break;
        case 68:
        case 39:player.right = 0;break;
        case 83:
        case 40:player.bottom = 0;break;
      }
    }
  },
  limitPlayer : function(){
    if(player.x<0){
      player.x = 0;
    }
    if(player.y<0){
      player.y = 0;
    }
    if(player.x+player.w > WIDTH){
      player.x = WIDTH - player.w;
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
    if(player.canControl){
      // if(!player.isJumping){
      //   document.onkeydown = game.checkKeydown;
      // }else{
      //   document.onkeydown = null;
      //   game.playerJump();
      //   player.top = player.left = player.right = player.bottom = false;
      // }
      // TODO:
      // 就是按完上，就可能按左右控制下落位置
      // 所以不能简单地去除按键绑定，需要判断
      if(!player.isJumping){
        
      }else{
        // true代表我需要屏蔽上跳的监听
        game.checkKeydown(true);
      }
      
      // game.checkKeydown();
      game.playerJump();
    }
    game.limitPlayer();
    game.drawAll();
  },
  playerJump:function(){
    var action = player.left+''+player.top+''+player.right;
    console.log(action)

    if(this.jumpFrame<=player.jumpFs){

      this.jumpFrame++;
    }
    // if(player.top){
    //   if(player.right){
    //     this.preAction = 'right';
    //     player.right = false;
    //   }
    //   if(player.left){
    //     this.preAction = 'left';
    //     player.left = false;
    //   }

    //   switch(this.preAction){
    //     case 'right':
    //       player.x += player.jumpHor/player.jumpFs
    //       break;
    //     case 'left':
    //       player.x -= player.jumpHor/player.jumpFs;
    //       break;
    //   }
    //   player.y -= player.jumpVer/(player.jumpFs/2);

    //   this.jumpFrame++;
    //   if(this.jumpFrame>player.jumpFs/2){
    //     player.y += player.jumpVer/(player.jumpFs/2);
    //   }
    // }else if(player.left){
    //   this.jumpFrame+=player.jumpFs/3;
    //   player.x -= player.jumpHor/player.jumpFs;
    //   this.jumpFrame++;
    //   // this.preAction = player.left = false;
    // }else if(player.right){
    //   this.jumpFrame+=player.jumpFs/3;
    //   player.x += player.jumpHor/player.jumpFs;
    //   // this.preAction = player.right = false;
    // }
    // if(this.jumpFrame===player.jumpFs){
    //     player.isJumping = false;
    //     this.jumpFrame = 0;
    //     // this.preAction = player.top = player.left = player.right = player.bottom = false;
    //   }
  },
  drawAll : function(){
    var i;
    for(i=0; i<map.grounds.length; i++){
      this.createRect(map.grounds[i].x,map.grounds[i].y,map.grounds[i].w,map.grounds[i].h,'green');
    }
    this.createRect(player.x,player.y,player.w,player.h,player.background);
  }

}
var map = {
  world : {},
  grounds : [],
  enemies : [],
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
  background:'lightblue',
  // 方向使用01代替false和true
  top:0,
  left:0,
  right:0,
  top:0,
  isJumping:0,
  canControl:false,
  jumpHor:120,// 跳跃的水平距离
  jumpVer:300,// 跳跃的垂直距离
  jumpFs:30,// 跳跃需要的帧数
};
var enemy = function(x,y){
  this.x = x;
  this.y = y;
  this.w = 100;
  this.h = 20;
};
window.onload = function(){
  game.init();
  // console.log('----------------\n有的时候\n觉得自己不断在努力\n但是事实上\n一直没走出那个枷锁\nBy Fakefish\n----------------');
}
