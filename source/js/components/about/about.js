;
(function() {
    angular
        .module('mechofest')
        .directive('mfAbout', mfAbout);

    function mfAbout() {
        return {
            restrict: 'E',
            replace: true,
            scope: {

            },
            templateUrl: 'source/js/components/about/about.html',
            controller: MfAbout,
            controllerAs: 'about',
            bindToController: true
        };
    }

    function MfAbout() {

    }
})();
