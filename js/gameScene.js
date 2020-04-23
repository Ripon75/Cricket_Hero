class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        this.load.image('ball', 'assets/images/ball.png');
        this.load.image('stump', 'assets/images/stump.png');
        this.load.image('os', 'assets/images/us.jpg');
        this.load.image('cross', 'assets/images/cross.png');
        this.load.image('change', 'assets/images/v.png');
        this.load.image('dot', 'assets/images/dot.png');
        this.load.image('bounce', 'assets/images/bounce.png');
        this.load.image('input', 'assets/images/input.png');
        this.load.image('playButton', 'assets/images/playB.png');
        this.load.image('pauseButton', 'assets/images/pauseB.png');
        this.load.image('retryButton', 'assets/images/retry.png');

        //add audio
        this.load.audio('hitSound', 'assets/audio/hit.mp3');
        this.load.audio('outSound', 'assets/audio/out.mp3');

        this.load.atlas('hit', 'assets/images/batsman_hit.png', 'assets/images/batsman_hit.json');

        this.load.atlas('idle', 'assets/images/batsman_idle2.png', 'assets/images/batsman_idle2.json');

    }

    create() {
        this.count = 0;
        this.score = 0;

        // add ball
        this.randomX = Phaser.Math.Between(0, config.width);
        this.ball = this.physics.add.image(this.randomX, 630, 'ball');
        this.ball.setScale(.3);
        this.ball.visible = false;

        //add sound
        this.hitSound = this.sound.add('hitSound');
        this.outSound = this.sound.add('outSound');
        
        //add cross
        this.cross1 = this.add.image(40, 30, 'cross');
        this.cross1.setScale(.05);
        this.cross1.visible = false;

        this.cross2 = this.add.image(90, 30, 'cross');
        this.cross2.setScale(.05);
        this.cross2.visible = false;

        this.cross3 = this.add.image(140, 30, 'cross');
        this.cross3.setScale(.05);
        this.cross3.visible = false;

        this.ball1 = this.add.image(40, 30, 'ball');
        this.ball1.setScale(.3);

        this.ball2 = this.add.image(90, 30, 'ball');
        this.ball2.setScale(.3);

        this.ball3 = this.add.image(140, 30, 'ball');
        this.ball3.setScale(.3);

        //add play button
        this.playButton = this.add.image(40,80,'playButton');
        this.playButton.setScale(.18);
        this.playButton.visible = false;
        
        // add pause button    
        this.resumeButton = this.add.image(40,80,'pauseButton');
        this.resumeButton.setScale(.18);

        // add retry button
        this.retryButton = this.add.image(90,80,'retryButton');
        this.retryButton.setScale(.18);
       
         //add event with play button
         this.playButton.setInteractive();
         this.playButton.on('pointerdown',function(){

             if(this.count<3)
             {
                this.gameState = true;
                this.playButton.visible = false;
                this.resumeButton.visible = true;
             }
            
         },this);

         //add event with play button
         this.resumeButton.setInteractive();
         this.resumeButton.on('pointerdown',function(){
             
             this.gameState = false;
             this.resumeButton.visible = false;
             this.playButton.visible = true;
 
         },this);

         //add event with retry button
         this.retryButton.setInteractive();
         this.retryButton.on('pointerdown',()=>{

            this.scene.start('startScene');

         },this);

        //add stump
        this.stump = this.physics.add.image(config.width/2, config.height/ 4 + 40, 'stump');
        this.stump.setScale(.5);

        this.outStump = this.physics.add.image(config.width/2, config.height / 4 + 40, 'os');
        this.outStump.setScale(.4);
        this.outStump.visible = false;

        //hide dot
        this.dot = this.add.image(this.stump.x, this.stump.y, 'bounce');
        this.dot.setScale(.8);
        this.dot.depth = -1;
        this.dot.alpha = .5;

        //ad dot
        this.dot = this.add.image(this.stump.x, this.stump.y, 'bounce');
        this.dot.setScale(.8);
        this.dot.depth = -1;
    
        //hide ball
        this.hideBall = this.physics.add.image(this.dot.x, this.dot.y, 'ball');
        this.hideBall.setScale(.15);
        this.hideBall.visible = false;

        //add bounce image
        this.bounce = this.add.image(config.width/2, 400, 'bounce');
        this.bounce.visible = false;

        //add bounce ball
        this.bounceBall = this.physics.add.image(this.bounce.x, this.bounce.y, 'ball');
        this.bounceBall.setScale(.15);
        this.bounceBall.visible = false;
        
        //add input image
        this.inputImage = this.add.image(config.width/2,config.height/2+145, 'input');
        this.inputImage.setScale(1.5);
        this.inputImage.alpha = .01;

        // create animation for hit
        this.anims.create({
            key: 'hitting',
            frames: [{
                key: 'hit',
                frame: "0001.png"
            },
            {
                key: 'hit',
                frame: "0012.png"

            },
            {
                key: 'hit',
                frame: "0002.png"

            },
            {
                key: 'hit',
                frame: "0003.png"
            },
            {
                key: 'hit',
                frame: "0004.png"
            },
            {
                key: 'hit',
                frame: "0005.png"
            },
            {
                key: 'hit',
                frame: "0006.png"
            },
            {
                key: 'hit',
                frame: "0007.png"
            },
            {
                key: 'hit',
                frame: "0008.png"
            },
            {
                key: 'hit',
                frame: "0009.png"
            },
            {
                key: 'hit',
                frame: "0010.png"
            },
            {
                key: 'hit',
                frame: "0011.png"
            }
            ],
            frameRate: 120,
            //repeat: -1
        });

        // hitting animation
        this.hit = this.add.sprite(config.width/2+50, 200, 'hit');
        this.hit.setScale(.5);
        this.hit.visible = false;

        //create animation for bat 
        this.anims.create({
            key: 'idleAnimation',
            frames: [{
                key: 'idle',
                frame: "0001.png"
            },

            {
                key: 'idle',
                frame: "0002.png"

            },
            {
                key: 'idle',
                frame: "0003.png"
            },
            {
                key: 'idle',
                frame: "0004.png"
            },
            {
                key: 'idle',
                frame: "0005.png"
            },
            {
                key: 'idle',
                frame: "0006.png"
            },
            {
                key: 'idle',
                frame: "0007.png"
            },
            {
                key: 'idle',
                frame: "0008.png"
            },

            {
                key: 'idle',
                frame: "0009.png"
            },

            {
                key: 'idle',
                frame: "0010.png"
            },

            {
                key: 'idle',
                frame: "0011.png"
            },

            {
                key: 'idle',
                frame: "0012.png"
            },
            {
                key: 'idle',
                frame: "0013.png"
            },
            {
                key: 'idle',
                frame: "0014.png"
            },
            {
                key: 'idle',
                frame: "0015.png"
            },
            {
                key: 'idle',
                frame: "0016.png"
            },
            {
                key: 'idle',
                frame: "0017.png"
            },
            {
                key: 'idle',
                frame: "0018.png"
            },
            {
                key: 'idle',
                frame: "0019.png"
            },
            {
                key: 'idle',
                frame: "0020.png"
            },

            {
                key: 'idle',
                frame: "0021.png"
            },
            {
                key: 'idle',
                frame: "0022.png"
            },
            {
                key: 'idle',
                frame: "0023.png"
            },
            {
                key: 'idle',
                frame: "0024.png"
            },
            {
                key: 'idle',
                frame: "0025.png"
            },
            {
                key: 'idle',
                frame: "0026.png"
            },
            {
                key: 'idle',
                frame: "0027.png"
            },
            {
                key: 'idle',
                frame: "0028.png"
            },
            {
                key: 'idle',
                frame: "0029.png"
            },
            {
                key: 'idle',
                frame: "0030.png"
            },
            {
                key: 'idle',
                frame: "0031.png"
            }
            ],
            frameRate: 30,
            repeat: -1
        });

        // idle animation
        this.idle = this.add.sprite(config.width/2+50, 200, 'idle');
        this.idle.setScale(.5);
        this.idle.play("idleAnimation");

        //add event with input image
        this.click = false;
        this.inputImage.setInteractive();
        this.inputImage.on('pointerdown', function(){
            this.click = true;
        },this);

        // left change
        var left = this.add.image(config.width/2+70, 200, 'change');
        left.alpha = .01;
        left.setScale(.6);

        left.setInteractive();
        left.on('pointerdown', function () {

            if (this.count < 3) {

                this.hit.visible = false;
                this.hit = this.add.sprite(config.width/4+70, 200, "hit");
                this.hit.setScale(.5);
                this.hit.flipX = true;
                this.hit.visible = false;

                this.idle.visible = false;
                this.idle = this.add.sprite(config.width/4+70, 200, 'idle');
                this.idle.flipX = true;
                this.idle.setScale(.5);
                this.idle.play("idleAnimation");
            }

        }, this);

        // flip animation right
        var right = this.add.image(config.width/4, 200, 'change');
        right.setScale(.6);
        right.alpha = .01;

        right.setInteractive();
        right.on('pointerdown', function () {

            if (this.count < 3) {
            this.hit.visible = false;
            this.hit = this.add.sprite(config.width/2+50, 200, "hit");
            this.hit.setScale(.5);
            this.hit.flipX = false;
            this.hit.visible = false;

            this.idle.visible = false;
            this.idle = this.add.sprite(config.width/2+50, 200, 'idle');
            this.idle.flipX = false;
            this.idle.setScale(.5);
            this.idle.play("idleAnimation");
        }

        }, this);

        this.scoreText = this.add.text(190, 30, 'Score:' + this.score, {
            color: "#ffffff", fontSize: 32
        });

        this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        this.dropStart = Date.now();
        this.bolean = false;
        this.gameState = true;
        this.condition = false;
        this.notOut = false;
        this.hitAnyTime = false;

    }

    //move ball
    moveBall = function () {
        this.randomX = Phaser.Math.Between(0, config.width);
        this.ball = this.physics.add.image(this.randomX, 630, 'ball');
        this.ball.setScale(.15);

        var dotX = this.dot.x;
        var dotY = this.dot.y;

        var tween = this.tweens.add({
            targets: this.ball,
            props: {
                x: { value: function () { return dotX; }, ease: 'Power1' },
                y: { value: function () { return dotY; }, ease: 'Power3' }
            },

            duration: 1000
        });

    }

    //bounceBallMove
    bounceBallMove = function () {
        this.randomX = Phaser.Math.Between(0, config.width);
        this.ball = this.physics.add.image(this.randomX, 630, 'ball');
        this.ball.setScale(.15);

        var bounceX = this.bounce.x;
        var bounceY = this.bounce.y;

        var tween = this.tweens.add({
            targets: this.ball,
            props: {
                x: { value: function () { return bounceX; }, ease: 'Power1' },
                y: { value: function () { return bounceY; }, ease: 'Power3' }
            },

            duration: 700
        });
    }

    // my calculation
    myCalculation = function () {

        if(this.notOut)
        {
                   
            this.ball.visible = false;      
        }

        else
        {

        this.outSound.play();
        this.count++;
        this.outStump.visible = true;
        this.stump.visible = false;

        this.time.addEvent({
            delay: 400, callback: function () {
                this.outStump.visible = false;
                this.stump.visible = true;
            }, callbackScope: this, repeat: 0
        });

        if (this.count === 1) {
            this.cross1.visible = true;
            this.ball1.visible = false;
        }

        if (this.count === 2) {
            this.cross2.visible = true;
            this.ball2.visible = false;
        }

        if (this.count === 3) {

            this.cross3.visible = true;
            this.ball3.visible = false;
            this.gameState = false;
        }
    } //extra

    }

    idleAnimationPlay = function () {

        this.time.addEvent({
            delay: 300, callback: function () {
                this.hit.visible = false;
                this.idle.visible = true;
                this.idle.play("idleAnimation");

            }, callbackScope: this, repeat: 0
        });

    }

    dotMoveRight() {

        this.notOut = false;
        this.dot.visible = false;
        this.dot = this.add.image(this.stump.x + 18, this.stump.y, 'bounce');
        this.dot.setScale(.8);
        this.dot.depth = -1;

    }

    dotMoveLeft() {

        this.notOut = true;
        this.dot.visible = false;
        this.dot = this.add.image(this.stump.x-40, this.stump.y, 'bounce');
        this.dot.setScale(.8);
        this.dot.depth = -1;

    }

    dotMoveMiddle() {
        
        this.notOut = false;
        this.dot.visible = false;
        this.dot = this.add.image(this.stump.x, this.stump.y, 'bounce');
        this.dot.setScale(.8);
        this.dot.depth = -1;
    }

    ballPosition(){

        if(this.score>2 && this.rN2==3){
            
            this.dotMoveRight();
        }

        if(this.score>2 && this.rN2==2){
           
            this.dotMoveLeft();
        }

        if(this.score>2 && this.rN2==1){
           
            this.dotMoveMiddle();
        }
    }

    scoreUpdate() {

        this.hitSound.play();
        this.score++;
        this.ball.visible = false;
        this.idle.visible = false;
        this.hit.visible = true;
        this.hit.play('hitting');

        this.idleAnimationPlay();

        // add hide ball
        this.hideBall = this.physics.add.image(this.dot.x, this.dot.y, 'ball');
        this.hideBall.setScale(.15);

        this.hideBall.setVelocity(Phaser.Math.Between(-800, 800), 800);
        this.scoreText.setText('Score:' + this.score);
    }

    delayOut(){
        this.time.addEvent({
            delay: 400, callback: function () {
                this.myCalculation.call(this);
            }, callbackScope: this, repeat: 0
        }); 
    }

    update() {

        let now = Date.now();
        let delta = now - this.dropStart;

        if (delta > 2000) {

            if (this.gameState) {

                this.rN = Phaser.Math.Between(1,5);
                 this.rN2 = Phaser.Math.Between(1,5);
                                            
                if (this.score>1 && (this.rN==2||this.rN==4)) {
                    
                    this.bounceBallMove();
                    this.fullTouch = false;
                   
                }
                else {

                    this.moveBall.call(this);
                    
                    this.fullTouch = true;
    
                }

                this.ballPosition();
                this.bolean = true;
                this.condition = true;
                this.hitAnyTime = true;
                this.dropStart = Date.now();

            }

        }

        if(this.click && this.gameState && this.hitAnyTime)
        {
            
            this.idle.visible = false;
            this.hit.visible = true;
            this.hit.play('hitting');
            this.idleAnimationPlay();
           
        }

        if (this.fullTouch) {

            if (this.click && this.bolean) {
        
                if (this.ball.y >= 260) {

                    this.idle.visible = false;
                    this.hit.visible = true;
                    this.hit.play('hitting'); 

                    if(this.ball.y<280){
                        this.myCalculation.call(this);
                    }
                    else{
                        this.delayOut();
                    }
                    
                  
                    this.idleAnimationPlay();

                }
                else {

                    this.scoreUpdate();
                }
                this.bolean = false;

            }

            // for move ball
            if (!this.click && this.bolean && this.ball.y <= 200) {
                this.myCalculation.call(this);
                this.bolean = false;

            }

            if (this.ball.y <= 220) {
                this.ball.y = 680;
            }

            if (this.hideBall.y > 640) {
               
                this.hideBall = this.physics.add.image(this.dot.x, this.dot.y, 'ball');
                this.hideBall.setScale(.15);
                this.hideBall.visible = false;
            }
            this.click = false;

        }

        // for bounce ball
        else {

            if (this.click && this.bolean) {

                this.click = false;
                if (this.bounceBall.y >= 270) {

                    this.idle.visible = false;
                    this.hit.visible = true;
                    this.hit.play('hitting');

                    //this.myCalculation.call(this);
                    if(this.bounceBall.y<280){
                        this.myCalculation.call(this);
                    }
                    else{
                        this.delayOut();
                    }

                    this.idleAnimationPlay();

                }
                else {                  

                    this.scoreUpdate();
                }
                this.bolean = false;

            }

            if (!this.click && this.bolean && this.bounceBall.y <= 250) {
                this.myCalculation.call(this);
                this.bolean = false;

            }

            if (this.bounceBall.y < 250) {
                this.bounceBall.visible = false;
            }

            if (this.ball.y == 400) {

                this.ball.visible = false;

                if (this.condition) {
                    this.bounceBall.visible = true;
                    this.bounceBall.setVelocityY(-400);
                }
                this.condition = false;

            }
            if (this.bounceBall.y < 240) {
                this.bounceBall.visible = false;
                this.bounceBall = this.physics.add.image(this.bounce.x, this.bounce.y, 'ball');
                this.bounceBall.visible = false;
                this.bounceBall.setScale(.15);

            }


        } // else backet

    }

}