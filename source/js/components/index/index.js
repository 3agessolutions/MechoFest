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
            templateUrl: 'source/js/components/index/index.html',
            controller: MfIndexController,
            controllerAs: 'home',
            bindToController: true
        };
    }

    function MfIndexController($state, httpUtil, mfConstants, preloader, $interval) {

        var vm = this;

        vm.imageLoaded = false;

        vm.stateChange = stateChange;


        init();

        function init() {
            preloader
              .preloadImages(mfConstants.imageLocations)
              .then(function() {
                  process();
                  vm.imageLoaded = true;
              },
              function() {
                  process();
                  vm.imageLoaded = true;
              });
        }

        function process() {
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
