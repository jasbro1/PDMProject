(function () {
  'use strict';

  // Usercomments controller
  angular
    .module('usercomments')
    .controller('UsercommentsController', UsercommentsController);

  UsercommentsController.$inject = ['$scope', '$state', 'Authentication', 'usercommentResolve'];

  function UsercommentsController ($scope, $state, Authentication, usercomment) {
    var vm = this;

    vm.authentication = Authentication;
    vm.usercomment = usercomment;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Usercomment
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.usercomment.$remove($state.go('usercomments.list'));
      }
    }

    // Save Usercomment
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.usercommentForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.usercomment._id) {
        vm.usercomment.$update(successCallback, errorCallback);
      } else {
        vm.usercomment.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('usercomments.view', {
          usercommentId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    // Calculate the rank of a submission's original poster (OP)
    vm.range = function(points) {
      var rank = [];
      //if OP has earned enough points to obtain rank 1
      if(points >= 10 ) {
        // OPs will earn a rank every 20 points
        for (var i = 0; i <= points; i += 20) {
          rank.push(i);
        }
      }
      return rank;
    };
  }
})();
