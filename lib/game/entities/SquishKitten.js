ig.module(
        'game.entities.SquishKitten'
    )
    .requires(
        'impact.entity',
        'game.entities.GuideDot'
    )
    .defines(function(){

        EntitySquishKitten = ig.Entity.extend({
            wallCling: false,
            wallClingTimeLimit: 2,
            wallClingTimer: 0,
            clickedPrevious: false,
            touchPosition: {x:0, y:0},
            maxDrag: 200,
            forceMultiplier: 3,
            guideDots: new Array(),

            size: {x:48, y:48},
            collides: ig.Entity.COLLIDES.ACTIVE,
            maxVel: {x: 700, y: 700},

            animSheet: new ig.AnimationSheet( 'media/puck.png', 48, 48 ),

            gravityFactor: 1,
            bounciness: 0,

            slopeStanding: {min: (0).toRad(), max: (180).toRad() },


            init: function( x, y, settings ) {
                clickedPrevious = false;

                this.parent( x, y, settings );

                this.addAnim( 'idle', 0.1, [0,1,2,3,4,4,4,4,3,2,1] );
            } ,

            update: function() {

                if( ig.input.state('mouse1') ) {
                    if (!clickedPrevious) {
                        this.touchPosition.x = ig.input.mouse.x;
                        this.touchPosition.y = ig.input.mouse.y;
                        this.guideDots[0] = ig.game.spawnEntity(EntityGuideDot, this.pos.x, this.pos.y); //new EntityGuideDot();
                        this.guideDots[1] = ig.game.spawnEntity(EntityGuideDot, this.pos.x, this.pos.y); //new EntityGuideDot();

                        ig.game.sortEntitiesDeferred();
                    }
                    else {
                        var diffX = this.touchPosition.x - ig.input.mouse.x;
                        var diffY = this.touchPosition.y - ig.input.mouse.y;

                        var nextGuideDot = null;
                        var spacing = 0;

                        for (var i=0; i<this.guideDots.length; i++) {
                            spacing = i + 1;
                            nextGuideDot = this.guideDots[i];
                            nextGuideDot.pos.x = this.pos.x + diffX/spacing;
                            nextGuideDot.pos.y = this.pos.y + diffY/spacing;
                        }
                    }

                    clickedPrevious = true;
                }
                else if (clickedPrevious) {
                    clickedPrevious = false;
                    if (this.standing) {
                        var diffX = this.touchPosition.x - ig.input.mouse.x;
                        var diffY = this.touchPosition.y - ig.input.mouse.y;

                        var magnitude = Math.sqrt((diffX * diffX) + (diffY * diffY));

                        console.log("Diff X " + diffX + " Diff Y" + diffY + " MAG " + magnitude);

                        if (magnitude< this.maxDrag) {
                            this.vel.x = (diffX) * this.forceMultiplier;
                            this.vel.y = (diffY) * this.forceMultiplier;
                        }
                        else {
                            console.log("OVER MAX");
                            this.vel.x = (this.maxDrag * (diffX/magnitude)) * this.forceMultiplier;
                            this.vel.y = (this.maxDrag * (diffY/magnitude)) * this.forceMultiplier;
                        }
                    }

                    var nextGuideDot = null;
                    for (var i=0; i<this.guideDots.length; i++) {
                        nextGuideDot = this.guideDots[i];
                        console.log("There goes guide dot " + nextGuideDot.collides)
                        nextGuideDot.kill();
                    }
                }

                this.parent();
            }

        });

    });