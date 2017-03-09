;
(function() {
    angular
        .module('mechofest')
        .directive('mfBanner', mfBanner);

    function mfBanner() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                page: '=?'
            },
            templateUrl: function(element, attrs) {
                var url = 'js/directives/banner/banner.html';
                if (attrs.page === 'event') {
                    url = 'js/directives/banner/event.html';
                } else if (attrs.page === 'about') {
                    url = 'js/directives/banner/about.html';
                } else if (attrs.page === 'register') {
                    url = 'js/directives/banner/register.html';
                }
                return url;
            },
            controller: MfBanner,
            controllerAs: 'banner',
            bindToController: true
        };
    }

    function MfBanner() {

    }
})();
