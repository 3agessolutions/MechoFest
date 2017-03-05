;
(function() {
    angular
        .module('mechofest')
        .directive('mfRegister', mfRegister)
        .controller('MfRegisterController', MfRegisterController);

    function mfRegister() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'js/components/register/register.html',
            controller: MfRegisterController,
            controllerAs: 'register',
            bindToController: true
        };
    }

    function MfRegisterController($state, httpUtil, mfConstants) {

        var vm = this;

        vm.stateChange = stateChange;

        init();

        function init() {
          vm.model = vm.model || {};
        }

        function stateChange() {
          console.log(vm.model);
          httpUtil.post(mfConstants.base_app_service_url + '/register', vm.model).then(function(resp){
            console.log(resp);
          }, function(error){
            console.log(error);
          });
        }

    }
})();
