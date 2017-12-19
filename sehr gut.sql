 SELECT m.movieid,array_to_string(array_agg(distinct md.title),',') AS title,  
                       array_to_string(array_agg(distinct md.genre),',') AS genres,  
                       array_to_string(array_agg(distinct md.name),',') AS actors,
                       MAX(movie_runtime(run.time)),  
                       MAX(movie_year(m.year)),  
                       MAX(rank.rank::float),
                       MAX(rank.votes) as rating
                       FROM moviedata md  
                       INNER JOIN runningtimes run ON md.movieid = run.movieid  
                       INNER JOIN ratings rank ON run.movieid = rank.movieid  
                       INNER JOIN genres genre ON rank.movieid = genre.movieid  
                       INNER JOIN movies m ON genre.movieid = m.movieid
                       INNER JOIN language l ON m.movieid = l.movieid
                       --INNER JOIN actors a ON md.actorid = a.actorid  
                       where  movie_runtime(run.time) BETWEEN 60 AND 120
                       and movie_year(m.year) BETWEEN 2000 AND 2010  
                       AND rank.rank::float BETWEEN 6.0 AND 10.0
                       AND( md.name LIKE ANY('{"Depp, Johnny%"}')
				/*OR 
				genre.genre = ANY('{Drama, Fantasy, Adventure}')*/
		       )
                       AND md.title NOT LIKE '%(TV)%' AND md.title NOT LIKE '%(#%)%' AND md.title NOT LIKE '%(V)%' 
                       AND genre.genre NOT LIKE '%Documentary'  
                       AND l.language IN('English','French','German')
                       AND rank.votes > 140000
                       GROUP BY m.movieid
                       order by MAX(rank.rank::float) DESC
                       LIMIT 150 ;



                       /*LEFT JOIN actors a ON md.actorid = a.actorid */
                       /*WHERE md.movieid IN ( 
                       SELECT mm.movieid FROM moviedata mm  
                       LEFT JOIN actors aa ON mm.actorid = aa.actorid  
                       WHERE aa.name LIKE ANY('{"Depp, Johnny%"}'))*/


                       /*SELECT DISTINCT language, COUNT(*) FROM language
                       GROUP BY language 
                       ORDER BY COUNT(*) DESC;*/