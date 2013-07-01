ig.module(
        'game.entities.GuideDot'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntityGuideDot = ig.Entity.extend({

            size: {x:16, y:16},
            collides: ig.Entity.COLLIDES.NEVER,
            animSheet: new ig.AnimationSheet( 'media/puck.png', 16, 16 ),

            init: function( x, y, settings ) {

            }
        });

    });