;(define(['jquery', 'scripts/base', 'ich'], function ( $ , base ) {
  // Create the defaults once
  var pluginName = "twitSearch",
    defaults = {
      formSelector: "form",
      tweetListSelector: ".tweet-list",

      tweetTemplate: "tweet",

      getURL: "/search.json",

      ajaxOptions: {
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

  $.extend(Plugin.prototype, base);

  Plugin.prototype.init = function () {
    this.$el.html(ich.search());
    this.showPage();
    
    this.$tweetList = this.$el.find(this.options.tweetListSelector);

    this.bindEvents();
  };

  /**
   * Listen for different events. Also allows third party apps to communicate
   * with our plugin.
   **/
  Plugin.prototype.bindEvents = function () {
    this.$el.on(pluginName + ".tweetsLoaded", $.proxy(this.render, this));
    this.$el.on(pluginName + ".error", $.proxy(this.renderError, this));
    this.$el.on("submit", this.options.formSelector, $.proxy(this.search, this));
  };


  /*************************************************
   *  IMPLEMENT STUFF HERE. FOR THE MOST PART
   *************************************************/
  Plugin.prototype.search = function(ev) {
  
  };


  /*************************************************
   *  END IMPLEMENTATION
   *************************************************/

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