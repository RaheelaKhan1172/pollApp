var mainApplicationModuleName = "mean";

var mainApplicationModule = angular.module(mainApplicationModuleName,['test','ui.bootstrap']);

angular.element(document).ready(function() {
  angular.bootstrap(document,[mainApplicationModuleName]);
});
