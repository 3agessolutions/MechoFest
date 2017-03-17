;
(function() {
    angular
        .module('mechofest')
        .directive('mfGallery', mfGallery)
        .controller('MfGalleryController', MfGalleryController);

    function mfGallery() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'source/js/components/gallery/gallery.html',
            controller: MfGalleryController,
            controllerAs: 'gallery',
            bindToController: true
        };
    }

    function MfGalleryController($state) {

        var vm = this;
        vm.stateChange = stateChange;
        vm.changeView = changeView;
        vm.onNavigation = onNavigation;

        init();

        function init() {
            vm.galleryItems = [];
            vm.isViewActive = false;
            vm.activeItem = '';
            vm.activeIndex = null;

            for(var i = 1; i <= 22; i++) {
                vm.galleryItems.push({url: 'files/gallery/' + i + '.jpg'});
            }
        }

        function stateChange() {

        }

        function onNavigation(bPrev) {
            if (bPrev) {
                if (vm.activeIndex === 1) {
                    vm.activeIndex = vm.galleryItems.length;
                } else {
                    vm.activeIndex = vm.activeIndex - 1;
                }
            } else {
                if (vm.activeIndex === vm.galleryItems.length) {
                    vm.activeIndex = 1;
                } else {
                    vm.activeIndex = vm.activeIndex + 1;
                }
            }

            vm.activeItem = 'files/gallery/' + vm.activeIndex + '.jpg';
        }

        function changeView(bOpen, index) {
            vm.isViewActive = bOpen;

            if (bOpen) {
                vm.activeIndex = index;
                vm.activeItem = 'files/gallery/' + vm.activeIndex + '.jpg';
            }
        }
    }
})();
