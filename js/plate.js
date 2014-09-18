app.plate = ( function() {
  'use strict';

  var Plate = function() {
    this.toast = [];
    this.$el = document.querySelector( '.plate' );

    this._subscribe();
  };

  Plate.prototype._subscribe = function() {
    app.events.on( 'toast', this.addToast, this );
  };

  Plate.prototype.addToast = function( toast ) {
    var l = toast.length;

    while( l-- ) {
      var slice = toast.pop();
      this.toast.push( slice );
      this.$el.innerHTML += slice.render( 'plate' );
    }

    this.toastCount();
  };

  Plate.prototype.toastCount = function() {
    var $total = document.querySelector( '.total' );
    $total.innerHTML = this.toast.length;
  };

  return new Plate();
})();
