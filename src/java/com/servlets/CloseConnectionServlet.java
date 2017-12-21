/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.servlets;

import com.db.DataDB;
import com.google.gson.Gson;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/**
 *
 * @author Nemanja Ranitovic
 */
public class CloseConnectionServlet extends HttpServlet {
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
            String message = "";
            DataDB dataDao = new DataDB();

            message = dataDao.closeConnection();
            System.out.println(message);
            String respone = new Gson().toJson(message);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(respone);
        } 
        catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}
