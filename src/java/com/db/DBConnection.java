package com.db;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {
	private static Connection connection = null;

	public static Connection getJMDBConnection() throws Exception {
		if (connection != null){
                    System.out.println("JMDB bereits offen");
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
        
        
        public static Connection getDBConnection() throws Exception {
            if (connection != null){
                    System.out.println("Ma_Ranitovic bereits offen");
                    return connection;
                }
            else{
                    System.out.println("Ma_Ranitovic");
                    Class.forName("org.postgresql.Driver");

                    // set the url, username and password for the databse
                    connection = DriverManager.getConnection(
                                    "jdbc:postgresql://canismajor.informatik.uni-augsburg.de/ma_ranitovic", "ma_ranitovic",
                                    "ma1_2ranitovic3");
                    return connection;
            }
	}
        
}