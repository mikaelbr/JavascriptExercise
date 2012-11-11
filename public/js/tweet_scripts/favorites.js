;(define(['jquery', 'ich'], function ( $, io ) {
  // Create the defaults once
  var pluginName = "twitFavorites",
    defaults = {
      tweetListSelector: ".tweet-list",
      refreshButtonSelector: ".refresh-button a",

      tweetTemplate: "tweet",

      getURL: "/favorites.json",

      favortiesOptions: {
        count: 50
      }
    };

  // The actual plugin constructor
  function Plugin( element, options ) {
    this.el = element;
    this.$el = $(element);
    this.options = $.extend( {}, defaults, options) ;        
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype.init = function () {
    this.$el.html(ich.favorites());
    this.showPage();
    
    this.$tweetList = this.$el.find(this.options.tweetListSelector);
    this.$refreshButton = this.$el.find(this.options.refreshButtonSelector);

    this.bindEvents();

    this.fetch();
  };

  Plugin.prototype.showPage = function() {
    
  };

  /**
   * Listen for different events. Also allows third party apps to communicate
   * with our plugin.
   **/
  Plugin.prototype.bindEvents = function () {
    this.$el.on(pluginName + ".tweetsLoaded", $.proxy(this.render, this));
    this.$el.on(pluginName + ".error", $.proxy(this.renderError, this));
    this.$refreshButton.on("click", $.proxy(this.refresh, this));
  };

  Plugin.prototype.refresh = function (ev) {
    
  };

  Plugin.prototype.renderError = function (ev, data) {

  };

  Plugin.prototype.render = function (ev, data) {
    
  };

  Plugin.prototype.fetch = function (options) {
    
  };

  // A really lightweight plugin wrapper around the constructor, 
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if ( !$.data(this, "plugin_" + pluginName )) {
        $.data( this, "plugin_" + pluginName, 
        new Plugin( this, options ));
      } else {
        $.data(this, "plugin_" + pluginName ).showPage();
      }
    });
  };

  $.fn[pluginName].defaults = defaults;

}));