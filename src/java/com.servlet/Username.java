/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.servlet;

/**
 *
 * @author Nemanja Ranitovic
 */
import com.dao.DataDao;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 

public class Username extends HttpServlet {
    private static final long serialVersionUID = 1L;   
     
        @Override
        protected void doGet(HttpServletRequest request,
                HttpServletResponse response) throws ServletException, IOException {
        
        try {
            String username = request.getParameter("username");
            DataDao dataDao = new DataDao();
            
            System.out.println("Data from ajax call "+username);
            String message = dataDao.checkUsername(username);
            response.getWriter().write(message);
        } 
        catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}
