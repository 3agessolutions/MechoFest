(function () {
    'use strict';

    angular
        .module('mechofest')
        .directive('mfContact', mfContact)
        .controller('MfContactController', MfContactController);

    /** @ngInject */
    function mfContact() {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
              action: '@'
            },
            templateUrl: 'js/components/contact/contact.html',
            controller: function(){
              alert(this.action);
            },
            controllerAs: 'contact',
            bindToController: true,
            link: link
        };
        return directive;

        ////////////////////////////

        function link(scope, element, attrs) {

        }

    }

    /** @ngInject */
    function MfContactController() {

        /*jshint validthis: true */
        var vm = this;

        /** variables **/

        /** methods **/
        vm.stateChange = stateChange;

        activate();

        ////////////////////////////

        function activate() {
          console.log(vm.action);
        }

        function stateChange() {

        }

    }

})();
