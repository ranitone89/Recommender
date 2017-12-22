/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.servlets;

import com.clustering.kmeans.Kmeans;
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

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
/**
 *
 * @author Nemanja Ranitovic
 */

public class EvalSearchServlet extends HttpServlet {
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
        //request.setCharacterEncoding("utf-8");
        try {
            /* Get data from js*/
            Integer method1 = Integer.parseInt(request.getParameter("method1"));
            Integer method2 = Integer.parseInt(request.getParameter("method2")); 
            Integer scenario = Integer.parseInt(request.getParameter("scenario"));
            
            /* Establish connection */
            DataDB dataDao = new DataDB();
            
            /* Recommendation*/
            ArrayList<ArrayList<Recommendation>> recommendations = new ArrayList<>();
            
            /*  Make final recommendations, that includes all clusters and movies for each method */
            ArrayList<Recommendation> firstRecommendation = dataDao.getMovies2Scenario(scenario,method1);
            ArrayList<Recommendation> secondRecommendation = dataDao.getMovies2Scenario(scenario,method2);
            
            /* Get search parameter for scenario*/
            String[] searchParameter = dataDao.getSearchParam(scenario);

            /* Sort Cluster */
            sortCluster(firstRecommendation, secondRecommendation);

            /* Append recommendations */
            recommendations.add(firstRecommendation);
            recommendations.add(secondRecommendation);
            
            /* Create Json string */
            String json1 = new Gson().toJson(recommendations);
            String json2 = new Gson().toJson(searchParameter);
            String bothJson = "["+json1+","+json2+"]";
            
            /* Write string as response */
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(bothJson);
        } 
        catch (Exception e) {
            e.getMessage();
        }
    }

    /**  Get all cluster for the method
     *   
     */
    private FinalClustering getMethod(ArrayList<PointdDim> points,  ArrayList<Integer> methParam)
    {
        FinalClustering method = null;
        if(methParam.get(0).compareTo(0)<=0){
            method = Kmeans.kMeansClustering(points, methParam.get(1), 
                        methParam.get(2), methParam.get(3));
            }
        if(methParam.get(0).compareTo(0)>0){
            method = Kmeans.kMeansClusteringBorda(points, methParam.get(1), 
                        methParam.get(3));
            }
        return method;
    }     
    
    
    /**
     * Get Parameter from js as ArrayList for particular method
     * @param parameters
     * @return 
     */
    private ArrayList<Integer> getParameters(String[] parameters, int method)
    {
        ArrayList<Integer> temp = new ArrayList<Integer>();
        
        List<Integer> defaultPar = Arrays.asList(method, 3, 0, 1);
        
        if(parameters != null){
            for(int i =0; i<parameters.length; i++){
                temp.add(i, Integer.parseInt(parameters[i]));
            }
        }
        else{
            for(int i =0; i<defaultPar.size(); i++){
                temp.add(i, defaultPar.get(i));
            }
        }   
        return temp;
    }        


    /**
     * Sort clusters of two methods in order to display simular clusters in one row
     * @param parameters
     * @return 
     */    
     
     private void sortCluster(ArrayList<Recommendation> firstMethod, ArrayList<Recommendation> secondMethod) throws IOException 
     {
        float[ ][ ] scores = new float[firstMethod.size()][secondMethod.size()];
        HashMap <Integer, Integer> hmap = new HashMap<Integer, Integer>();
        HashSet <Integer> usedRows = new HashSet<Integer>();
        HashSet <Integer> usedColumns = new HashSet<Integer>();
        
        for(Recommendation cl1:firstMethod ){
            for(Recommendation cl2:secondMethod ){
                /*compare movies of clusters*/
                scores[cl1.getClusterId()-1][cl2.getClusterId()-1] = compareClusters(cl1, cl2);
                
            }
        }
        getClusterPair(scores,usedRows,usedColumns,hmap);
        setClusterIds(secondMethod, hmap);
    }  

    
    /* Change id of each cluster according to sorting order
    *
    */
    public static void setClusterIds(ArrayList<Recommendation> secondMethod, HashMap<Integer, Integer> hmap){
        for(Recommendation cluster: secondMethod){
            int tempId= (int) hmap.get(cluster.getClusterId()-1);
            cluster.setClusterId(tempId+1);
        }
    }
    
    /*
    *   Get cluster with maximal simularity and disable affected row and column
    */
    public static void getClusterPair(float[][] scores, Set<Integer> usedRows, Set<Integer> usedColumns, HashMap<Integer, Integer> hmap){
        for(int i =0; i<scores.length; i++){
            getMaxValue(scores,usedRows,usedColumns,hmap);
        }
    }
    
    /*Transform Matrix*/
    public static float getMaxValue(float[][] numbers, Set<Integer> usedRows, Set<Integer> usedColumns, HashMap<Integer, Integer> hmap) {
        float maxValue = 0f;
        int row = Integer.MIN_VALUE;
        int column = Integer.MIN_VALUE;
        
        for (int j = 0; j < numbers.length; j++) {
            for (int i = 0; i < numbers[j].length; i++) {
                if ( usedRows.contains(i) || usedColumns.contains(j)){
                   
                continue;
                }
                if (numbers[j][i] >= maxValue) {
                    maxValue = numbers[j][i];
                    row = i;
                    column = j;
                }
                
            }
        }
        hmap.put(column, row);
        usedRows.add(row);
        usedColumns.add(column);
        return maxValue;
    }
    
    /* Calculate simularity between custer according movie title with jaccard*/
    private float compareClusters(Recommendation firstCluster, Recommendation secondCluster) throws IOException 
    {
        int numMoviesCl1 = firstCluster.getMovies().size();
        int numMoviesCl2 = secondCluster.getMovies().size(); 
        int commonMovies = 0;
        
        for(Movie m1: firstCluster.getMovies()){
            for(Movie m2: secondCluster.getMovies()){
                if(m1.getTitle() == "" ? m2.getTitle() == "" : m1.getTitle().equals(m2.getTitle())){
                    commonMovies++;
                }
            }
        }
        float clusterScore = ((float)commonMovies) /((float)numMoviesCl1+numMoviesCl2-commonMovies);   
        return clusterScore;
    }     
    
 
    private String[] movieArray(String str){
        String[] temp;

        /* delimiter */
        String delimiter = ", ";
        /* given string will be split by the argument delimiter provided. */
        temp = str.replace("[","").replace("]","").split(delimiter);
        /* print substrings */
        return temp;
    }

}
