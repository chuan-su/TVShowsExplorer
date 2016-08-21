((window,angular,undefined) => {
    "use strict";
    
    var models = angular.module('tvshow_explorer.models')
    
    models.factory('Episode',Episode);

    function Episode(){
        function Episode(data){
            if(!this instanceof Episode)
                return new Episode(data);
            
            this.id = data.imdbID;
            this.title = data.Title;
            this.number = data.Episode;
            this.rating = isNaN(parseFloat(data.imdbRating)) ? 0.0 : parseFloat(data.imdbRating).toFixed(1);
            this.releasedAt = data.Released;
            this.posterImage = data.Poster;
            this.plot = data.Plot;
        }

        return Episode;
            
    }
})(window,angular);
