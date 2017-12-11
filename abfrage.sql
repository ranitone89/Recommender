select s.methodid, ms.scenarioid, s.clusterid, ms.movieid, ms.title, ms.genres, ms.actors, ms.releaseyear, ms.movielenght, ms.rating, ms.stringscore
from clustering s, movies2scenario ms
where s.scenarioid = ms.scenarioid
and s.movieid = ms.movieid
and s.scenarioid = 21
and s.methodid = 0
and s.clusterid = 1;