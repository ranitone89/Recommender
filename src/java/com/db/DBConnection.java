package com.db;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;

public class DBConnection {
	private static Connection connection = null;

	public static Connection getDBConnection() throws Exception {
            System.out.println("GET DB CONNECTION");
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
                    message = "Success";
                }
                catch (Exception e) {
                    System.out.println("Error closing connection");
                    connection = null;
                    message = "Error closing connection";
		}
		return message;
	}
        
}