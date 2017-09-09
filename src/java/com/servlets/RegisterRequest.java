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
public class RegisterRequest extends HttpServlet {
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
            String password = request.getParameter("password");
            String email = request.getParameter("email");
            String genres[] = request.getParameterValues("genres[]");
            DataDB dataDao = new DataDB();
            String message = dataDao.doRegistration(username, email, password,genres);
            response.getWriter().write(message);
        } 
        catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}
