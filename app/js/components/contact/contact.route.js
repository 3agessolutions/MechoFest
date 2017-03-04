;
(function() {
    angular
        .module('mechofest')
        .config(mfConfig);

    function mfConfig($stateProvider) {
        $stateProvider
            .state('home.contact', {
                url: '/contact',
                template: '<mf-contact></mf-contact>',
                params: {
                    model: null
                }
            })
            .state('home.contactone', {
                url: '/contactone',
                template: '<mf-contact action="contact-one"></mf-contact>',
                params: {
                    model: null
                }
            })
            .state('home.contacttwo', {
                url: '/contacttwo',
                template: '<mf-contact action="contact-two"></mf-contact>',
                params: {
                    model: null
                }
            });
    }

})();
