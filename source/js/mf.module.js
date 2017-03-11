(function() {
    angular.module('mechofest', ["ngResource", "ui.router"]);
    angular.module('mechofest')
        .config(function($compileProvider) {
            $compileProvider.preAssignBindingsEnabled(true);
        }).config(['$resourceProvider', function($resourceProvider) {
            $resourceProvider.defaults.stripTrailingSlashes = false;
        }]).config(['$httpProvider', function($httpProvider){
          $httpProvider.defaults.headers.common['csrftoken'] = 'dfdkfjdkfj3434343kj';
        }]);
})();
