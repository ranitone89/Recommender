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
        
        try {
            String minLenght = request.getParameter("minLenght");
            String maxLenght = request.getParameter("maxLenght");
            String minReleased = request.getParameter("minReleased");
            String maxReleased = request.getParameter("maxReleased"); 
            String actors[] = request.getParameterValues("actorList[]");
            String genres[] = request.getParameterValues("genreList[]");  
            String minStar = request.getParameter("minStar");  
            DataDB dataDao = new DataDB();
            
            ArrayList<Movie> movies = dataDao.search(minLenght,maxLenght,minReleased,maxReleased,minStar,actors,genres);

            Search search = new Search(genres, actors);
            Score s = new Score(movies,search);//calsScores
            ArrayList<PointdDim> points = getPoints(movies);
            
            FinalClustering clusterings1 = new FinalClustering();
            clusterings1 = Kmeans.kMeansClustering(points, 4, 0, 1);
            
            FinalClustering clusterings2 = new FinalClustering();
            clusterings2 = Kmeans.kMeansClustering(points, 3, 0, 0);
            
            ArrayList<ArrayList<Recommendation>> recommendations = new ArrayList<>();
 
            recommendations.add(getClusterElements(clusterings1,0));
            recommendations.add(getClusterElements(clusterings2,1));

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
