# AngularJS Social Share (google+, facebook, vkontakte)


Contains two directives and factory:

1. Share dropdown (opens selected social network share dialog)
2. Like dropdown (leads to your social group) 

Dependencies:
-------------
[VelocityJS](http://julian.com/research/velocity/)  
[Material Design Icons](http://mterialdesignicons.com)

Install:
=======
1. change default (`app.ui` or `app.components`) to your module name
2. install dependencies
3. add ltSharePopup.css to `<head>` section or import .less file
4. Use as elements in your templates:  
`<lt-like>`  
    `<lt-like-trigger></lt-like-trigger>`  
    `<lt-like-popup></lt-like-popup>`  
`</lt-like>`  
or   
`<lt-share>`  
`<lt-share-trigger></lt-like-trigger>`  
`<lt-share-popup></lt-like-popup>`  
`</lt-share>`  
