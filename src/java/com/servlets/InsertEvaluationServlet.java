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
public class InsertEvaluationServlet extends HttpServlet {
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
            String userId = request.getParameter("userId");
            String scenarioId = request.getParameter("scenarioId");
            String alg1 = request.getParameter("alg1");
            String alg2 = request.getParameter("alg2");
            String methodEval = request.getParameter("methodEval");

            String cluster1Eval[] = request.getParameterValues("cluster1Eval[]");
            String cluster2Eval[] = request.getParameterValues("cluster2Eval[]");
            String message = dataDao.insertEvaluation(userId,scenarioId,alg1,alg2,methodEval,cluster1Eval,cluster2Eval);
            
            response.getWriter().write(message);
            
        } 
        catch (Exception e) {
            e.getMessage();
        }
    }
}
