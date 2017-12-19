 SELECT m.movieid,array_to_string(array_agg(distinct md.title),',') AS title,  
                       array_to_string(array_agg(distinct md.genre),',') AS genres,  
                       array_to_string(array_agg(distinct md.name),',') AS actors,
                       MAX(movie_runtime(run.time)),  
                       MAX(movie_year(m.year)),  
                       MAX(rank.rank::float)  
                       FROM moviedata md  
                       INNER JOIN runningtimes run ON md.movieid = run.movieid  
                       INNER JOIN ratings rank ON run.movieid = rank.movieid  
                       INNER JOIN genres genre ON md.movieid = genre.movieid  
                       INNER JOIN movies m ON genre.movieid = m.movieid
                       INNER JOIN language l ON m.movieid = l.movieid
                       INNER JOIN actors a ON md.actorid = a.actorid  
                       where  movie_runtime(run.time) BETWEEN 60 AND 120
                       AND movie_year(m.year) BETWEEN 2000 AND 2010  
                       AND rank.rank::float BETWEEN 6 AND 10.0 
		       AND( 
			       genre.genre = ANY('{Drama, Fantasy, Adventure}')
			       OR 
			       a.name IN('Depp, Johnny')	
                       ) 
                       AND md.title NOT LIKE '%(TV)%' AND md.title NOT LIKE '%(#%)%' AND md.title NOT LIKE '%(V)%' 
                       AND genre.genre NOT LIKE '%Documentary'  
                       AND l.language IN('English','French','German')
                       AND rank.votes > 20000
                       GROUP BY m.movieid
                       LIMIT 150 ;
