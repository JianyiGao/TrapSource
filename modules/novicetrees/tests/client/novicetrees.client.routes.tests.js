(function () {
  'use strict';

  describe('Novicetrees Route Tests', function () {
    // Initialize global variables
    var $scope,
      NovicetreesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _NovicetreesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      NovicetreesService = _NovicetreesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('novicetrees');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/novicetrees');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          NovicetreesController,
          mockNovicetree;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('novicetrees.view');
          $templateCache.put('modules/novicetrees/client/views/view-novicetree.client.view.html', '');

          // create mock Novicetree
          mockNovicetree = new NovicetreesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Novicetree Name'
          });

          // Initialize Controller
          NovicetreesController = $controller('NovicetreesController as vm', {
            $scope: $scope,
            novicetreeResolve: mockNovicetree
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:novicetreeId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.novicetreeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            novicetreeId: 1
          })).toEqual('/novicetrees/1');
        }));

        it('should attach an Novicetree to the controller scope', function () {
          expect($scope.vm.novicetree._id).toBe(mockNovicetree._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/novicetrees/client/views/view-novicetree.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          NovicetreesController,
          mockNovicetree;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('novicetrees.create');
          $templateCache.put('modules/novicetrees/client/views/form-novicetree.client.view.html', '');

          // create mock Novicetree
          mockNovicetree = new NovicetreesService();

          // Initialize Controller
          NovicetreesController = $controller('NovicetreesController as vm', {
            $scope: $scope,
            novicetreeResolve: mockNovicetree
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.novicetreeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/novicetrees/create');
        }));

        it('should attach an Novicetree to the controller scope', function () {
          expect($scope.vm.novicetree._id).toBe(mockNovicetree._id);
          expect($scope.vm.novicetree._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/novicetrees/client/views/form-novicetree.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          NovicetreesController,
          mockNovicetree;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('novicetrees.edit');
          $templateCache.put('modules/novicetrees/client/views/form-novicetree.client.view.html', '');

          // create mock Novicetree
          mockNovicetree = new NovicetreesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Novicetree Name'
          });

          // Initialize Controller
          NovicetreesController = $controller('NovicetreesController as vm', {
            $scope: $scope,
            novicetreeResolve: mockNovicetree
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:novicetreeId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.novicetreeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            novicetreeId: 1
          })).toEqual('/novicetrees/1/edit');
        }));

        it('should attach an Novicetree to the controller scope', function () {
          expect($scope.vm.novicetree._id).toBe(mockNovicetree._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/novicetrees/client/views/form-novicetree.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
