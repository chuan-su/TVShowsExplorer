((window,angular,undefined) => {
    'use strict';

    angular.module('tvshow_explorer.services',[]);
    angular.module('tvshow_explorer.models',[]);
    angular.module('tvshow_explorer.controllers',[]);

    // App Dependencies
    var dependencies = ['tvshow_explorer.services',
                        'tvshow_explorer.models',
                        'tvshow_explorer.controllers',
                        'ngRoute'];

    // Define App module
    var app = angular.module('tvshow_explorer',dependencies);

    // App routes config
    app.config(['$routeProvider','routes',($routeProvider,routes) => {
        
        Object.keys(routes).forEach( name => {
            var routeEntry = routes[name];

            var routeConfig = {
                templateUrl: routeEntry.templateUrl,
                controller: routeEntry.controller
            };
            $routeProvider.when(routeEntry.route,routeConfig);
        });
        
        $routeProvider.otherwise({redirectTo: routes.start.route});
    }]);
})(window,angular);
