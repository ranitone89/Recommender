/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.movie;

import java.util.ArrayList;
import java.util.Set;

/**
 *
 * @author Nemanja Ranitovic
 */
public class Score {
    
    public Score(ArrayList<Movie> movies, Search search)
    {
        calcScores(search,movies);

    }

    
    private void calcScores(Search search, ArrayList<Movie> movies)
    {
        for(Movie m: movies){
            calcGenreScore(search, m);
            calcActorScore(search, m);
            //System.out.println(m.toString());
        } 
    }
    private void calcGenreScore(Search search, Movie movie) 
    {
        int movieGenres = movie.getGenres().length;
        int searchGenres = search.getGenres().length;
        int commonGenres = 0;
        
        for(int i = 0; i< movie.getGenres().length; i++){
            for(int j= 0; j<search.getGenres().length; j++){
                if(movie.getGenre(i) == null ? search.getGenre(j) == null : movie.getGenre(i).equals(search.getGenre(j))){
                    commonGenres++;
                }
            }
        }
        float genreScore = ((float)commonGenres) /((float)movieGenres+searchGenres-commonGenres); 
        movie.setGenreScore(genreScore);
        
    }

    private void calcActorScore(Search search, Movie movie) 
    {
        int movieActors = movie.getActors().length;
        int searchActors = search.getActors().length;
        int commonActors = 0;
        
        for(int i = 0; i< movie.getActors().length; i++){
            for(int j= 0; j<search.getActors().length; j++){
                if(movie.getActor(i) == null ? search.getActor(j) == null : movie.getActor(i).equals(search.getActor(j))){
                    commonActors++;
                }
            }
        }
        float actorScore = ((float)commonActors) /((float)movieActors+searchActors-commonActors);    
        movie.setActorScore(actorScore);
    }
}
