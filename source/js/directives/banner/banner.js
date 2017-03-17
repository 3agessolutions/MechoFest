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
                var url = 'source/js/directives/banner/banner.html';
                if (attrs.page === 'event') {
                    url = 'source/js/directives/banner/event.html';
                } else if (attrs.page === 'about') {
                    url = 'source/js/directives/banner/about.html';
                } else if (attrs.page === 'register') {
                    url = 'source/js/directives/banner/register.html';
                } else if (attrs.page === 'loader') {
                    url = 'source/js/directives/banner/loader.html';
                } else if (attrs.page === 'gallery') {
                    url = 'source/js/directives/banner/gallery.html';
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
