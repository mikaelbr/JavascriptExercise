var App = {};

require.config({
  baseUrl: '../',
  name: 'js/main',
  out: "main-built.js",

  paths: {
    // Libraries
    text:   'js/_libs/require/text',
    jquery:   'js/_libs/jquery/jquery.182',
    bootstrap: 'js/_libs/bootstrap/bootstrap',
    ich: 'js/_libs/icanhaz/ICanHaz',

    scripts: 'js/tweet_scripts',
  },
  
  shim: {
    bootstrap: {
      deps: ['jquery']
    }
  }
});

define(['jquery', '/page.js', 'scripts/timeline', 'scripts/search', 'scripts/favorites', 'bootstrap'], function($) {

  var Routes = {
    timeline: function () {
      $(".navbar-inner a[href='/timeline']").parent().addClass("active").siblings().removeClass('active');
      $('#twitter-timeline').twitTimeline();
    },
    search: function () {
      $(".navbar-inner a[href='/search']").parent().addClass("active").siblings().removeClass('active');
      $('#twitter-search').twitSearch();
    },
    favorites: function () {
      $(".navbar-inner a[href='/favorites']").parents("ul.nav > li").addClass("active").siblings().removeClass('active');
      $('#twitter-favorites').twitFavorites();
    }
  };

  // Ajax activity indicator bound to ajax start/stop document events
  $(document).ajaxStart(function(){ 
    $('.loading-indicator').fadeIn(); 
  }).ajaxStop(function(){ 
    $('.loading-indicator').fadeOut();
  });

  $(function () {
    // Set up routes. 
    page('/', Routes.timeline);
    page('/timeline', Routes.timeline);
    page('/search', Routes.search);
    page('/favorites', Routes.favorites);
    page();
  });
  
});