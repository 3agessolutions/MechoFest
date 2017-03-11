;
(function() {
    angular
        .module('mechofest')
        .directive('mfEventView', mfEventView);

    function mfEventView() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '='
            },
            templateUrl: 'source/js/directives/eventview/eventview.html',
            controller: MfEventView,
            controllerAs: 'eventView',
            bindToController: true
        };
    }

    function MfEventView() {
        var vm = this;

        vm.stateChange = stateChange;

        init();

        function init() {

        }

        function stateChange() {
            
        }
    }
})();
