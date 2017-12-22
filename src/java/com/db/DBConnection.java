package com.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
	private static Connection connection = null;

	public static Connection getDBConnection() throws Exception {
		if (connection != null){
                    return connection;
                }
		else {
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
                    connection = null;
                    message = "Success";
                }
                catch (SQLException e) {
                    message = "Error closing connection";
		}
		return message;
	}
        
}