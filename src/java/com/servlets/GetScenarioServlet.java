/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.servlets;

import com.db.DataDB;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.recommender.Scenario;
/**
 *
 * @author Nemanja Ranitovic
 */
public class GetScenarioServlet extends HttpServlet {
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
            String[] evalScenarios = request.getParameterValues("scenarios[]");
            DataDB dataDao = new DataDB();

            ArrayList<Scenario> scenarios = dataDao.getScenarios(evalScenarios);
            
            String json = new Gson().toJson(scenarios);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
            
        } 
        catch (Exception e) {
            e.getMessage();
        }
    }
}
