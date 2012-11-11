;(define(['jquery', 'ich'], function ( $ ) {
  
  return {
    render: function (ev, data) {
      if (!data || data.length < 1) {
        return; 
      }

      var self = this
        , html = "";
      $.each(data, function (i, el) {
        html += ich[self.options.tweetTemplate](el)[0].outerHTML;
      });
      self.$tweetList.prepend(html);
    },
    renderError: function (ev, data) {

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
    },

    showPage: function() {
      this.$el.show().siblings('.page-role').hide();
    },

    fetch: function (options) {
      var self = this
        , inputData = $.extend( {}, this.options.ajaxOptions, options);

      return $.ajax({
        url: this.options.getURL,
        data: inputData,
        dataType: 'json',
        contentType: 'json',
        cache: false
      }).done(function(data) {

        if (data.statusCode && data.data) {
          return self.$el.trigger(self._name + ".error", [JSON.parse(data.data).errors]);
        }


        if(data.statuses) {
          data = data.statuses;
        }

        self.$el.trigger(self._name + ".tweetsLoaded", [data]);
      }).fail(function (err) {
        self.$el.trigger(self._name + ".error", [err]);
      });
    }
  };
}));