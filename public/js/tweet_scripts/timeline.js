;(define(['jquery', 'scripts/base', 'ich'], function ( $ , base ) {
  // Create the defaults once
  var pluginName = "twitTimeline",
    defaults = {
      // Selectors for elements in our module view.
      formSelector: "form",
      tweetListSelector: ".tweet-list",
      refreshButtonSelector: ".refresh-button a",

      // Name of the tweet template 
      tweetTemplate: "tweet",

      // URL to use for fetch
      getURL: "/timeline.json",

      // URL to use for post
      postURL: "/status.json",

      // Standard ajax options. 
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

    // Run INIT when constructor is called.
    this.init();
  }

  // Extend our plugin to implement the shared methods.
  $.extend(Plugin.prototype, base);

  // Initialize plugin
  Plugin.prototype.init = function () {
    // Render page structure template 
    this.$el.html(ich.timeline());

    // Show this page. (iplement showPage() base method)
    this.showPage();
    
    // Save different HTML objects
    this.$form = this.$el.find(this.options.formSelector);
    this.$tweetList = this.$el.find(this.options.tweetListSelector);
    this.$refreshButton = this.$el.find(this.options.refreshButtonSelector);

    // bind event listeners
    this.bindEvents();

    // Fetch timeline tweets straight away.
    this.fetch();
  };

  /**
   * Listen for different events. Also allows third party apps to communicate
   * with our plugin.
   **/
  Plugin.prototype.bindEvents = function () {
    this.$el.on(pluginName + ".tweetsLoaded", $.proxy(this.render, this));
    this.$el.on(pluginName + ".error", $.proxy(this.renderError, this));
    this.$refreshButton.on("click", $.proxy(this.refresh, this));
    this.$form.on("submit", $.proxy(this.updateStatus, this));
  };


  /*************************************************
   *  IMPLEMENT STUFF HERE. FOR THE MOST PART
   *************************************************/
  Plugin.prototype.refresh = function (ev) {
    
  };

  Plugin.prototype.updateStatus = function (ev) {
    
  };

  Plugin.prototype.post = function (data) {
    
  };

  /*************************************************
   *  END IMPLEMENTATION
   *************************************************/

  // A really lightweight plugin wrapper around the constructor, 
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      // Is already initiated?
      if ( !$.data(this, "plugin_" + pluginName )) {
        // No, create instance.
        $.data( this, "plugin_" + pluginName, 
        new Plugin( this, options ));
      } else {
        // Yes. So we just need to swap page display..
        $.data(this, "plugin_" + pluginName ).showPage();
      }
    });
  };

  // Provide default options to allow people to change them.
  $.fn[pluginName].defaults = defaults;

}));