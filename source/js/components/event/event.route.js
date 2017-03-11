;
(function() {
    angular
        .module('mechofest')
        .config(mfConfig);

    function mfConfig($stateProvider) {
        $stateProvider
            .state('event', {
                url: '/event',
                template: '<mf-event></mf-event>',
                params: {
                    model: null,
                    active: null
                }
            });
    }

})();
