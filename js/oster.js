app.oster = ( function() {
  'use strict';

  var Oster = function() {
    this.slots = {};
    this.toasting = false;

    this.init();
  };

  Oster.prototype.init = function() {
    this.cacheSelectors()
      ._bindEventListeners();
  };

  Oster.prototype.cacheSelectors = function() {
    this.$slot1 = document.querySelector( '.slot.one' );
    this.$slot2 = document.querySelector( '.slot.two' );
    this.$label = document.querySelector( '.label' );
    this.$slide = document.querySelector( '.slide' );
    return this;
  };

  Oster.prototype._bindEventListeners = function() {
    var that = this;
    this.$slot1.addEventListener( 'click', function( e ) {
      that.addBread( this.getAttribute( 'data-slot' ) );
    });
    this.$slot2.addEventListener( 'click', function( e ) {
      that.addBread( this.getAttribute( 'data-slot' ) );
    });
    this.$slide.addEventListener( 'click', function( e ) {
      that.toasting
        ? that.stop()
        : that.start();
    });
  };

  Oster.prototype.addBread = function( slot ) {
    if( this.toasting || this.slots[ slot ] || !app.activeSlice ) return false;

    this.slots[ slot ] = app.activeSlice;
    this[ '$slot' + slot ].innerHTML = this.slots[ slot ].render( 'oster' );
  };

  Oster.prototype.start = function() {
    this.toasting = true;
    this.$label.classList.add( 'toasting' );

    for( var slot in this.slots )
      if( this.slots[ slot ] )
        this.slots[ slot ].toast();
  };

  Oster.prototype.stop = function() {
    this.toasting = false;
    this.$label.classList.remove( 'toasting' );

    var temp = [];

    for( var slot in this.slots ) {
      temp.push( this.slots[ slot ] );
      this.slots[ slot ].done();
      this.slots[ slot ] = null;
      this[ '$slot' + slot ].innerHTML = '';
    }

    app.events.pub( 'toast', temp );
  };

  return new Oster();
})();
