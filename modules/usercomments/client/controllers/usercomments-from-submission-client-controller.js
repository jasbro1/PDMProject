/**
 * Created by Laur on 24/04/2016.
 */


(function () {
    'use strict';

    // UserComments controller
    angular
        .module('usercomments')
        .controller('UsercommentsFromSubCrtlr', UsercommentsFromSubCrtlr);

    UsercommentsFromSubCrtlr.$inject = ['$scope', '$state', 'Authentication', 'usercommentsResolve'];

    function UsercommentsFromSubCrtlr ($scope, $state, Authentication, usercomments) {
        var vm = this;

        vm.authentication = Authentication;
        vm.usercomments = usercomments;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;

        // Remove existing usercomments
        function remove() {
            if (confirm('Are you sure you want to delete?')) {
                vm.usercomments.$remove($state.go('usercomments.list'));
            }
        }

        // Save usercomments
        function save(isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.usercommentsForm');
                return false;
            }


            if (vm.usercomments._id) {
                vm.usercomments.$update(successCallback, errorCallback);
            } else {

                vm.usercomments.$save(successCallback, errorCallback);
            }

            function successCallback(res) {
                $state.go('usercomments.view', {
                    usercommentsId: res._id
                });
            }

            function errorCallback(res) {
                vm.error = res.data.message;
            }
        }
    }
})();
