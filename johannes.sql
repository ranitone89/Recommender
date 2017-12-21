
 SELECT md.movieid,array_to_string(array_agg(distinct md.title),',') AS title,
                       array_to_string(array_agg(distinct md.genre),',') AS genres,
                       array_to_string(array_agg(distinct md.name),',') AS actors,
                       MAX(movie_runtime(run.time)),
                       MIN(movie_year(m.year)),
                       MAX(rank.rank::float),
                       MAX(rank.votes) as rating

                       FROM moviedata md
                       INNER JOIN runningtimes run ON md.movieid = run.movieid
                       INNER JOIN ratings rank ON run.movieid = rank.movieid
                       INNER JOIN genres genre ON md.movieid = genre.movieid
                       INNER JOIN movies m ON genre.movieid = m.movieid

                       

                       WHERE  

		       md.movieid IN (
				SELECT DISTINCT m1.movieid
				FROM moviedata md1
				       INNER JOIN runningtimes run1 ON md1.movieid = run1.movieid
				       INNER JOIN ratings rank1 ON run1.movieid = rank1.movieid
				       INNER JOIN genres genre1 ON md1.movieid = genre1.movieid
				       INNER JOIN movies m1 ON genre1.movieid = m1.movieid
				       INNER JOIN language l1 ON m1.movieid = l1.movieid
				       INNER JOIN actors a1 ON md1.actorid = a1.actorid
				WHERE 
					movie_runtime(run1.time) BETWEEN 75 AND 150
					and movie_year(m1.year) BETWEEN  AND 2017
					AND rank1.rank::float BETWEEN 0.0 AND 10.0
				AND(
					   --a1.name LIKE ANY('{"Denzel, Washington%"}')
					   -- OR
					    genre1.genre = ANY('Mystery','Thriller','Adventure') --IN ('Drama','Fanatasy','Adventure') 
				    )
				AND md1.title NOT LIKE '%(TV)%' AND md1.title NOT LIKE '%(#%)%' AND md1.title NOT LIKE '%(V)%'
				AND genre1.genre NOT LIKE '%Documentary'
				AND l1.language IN('English','French','German')
				AND rank1.votes > 140000    
				    )

                      -- AND md.title NOT LIKE '%(TV)%' AND md.title NOT LIKE '%(#%)%' AND md.title NOT LIKE '%(V)%'
                       --AND genre.genre NOT LIKE '%Documentary'
                       --AND l.language IN('English','French','German')
                       --AND rank.votes > 140000

                     
                      
                       GROUP BY md.movieid
                       order by MAX(rank.rank::float) DESC
                       LIMIT 150 ;