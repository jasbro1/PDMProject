//Submissions service used to communicate Submissions REST endpoints
(function () {
  'use strict';

  angular
    .module('submissions')
    .factory('MySubmissionsService', MySubmissionsService);


  MySubmissionsService.$inject = ['$resource'];

  function MySubmissionsService($resource)
  {
    return $resource('api/submissions/mySubmissions/:submissionId', {
      submissionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
