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
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            String minLenght = request.getParameter("minLenght");
            String maxLenght = request.getParameter("maxLenght");
            String minReleased = request.getParameter("minReleased");
            String maxReleased = request.getParameter("maxReleased"); 
            String actors[] = request.getParameterValues("actorList[]");
            String genres[] = request.getParameterValues("genreList[]");  
            String minStar = request.getParameter("minStar");  
            DataDB dataDao = new DataDB();
            
            String message = dataDao.search(minLenght,maxLenght,minReleased,maxReleased,minStar,actors,genres);
            ArrayList<Movie> movies = dataDao.getMovies(movieArray(message));
            
            Search search = new Search(genres, actors);
            Score s = new Score(movies,search);
            ArrayList<PointdDim> points = getPoints(movies);
            FinalClustering clusterings = new FinalClustering();
            clusterings = Kmeans.kMeansClustering(points, 1, 0, 1);
            
            //String bothJson = getClusterElements(clusterings);  
            String json = new Gson().toJson(getClusterElements(clusterings));
            response.getWriter().write(json);

        } 
        catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

    private ArrayList<Movie> getClusterElements(FinalClustering clusterings) 
    {
        ArrayList<Movie> movies = new ArrayList<Movie>();
        //String bothJson = "[";
        ArrayList<ArrayList<Cluster>>clusters = clusterings.getClustering();
        for(Cluster cluster : clusters.get(0)) {
            System.out.println(" "+cluster.getId()+" "+cluster.getClusterPoints()+" Dims: "+cluster.getClusterPoints().size());
            //ArrayList<Movie> movies = new ArrayList<Movie>();
            for (PointdDim elem : cluster.getClusterPoints()){
                movies.add(elem.getMovieDim());
            }
        //    bothJson += new Gson().toJson(movies)+",";
        }
        //bothJson += "]";
        //System.out.println(bothJson);
        return movies;
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
