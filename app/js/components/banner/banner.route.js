;
(function() {
    angular
        .module('mechofest')
        .config(mfConfig);

    function mfConfig($stateProvider) {
        $stateProvider
            .state('banner', {
                url: '/banner',
                template: '<mf-banner></mf-banner>',
                params: {
                    model: null
                }
            });
    }

})();
