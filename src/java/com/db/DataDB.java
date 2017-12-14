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
	private Connection connection;
	public DataDB() throws Exception {
            connection = DBConnection.getDBConnection();  
           
	}
        
        /** Autocomplete
         * 
         * @param term
         * @return
         * @throws Exception 
         */
	public ArrayList<String> doAutocomplete(String term) throws Exception {
                ArrayList<String> list = new ArrayList<String>();
		PreparedStatement ps = null;

		try {
                    String sql = "SELECT name FROM top_actors WHERE name LIKE ?";
                    ps = connection.prepareStatement(sql);
                    ps.setString(1, term + "%");
                    ResultSet rs = ps.executeQuery();
                    while (rs.next()) {
                            list.add(rs.getString("name"));
                    }
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		return list;
	}
        
        /** Check if User exist
         * 
         * @param ip
         * @return
         * @throws Exception 
         */
        public String doLogin(String ipAdresse) throws Exception{
            String message = null;
            PreparedStatement ps = null;
            try {
                String sql = "SELECT usersid FROM test_users WHERE ip = ?";
                ps = connection.prepareStatement(sql);
                
                //setting the parameters
                ps.setString(1, ipAdresse);
                
                //executing the prepared statement, which returns a ResultSet
                ResultSet rs = ps.executeQuery();
                if(rs.next()){
                    message = "USER EXIST";
                }else{
                    message = "NEW USER";
                }
            } catch (Exception e) {
                message = "FAILURE";
                e.printStackTrace();
            }
            return message;
        }

    public String checkUsername(String username) throws Exception {
            System.out.println("DRIN");
            String message = null;
            PreparedStatement ps = null;
            String data;
            try {
                String sql = "SELECT name FROM users WHERE name = ?";
                ps = connection.prepareStatement(sql);
                
                //setting the parameters
                ps.setString(1, username);
                
                //executing the prepared statement, which returns a ResultSet
                ResultSet rs = ps.executeQuery();
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
            return message;
    }
    
    public ArrayList<Scenario> loadScenarios() throws Exception{
        ArrayList<Scenario> scenarios = new ArrayList<Scenario>();
        PreparedStatement ps = null;
        try {
            String sql = "SELECT * FROM scenarios";
            ps = connection.prepareStatement(sql);

            //executing the prepared statement, which returns a ResultSet
            ResultSet rs = ps.executeQuery();
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
                
                //Integer[][] lenght = (Integer[]) lenghtArray.getArray();
               
                Scenario s = new Scenario(rs.getInt(1),rs.getString(2),actors,genres,released,lenght,rs.getInt(7), rs.getString(9));
                scenarios.add(s);

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return scenarios;
    }     
    
    
        //(description,actors,genres,minReleased,maxReleased,minLenght,maxLenght,rating)
    public int getIdOnInsertScenario(String description,String[] actors,String[] genres,
            String[] released,String[] lenght,String[] parameter,String rating,String comparation) throws Exception{
        PreparedStatement ps = null;
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
            //Array listMethosParameter = connection.createArrayOf("text", searchParameterMrthos);
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
            
            ResultSet rs = ps.getGeneratedKeys();
                if (rs.next()) {
                    generatedKey = rs.getInt(1);
                }
                System.out.println("Inserted record's ID: " + generatedKey);
            }
            catch (Exception e) {
                e.printStackTrace();
            }
            return generatedKey;
    }    
    
    
    //(description,actors,genres,minReleased,maxReleased,minLenght,maxLenght,rating)
    public String insertScenarios(String description,String[] actors,String[] genres,
            String[] released,String[] lenght,String[] parameter,String rating) throws Exception{
        String message = null;
        PreparedStatement ps = null;
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
            return message;
    }     
    
    /** Register new user
     * 
     * @param ip
     * @param genres
     * @param actors
     * @return
     * @throws Exception 
     */
  public String doRegistration(String ip,String[] genres, String[] actors) throws Exception {
        String message = null;
        PreparedStatement ps = null;
        boolean action = false;
        try {
            String sql = "INSERT INTO test_users"
		+ "(ip, genres, actors) VALUES"
		+ "(?,?,?)";
            
            
            ps = connection.prepareStatement(sql,PreparedStatement.RETURN_GENERATED_KEYS);
            
            //setting the parameters
            ps.setString(1, ip);
            ps.setArray(2, connection.createArrayOf("text", genres));
            ps.setArray(3, connection.createArrayOf("text", actors));
            int count = ps.executeUpdate();
            action = (count > 0);
            
            ResultSet keyResultSet = ps.getGeneratedKeys();
            
            // was executeUpdate succes
            if(action==false){
                System.out.println("FAILURE INSERT");
                message = "";
            }
            else{ 
                if (keyResultSet.next()) {
                    System.out.println(keyResultSet.getInt(3));
                    System.out.println("SUCCESS");
                    message = Integer.toString(keyResultSet.getInt(3));
                }
            }
        } 
        catch (Exception e) {
            message = "";
            e.printStackTrace();
        }
        return message;
    }
    
    /** Search for movies
     * 
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
        ArrayList<Movie> movieList = new ArrayList<>();        
        HashMap<String, List<String>> param =  new HashMap<>();
        List<String> search = new ArrayList<>();
        String query = null;
        
        param = createQuery(parameter);
        
        try {
            System.out.println("Fetching Keys and corresponding [Multiple] Values n");
            for (Map.Entry<String, List<String>> entry : param.entrySet()) {
                query = entry.getKey();
                search = entry.getValue();
            }        
            //String query = param.keySet().toString().substring(1, param.size()-1);
            System.out.println("###################### Query ######################");
            System.out.println(query);
            System.out.println("###################### Search ######################");
            for(int i=0; i<search.size(); i++){
                System.out.println("PARAM: "+search.get(i));
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
            


            //executing the prepared statement, which returns a ResultSet
            ResultSet rs = ps.executeQuery();
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
        } 
        catch (Exception e) {
            message = "FAILURE";
            e.printStackTrace();
        }
        return movieList;
    }

   
    private HashMap<String, List<String>> createQuery(String[] parameter) throws SQLException{ 
        HashMap<String, List<String>> params = new HashMap<>();
        List<String> search = new ArrayList<>();       

        String query = "SELECT m.movieid,array_to_string(array_agg(distinct md.title),',') AS title, "
            + "array_to_string(array_agg(distinct md.genre),',') AS genres, "
            + "array_to_string(array_agg(distinct a.name),',') AS actors, "
            + "MAX(movie_runtime(run.time)), "
            + "MAX(movie_year(m.year)), "
            + "MAX(rank.rank::float) "
            + "FROM moviedata md "
            + "INNER JOIN runningtimes run ON md.movieid = run.movieid "
            + "INNER JOIN ratings rank ON run.movieid = rank.movieid "
            + "INNER JOIN genres genre ON rank.movieid = genre.movieid "
            + "INNER JOIN movies m ON genre.movieid = m.movieid "
            + "INNER JOIN language l ON m.movieid = l.movieid "
            + "LEFT JOIN actors a ON md.actorid = a.actorid "
            + "WHERE ";
        
        if(Arrays.asList(parameter).contains("lenght")){
            System.out.println("################### Query lenght ######################");
            query += "movie_runtime(run.time) BETWEEN (?) AND (?) AND ";
            search.add("min lenght");
            search.add("max lenght");
        }

        if(Arrays.asList(parameter).contains("year")){
            System.out.println("################### Query year ######################");
            query += "movie_year(m.year) BETWEEN (?) AND (?) AND ";
            search.add("min released");
            search.add("max released");
        }

        if(Arrays.asList(parameter).contains("rating")){
            System.out.println("################### Query rating 1 ######################");
            query += "rank.rank::float BETWEEN (?) AND 10.0 AND ";

            search.add("rating");
            System.out.println("################### Query rating 2 ######################");
        }
        
        if(Arrays.asList(parameter).contains("actor") && Arrays.asList(parameter).contains("genre")){
            query += "( a.name LIKE ANY(?) OR genre.genre = ANY(?)) AND ";
            search.add("actor");
            search.add("genre"); 
        }
        
        if(Arrays.asList(parameter).contains("actor") && Arrays.asList(parameter).contains("genre")== false){
            query += "( a.name LIKE ANY(?)) AND ";
            search.add("actor");
        }
        
        if(Arrays.asList(parameter).contains("genre") && Arrays.asList(parameter).contains("actor") == false){
            query += "( genre.genre = ANY(?)) AND ";
            search.add("genre"); 
        }
        

        query += "md.title NOT LIKE '%(TV)%' AND md.title NOT LIKE '%(#%)%' AND md.title NOT LIKE '%(V)%' "
                + "AND genre.genre NOT LIKE '%Documentary' "
                + "AND l.language IN('English','French','German') "
                + "AND rank.votes > 140000 "
                + "GROUP BY m.movieid "
                + "order by MAX(rank.rank::float) DESC "
                + "LIMIT 300";
        
        System.out.println(query);
        System.out.println("############### ENDE #######################");
        
        for(int i=0; i<search.size(); i++){
                System.out.println("PARAM: "+search.get(i));
            }
        params.put(query, search);
        return params;
    }
    
    
    /** Insert clustered movies to database 
     * 
     * @param method
     * @param scenario
     * @param firstRecommendation
     * @throws SQLException 
     */
    public void insertClustering(String method, int scenario, ArrayList<Recommendation> firstRecommendation) throws SQLException {
        PreparedStatement ps = null;
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

        finally
        {
          // close the statement when all the INSERT's are finished
          ps.close();
        }
        
    }
    
    /** Insert movies to scenario
     * 
     * @param movies
     * @param scenario
     * @return
     * @throws SQLException 
     */
    public String insertMovies(ArrayList<Movie> movies, int scenario) throws SQLException {
        String message = null;
        PreparedStatement ps = null;

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
        
            finally
            {
              // close the statement when all the INSERT's are finished
              ps.close();
            }
            return message;
                
    }
    
    /** Insert result from evaluation into database
     * 
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
        String methodEval,String[] cluster1Eval,String[] cluster2Eval) throws SQLException {
        String message = null;
        boolean action = false;
        PreparedStatement ps = null;
        try {
            String query = "INSERT INTO evaluation"
		+ "(userid, scenarioid, method1, method2, ranking, clusters1,clusters2) VALUES"
		+ "(?,?,?,?,?,?,?)";
            
            System.out.println("############################");
            System.out.println(alg1);
            System.out.println(alg2);
            
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
        
            finally
            {
              ps.close();
            }
            return message;
    }    
    
    public ArrayList<Recommendation> getMovies2Scenario(Integer scenario, Integer method) throws SQLException {
        ArrayList<Recommendation> recommendations = new ArrayList<Recommendation>();
        PreparedStatement ps = null;
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
                    ResultSet rs = ps.executeQuery();
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
        
            finally
            {
              ps.close();
            }

            return recommendations;
    }

    public ArrayList<Integer> getClusterId(Integer scenario) throws SQLException {
        
        ArrayList<Integer> clusterids = new ArrayList<Integer>();
        String message = null;
        PreparedStatement ps = null;
        
        try {
            String query = "SELECT c.id "
		+ "FROM clustering s, cluster c "
		+ "WHERE s.clusterid = c.id "
                + "AND s.scenarioid = (?)"
                + "GROUP BY c.id "
                + "ORDER BY c.id ASC ";
            
            ps = connection.prepareStatement(query);
            
            // now loop through nearly 1,500 nodes in the list
 
            ps.setInt(1, scenario);

            
            //executing the prepared statement, which returns a ResultSet
            ResultSet rs = ps.executeQuery();
                //if(rs.next()){
                    while(rs.next())
                    {
                        clusterids.add(rs.getInt(1));
                    }
                //}else{
                //    message = "FAILURE CANNOT SELECT DATA";
                //    System.out.println(message);
                //}

            }
            catch (Exception e) {
                message = "FAILURE";
                e.printStackTrace();
            }
            finally
            {
              // close the statement when all the INSERT's are finished
              ps.close();
            }
            //return message;
                //To change body of generated methods, choose Tools | Templates.
            return clusterids;
    }    
    
    /** Get scenarios for evaluation
     * 
     * @param scenarios
     * @return 
     */
    public ArrayList<Scenario> getScenarios(String[] evalScenarios) {
        ArrayList<Scenario> scenarios = new ArrayList<Scenario>();
        PreparedStatement ps = null;
        try {
            String sql = "SELECT * FROM scenarios "
                    + "WHERE id = (?) ";
            ps = connection.prepareStatement(sql);
            
            for(int i = 0; i<evalScenarios.length; i++){
                System.out.println(": "+evalScenarios[i]);
                ps.setInt(1, Integer.parseInt(evalScenarios[i]));
                
                //executing the prepared statement, which returns a ResultSet
                ResultSet rs = ps.executeQuery();
                
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
        return scenarios;
    }
    
    /** Insert Survey results
     * 
     * @param result
     * @return 
     */
    public int insertSurveyResults(String[] result) {
        PreparedStatement ps = null;
        int generatedKey = 0;
        try {
            String query = "INSERT INTO survey"
		+ "(gender, age, employment_status, job, video_usage, payment_readiness, "
                + "platformen_stream, platformen_tv, platformen_portale, "
                + "recommendation_frequency,recommendation_sense,recommendation_satisfaction ) VALUES"
		+ "(?,?,?,?,?,?,?,?,?,?,?,?)";
            
            
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
            
            
            ps.executeUpdate();
            
            ResultSet rs = ps.getGeneratedKeys();
                if (rs.next()) {
                    generatedKey = rs.getInt(1);
                }
                System.out.println("Inserted survey's ID: " + generatedKey);
            }
            catch (Exception e) {
                e.printStackTrace();
            }
            return generatedKey;        
    }
    
    /**
     * Insert survey to user
     * @param userid
     * @param survey
     * @return 
     */
    public String insertSurvey2User(int userid, int survey) {
        String message = null;
        PreparedStatement ps = null;
        boolean action = false;

        try {
            String query = "UPDATE test_users "
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
        return message;
        
    }
}


