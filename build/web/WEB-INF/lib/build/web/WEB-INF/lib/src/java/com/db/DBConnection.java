package com.db;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {
	private static Connection connection = null;

	public static Connection getConnection() throws Exception {
		if (connection != null)
			return connection;
		else {

			Class.forName("org.postgresql.Driver");

			// set the url, username and password for the databse
                        connection = DriverManager.getConnection(
					"jdbc:postgresql://ursamajor.informatik.uni-augsburg.de/jmdb", "ma_ranitovic",
					"ma1_2ranitovic3");
			return connection;
		}
	}
}