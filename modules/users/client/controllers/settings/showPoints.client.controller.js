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
