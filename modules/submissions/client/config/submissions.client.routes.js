(function () {
  'use strict';

  angular
    .module('submissions')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('submissions', {
        abstract: true,
        url: '/submissions',
        template: '<ui-view/>'
      })
      .state('submissions.list', {
        url: '',
        templateUrl: 'modules/submissions/client/views/list-submissions.client.view.html',
        controller: 'SubmissionsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Submissions List'
        }
      })
      .state('submissions.myList', {
        url: '',
        templateUrl: 'modules/submissions/client/views/mysubmissions-submissions.client.view.html',
        controller: 'MySubmissionsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'My Submissions'
        }
      })
      .state('submissions.create', {
        url: '/create',
        templateUrl: 'modules/submissions/client/views/form-submission.client.view.html',
        controller: 'SubmissionsController',
        controllerAs: 'vm',
        resolve: {
          submissionResolve: newSubmission
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Submissions Create'
        }
      })
      .state('submissions.edit', {
        url: '/:submissionId/edit',
        templateUrl: 'modules/submissions/client/views/form-submission.client.view.html',
        controller: 'SubmissionsController',
        controllerAs: 'vm',
        resolve: {
          submissionResolve: getSubmission
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Submission {{ submissionResolve.name }}'
        }
      })
      .state('submissions.createImprovement', {
        url: '/:submissionId/addImprovement',
        templateUrl: 'modules/improvements/client/views/form-improvement.client.view.html',
        controller: 'ImprovementFromSubCrtlr',
        controllerAs: 'vm',
        resolve: {
          submissionResolve: getSubmission,
          improvementResolve: newImprovement
        },
        data: {
          pageTitle: 'Add Improvement'
        }
      })
      .state('submissions.listImprovements', {
        url: '/improvements',
        templateUrl: 'modules/improvements/client/views/list-improvements.client.view.html',
        controller: 'ImprovementsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Improvement List'
        }
      })
      .state('submissions.view', {
        url: '/:submissionId',
        templateUrl: 'modules/submissions/client/views/view-submission.client.view.html',
        controller: 'SubmissionsController',
        controllerAs: 'vm',
        resolve: {
          submissionResolve: getSubmission
        },
        data:{
          pageTitle: 'Submission {{ articleResolve.name }}'
        }
      });
  }

  getSubmission.$inject = ['$stateParams', 'SubmissionsService'];

  function getSubmission($stateParams, SubmissionsService) {
    return SubmissionsService.get({
      submissionId: $stateParams.submissionId
    }).$promise;
  }

  newSubmission.$inject = ['SubmissionsService'];

  function newSubmission(SubmissionsService) {
    return new SubmissionsService();
  }

  getImprovement.$inject = ['$stateParams', 'ImprovementsService'];

  function getImprovement($stateParams, ImprovementsService) {
    return ImprovementsService.get({
      improvementId: $stateParams.improvementId
    }).$promise;
  }

  newImprovement.$inject = ['ImprovementsService'];
  
  function newImprovement(ImprovementsService) {
    return new ImprovementsService();
  }
  
})();
