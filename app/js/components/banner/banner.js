;
(function() {
    angular
        .module('mechofest')
        .directive('mfBanner', mfBanner)
        .controller('MfBannerController', MfBannerController);

    function mfBanner() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'js/components/home/home.html',
            controller: MfBannerController,
            controllerAs: 'banner',
            bindToController: true
        };
    }

    function MfBannerController($state) {

        var vm = this;

        vm.stateChange = stateChange;

        init();

        function init() {}

        function stateChange(type) {
            
        }

    }
})();
