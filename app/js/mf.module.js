(function() {
    angular.module('mechofest', ["ui.router"]);
    angular.module('mechofest')
        .config(function($compileProvider) {
            $compileProvider.preAssignBindingsEnabled(true);
        })
})();
