;
(function() {
    angular
        .module('mechofest')
        .directive('mfIndex', mfIndex)
        .controller('MfIndexController', MfIndexController);

    function mfIndex() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'js/components/index/index.html',
            controller: MfIndexController,
            controllerAs: 'home',
            bindToController: true
        };
    }

    function MfIndexController($state, httpUtil, mfConstants) {

        var vm = this;

        vm.stateChange = stateChange;

        init();

        function init() {
        }

        function stateChange() {

        }

    }
})();
