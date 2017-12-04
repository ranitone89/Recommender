/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.servlets;

import com.clustering.kmeans.Kmeans;
import com.clustering.objects.Cluster;
import com.clustering.objects.FinalClustering;
import com.clustering.objects.PointdDim;
import com.db.DataDB;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.recommender.Movie;
import com.recommender.Recommendation;
import com.recommender.Scenario;
import com.recommender.Score;
import com.recommender.Search;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import javax.json.Json;
import org.omg.PortableInterceptor.SYSTEM_EXCEPTION;
/**
 *
 * @author Nemanja Ranitovic
 */
public class InsertScenarioRequest extends HttpServlet {
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
            String description = request.getParameter("description");
            String lenght[] = request.getParameterValues("lenght[]");
            String released[] = request.getParameterValues("released[]"); 
            String actors[] = request.getParameterValues("actors");
            String genres[] = request.getParameterValues("genreList[]"); 
            String parameter[] = request.getParameterValues("paramList[]");
            String minStar = request.getParameter("minStar");
            
            String message  = dataDao.insertScenarios(description,actors,genres,released,lenght,parameter,minStar);

            response.getWriter().write(message);
            
        } 
        catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}
