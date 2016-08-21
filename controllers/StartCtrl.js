((window,angular,undefined) => {
    'use strict';
    
    var controllers = angular.module('tvshow_explorer.controllers')
    
    controllers.controller('StartCtrl', StartCtrl);
    
    StartCtrl.$inject = ['$scope','$q','IMDbService'];
    
    function StartCtrl($scope,$q,IMDbService){
        
        $scope.searchIMDb    = searchIMDb;       // Search episodes list
        $scope.removeEpisode = removeEpisode;   // Remove selected episode
        
        function searchIMDb(){
            // reset controler's flags
            $scope.error     = undefined;    
            $scope.searching = true;
             
            // Fetch episodes data from IMDbService
            IMDbService.searchEpisodes($scope.query,1)
                .then(result => $scope.tvShow = result)
                .catch(error => $scope.error = error)
                .finally(() =>  $scope.searching = false);
        }

        function removeEpisode(imdbID){
            $scope.tvShow.removeEpisode(imdbID);
        }

        // Initial function to be called once controller get loaded
        var init = function(){
            $scope.query = 'Silicon Valley'; // ngModel, search query defaults to 'Silicon Valley'
            searchIMDb();
        };
        init();

    }
})(window,angular);
