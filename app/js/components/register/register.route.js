;
(function() {
    angular
        .module('mechofest')
        .config(mfConfig);

    function mfConfig($stateProvider) {
        $stateProvider
            .state('register', {
                url: '/register',
                template: '<mf-register></mf-register>',
                params: {
                    model: null
                }
            });
    }

})();
