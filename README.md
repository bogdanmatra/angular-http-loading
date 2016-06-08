# angular-http-loading
Angular interceptor for all HTTP calls in order to show a loading icon/animation.

As many calls as you may have in parallel, the loader will stick to the screen and disappear when they finished.


* How to use:

1. Include interceptor in your Angular app
2. Define a template anywhere in the project (it needs to have access to the $rootScope):
<div ng-show="httpCallsInProgress">
  Your loader template!
</div>


* Other options:
In case you do not want to show the loader you can  use the option (defaultPreloader: false):
$http({ method: "GET",  url : "some-data", defaultPreloader : false })

