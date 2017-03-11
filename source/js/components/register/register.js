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
            templateUrl: 'source/js/components/register/register.html',
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
          vm.success = false;
        }

        function stateChange() {
          var selectedEvents = '';
          vm.success = false;

          if(vm.model.paper) {
            selectedEvents += getEventTopic(true, false, false);
          }
          if(vm.model.aqua) {
            selectedEvents += ',' + getEventTopic(false, true, false);
          }
          if(vm.model.quiz) {
            selectedEvents += ',' + getEventTopic(false, false, true);
          }

          if(selectedEvents === '') {
            vm.warningMessage = 'Please select atleast one event';
            return false;
          }

          vm.model.ParticipantEvents = selectedEvents;
          if(!vm.model.PresentationTopic) {
          	vm.model.PresentationTopic = '-';
          }
          httpUtil.post(mfConstants.base_app_service_url + '/register', vm.model).then(function(resp){
            vm.success = resp.Success;
            vm.warningMessage = '';
          }, function(error){
            vm.success = false;
            vm.warningMessage = error.ErrorMessage;
          });
        }

        function getEventTopic(isPaper, isAqua, isQuiz) {
          if(isPaper) {
            return 'Paper Presentation';
          } else if(isAqua) {
            return 'Aqua Missile';
          } else if(isQuiz) {
            return 'Technical Quiz';
          }
        }

    }
})();
