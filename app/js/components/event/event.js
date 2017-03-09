;
(function() {
    angular
        .module('mechofest')
        .directive('mfEvent', mfEvent);

    function mfEvent() {
        return {
            restrict: 'E',
            replace: true,
            scope: {

            },
            templateUrl: 'js/components/event/event.html',
            controller: MfEvent,
            controllerAs: 'event',
            bindToController: true
        };
    }

    function MfEvent($state) {

        var vm = this;

        vm.stateChange = stateChange;

        init();

        function init() {
            vm.activeEvent = null;
            vm.model = $state.params.model || {};
            if($state.params.active) {
                vm.model.activeEvent = $state.params.active;
            }
        }

        function stateChange(event) {

        }
    }
})();
