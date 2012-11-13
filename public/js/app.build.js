({
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
})