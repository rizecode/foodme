'use strict';

foodMeApp.directive('fmRating', function() {
  return {
    restrict: 'E',
    scope: {
      symbol: '@',
      max: '@',
      disabled: '@'
    },
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      var styles;

      scope.$watch('max', function(max) {
        scope.styles = styles = [];

        for(var i = 0; i < max; i ++) {
          styles.push({ 'fm-selected': false, 'fm-hover': false });
        }

        ngModel.$render();
      });

      scope.enter = function(index) {
        if (scope.disabled) return;
        angular.forEach(styles, function(style, i) {
          style['fm-hover'] = i <= index;
        });
      };

      scope.leave = function(index) {
        if (scope.disabled) return;
        angular.forEach(styles, function(style, i) {
          style['fm-hover'] = false;
        });
      };

      scope.select = function(index) {
        if (scope.disabled) return;
        internalSelect(index);
        ngModel.$setViewValue(index + 1);
      };

      scope.clear = function() {
        ngModel.$setViewValue(null);
        internalSelect(-1);
      }

      ngModel.$render = function() {
        internalSelect(ngModel.$viewValue - 1);
      };

      function internalSelect(index) {
        angular.forEach(styles, function(style, i) {
          style['fm-selected'] = i <= index;
        });
      }
    },
    templateUrl: 'js/directives/rating.html'
  };
});
