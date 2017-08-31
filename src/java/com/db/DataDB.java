package com.db;

import java.sql.Array;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.List;

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
    

    public String search(String minLenght, String maxLenght, String minReleased, String maxReleased,String minStar, String[] actors, String[] genres) {
        String message = null;
        PreparedStatement ps = null;
        String data;
        List<String> results = new ArrayList<String>();
        
        try {
            String sql = "SELECT movies.movieid,array_to_string(array_agg(distinct movies.title),',') AS title "
                    + "FROM moviedata, movies, actors,ratings, runningtimes "
                    + "WHERE movies.movieid = moviedata.movieid "
                    + "AND movies.movieid = ratings.movieid "
                    + "AND movies.movieid = runningtimes.movieid "
                    + "AND moviedata.actorid = actors.actorid "
                    + "AND actors.name LIKE ANY(?) "
                    + "AND moviedata.genre = ANY(?) "
                    + "AND moviedata.year BETWEEN (?) AND (?)"
                    //+ "AND runningtimes.time BETWEEN (?) AND (?) "
                    + "AND ratings.rank::float BETWEEN (?) AND 10 "
                    + "GROUP BY 1 ";
            
            Array listActors = connection.createArrayOf("text", actors);
            Array listGenres = connection.createArrayOf("text", genres);
            float rating = Float.parseFloat(minStar);
            /*int minRel = Integer.parseInt(minReleased);
            int maxRel = Integer.parseInt(maxReleased);*/
            
            ps = connection.prepareStatement(sql);

            //setting the parameters
            ps.setArray(1, listActors);
            ps.setArray(2, listGenres);
            ps.setString(3, minReleased);
            ps.setString(4, maxReleased);
            /*ps.setString(5, minLenght);
            ps.setString(6, maxLenght);*/
            ps.setFloat(5, rating);

            //executing the prepared statement, which returns a ResultSet
            ResultSet rs = ps.executeQuery();
            if(rs.next()){
                while(rs.next())
                {
                    String columnValue = rs.getString(2);
                    results.add(columnValue);
                }
                System.out.println("SUCCESS SEARCH");
                message = results.toString();
            }else{
                System.out.println("FAILURE SEARCH");
                message = "FAILURE";
            }
        } 
        catch (Exception e) {
            message = "FAILURE";
            e.printStackTrace();
        }
        return message;//To change body of generated methods, choose Tools | Templates.
    }
}
