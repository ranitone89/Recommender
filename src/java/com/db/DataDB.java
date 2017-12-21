package com.db;

import com.google.gson.Gson;
import java.sql.Array;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.List;
import com.recommender.Movie;
import com.recommender.Recommendation;
import com.recommender.Scenario;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

public class DataDB {
	private final Connection connection;
	public DataDB() throws Exception {
            connection = DBConnection.getDBConnection();  
           
	}

        /**
         * Close connection
        * @throws java.lang.Exception
         */
	public String closeConnection() throws Exception {      
            //String message = DBConnection.closeDBConnection()
            return DBConnection.closeDBConnection();
	
        }
        
        /**
         * Autocomplete
         * @param term
         * @return
         * @throws Exception 
         */
	public ArrayList<String> doAutocomplete(String term) throws Exception {
                ArrayList<String> list = new ArrayList<>();
		PreparedStatement ps = null;
                ResultSet rs = null;
                //Connection connection = DBConnection.getDBConnection();
                System.out.println("Auto complete");
		try {
                    String sql = "SELECT name FROM top_actors WHERE name LIKE ?";
                    ps = connection.prepareStatement(sql);
                    ps.setString(1, term + "%");
                    rs = ps.executeQuery();
                    while (rs.next()) {
                            list.add(rs.getString("name"));
                    }
		} 
                catch (Exception e) {
			System.out.println(e.getMessage());
		}
                finally {
                    if (ps != null) ps.close();
                    if (rs != null) rs.close();
                    //if (connection != null) connection.close();
                }
                
		return list;
	}
        
        /**
         * Check if User exist
         * @param ip
         * @return
         * @throws Exception 
         */
        public String doLogin(String ipAdresse) throws Exception{
            String message = null;
            PreparedStatement ps = null;
            //Connection connection = DBConnection.getDBConnection();
            ResultSet rs = null;
            try {
                String sql = "SELECT usersid FROM evaluation_users WHERE ip = ?";
                ps = connection.prepareStatement(sql);
                
                //setting the parameters
                ps.setString(1, ipAdresse);
                
                //executing the prepared statement, which returns a ResultSet
                rs = ps.executeQuery();
                if(rs.next()){
                    message = "USER EXIST";
                }else{
                    message = "NEW USER";
                }
            } catch (Exception e) {
                message = "FAILURE";
                e.printStackTrace();
            }
            finally {
                if (ps != null) ps.close();
                if (rs != null) rs.close();
                //if (connection != null) connection.close();
            }
            return message;
        }

    public String checkUsername(String username) throws Exception {
            System.out.println("DRIN");
            String message = null;
            PreparedStatement ps = null;
            ResultSet rs = null;
            //Connection connection = DBConnection.getDBConnection();
            String data;
            try {
                String sql = "SELECT name FROM users WHERE name = ?";
                ps = connection.prepareStatement(sql);
                
                //setting the parameters
                ps.setString(1, username);
                
                //executing the prepared statement, which returns a ResultSet
                rs = ps.executeQuery();
                if(rs.next()){
                    System.out.println("SUCCESS");
                    message = "SUCCESS";
                }else{
                    System.out.println("FAILURE");
                    message = "FAILURE";
                }
            } 
            catch (Exception e) {
                message = "FAILURE";
                e.printStackTrace();
            }
            finally {
                if (ps != null) ps.close();
                if (rs != null) rs.close();
                //if (connection != null) connection.close();
            }          
            return message;
    }
    
    /**
     * Get scenarios from database
     * @return
     * @throws Exception 
     */
    public ArrayList<Scenario> loadScenarios() throws Exception{
        ArrayList<Scenario> scenarios = new ArrayList<Scenario>();
        PreparedStatement ps = null;
        ResultSet rs  = null;
        //Connection connection = DBConnection.getDBConnection();
        try {
            String sql = "SELECT * FROM scenarios";
            ps = connection.prepareStatement(sql);

            //executing the prepared statement, which returns a ResultSet
            rs = ps.executeQuery();
            while(rs.next())
            {   
                Array actorsArray = rs.getArray(3);
                String[] actors = (String[]) actorsArray.getArray();
                
                Array genresArray = rs.getArray(4);
                String[] genres = (String[]) genresArray.getArray();
                
                Array releasedArray = rs.getArray(5);
                Integer[] released = (Integer[]) releasedArray.getArray();

                Array lenghtArray = rs.getArray(6);
                Integer[] lenght = (Integer[]) lenghtArray.getArray();
                
                Scenario s = new Scenario(rs.getInt(1),rs.getString(2),actors,genres,released,lenght,rs.getInt(7), rs.getString(9));
                scenarios.add(s);

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        finally {
            if (ps != null) ps.close();
            if (rs != null) rs.close();
            //if (connection != null) connection.close();
        }  
        return scenarios;
    }     
    
    
    /**
     * 
     * @param description
     * @param actors
     * @param genres
     * @param released
     * @param lenght
     * @param parameter
     * @param rating
     * @param comparation
     * @return
     * @throws Exception 
     */
    public int getIdOnInsertScenario(String description,String[] actors,String[] genres,
            String[] released,String[] lenght,String[] parameter,String rating,String comparation) throws Exception{
        PreparedStatement ps = null;
        ResultSet rs = null;
        //Connection connection = DBConnection.getDBConnection();
        boolean action = false;
        int generatedKey = 0;
        try {
            String query = "INSERT INTO scenarios"
		+ "(description, actors, genres, released, lenght, parameters, rating, comparations) VALUES"
		+ "(?,?,?,?,?,?,?,?)";
            
            
            Array listActors = connection.createArrayOf("text", actors);
            Array listGenres = connection.createArrayOf("text", genres);
            Array listReleased = connection.createArrayOf("int4", released);
            Array listLenght= connection.createArrayOf("int4", lenght);
            Array listParameter = connection.createArrayOf("text", parameter); 

            
            int ratingInt = Integer.parseInt(rating);
            
            ps = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);

            //setting the parameters
            ps.setString(1, description);
            ps.setArray(2, listActors);
            ps.setArray(3, listGenres);            
            ps.setArray(4, listReleased);
            ps.setArray(5, listLenght);
            ps.setArray(6, listParameter);
            ps.setInt(7, ratingInt);
            ps.setString(8, comparation);
            
            
            ps.executeUpdate();
            
            rs = ps.getGeneratedKeys();
                if (rs.next()) {
                    generatedKey = rs.getInt(1);
                }
                System.out.println("Inserted record's ID: " + generatedKey);
            }
            catch (Exception e) {
                e.printStackTrace();
            }
            finally {
                if (ps != null) ps.close();
                if (rs != null) rs.close();
                //if (connection != null) connection.close();
            }
        
            return generatedKey;
    }    
    
    
    /**
     * Insert scenario to db
     * @param description
     * @param actors
     * @param genres
     * @param released
     * @param lenght
     * @param parameter
     * @param rating
     * @return
     * @throws Exception 
     */
    public String insertScenarios(String description,String[] actors,String[] genres,
            String[] released,String[] lenght,String[] parameter,String rating) throws Exception{
        String message = null;
        PreparedStatement ps = null;
        //Connection connection = DBConnection.getDBConnection();
        boolean action = false;
        try {
            String sql = "INSERT INTO scenarios"
		+ "(description, actors, genres, released, lenght, parameters, rating) VALUES"
		+ "(?,?,?,?,?,?,?)";
            
            
            Array listActors = connection.createArrayOf("text", actors);
            Array listGenres = connection.createArrayOf("text", genres);
            Array listReleased = connection.createArrayOf("int4", released);
            Array listLenght= connection.createArrayOf("int4", lenght);
            Array listParameter = connection.createArrayOf("text", parameter); 
            int ratingInt = Integer.parseInt(rating);
            
            ps = connection.prepareStatement(sql);

            //setting the parameters
            ps.setString(1, description);
            ps.setArray(2, listActors);
            ps.setArray(3, listGenres);            
            ps.setArray(4, listReleased);
            ps.setArray(5, listLenght);
            ps.setArray(6, listParameter);
            ps.setInt(7, ratingInt);
            
            
            int count = ps.executeUpdate();
            action = (count >0);

            //executing the prepared statement, which returns a ResultSet
            if(action){
                    System.out.println("SUCCESS");
                    message = "SUCCESS Insert";
                }
            else{
                    System.out.println("FAILURE");
                    message = "FAILURE";
                }
            } 
            catch (Exception e) {
                message = "FAILURE";
                e.printStackTrace();
            }
            finally {
                if (ps != null) ps.close();
                //if (connection != null) connection.close();
            }

            return message;
    }     
    
    /**
     * Register new user
     * @param ip
     * @param email
     * @param genres
     * @param actors
     * @return
     * @throws Exception 
     */
    public String doRegistration(String ip,String email,String[] genres, String[] actors) throws Exception {
        String message = null;
        PreparedStatement ps = null;
        //Connection connection = DBConnection.getDBConnection();
        ResultSet keyResultSet = null;
                
        boolean action = false;
        try {
            String sql = "INSERT INTO evaluation_users"
		+ "(ip, email, genres, actors) VALUES"
		+ "(?,?,?,?)";
            
            
            ps = connection.prepareStatement(sql,PreparedStatement.RETURN_GENERATED_KEYS);
            
            //setting the parameters
            ps.setString(1, ip);
            ps.setString(2, email);
            ps.setArray(3, connection.createArrayOf("text", genres));
            ps.setArray(4, connection.createArrayOf("text", actors));
            int count = ps.executeUpdate();
            action = (count > 0);
            
            keyResultSet = ps.getGeneratedKeys();
            
            // was executeUpdate succes
            if(action==false){
                message = "";
            }
            else{ 
                if (keyResultSet.next()) {
                    message = Integer.toString(keyResultSet.getInt(3));
                }
            }
        } 
        catch (Exception e) {
            message = "";
            e.printStackTrace();
        }
        finally {
            if (ps != null) ps.close();
            if (keyResultSet != null) keyResultSet.close();
            //if (connection != null) connection.close();
        }
        return message;
    }
    
    /**
     * Search for movies
     * @param minLenght
     * @param maxLenght
     * @param minReleased
     * @param maxReleased
     * @param minStar
     * @param actors
     * @param genres
     * @return
     * @throws Exception 
     */
    public ArrayList<Movie> search(String minLenght, String maxLenght, String minReleased, String maxReleased,String minStar, String[] actors, String[] genres, String[] parameter) throws Exception {
        String message = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        //Connection connection = DBConnection.getDBConnection();
        
        ArrayList<Movie> movieList = new ArrayList<>();        
        HashMap<String, List<String>> param =  new HashMap<>();
        List<String> search = new ArrayList<>();
        String query = null;
        
        param = createQuery(parameter);
        
        try {
            for (Map.Entry<String, List<String>> entry : param.entrySet()) {
                query = entry.getKey();
                search = entry.getValue();
            }        

            
            ps = connection.prepareStatement(query);
            
            //setting the parameters
            int index = 1;
            for (String s : search) {         
                if (s.equals("min lenght")) {
                    ps.setInt(index++, Integer.parseInt(minLenght));
                } 
                if (s.equals("max lenght")) {
                    ps.setInt(index++, Integer.parseInt(maxLenght));
                }
                if (s.equals("min released")) {
                    ps.setInt(index++, Integer.parseInt(minReleased));
                }
                if (s.equals("max released")) {
                    ps.setInt(index++, Integer.parseInt(maxReleased));
                }
                if(s.equals("rating")) {
                     ps.setFloat(index++, Float.parseFloat(minStar));
                }
                if(s.equals("actor")) {
                     ps.setArray(index++, connection.createArrayOf("text", actors));
                }
                if(s.equals("genre")) {
                     ps.setArray(index++, connection.createArrayOf("text", genres));
                }
            }           
            

            rs = ps.executeQuery();
            if(rs.next()){
                while(rs.next())
                {
                    Movie movie = new Movie(rs.getInt(1), rs.getString(2),rs.getString(3), rs.getString(4),
                                            rs.getInt(5),rs.getInt(6),rs.getFloat(7));
                    movieList.add(movie);

                }
                message = "SUCCESS SEARCH";
            }else{
                message = "FAILURE CANNOT SELECT DATA";
            }
            System.out.println(message);
        } 
        catch (Exception e) {
            message = "FAILURE";
            e.printStackTrace();
        }
        finally {
            if (ps != null) ps.close();
            if (rs != null) rs.close();
            //if (connection != null) connection.close();
        }
        return movieList;
    }

    /**
     * Create dynamic query
     * @param parameter
     * @return
     * @throws SQLException 
     */
    private HashMap<String, List<String>> createQuery(String[] parameter) throws SQLException{ 
        HashMap<String, List<String>> params = new HashMap<>();
        List<String> search = new ArrayList<>();       

        String query = "SELECT md.movieid,array_to_string(array_agg(distinct md.title),',') AS title, "
            + "array_to_string(array_agg(distinct md.genre),',') AS genres, "
            + "array_to_string(array_agg(distinct md.name),',') AS actors, "
            + "MAX(movie_runtime(run.time)), "
            + "MAX(movie_year(m.year)), "
            + "MAX(rank.rank::float) "
            + "FROM moviedata md "
            + "INNER JOIN runningtimes run ON md.movieid = run.movieid "
            + "INNER JOIN ratings rank ON run.movieid = rank.movieid "
            + "INNER JOIN genres genre ON md.movieid = genre.movieid "
            + "INNER JOIN movies m ON genre.movieid = m.movieid "
            + "WHERE md.movieid IN ("
            + "SELECT DISTINCT m1.movieid "
                + "FROM moviedata md1 "
                + "INNER JOIN runningtimes run1 ON md1.movieid = run1.movieid "
                + "INNER JOIN ratings rank1 ON run1.movieid = rank1.movieid "
                + "INNER JOIN genres genre1 ON md1.movieid = genre1.movieid "
                + "INNER JOIN movies m1 ON genre1.movieid = m1.movieid "
                + "INNER JOIN language l1 ON m1.movieid = l1.movieid "
                + "INNER JOIN actors a1 ON md1.actorid = a1.actorid "
                + "WHERE ";
        
        if(Arrays.asList(parameter).contains("lenght")){
            query += "movie_runtime(run1.time) BETWEEN (?) AND (?) AND ";
            search.add("min lenght");
            search.add("max lenght");
        }

        if(Arrays.asList(parameter).contains("year")){
            query += "movie_year(m1.year) BETWEEN (?) AND (?) AND ";
            search.add("min released");
            search.add("max released");
        }

        if(Arrays.asList(parameter).contains("rating")){
            query += "rank1.rank::float BETWEEN (?) AND 10.0 AND ";
            search.add("rating");
        }
        
        if(Arrays.asList(parameter).contains("actor") && Arrays.asList(parameter).contains("genre")){
            query += "( a1.name LIKE ANY(?) OR genre1.genre = ANY(?)) AND ";
            search.add("actor");
            search.add("genre"); 
        }
        
        if(Arrays.asList(parameter).contains("actor") && Arrays.asList(parameter).contains("genre")== false){
            //query += "( a1.name LIKE ANY(?)) AND ";
            query += "( a1.name LIKE ANY(?) OR genre1.genre = ANY(SELECT genre FROM genres group by genre)) AND ";
            search.add("actor");
        }
        
        if(Arrays.asList(parameter).contains("genre") && Arrays.asList(parameter).contains("actor") == false){
            query += "( genre1.genre = ANY(?)) AND ";
            search.add("genre"); 
        }
        

        query += "md1.title NOT LIKE '%(TV)%' AND md1.title NOT LIKE '%(#%)%' AND md1.title NOT LIKE '%(V)%' "
                + "AND genre1.genre NOT LIKE '%Documentary' "
                + "AND l1.language IN('English','French','German') "
                + "AND rank1.votes > 140000 )"
                + "GROUP BY md.movieid "
                + "order by MAX(rank.rank::float) DESC "
                + "LIMIT 150"; //200 300
        params.put(query, search);
        return params;
    }
    
    
    /**
     * Insert clustered movies to database 
     * @param method
     * @param scenario
     * @param firstRecommendation
     * @throws SQLException 
     */
    public void insertClustering(String method, int scenario, ArrayList<Recommendation> firstRecommendation) throws SQLException, Exception {
        PreparedStatement ps = null;
        //Connection connection = DBConnection.getDBConnection();
        try {
            String query = "INSERT INTO clustering"
                + "(clusterid, methodid, movieid, scenarioid) VALUES"
                + "(?,?,?,?)";


            int methodId = Integer.parseInt(method);
            ps = connection.prepareStatement(query);

            // now loop through nearly 1,500 nodes in the list
            for (Recommendation rec : firstRecommendation)
            {
                for(Movie m: rec.getMovies()){
                    ps.setInt(1, (rec.getClusterId()+1));
                    ps.setInt(2, methodId);
                    ps.setInt(3, m.getMovieId());
                    ps.setInt(4, scenario);
                    ps.execute(); 
                }
            } 
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        finally {
            if (ps != null) ps.close();
            //if (connection != null) connection.close();
        }    
    }
    
    /**
     * Insert movies to scenario
     * @param movies
     * @param scenario
     * @return
     * @throws SQLException 
     */
    public String insertMovies(ArrayList<Movie> movies, int scenario) throws SQLException, Exception {
        String message = null;
        PreparedStatement ps = null;
        //Connection connection = DBConnection.getDBConnection();
        try {
            String query = "INSERT INTO movies2scenario"
		+ "(scenarioid, movieid, title,genres,actors,releaseyear,movielenght,rating,scores, stringscores) VALUES"
		+ "(?,?,?,?,?,?,?,?,?,?)";
            
            ps = connection.prepareStatement(query);
            
            // now loop through nearly 1,500 nodes in the list
            for (Movie m : movies)
            {
                Array listActors = connection.createArrayOf("text", m.getActors());
                Array listGenres = connection.createArrayOf("text", m.getGenres());
                Array listScores = connection.createArrayOf("float4", m.getStringScores());
                Array listStringScores = connection.createArrayOf("text", m.getStringScores());
                
                ps.setInt(1, scenario);
                ps.setInt(2, m.getMovieId());
                ps.setString(3, m.getTitle());
                ps.setArray(4, listGenres);
                ps.setArray(5, listActors);
                ps.setInt(6, m.getReleaseYear());
                ps.setInt(7, m.getMovieLenght());
                ps.setFloat(8, m.getMovieRating());
                ps.setArray(9, listScores);
                ps.setArray(10, listStringScores);
                ps.execute(); 
            }
            
            message = "SUCCESS Insert";

            }
            catch (Exception e) {
                message = "FAILURE";
                e.printStackTrace();
                message = "FAILURE";
            }
            finally {
                if (ps != null) ps.close();
                //if (connection != null) connection.close();
            }            
        return message;
                
    }
    
    /** 
     * Insert result from evaluation into database
     * @param userId
     * @param scenarioId
     * @param alg1
     * @param alg2
     * @param methodEval
     * @param cluster1Eval
     * @param cluster2Eval
     * @return
     * @throws SQLException 
     */
    public String insertEvaluation(String userId,String scenarioId, String alg1, String alg2,
        String methodEval,String[] cluster1Eval,String[] cluster2Eval) throws SQLException, Exception {
        String message = null;
        boolean action = false;
        PreparedStatement ps = null;
        //Connection connection = DBConnection.getDBConnection();
        try {
            String query = "INSERT INTO evaluation"
		+ "(userid, scenarioid, method1, method2, ranking, clusters1,clusters2) VALUES"
		+ "(?,?,?,?,?,?,?)";
            
            
            ps = connection.prepareStatement(query);
            //setting the parameters
            ps.setInt(1, Integer.parseInt(userId));
            ps.setInt(2, Integer.parseInt(scenarioId));
            ps.setInt(3, Integer.parseInt(alg1));
            ps.setInt(4, Integer.parseInt(alg2));
            ps.setInt(5, Integer.parseInt(methodEval)); 
            ps.setArray(6, connection.createArrayOf("int", cluster1Eval));
            ps.setArray(7, connection.createArrayOf("int", cluster2Eval));
            int count = ps.executeUpdate();
            action = (count > 0);
            
            // was executeUpdate succes
            if(action==false){
                System.out.println("FAILURE INSERT");
                message = "";
            }
            else{ 
                System.out.println("SUCCESS");
                message = "SUCCESS";
            }          

            }
            catch (Exception e) {
                e.printStackTrace();
            }
            finally {
                if (ps != null) ps.close();
                //if (connection != null) connection.close();
            }            
            return message;
    }    
    
    /**
     * Get movies from one scenario
     * @param scenario
     * @param method
     * @return
     * @throws SQLException 
     */
    public ArrayList<Recommendation> getMovies2Scenario(Integer scenario, Integer method) throws SQLException, Exception {
        ArrayList<Recommendation> recommendations = new ArrayList<Recommendation>();
        PreparedStatement ps = null;
        ResultSet rs = null;
        //Connection connection = DBConnection.getDBConnection();
        ArrayList<Integer> clusterIds = getClusterId(scenario);
 
        try {
            String query = "SELECT ms.movieid, ms.title, ms.genres, ms.actors, ms.releaseyear, ms.movielenght, ms.rating, ms.stringscores "
		+ "FROM clustering s, movies2scenario ms "
		+ "WHERE s.scenarioid = ms.scenarioid "
                + "AND s.movieid = ms.movieid "
                + "AND s.scenarioid = (?) "
                + "AND s.methodid = (?) "
                + "AND s.clusterid = (?) ";
            
                ps = connection.prepareStatement(query);        

                for (Integer clusterId : clusterIds) {
                    ps.setInt(1, scenario);
                    ps.setInt(2, method);
                    ps.setInt(3, clusterId);
                    rs = ps.executeQuery();
                    ArrayList<Movie> movieList = new ArrayList<Movie>();

                    while(rs.next())
                    {
                        Movie movie = new Movie(rs.getInt(1), rs.getString(2),rs.getString(3), rs.getString(4),
                                                rs.getInt(5),rs.getInt(6),rs.getFloat(7),rs.getString(8));
                        movieList.add(movie);
                    }
                    Recommendation recommendation = new Recommendation(method,clusterId,movieList);
                    recommendations.add(recommendation);
                }
            }
            catch (Exception e) {
                e.printStackTrace();
            }
            finally {
                if (ps != null) ps.close();
                if (rs != null) rs.close();
                //if (connection != null) connection.close();
            }            

            return recommendations;
    }
    
    /**
     * Get custer id
     * @param scenario
     * @return
     * @throws SQLException 
     */
    public ArrayList<Integer> getClusterId(Integer scenario) throws SQLException, Exception {
        
        ArrayList<Integer> clusterids = new ArrayList<Integer>();
        String message = null;
        PreparedStatement ps = null;
        //Connection connection = DBConnection.getDBConnection();
        ResultSet rs = null;
        try {
            String query = "SELECT c.id "
		+ "FROM clustering s, cluster c "
		+ "WHERE s.clusterid = c.id "
                + "AND s.scenarioid = (?)"
                + "GROUP BY c.id "
                + "ORDER BY c.id ASC ";
            
            ps = connection.prepareStatement(query);
            
            ps.setInt(1, scenario);

            
            //executing the prepared statement, which returns a ResultSet
            rs = ps.executeQuery();
            while(rs.next())
            {
                clusterids.add(rs.getInt(1));
            }

        }
        catch (Exception e) {
            message = "FAILURE";
            e.printStackTrace();
        }
        finally {
            if (ps != null) ps.close();
            if (rs != null) rs.close();
            //if (connection != null) connection.close();
        } 
        return clusterids;
    }    
    
    /** Get scenarios for evaluation
     * 
     * @param scenarios
     * @return 
     */
    public ArrayList<Scenario> getScenarios(String[] evalScenarios) throws SQLException, Exception {
        ArrayList<Scenario> scenarios = new ArrayList<Scenario>();
        PreparedStatement ps = null;
        ResultSet rs = null;
        //Connection connection = DBConnection.getDBConnection();
        try {
            String sql = "SELECT * FROM scenarios "
                    + "WHERE id = (?) ";
            ps = connection.prepareStatement(sql);
            
            for(int i = 0; i<evalScenarios.length; i++){
                ps.setInt(1, Integer.parseInt(evalScenarios[i]));
                
                //executing the prepared statement, which returns a ResultSet
                rs = ps.executeQuery();
                
                while(rs.next())
                {
                    Array actorsArray = rs.getArray(3);
                    String[] actors = (String[]) actorsArray.getArray();

                    Array genresArray = rs.getArray(4);
                    String[] genres = (String[]) genresArray.getArray();

                    Array releasedArray = rs.getArray(5);
                    Integer[] released = (Integer[]) releasedArray.getArray();

                    Array lenghtArray = rs.getArray(6);
                    Integer[] lenght = (Integer[]) lenghtArray.getArray();

                    Scenario s = new Scenario(rs.getInt(1),rs.getString(2),actors,genres,released,lenght,rs.getInt(7), rs.getString(9));
                    scenarios.add(s);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        finally {
            if (ps != null) ps.close();
            if (rs != null) rs.close();
            //if (connection != null) connection.close();
        } 
        return scenarios;
    }
    
    /** Insert Survey results
     * 
     * @param result
     * @return 
     */
    public int insertSurveyResults(String[] result) throws SQLException, Exception {
        PreparedStatement ps = null;
        ResultSet rs = null;
        Connection connection = DBConnection.getDBConnection();
        int generatedKey = 0;
        try {
            String query = "INSERT INTO survey"
		+ "(gender, age, employment_status, job, video_usage, payment_readiness, "
                + "platformen_stream, platformen_tv, platformen_portale, "
                + "recommendation_frequency,recommendation_sense,recommendation_satisfaction,recommendation_number_few,recommendation_number_lots "
                + ",recommendation_char_known, recommendation_char_unknown, recommendation_char_mix,recommendation_experience ) VALUES"
		+ "(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            
            
            ps = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);

            //setting the parameters
            //geschlecht
            ps.setInt(1, Integer.parseInt(result[0]));
            //alter
            ps.setInt(2, Integer.parseInt(result[1]));
            //beschäftigung
            ps.setInt(3, Integer.parseInt(result[2]));
            //beruf
            ps.setString(4, result[3]);
            // filme
            ps.setInt(5, Integer.parseInt(result[4]));
            // zahlbereitschaft
            ps.setInt(6, Integer.parseInt(result[5]));
            // stream
            ps.setInt(7, Integer.parseInt(result[6]));
            // tv
            ps.setInt(8, Integer.parseInt(result[7]));
            // portale
            ps.setInt(9, Integer.parseInt(result[8])); 
            // empfehlungen
            ps.setInt(10, Integer.parseInt(result[9]));
            // sinn
            ps.setInt(11, Integer.parseInt(result[10]));
            // zufriedenheit
            ps.setInt(12, Integer.parseInt(result[11]));
            // Number of movies in recommenarion
            ps.setInt(13, Integer.parseInt(result[12]));
            // Number of movies in recommenarion
            ps.setInt(14, Integer.parseInt(result[13]));
            ps.setInt(15, Integer.parseInt(result[14]));
            ps.setInt(16, Integer.parseInt(result[15]));
            ps.setInt(17, Integer.parseInt(result[16]));
            ps.setString(18, result[17]);
            
            ps.executeUpdate();
            
            rs = ps.getGeneratedKeys();
                if (rs.next()) {
                    generatedKey = rs.getInt(1);
                }
            }
            catch (Exception e) {
                e.printStackTrace();
            }
            finally {
                if (ps != null) ps.close();
                if (rs != null) rs.close();
                //if (connection != null) connection.close();
            } 
            return generatedKey;        
    }
    
    /**
     * Insert survey to user
     * @param userid
     * @param survey
     * @return 
     */
    public String insertSurvey2User(int userid, int survey) throws SQLException, Exception {
        String message = null;
        PreparedStatement ps = null;
        //Connection connection = DBConnection.getDBConnection();
        boolean action = false;

        try {
            String query = "UPDATE evaluation_users "
		+ "SET surveyid = (?) "
                + "WHERE usersid = (?)";
            
            
            ps = connection.prepareStatement(query);

            ps.setInt(1, survey);
            ps.setInt(2, userid);

            //ps.executeUpdate();
            int count = ps.executeUpdate();
            action = (count > 0);
            
            // was executeUpdate succes
            if(action==false){
                System.out.println("ERROR INSERT SURVEY TO USER");
                message = "";
            }
            else{ 
                System.out.println("SUCCESS INSERT SURVEY");
                message = "SUCCESS INSERT SURVEY";
            }             
            //ResultSet rs = ps.executeQuery();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        finally {
            if (ps != null) ps.close();
            //if (connection != null) connection.close();
        }         
        return message;
        
    }

    /**
     * Get seach parameter
     * @param scenario
     * @return
     * @throws SQLException 
     */
    public String[] getSearchParam(Integer scenario) throws SQLException, Exception {
        PreparedStatement ps = null;
        ResultSet rs = null;
        //Connection connection = DBConnection.getDBConnection();
        String [] param = null;
        System.out.println(" SEARCH PARAM FROM SCENARIO ");
        try {
            String query = "SELECT s.parameters "
		+ "FROM scenarios s "
		+ "WHERE s.id = (?) ";
            
                ps = connection.prepareStatement(query);        
                
                ps.setInt(1, scenario);
                rs = ps.executeQuery();

                if(rs.next())
                {
                    param = (String[]) rs.getArray(1).getArray();
                    System.out.println("SUCCESS SEARCH");
                }
                    
                else{
                    System.out.println("FAILURE CANNOT SELECT DATA");
                }
            }
            catch (Exception e) {
                e.printStackTrace();
            }
        
            finally {
                if (ps != null) ps.close();
                if (rs != null) rs.close();
                //if (connection != null) connection.close();
            } 

            return param;
    }
}


