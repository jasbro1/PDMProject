(function () {
  'use strict';

  /**
   * TODO: Clean up this controller and remove unnecessary functions
   */

  // Improvements controller
  angular
    .module('improvements')
    .controller('ImprovementsController', ImprovementsController);

  ImprovementsController.$inject = ['$scope', '$state', '$location', 'Authentication', 'improvementResolve'];

  function ImprovementsController ($scope, $state, location, Authentication, improvement) {
    var vm = this;

    vm.authentication = Authentication;
    vm.improvement = improvement;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

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
        var path = $scope.URL;
        path.substring(0, path.length-15);
        location.path('path');
      }

      function successCallback(res) {
        var path = $scope.URL;
        path.substring(0, path.length-15);
        location.path('path');
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
