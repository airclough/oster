( function() {
  'use strict';

  var breadMap = {
    'slice': app.bread.Slice,
    'bun'  : app.bread.Bun,
    'roll' : app.bread.Roll
  };

  var basket = {
    init: function() {
      this.$elems = document.querySelectorAll( '.basket ul li' );

      this._attachListeners();
    },

    _attachListeners: function() {
      var that = this;

      Array.prototype.slice.call( that.$elems ).forEach( function( el, i ) {
        el.addEventListener( 'click', function() {
          that._onClick( this.getAttribute( 'data-type' ) );
        });
      });
    },

    _onClick: function( id ) {
      app.activeSlice = new app.bread[ id ];
    }
  };

  basket.init();
})();
