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
import com.movie.Movie;
import com.movie.Recommendation;
import com.movie.Score;
import com.movie.Search;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
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

            Search search = new Search(genres, actors);
            Score s = new Score(movies,search);
            ArrayList<PointdDim> points = getPoints(movies);
            
            //int k, int distance, int sort
            ArrayList<Integer> firstMethParam = getParameters(method1);
            ArrayList<Integer> secondMethParam = getParameters(method2);
            
            FinalClustering fistCluster = new FinalClustering();
            fistCluster = Kmeans.kMeansClustering(points, firstMethParam.get(0), 
                    firstMethParam.get(1), firstMethParam.get(2));
            
            FinalClustering secondCluster = new FinalClustering();
            secondCluster = Kmeans.kMeansClustering(points, secondMethParam.get(0), 
                    secondMethParam.get(1), secondMethParam.get(2));
            
            ArrayList<ArrayList<Recommendation>> recommendations = new ArrayList<>();
            
            ArrayList<Recommendation> firstRecommendation = getClusterElements(fistCluster,0);
            ArrayList<Recommendation> secondRecommendation = getClusterElements(secondCluster,1);
            
            sortCluster(firstRecommendation, secondRecommendation);
            
            recommendations.add(getClusterElements(fistCluster,0));
            recommendations.add(getClusterElements(secondCluster,1));

            String json = new Gson().toJson(recommendations);

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);

        } 
        catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

    /**
     * Filters parameter from String, prove if parameters are equals zero
     * @param parameters
     * @return 
     */
    private ArrayList<Integer> getParameters(String[] parameters)
    {
        ArrayList<Integer> temp = new ArrayList<Integer>();
        
        List<Integer> defaultPar = Arrays.asList(3, 0, 1);
        
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

    private void sortCluster(ArrayList<Recommendation> firstCluster, ArrayList<Recommendation> secondCluster) throws IOException 
    {
        float[ ][ ] scores = new float[firstCluster.size()][secondCluster.size()];
 
        for(Recommendation cl1:firstCluster ){
            for(Recommendation cl2:secondCluster ){
                //System.out.println("############################");
                scores[cl1.getClusterId()][cl2.getClusterId()] = compareClusters(cl1, cl2);
                
            }
        }

        //float max = Float.MIN_VALUE;
        float max = Float.MIN_VALUE;
        float[ ][ ] res = new float[firstCluster.size()][secondCluster.size()];
        int remove_row = firstCluster.size()+1;
        int remove_column = firstCluster.size()+1;
        
        for(int i=0; i<scores.length; i++){
           if ( i == remove_row)
                continue;
           
            for(int j=0; j<scores[i].length; j++){
                if ( j == remove_column){
                    continue;
                }
                else{
                    System.out.print(scores[i][j]);
                    if(scores[i][j] >= max)
                    {
                        max = Math.max(max, scores[i][j]);
                        remove_row = i;
                        remove_column = j;
                        System.out.print("Max: "+max);
                    }
                }
            }
            System.out.println("##############################");
        }
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
    
    
    private ArrayList<Recommendation>getClusterElements(FinalClustering clusterings, int methodid) throws IOException 
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
