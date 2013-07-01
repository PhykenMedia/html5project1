ig.module(
        'game.entities.StickyWall'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntityStickyWall = ig.Entity.extend({

            size: {x:48, y:48},
            collides: ig.Entity.COLLIDES.FIXED,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
            }
        });

    });