/**
 * Created by Alex on 26/04/2016.
 */
(function () {
  'use strict';


  angular
    .module('users')
    .controller('showPointsController', showPointsController);

  showPointsController.$inject = ['MyPointsService'];
  function showPointsController(MyPointsService) {
    var vms=this;
    vms.users = MyPointsService.query();


  }

})();


/*'use strict';

angular.module('users').controller('showPointsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
    function ($scope, $http, $location, Users, Authentication) {
        $scope.user = Authentication.user;


        // Update a user profile
        $scope.getPoints = function () {
            Users.query(function(users){
                $scope.users = users;
                console.log('shit');
            });

        };
    }
]);*/
