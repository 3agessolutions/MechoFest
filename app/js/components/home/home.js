;
(function() {
    angular
        .module('mechofest')
        .directive('mfHome', mfHome)
        .controller('MfHomeController', MfHomeController);

    function mfHome() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'js/components/home/home.html',
            controller: MfHomeController,
            controllerAs: 'home',
            bindToController: true
        };
    }

    function MfHomeController($state) {

        var vm = this;

        vm.stateChange = stateChange;

        init();

        function init() {}

        function stateChange(type) {
            $state.go('home.' + type);
        }

    }
})();
