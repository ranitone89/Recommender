/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.servlets;

import com.db.DataDB;
import java.io.IOException;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.movie.Movie;
import com.movie.Score;
import com.movie.Search;
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
            
            String message = dataDao.search(minLenght,maxLenght,minReleased,maxReleased,minStar,actors,genres);
            ArrayList<Movie> movies = dataDao.getMovies(movieArray(message));
            System.out.println("Request genres: "+genres.length);
            Search search = new Search(genres, actors);
            Score s = new Score(movies,search);

            response.getWriter().write(message);

        } 
        catch (Exception e) {
            System.err.println(e.getMessage());
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
