'use strict';

(function () {
  describe('FooterController', function () {
    //Initialize global variables
    var scope,
      FooterController,
    
      Authentication;

    // Load the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    beforeEach(inject(function ($controller, $rootScope, _$state_, _Authentication_) {
      scope = $rootScope.$new();
   
      Authentication = _Authentication_;

      FooterController = $controller('FooterController', {
        $scope: scope
      });
    }));

    it('should expose the authentication service', function () {
      expect(scope.authentication).toBe(Authentication);
    });





 
  });
})();
