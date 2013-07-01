ig.module(
        'game.entities.SquishKitten'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntitySquishKitten = ig.Entity.extend({
            clickedPrevious: false,
            size: {x:48, y:48},
            collides: ig.Entity.COLLIDES.ACTIVE,
            maxVel: {x: 500, y: 500},

            animSheet: new ig.AnimationSheet( 'media/puck.png', 48, 48 ),

            gravityFactor: 1,

            bounciness: 0.5,

            slopeStanding: {min: (0).toRad(), max: (180).toRad() },


            init: function( x, y, settings ) {
                clickedPrevious = false;

                this.parent( x, y, settings );

                this.addAnim( 'idle', 0.1, [0,1,2,3,4,4,4,4,3,2,1] );
            } ,

            update: function() {

                if( ig.input.state('mouse1') ) {
                    clickedPrevious = true;
                }
                else if (clickedPrevious) {
                    clickedPrevious = false;
                    if (this.standing) {
                        var diffX = this.pos.x - ig.input.mouse.x;
                        var diffY = this.pos.y - ig.input.mouse.y;

                        var magnitude = Math.sqrt((diffX * diffX) + (diffY * diffY))

                        this.vel.x += 200 * (diffX/magnitude);
                        this.vel.y += 200 * (diffY/magnitude);
                    }
                }

                this.parent();
            }

        });

    });