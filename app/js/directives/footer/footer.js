;
(function() {
    angular
        .module('mechofest')
        .directive('mfFooter', mfFooter);

    function mfFooter() {
        return {
            restrict: 'E',
            replace: true,
            scope: {

            },
            templateUrl: 'js/directives/footer/footer.html',
            controller: MfFooter,
            controllerAs: 'footer',
            bindToController: true
        };
    }

    function MfFooter() {

    }
})();
