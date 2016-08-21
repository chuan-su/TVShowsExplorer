FROM python:2.7
RUN git clone -q https://github.com/chuan-su/TVShowsExplorer.git
WORKDIR TVShowsExplorer
EXPOSE 8000
CMD ["python","-m","SimpleHttpServer","8000"]
