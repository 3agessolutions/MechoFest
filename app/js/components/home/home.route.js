;
(function() {
    angular
        .module('mechofest')
        .config(mfConfig);

    function mfConfig($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                template: '<mf-home></mf-home>',
                params: {
                    model: null
                }
            });
    }

})();
