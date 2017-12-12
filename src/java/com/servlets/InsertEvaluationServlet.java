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
            System.err.println(e.getMessage());
        }
    }
        
        /**
     * Get Parameter from js as ArrayList for particular method
     * @param parameters
     * @return 
     */
    private ArrayList<Integer> getParameters(String[] parameters)
    {
        ArrayList<Integer> temp = new ArrayList<Integer>();
        
        //List<Integer> defaultPar = Arrays.asList(method, 3, 0, 1);
        
        if(parameters != null){
            for(int i =0; i<parameters.length-1; i++){
                temp.add(i, Integer.parseInt(parameters[i]));
            }
        }
        /*else{
            for(int i =0; i<defaultPar.size(); i++){
                temp.add(i, defaultPar.get(i));
                System.out.println(defaultPar.get(i));
            }
        } */ 
        return temp;
    }
    
    private ArrayList<PointdDim> getPoints(ArrayList<Movie> movies)
    {  
        ArrayList<PointdDim> points = new ArrayList<PointdDim>();
        
        for(Movie m: movies){
            PointdDim point = new PointdDim();
            point.setId(m.getMovieId());
            point.setDim(m.getScores());
            point.setMovieDim(m);
            points.add(point);
        }
        
        return points;  
    }
    
        /**  Get all cluster for the method
     *   
     */
    private FinalClustering getMethod(ArrayList<PointdDim> points,  ArrayList<Integer> methParam)
    {
        FinalClustering method = null;
        System.out.println("Parameter 0: "+methParam.get(0).intValue());
        if(methParam.get(0).compareTo(0)>0){
            System.out.println("Cluster");
            method = Kmeans.kMeansClustering(points, methParam.get(1), 
                        methParam.get(2), methParam.get(3));
            }
        if(methParam.get(0).compareTo(0)<=0){
            System.out.println("Borda");
            method = Kmeans.kMeansClusteringBorda(points, methParam.get(1), 
                        methParam.get(3));
            }
        return method;
    }
    
    private ArrayList<Recommendation>getMethodElements(FinalClustering clusterings, int methodid) throws IOException 
    {
        ArrayList<Recommendation> recommendations = new ArrayList<Recommendation>();
        
        ArrayList<ArrayList<Cluster>>clusters = clusterings.getClustering();
        for(Cluster cluster : clusters.get(0)) {
            ArrayList<Movie> movies = new ArrayList<Movie>();
            for (PointdDim elem : cluster.getClusterPoints()){
                movies.add(elem.getMovieDim());
            }
            recommendations.add(new Recommendation(methodid,cluster.getId(), movies));
        }
        
        return recommendations;
    }
    
    private String [][] getSearchMethodParameter(String input ){
        
        String[] x = input.split(";");
        String [][] result = new String[x.length][];
        
            for (int i = 0; i < x.length; i++) {
                String[] row = x[i].split(",");
                result[i] = new String[row.length];

                for(int j=0; j < row.length; j++) {
                    result[i][j] = row[j];
                }
            }
        return result;
    }
}
