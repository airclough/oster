app.events = ( function() {
  'use strict';

  var topics = {};

  var events = {
    pub: function( topic, args ) {
      if( !topics[ topic ] ) return false;

      var subs = topics[ topic ];
      var l = subs ? subs.length : 0;

      while( l-- ) {
        var sub = subs[ l ];

        sub.fn.call( sub.ctx, args );
      }
    },

    on: function( topic, fn, ctx ) {
      if( !topics[ topic ] ) topics[ topic ] = [];

      topics[ topic ].push( { fn: fn, ctx: ctx } );
    }
  };

  return events;
})();
