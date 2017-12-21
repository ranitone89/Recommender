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
public class TestSearchServlet extends HttpServlet {
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
            String minLenght = request.getParameter("minLenght");
            String maxLenght = request.getParameter("maxLenght");
            String minReleased = request.getParameter("minReleased");
            String maxReleased = request.getParameter("maxReleased"); 
            String actors[] = request.getParameterValues("actorList[]");
            String genres[] = request.getParameterValues("genreList[]");
            String parameter[] = request.getParameterValues("paramList[]");
            String minStar = request.getParameter("minStar");
            String method1[] = request.getParameterValues("method1[]"); 
            String method2[] = request.getParameterValues("method2[]");
            String json1 = "";
            String json2 = "";
            String bothJson = "";
            
            /*System.out.println("######################## Method1 ###################");
            for(int i=0; i<method1.length; i++){
                System.out.println(method1[i]);
            }
            
            System.out.println("######################## Method2 ###################");
            for(int i=0; i<method2.length; i++){
                System.out.println(method2[i]);
            }*/           
            DataDB dataDao = new DataDB();

            ArrayList<Movie> movies = dataDao.search(minLenght,maxLenght,minReleased,maxReleased,minStar,actors,genres,parameter);
            ArrayList<ArrayList<Recommendation>> recommendations = new ArrayList<>();

            
            if(movies.size()>0){
                Score.calcScores(movies, genres, actors,parameter);


                ArrayList<PointdDim> points = getPoints(movies);

                ArrayList<Integer> firstMethParam = getParameters(method1,0);
                ArrayList<Integer> secondMethParam = getParameters(method2,1);


                FinalClustering fistMethod = new FinalClustering();
                fistMethod = getMethod(points,firstMethParam);

                FinalClustering secondMethod = new FinalClustering();
                secondMethod = getMethod(points,secondMethParam);


                ArrayList<Recommendation> firstRecommendation = getMethodElements(fistMethod,0);
                ArrayList<Recommendation> secondRecommendation = getMethodElements(secondMethod,1);

                sortCluster(firstRecommendation, secondRecommendation);

                recommendations.add(firstRecommendation);
                recommendations.add(secondRecommendation);

                json1 = new Gson().toJson(recommendations);
                json2 = new Gson().toJson(parameter);
                bothJson = "["+json1+","+json2+"]";
            }
            else{
                bothJson = new Gson().toJson("");                
            }

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(bothJson);
        } 
        catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }


    /**
     * Generate cluster from points
     * @param points
     * @param methParam
     * @return 
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
            method = Kmeans.kMeansClusteringBordaNew(points, methParam.get(1), 
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
        
        /* Default values */
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
                scores[cl1.getClusterId()][cl2.getClusterId()] = compareClusters(cl1, cl2);
                
            }
        }
        getClusterPair(scores,usedRows,usedColumns,hmap);
        setClusterIds(secondMethod, hmap);
    }  


    /**
     * Change id of each cluster according to sorting order
     * @param secondMethod
     * @param hmap 
     */
    public static void setClusterIds(ArrayList<Recommendation> secondMethod, HashMap<Integer, Integer> hmap){
        
        for(Recommendation cluster: secondMethod){
            int tempId= (int) hmap.get(cluster.getClusterId());
            cluster.setClusterId(tempId);
        }
        /*Delete in order to remove error*/
        for (Object row: hmap.keySet()){
            System.out.println(row + " " + hmap.get(row));  
        }
    }
    

    /**
     * Get cluster with maximal simularity and disable affected row and column
     * @param scores
     * @param usedRows
     * @param usedColumns
     * @param hmap 
     */
    public static void getClusterPair(float[][] scores, Set<Integer> usedRows, Set<Integer> usedColumns, HashMap<Integer, Integer> hmap){
        for(int i =0; i<scores.length; i++){
            System.out.println("Max: "+getMaxValue(scores,usedRows,usedColumns,hmap));
        }
    }
    

    /**
     * Transform simularity matrix
     * @param numbers
     * @param usedRows
     * @param usedColumns
     * @param hmap
     * @return 
     */
    public static float getMaxValue(float[][] numbers, Set<Integer> usedRows, Set<Integer> usedColumns, HashMap<Integer, Integer> hmap) {
        float maxValue = 0f;
        int row = Integer.MIN_VALUE;
        int column = Integer.MIN_VALUE;
        
        System.out.println("#################################");
        for (int j = 0; j < numbers.length; j++) {
            for (int i = 0; i < numbers[j].length; i++) {
                System.out.println(numbers[i][j]);
                if ( usedRows.contains(i) || usedColumns.contains(j)){
                   
                continue;
                }
                if (numbers[j][i] >= maxValue) {
                    maxValue = numbers[j][i];
                    row = i;
                    column = j;
                }
                
            }
            System.out.println("#################################");
        }
        System.out.println(column+":"+row);
        hmap.put(column, row);
        usedRows.add(row);
        usedColumns.add(column);
        return maxValue;
    }
    

    /**
     * Calculate simularity between custer according movie title with jaccard
     * @param firstCluster
     * @param secondCluster
     * @return
     * @throws IOException 
     */
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
    
    /**
     * Get recommendation generated with a method
     * @param clusterings
     * @param methodid
     * @return
     * @throws IOException 
     */
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
    

    /**
     * Transform movies to points
     * @param movies
     * @return 
     */
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

    /**
     * create search parameter
     * @param points 
     */    
    private void printPointes(ArrayList<PointdDim> points){
        for(PointdDim p: points){
            System.out.println("id "+p.getId()+" Dims: "+p.toString()+" Dims: "+p.getMovieDim().getTitle());
        }
        
    }
    
    /**
     * 
     * @param str
     * @return 
     */
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
