;
(function() {
    angular
        .module('mechofest')
        .config(mfConfig);

    function mfConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }

    angular
        .module('mechofest')
        .config(['$locationProvider', function($locationProvider) {
            $locationProvider.hashPrefix('');
        }]);

})();
