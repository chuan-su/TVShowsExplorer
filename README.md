# Up and running #

Easiest way to get up and running is to use python SimpleHTTPServer

	$ git clone ...
	$ cd TVShowsExplorer
	$ python -m SimpleHTTPServer 8000 

For python version 3
	
	$ python -m http.server 8000

OR Using Docker:
	
	$ docker build -t tvshows_explorer .
	$ docker run -it --rm -p 8000:8000 tvshows_explorer

Now
	Open your browser, goto [http://localhost:8000](http://localhost:8000)

Have tested on Chrome and Opera. But not working on Safari due to some ES6 syntax.