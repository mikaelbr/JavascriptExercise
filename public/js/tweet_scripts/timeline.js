;(define(['jquery', 'scripts/base', 'ich'], function ( $ , base ) {
  // Create the defaults once
  var pluginName = "twitTimeline",
    defaults = {
      formSelector: "form",
      tweetListSelector: ".tweet-list",
      refreshButtonSelector: ".refresh-button a",

      tweetTemplate: "tweet",

      getURL: "/timeline.json",
      postURL: "/status.json",

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
    var self = this;

    this.$el.html(ich.timeline());
    this.showPage();
    

    this.$form = this.$el.find(this.options.formSelector);
    this.$tweetList = this.$el.find(this.options.tweetListSelector);
    this.$refreshButton = this.$el.find(this.options.refreshButtonSelector);

    this.bindEvents();

    this.fetch().done(function (data) {
      if (data[0] && data[0].id) {
        self.since_id = data[0].id;
      }
    });
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

  Plugin.prototype.refresh = function (ev) {
    var self = this;

    this.fetch({
      since_id: this.since_id
    }).done(function (data) {
      if ( data[0] && data[0].id) {
        self.since_id = data[0].id;
      }
    });
    return false;
  };

  Plugin.prototype.updateStatus = function (ev) {
    var self = this
      , $el = this.$form.find("textarea")
      , val = $el.val();

    if (val.trim().length === 0) {
      return false;
    } 

    var params = {
        status: val.trim()
    };

    this.post(params).done(function(data) {
      if (!data.statusCode) {
        $el.val("");
        self.refresh();
      }
    });

    return false;
  };

  Plugin.prototype.post = function (data) {
    var self = this;
    return $.post(self.options.postURL, data).done(function(data) {
      if (data.statusCode && data.data) {
        return self.$el.trigger(pluginName + ".error", [JSON.parse(data.data).errors]);
      }
    }).fail(function (err) {
      self.$el.trigger(pluginName + ".error", [err]);
    });
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