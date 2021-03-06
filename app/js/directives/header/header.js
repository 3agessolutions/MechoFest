;
(function() {
    angular
        .module('mechofest')
        .directive('mfHeader', mfHeader);

    function mfHeader() {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                atr: '@'
            },
            templateUrl: 'js/directives/header/header.html',
            controller: MfHeader,
            controllerAs: 'header',
            bindToController: true
        };
        return directive;
    }

    function MfHeader() {

        var vm = this;
        activate();

        function activate() {

        }
    }
})();
