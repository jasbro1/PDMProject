(function () {
  'use strict';

  // Submissions controller
  angular
    .module('submissions')
    .controller('SubmissionsController', SubmissionsController);

  SubmissionsController.$inject = ['$scope', '$state', 'Authentication', 'submissionResolve'];

  function SubmissionsController ($scope, $state, Authentication, submission) {
    var vm = this;

    vm.submission = submission;
    $scope.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Submission
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.submission.$remove($state.go('submissions.list'));
      }
    }

    // Save Submission
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.submissionForm');
        return false;
      }
      
      if (vm.submission._id) {
        vm.submission.$update(successCallback, errorCallback);
      } else {
        vm.submission.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('submissions.view', {
          submissionId: res._id
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
