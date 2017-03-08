;
(function() {
    angular
        .module('mechofest')
        .config(mfConfig);

    function mfConfig($stateProvider) {
        $stateProvider
            .state('index', {
                url: '/',
                template: '<mf-index></mf-index>',
                params: {
                    model: null
                }
            });
    }

})();
