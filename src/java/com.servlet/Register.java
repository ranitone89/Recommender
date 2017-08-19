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
 

public class Register extends HttpServlet {
    private static final long serialVersionUID = 1L;   
     
        @Override
        protected void doGet(HttpServletRequest request,
                HttpServletResponse response) throws ServletException, IOException {
        
        try {
            String username = request.getParameter("username");
            String password = request.getParameter("password");
            String email = request.getParameter("email");
            String genres[] = request.getParameterValues("genres[]");
            DataDao dataDao = new DataDao();
            String message = dataDao.doRegistration(username, email, password,genres);
            response.getWriter().write(message);
        } 
        catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}
