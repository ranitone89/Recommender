package com.db;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;

public class DBConnection {
	private static Connection connection = null;

	public static Connection getDBConnection() throws Exception {
		if (connection != null){
                    return connection;
                }
		else {
                        System.out.println("JMDB ");
			Class.forName("org.postgresql.Driver");

			// set the url, username and password for the databse
                        connection = DriverManager.getConnection(
					"jdbc:postgresql://canismajor.informatik.uni-augsburg.de/jmdb", "ma_ranitovic",
					"ma1_2ranitovic3");
			return connection;
		}
	}
        
}