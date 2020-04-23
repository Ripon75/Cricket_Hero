
var config;
var game;
window.onload = function() {

    FBInstant.initializeAsync().then(function () {

        var progress = 0;
        var inerval = setInterval(function () {
          progress += 10;
          FBInstant.setLoadingProgress(progress);
          if (progress >= 90) {
            clearInterval(inerval);
            FBInstant.startGameAsync().then(function () {
    
              var contextId = FBInstant.context.getID();
    
              var contextType = FBInstant.context.getType();
    
              var playerName = FBInstant.player.getName();
              var playerPic = FBInstant.player.getPhoto();
              var playerId = FBInstant.player.getID();
    
            });
    
          }
    
        }, 100);
    
      });
   
    config = {
        type: Phaser.AUTO,       
        width: 360,
        height: 640,
          physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        backgroundColor: 0x32cd32,
      
        scene: [menuScene,startScene,GameScene]
    };
    
    game = new Phaser.Game(config);
    resize();
    window.addEventListener("resize", resize, false);
}

function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;

    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}