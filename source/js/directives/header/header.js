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
            templateUrl: 'source/js/directives/header/header.html',
            controller: MfHeader,
            controllerAs: 'header',
            bindToController: true
        };
        return directive;
    }

    function MfHeader($state) {

        var vm = this;

        vm.stateChange = stateChange;
        activate();

        function activate() {

        }

        function stateChange(type) {
            $state.go(type, {
                active: null,
                model: null
            });
        }
    }
})();
