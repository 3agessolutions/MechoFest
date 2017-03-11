;
(function() {
    angular
        .module('mechofest')
        .directive('mfEvents', mfEvents);

    function mfEvents() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '='
            },
            templateUrl: 'source/js/directives/events/events.html',
            controller: MfEvents,
            controllerAs: 'events',
            bindToController: true
        };
    }

    function MfEvents($state) {
        var vm = this;
        vm.stateChange = stateChange;

        init();

        function init() {

        }

        function stateChange(eventType) {
            console.log(eventType);
            $state.go('event', {
                model: vm.model,
                active: eventType
            });
        }
    }
})();
