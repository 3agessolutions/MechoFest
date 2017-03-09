;
(function() {
    angular
        .module('mechofest')
        .config(mfConfig);

    function mfConfig($stateProvider) {
        $stateProvider
            .state('about', {
                url: '/about',
                template: '<mf-about></mf-about>',
                params: {
                    model: null,
                    active: null
                }
            });
    }

})();
