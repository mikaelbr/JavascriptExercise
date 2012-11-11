;(define(['jquery', 'ich'], function ( $, io ) {
  // Create the defaults once
  var pluginName = "twitTimeline",
    defaults = {
      formSelector: "form",
      tweetListSelector: ".tweet-list",
      refreshButtonSelector: ".refresh-button a",

      tweetTemplate: "tweet",

      getURL: "/timeline.json",
      postURL: "/status.json",

      timelineOptions: {
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
    this.$el.html(ich.timeline());
    this.showPage();
    

    this.$form = this.$el.find(this.options.formSelector);
    this.$tweetList = this.$el.find(this.options.tweetListSelector);
    this.$refreshButton = this.$el.find(this.options.refreshButtonSelector);

    this.bindEvents();

    this.fetch();
  };

  Plugin.prototype.showPage = function() {
    this.$el.show().siblings('.page-role').hide();
  };

  /**
   * Listen for different events. Also allows third party apps to communicate
   * with our plugin.
   **/
  Plugin.prototype.bindEvents = function () {
    var self = this;
    this.$el.on(pluginName + ".tweetsLoaded", $.proxy(this.render, this));

    this.$el.on(pluginName + ".error", $.proxy(this.renderError, this));

    this.$refreshButton.on("click", $.proxy(this.refresh, this));

    this.$form.on("submit", $.proxy(this.updateStatus, this));
  };

  Plugin.prototype.refresh = function (ev) {
    console.log("HEr inne !");
    this.fetch({
      since_id: this.since_id
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


  Plugin.prototype.renderError = function (ev, data) {

    if (!data) {
      return; 
    }

    if (typeof data === "string") {
      return self.$tweetList.prepend(ich.error(data));
    }

    var html = "";
    $.each(data, function (i, el) {
      html += ich.error(el)[0].outerHTML;
    });
    this.$tweetList.prepend(html);
  };


  Plugin.prototype.render = function (ev, data) {
    if (!data || data.length < 1) {
      return; 
    }

    var self = this
      , html = "";
    $.each(data, function (i, el) {
      html += ich[self.options.tweetTemplate](el)[0].outerHTML;
    });
    self.$tweetList.prepend(html);
  };



  Plugin.prototype.fetch = function (options) {
    var self = this
      , timelineData = $.extend( {}, this.options.timelineOptions, options);

    return $.ajax({
      url: this.options.getURL,
      data: timelineData,
      dataType: 'json',
      contentType: 'json',
      cache: false
    }).done(function(data) {
      if (data.statusCode && data.data) {
        // error. 
        return self.$el.trigger(pluginName + ".error", [JSON.parse(data.data).errors]);
      }
      this.since_id = data[0].id;

      self.$el.trigger(pluginName + ".tweetsLoaded", [data]);
    }).fail(function (err) {
      self.$el.trigger(pluginName + ".error", [err]);
    });
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