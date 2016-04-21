/**
 * Created by M on 21/04/2016.
 */

/**
 * TODO: Clean up this controller and remove unnecessary functions
 */

(function () {
    'use strict';

    // Improvements controller
    angular
        .module('improvements')
        .controller('ImprovementFromSubCrtlr', ImprovementFromSubCrtlr);

    ImprovementFromSubCrtlr.$inject = ['$scope', '$state', 'Authentication', 'submissionResolve', 'improvementResolve'];

    function ImprovementFromSubCrtlr ($scope, $state, Authentication, submission, improvement) {
        var vm = this;

        vm.authentication = Authentication;
        vm.improvement = improvement;
        vm.submission = submission;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;

        console.log('------------------------- Sub: '+ vm.improvement.body);

        // Remove existing Improvement
        function remove() {
            if (confirm('Are you sure you want to delete?')) {
                vm.improvement.$remove($state.go('improvements.list'));
            }
        }

        // Save Improvement
        function save(isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.improvementForm');
                return false;
            }

            // TODO: move create/update logic to service
            if (vm.improvement._id) {
                vm.improvement.$update(successCallback, errorCallback);
            } else {
                vm.improvement.$save(successCallback, errorCallback);
            }

            function successCallback(res) {
                $state.go('improvements.view', {
                    improvementId: res._id
                });
            }

            function errorCallback(res) {
                vm.error = res.data.message;
            }
        }
    }
})();
