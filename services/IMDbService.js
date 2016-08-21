((window,angular,undefined) => {
    'use strict';

    var services = angular.module('tvshow_explorer.services');
    
    // Configue HTTP Interceptor
    services.config(['$httpProvider',function($httpProvider){
        $httpProvider.interceptors.push('httpInterceptor');
    }]);


    services.factory('httpInterceptor',['$q',function($q){
        return {
            response: function(res){
                var headers = res.headers();
                if(headers['content-type'].match(/^application\/json;.+/)){
                    if(res.data.Response == 'False') return $q.reject({text: res.data.Error});  
                }
                return $q.resolve(res);
            },
            responseError: function(error){
                error.text = 'Something went wrong, please try again later'
                return $q.reject(error);
            }
        };
    }]);

    // Configue IMDb Service
    services.constant('baseURL','https://www.omdbapi.com');

    services.factory('IMDbService',IMDbService);
    
    IMDbService.$inject = ['baseURL','TVShow','Episode','$http','$q'];

    function IMDbService(baseURL,TVShow,Episode,$http,$q){

        // Declare the services we provide
        return {
            getSeason:  getSeason,          // Get season info from OMDb open API
            getEpisode: getEpisode,         // Get episode's info by imdbID
            searchEpisodes: searchEpisodes  // Get episodes list with details 
        };
                
        function getSeason(title,season){
            var deffered = $q.defer();

            $http({method: 'GET', url: baseURL, params:{t: title, Season: season}})
                .then(res => deffered.resolve(res.data))
                .catch(error => deffered.reject(error));
                
                
            return deffered.promise;
        };

        function getEpisode(imdbID){
            var deffered = $q.defer();

            $http({method: 'GET', url: baseURL, params: {i: imdbID, plot: 'short',r: 'json'}})
                .then(res => deffered.resolve(res.data))
                .catch(error => deffered.reject(error));
                

            return deffered.promise;
        };

        function searchEpisodes(title,season){
            var tvShow;
            var deffered = $q.defer();

            getSeason(title,season)
                .then(data => {
                    tvShow = new TVShow(data.Title, data.Season);
                    var episodes =  data.Episodes || [];
                    let promises = episodes.map( episode => getEpisode(episode.imdbID));
                    /*
                     By using $q.all(), the resulting episodes list will be empty,if any of the episodes is rejected.
                     we need to catch the rejection and resolve the simple episodes (the ones without poster, plot info) instead
                    */ 
                    return $q.all(promises)
                             .catch(error => $q.resolve(episodes)); 
                })
                .then(episodes => {
                    episodes.forEach(episode => tvShow.addEpisode(episode));
                    deffered.resolve(tvShow);
                })
                .catch(error => deffered.reject(error));
            
            return deffered.promise;
        };
    };
})(window,angular);
