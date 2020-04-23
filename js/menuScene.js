class menuScene extends Phaser.Scene {

    constructor ()
    {
        super('menuScene');
    }

    preload()
    {

        this.load.image('play', 'assets/images/play.png');
    }

    create ()
    {
       this.playButton = this.add.image(config.width/2, config.height/2 ,'play');
       this.playButton.setScale(.4);
       this.playButton.setInteractive();

       this.playButton.on('pointerdown', ()=>{

        this.myParticle();
        this.time.addEvent({delay: 500,callback:this.addEvent,callbackScope:this,repeat: 0 });
        
       },this);
   
    } 

    addEvent(){
        game.scene.start('startScene');
        //this.scene.start('GameScene');
        
        
      }

    myParticle(){
 
        this.tweens.add({
                targets: this.playButton,
                    scaleX: 0,
                    scaleY: 0,
                    alpha: 0,
                    y: '+=64',
                    ease: 'Power3',
                    duration: 1000,
            });
    
      }

}


