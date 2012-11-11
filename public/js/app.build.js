({
  
  baseUrl: '../',

  name: 'js/main',

  out: "main-built.js",
  
  paths: {
    // Libraries
    text:   'js/_libs/require/text',
    jquery:   'js/_libs/jquery/jquery.182',
    bootstrap: 'js/_libs/bootstrap/bootstrap',
    
  },
  
  shim: {
    bootstrap: {
      deps: ['jquery']
    }
  }
})