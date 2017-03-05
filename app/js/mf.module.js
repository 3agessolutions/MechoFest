(function() {
    angular.module('mechofest', ["ngResource", "ui.router"]);
    angular.module('mechofest')
        .config(function($compileProvider) {
            $compileProvider.preAssignBindingsEnabled(true);
        }).config(['$resourceProvider', function($resourceProvider) {
            $resourceProvider.defaults.stripTrailingSlashes = false;
        }]);
})();
