/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.servlets;

/**
 *
 * @author Nemanja Ranitovic
 */
import com.db.DataDB;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
/**
 *
 * @author Nemanja Ranitovic
 */
public class Username extends HttpServlet {
    private static final long serialVersionUID = 1L;   
     
    /**
     *
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest request,
                HttpServletResponse response) throws ServletException, IOException {
        
        try {
            String username = request.getParameter("username");
            System.out.println("Check Name "+username);
            DataDB dataDao = new DataDB("DB");
            
            System.out.println("Check Name  "+username);
            String message = dataDao.checkUsername(username);
            response.getWriter().write(message);
        } 
        catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}
