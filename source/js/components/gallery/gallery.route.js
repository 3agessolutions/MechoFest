;
(function() {
    angular
        .module('mechofest')
        .config(mfConfig);

    function mfConfig($stateProvider) {
        $stateProvider
            .state('gallery', {
                url: '/gallery',
                template: '<mf-gallery></mf-gallery>',
                params: {
                    model: null
                }
            });
    }

})();
