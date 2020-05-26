FROM mysql:5.7
ENV MYSQL_DATABASE SongLibraryDb
ENV MYSQL_ROOT_PASSWORD GuldenMaes
ENV MYSQL_USER lector
ENV MYSQL_PASSWORD GuldenMaes
ENV DATABASE_HOST SongLibraryDb

EXPOSE 3306

COPY ./sql-scripts /docker-entrypoint-inidb.d/