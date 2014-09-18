app.bread = ( function() {
  'use strict';

  var states = [ 'soft', 'warm', 'toasty', 'burnt' ];

  var flavors = [ 'rye', 'wheat', 'pumpernickel', 'sourdough' ];

  var Bread = function( type, flavor, estToastTime ) {
    this.type = type;
    this.flavor = flavor || this._randomFlavor();
    this.estToastTime = estToastTime;
    this.state = states[ 0 ];
    this.timeouts = [];
  };

  Bread.prototype.toast = function() {
    var that = this;
    var i = 1;
    var l = states.length;

    for( ; i < l ; i++ )
      ( function( i ) {
        that.timeouts.push( setTimeout( function() {
          that._setState( states[ i ] );
          console.log( that.state );
        }, i * that.estToastTime + that.estToastTime / i ) );
      })( i );
  };

  Bread.prototype.done = function() {
    while( this.timeouts.length )
      clearTimeout( this.timeouts.pop() );
  };

  Bread.prototype.render = function( t ) {
    return this[ t + 'Template' ]();
  };

  Bread.prototype.osterTemplate = function() {
    return ''
      + '<div>'
        + '<span>' + this.flavor + '</span>'
      + '</div>';
  };

  Bread.prototype.plateTemplate = function() {
    var top = Math.random() * 128;
    var left = Math.random() * 128;

    return ''
      + '<div class="' + this.type + ' ' + this.state + '" style="position:absolute;top:' + top + 'px;left:' + left + 'px;">'
        + '<span>' + this.flavor + '</span>'
      + '</div>';
  };

  Bread.prototype._setState = function( state ) {
    this.state = state;
  };

  Bread.prototype._randomFlavor = function() {
    return flavors[ Math.floor( Math.random() * 4 ) ];
  };

  var Slice = function( flavor ) {
    Bread.call( this, 'slice', flavor, 2000 );
  };

  Slice.prototype = new Bread();

  var Bun = function( flavor ) {
    Bread.call( this, 'bun', flavor, 3000 );
  };

  Bun.prototype = new Bread();

  var Roll = function( flavor ) {
    Bread.call( this, 'roll', flavor, 4000 );
  };

  Roll.prototype = new Bread();

  return {
    Slice: Slice,
    Bun  : Bun,
    Roll : Roll
  };
})();
