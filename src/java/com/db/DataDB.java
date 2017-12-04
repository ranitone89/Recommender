package com.db;

import java.sql.Array;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.List;
import com.recommender.Movie;
import com.recommender.Scenario;
import java.util.Arrays;

public class DataDB {
	private Connection connection;
	public DataDB() throws Exception {
            connection = DBConnection.getDBConnection();  
           
	}

	public ArrayList<String> getFrameWork(String frameWork) throws Exception {
                ArrayList<String> list = new ArrayList<String>();
		PreparedStatement ps = null;
                System.out.println("Autooooo");
                String data;
		try {
                    String sql = "SELECT name FROM top_actors WHERE name LIKE ?";
                    ps = connection.prepareStatement(sql);
                    ps.setString(1, frameWork + "%");
                    ResultSet rs = ps.executeQuery();
                    while (rs.next()) {
                            list.add(rs.getString("name"));
                    }
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		return list;
	}
        
        public String doLogin(String username, String password) throws Exception{
            System.out.println("DRIN");
            String message = null;
            PreparedStatement ps = null;
            String data;
            try {
                String sql = "SELECT name,password FROM users WHERE name = ? AND password = ?";
                ps = connection.prepareStatement(sql);
                
                //setting the parameters
                ps.setString(1, username);
                ps.setString(2, password);
                
                //executing the prepared statement, which returns a ResultSet
                ResultSet rs = ps.executeQuery();
                if(rs.next()){
                    System.out.println("SUCCESS");
                    message = "SUCCESS";
                }else{
                    System.out.println("FAILURE");
                    message = "FAILURE";
                }
            } catch (Exception e) {
                message = "FAILURE";
                e.printStackTrace();
            }
            return message;
        }     
        
        public String checkIpAdress(String ip) throws Exception{
            System.out.println("DRIN");
            String message = null;
            PreparedStatement ps = null;
            String data;
            try {
                String sql = "SELECT usersid FROM test_users WHERE ip = ?";
                ps = connection.prepareStatement(sql);
                
                //setting the parameters
                ps.setString(1, ip);
                
                //executing the prepared statement, which returns a ResultSet
                ResultSet rs = ps.executeQuery();
                if(rs.next()){
                    message = "USER EXIST";
                    System.out.println(message);
                }else{
                    message = "NEW USER";
                    System.out.println(message);
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
    
    public ArrayList<Scenario> getScenarios() throws Exception{
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
               
                Scenario s = new Scenario(rs.getInt(1),rs.getString(2),actors,genres,released,lenght,rs.getInt(7));
                scenarios.add(s);

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return scenarios;
    }     
    
    //(description,actors,genres,minReleased,maxReleased,minLenght,maxLenght,rating)
    public String insertScenarios(String description,String[] actors,String[] genres,
            String[] released,String[] lenght,String rating) throws Exception{
        String message = null;
        PreparedStatement ps = null;
        boolean action = false;
        try {
            String sql = "INSERT INTO scenarios"
		+ "(description, actors, genres, released, lenght, rating) VALUES"
		+ "(?,?,?,?,?,?)";
            
            Array listActors = connection.createArrayOf("text", actors);
            Array listGenres = connection.createArrayOf("text", genres);
            Array listReleased = connection.createArrayOf("int4", released);
            Array listLenght= connection.createArrayOf("int4", lenght);            
            int ratingInt = Integer.parseInt(rating);
            
            ps = connection.prepareStatement(sql);

            //setting the parameters
            ps.setString(1, description);
            ps.setArray(2, listActors);
            ps.setArray(3, listGenres);            
            ps.setArray(4, listReleased);
            ps.setArray(5, listLenght);
            ps.setInt(6, ratingInt);
            
            
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
    
    public String doRegistration(String username,String email,String password, String[] genres, String[] actors) throws Exception {
        String message = null;
        PreparedStatement ps = null;
        boolean action = false;
        try {
            String sql = "INSERT INTO users"
		+ "(name, email, password, genres, actors) VALUES"
		+ "(?,?,?,?,?)";
            
            
            ps = connection.prepareStatement(sql);
            
            //setting the parameters
            ps.setString(1, username);
            ps.setString(2, email);
            ps.setString(3, password);
            ps.setArray(4, connection.createArrayOf("text", genres));
            ps.setArray(5, connection.createArrayOf("text", actors));
            int count = ps.executeUpdate();
            action = (count > 0);
            
            // was executeUpdate succes
            if(action){
                System.out.println("SUCCESS");
                message = "SUCCESS";
            }else{
                System.out.println("FAILURE INSERT");
                message = "FAILURE";
            }
        } 
        catch (Exception e) {
            message = "FAILURE";
            e.printStackTrace();
        }
        return message;
    }    
    
    public String doRegistrationTest(String ip,String[] genres, String[] actors) throws Exception {
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
    

    public ArrayList<Movie> search(String minLenght, String maxLenght, String minReleased, String maxReleased,String minStar, String[] actors, String[] genres) throws Exception {
        String message = null;
        PreparedStatement ps = null;
        ArrayList<Movie> movieList = new ArrayList<Movie>();
        try {
            String sql = "SELECT m.movieid,array_to_string(array_agg(distinct md.title),',') AS title, "
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
                                + "LEFT JOIN actors a ON md.actorid = a.actorid "
                                + "WHERE md.movieid IN ("
                                + "SELECT mm.movieid FROM moviedata mm "
                                + "LEFT JOIN actors aa ON mm.actorid = aa.actorid "
                                + "WHERE aa.name LIKE ANY(?)) "
                                + "AND movie_runtime(run.time) BETWEEN (?) AND (?) "
                                + "AND movie_year(m.year) BETWEEN (?) AND (?) "
                                + "AND(rank.rank::float BETWEEN (?) AND 10"
                                + "OR genre.genre = ANY(?)) "
                                + "AND md.title NOT LIKE '%(TV)' "
                                + "AND genre.genre NOT LIKE '%Documentary' "
                                + "GROUP BY m.movieid "
                                + "LIMIT 40";
            
            Array listActors = connection.createArrayOf("text", actors);
            Array listGenres = connection.createArrayOf("text", genres);
            float rating = Float.parseFloat(minStar);
            int minRel = Integer.parseInt(minReleased);
            int maxRel = Integer.parseInt(maxReleased);
            int minLen = Integer.parseInt(minLenght);
            int maxLen = Integer.parseInt(maxLenght);          
            ps = connection.prepareStatement(sql);

            //setting the parameters
            ps.setArray(1, listActors);
            ps.setInt(2, minLen);
            ps.setInt(3, maxLen);            
            ps.setInt(4, minRel);
            ps.setInt(5, maxRel);
            ps.setFloat(6, rating);
            ps.setArray(7, listGenres);

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
   
}


