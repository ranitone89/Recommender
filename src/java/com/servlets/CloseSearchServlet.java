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
import com.recommender.Score;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
/**
 *
 * @author Nemanja Ranitovic
 */
public class CloseSearchServlet extends HttpServlet {
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
