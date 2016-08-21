((angular,undefined) => {
    "use strict";

    var Routes = {
        'start': {
            route: '/',
            templateUrl: 'views/start.html',
            controller: 'StartCtrl'
        }
    };

    angular.module('tvshow_explorer')
        .constant('routes',Routes);
    
})(angular);
