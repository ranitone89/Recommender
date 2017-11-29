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
import com.recommender.Search;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import org.omg.PortableInterceptor.SYSTEM_EXCEPTION;
/**
 *
 * @author Nemanja Ranitovic
 */
public class SearchRequest extends HttpServlet {
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
        request.setCharacterEncoding("utf-8");
        try {
            String minLenght = request.getParameter("minLenght");
            String maxLenght = request.getParameter("maxLenght");
            String minReleased = request.getParameter("minReleased");
            String maxReleased = request.getParameter("maxReleased"); 
            String actors[] = request.getParameterValues("actorList[]");
            String genres[] = request.getParameterValues("genreList[]");  
            String minStar = request.getParameter("minStar");
            String method1[] = request.getParameterValues("method1[]"); 
            String method2[] = request.getParameterValues("method2[]");

            DataDB dataDao = new DataDB();
            
            ArrayList<Movie> movies = dataDao.search(minLenght,maxLenght,minReleased,maxReleased,minStar,actors,genres);
            System.out.println("############Movies: "+movies.size());
            ArrayList<ArrayList<Recommendation>> recommendations = new ArrayList<>();
            
            if(movies.size()>10){
                Search search = new Search(genres, actors);
                Score s = new Score(movies,search);
                ArrayList<PointdDim> points = getPoints(movies);

                //int k, int distance, int sort
                ArrayList<Integer> firstMethParam = getParameters(method1,0);
                ArrayList<Integer> secondMethParam = getParameters(method2,1);

                FinalClustering fistMethod = new FinalClustering();
                fistMethod = getMethod(points,firstMethParam);

                FinalClustering secondMethod = new FinalClustering();
                secondMethod = getMethod(points,secondMethParam);

                //ArrayList<ArrayList<Recommendation>> recommendations = new ArrayList<>();

                ArrayList<Recommendation> firstRecommendation = getMethodElements(fistMethod,0);
                ArrayList<Recommendation> secondRecommendation = getMethodElements(secondMethod,1);

                sortCluster(firstRecommendation, secondRecommendation);

                recommendations.add(firstRecommendation);
                recommendations.add(secondRecommendation);

            }
                String json = new Gson().toJson(recommendations);
                System.out.println(json);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(json);
        } 
        catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

    /** 
     */
    private FinalClustering getMethod(ArrayList<PointdDim> points,  ArrayList<Integer> methParam)
    {
        FinalClustering method = null;
        System.out.println("Parameter 0: "+methParam.get(0).intValue());
        if(methParam.get(0).compareTo(0)<=0){
            System.out.println("Cluster");
            method = Kmeans.kMeansClustering(points, methParam.get(1), 
                        methParam.get(2), methParam.get(3));
            }
        if(methParam.get(0).compareTo(0)>0){
            System.out.println("Borda");
            method = Kmeans.kMeansClusteringBorda(points, methParam.get(1), 
                        methParam.get(3));
            }
        return method;
    }     
    
    
    /**
     * Filters parameter from String, prove if parameters are equals zero
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
                System.out.println(defaultPar.get(i));
            }
        }   
        return temp;
    }        

    /**
     * 
     * @param firstCluster
     * @param secondCluster
     * @throws IOException 
     */
    private void sortCluster(ArrayList<Recommendation> firstMethod, ArrayList<Recommendation> secondMethod) throws IOException 
    {
        float[ ][ ] scores = new float[firstMethod.size()][secondMethod.size()];
        
        HashMap <Integer, Integer> hmap = new HashMap<Integer, Integer>();
        HashSet <Integer> usedRows = new HashSet<Integer>();
        HashSet <Integer> usedColumns = new HashSet<Integer>();
        
        for(Recommendation cl1:firstMethod ){
            for(Recommendation cl2:secondMethod ){
                scores[cl1.getClusterId()][cl2.getClusterId()] = compareClusters(cl1, cl2);
                
            }
        }
        getClusterPair(scores,usedRows,usedColumns,hmap);
        setClusterIds(secondMethod, hmap);
    }  

    public static void setClusterIds(ArrayList<Recommendation> secondMethod, HashMap hmap){
        
        for(Recommendation cluster: secondMethod){
            int tempId= (int) hmap.get(cluster.getClusterId());
            cluster.setClusterId(tempId);
        }
        /*Delete in order to remove error*/
        for (Object row: hmap.keySet()){
            System.out.println(row + " " + hmap.get(row));  
        }
    }
    
    public static void getClusterPair(float[][] scores, Set usedRows, Set usedColumns, HashMap hmap){
        for(int i =0; i<scores.length; i++){
            System.out.println("Max: "+getMaxValue(scores,usedRows,usedColumns,hmap));
        }
    }
    
    
    public static float getMaxValue(float[][] numbers, Set usedRows, Set usedColumns, HashMap hmap) {
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
    
    private float compareClusters(Recommendation firstCluster, Recommendation secondCluster) throws IOException 
    {
        int numMoviesCl1 = firstCluster.getMovies().size(); //movieGenres
        int numMoviesCl2 = secondCluster.getMovies().size(); //searchGenres
        int commonMovies = 0; //commonGenres
        
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

    private void printPointes(ArrayList<PointdDim> points){
        for(PointdDim p: points){
            System.out.println("id "+p.getId()+" Dims: "+p.toString()+" Dims: "+p.getMovieDim().getTitle());
        }
        
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
