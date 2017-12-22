/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.servlets;

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
public class InsertSurveyServlet extends HttpServlet {
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
            DataDB dataDao = new DataDB();
            String message = "";
            String[] surveyResults = request.getParameterValues("surveyResults[]");
            int userid = Integer.parseInt(request.getParameter("user"));
            int survey = dataDao.insertSurveyResults(surveyResults);
            if(survey>0){
                message = dataDao.insertSurvey2User(userid, survey);                
            }
            response.getWriter().write(message);
            
        } 
        catch (Exception e) {
            e.getMessage();
        }
    }
        
}
