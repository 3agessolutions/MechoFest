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

    function MfIndexController($state, httpUtil, mfConstants, $interval) {

        var vm = this;

        vm.stateChange = stateChange;

        init();

        function init() {
            vm.activeIndex = 1;
            $interval(function() {
                if (vm.activeIndex === 6) {
                    vm.activeIndex = 1;
                } else {
                    vm.activeIndex++;
                }
            }, 10000);
        }

        function stateChange(type) {
            $state.go('home.' + type);
        }

    }
})();
