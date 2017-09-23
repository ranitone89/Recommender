package com.db;

import java.sql.Array;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.List;
import com.movie.Movie;

public class DataDB {
	private Connection connection;
	public DataDB() throws Exception {
		connection = DBConnection.getConnection();
	}

	public ArrayList<String> getFrameWork(String frameWork) {
		ArrayList<String> list = new ArrayList<String>();
		PreparedStatement ps = null;
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
        
        public String doLogin(String username, String password){
            System.out.println("DRIN");
            String message = null;
            PreparedStatement ps = null;
            String data;
            try {
                String sql = "SELECT name,password FROM test_users WHERE name = ? AND password = ?";
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

    public String checkUsername(String username) {
            System.out.println("DRIN");
            String message = null;
            PreparedStatement ps = null;
            String data;
            try {
                String sql = "SELECT name FROM test_users WHERE name = ?";
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

    public String doRegistration(String username,String email,String password, String[] genres) {
        
        String message = null;
        PreparedStatement ps = null;
        boolean action = false;
        try {
            String sql = "INSERT INTO test_users"
		+ "(name, email, password, genres) VALUES"
		+ "(?,?,?,?)";
            
            
            ps = connection.prepareStatement(sql);
            
            //setting the parameters
            ps.setString(1, username);
            ps.setString(2, email);
            ps.setString(3, password);
            ps.setArray(4, connection.createArrayOf("text", genres));
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
    

    public ArrayList<Movie> search(String minLenght, String maxLenght, String minReleased, String maxReleased,String minStar, String[] actors, String[] genres) {
        String message = null;
        PreparedStatement ps = null;
        ArrayList<Movie> movieList = new ArrayList<Movie>();
        try {
            String sql = "SELECT m.movieid,array_to_string(array_agg(distinct md.title),',') AS title, "
                                + "array_to_string(array_agg(distinct md.genre),',') AS genres, "
                                + "array_to_string(array_agg(distinct a.name),',') AS actors, "
                                + "MAX(movie_runningtime(run.time)), "
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
                                + "AND movie_runningtime(run.time) BETWEEN (?) AND (?) "
                                + "AND movie_year(m.year) BETWEEN (?) AND (?) "
                                + "AND(rank.rank::float BETWEEN (?) AND 10"
                                + "OR genre.genre = ANY(?)) "
                                + "AND m.title NOT IN('{%GALA%, %AWARDS%,%BRAVO%,%FITNESS%}') "
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


