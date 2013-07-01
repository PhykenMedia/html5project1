ig.module(
        'game.entities.GuideDot'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntityGuideDot = ig.Entity.extend({

            size: {x:48, y:48},
            collides: ig.Entity.COLLIDES.NEVER,
            animSheet: new ig.AnimationSheet( 'media/puck.png', 48, 48 ),

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                console.log("Here comes guide dot")
                this.addAnim( 'idle', 0.1, [0,1,2,3,4,4,4,4,3,2,1] );
            }
        });

    });