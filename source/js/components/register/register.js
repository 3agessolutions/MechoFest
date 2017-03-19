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

    function MfRegisterController($state, httpUtil, mfConstants, Upload) {

        var vm = this;

        vm.uploadFiles = uploadFiles;
        vm.stateChange = stateChange;

        init();

        function init() {
            vm.model = vm.model || {};
            vm.success = false;
        }

        function uploadFiles() {
            console.log(vm.model.PresentationDocument);

            var file = vm.model.PresentationDocument;

            if (file) {
                Upload.upload({
                    url: mfConstants.baseAppServiceUrl + '/upload',
                    data: {
                        file: file
                    }
                }).then(function(resp) {
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                    if(resp.data.Success) {
                      vm.model.PresentationDocumentPath = resp.data.FilePath;
                    }
                }, function(resp) {
                    console.log('Error status: ' + resp.status);
                }, function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }


        }

        function stateChange() {
            var selectedEvents = '';
            vm.success = false;

            if (vm.model.paper) {
                selectedEvents += getEventTopic(true, false, false);
            }
            if (vm.model.aqua) {
                selectedEvents += ',' + getEventTopic(false, true, false);
            }
            if (vm.model.quiz) {
                selectedEvents += ',' + getEventTopic(false, false, true);
            }

            if (selectedEvents === '') {
                vm.warningMessage = 'Please select atleast one event';
                return false;
            }

            vm.model.ParticipantEvents = selectedEvents;
            if (!vm.model.PresentationTopic) {
                vm.model.PresentationTopic = '-';
            }
            httpUtil.post(mfConstants.baseAppServiceUrl + '/register', vm.model).then(function(resp) {
                vm.success = resp.Success;
                vm.warningMessage = '';
            }, function(error) {
                vm.success = false;
                vm.warningMessage = error.ErrorMessage;
            });
        }

        function getEventTopic(isPaper, isAqua, isQuiz) {
            if (isPaper) {
                return 'Paper Presentation';
            } else if (isAqua) {
                return 'Aqua Missile';
            } else if (isQuiz) {
                return 'Technical Quiz';
            }
        }

    }
})();
