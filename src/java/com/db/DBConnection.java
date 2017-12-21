package com.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
	private static Connection connection = null;

	public static Connection getDBConnection() throws Exception {
                System.out.println("com.db.DBConnection.getDBConnection()");
		if (connection != null){
                    System.out.println("DB CONNECTION Not Closed");
                    return connection;
                }
		else {
                        System.out.println("DB CONNECTION Closed");
			Class.forName("org.postgresql.Driver");

			// set the url, username and password for the databse
                        connection = DriverManager.getConnection(
					"jdbc:postgresql://canismajor.informatik.uni-augsburg.de/jmdb", "ma_ranitovic",
					"ma1_2ranitovic3");
			return connection;
		}
	}
        
        
	public static String closeDBConnection() throws Exception {
		String message = "";
                try{
                    connection.close();
                    message = "Success";
                }
                catch (SQLException e) {
                    System.out.println("Error closing connection");
                    connection = null;
                    message = "Error closing connection";
		}
		return message;
	}
        
}