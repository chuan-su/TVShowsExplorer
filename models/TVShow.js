((window,angular,undefined) => {
    "use strict";
    
    var models = angular.module('tvshow_explorer.models')
    
    models.factory('TVShow',TVShow);

    TVShow.$inject = ['Episode'];
    
    function TVShow(Episode){
        function TVShow(title,season){
            if(!this instanceof TVShow)
                return new TVShow(title, season);

            this.title = title;
            this.season = season;
            this.episodes = [];
        }
        
        Object.defineProperty(TVShow.prototype,'averageRating',{
            get() {
                if(!this.episodes.length) return 0.00;
                var ratingSum = this.episodes.reduce( (prev,curr) => {
                    return (prev + curr.rating);
                },0);
                return (ratingSum / this.episodes.length).toFixed(2);
            }
        });

        TVShow.prototype.addEpisode = function(data){
            this.episodes.push(new Episode(data));
        };
        
        TVShow.prototype.removeEpisode = function(imdbID){
            // Remove episode by episode's imddbID attribute
            this.episodes = this.episodes.filter(episode => episode.id != imdbID);
        };

        
        return TVShow;
            
    }
})(window,angular);
