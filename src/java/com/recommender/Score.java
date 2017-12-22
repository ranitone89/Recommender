/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.recommender;

import java.util.ArrayList;
import java.util.Set;

/**
 *
 * @author Nemanja Ranitovic
 */
public class Score {
    
    /**
     * Calculate all scores
     * @param movies
     * @param genres
     * @param actors
     * @param parameter 
     */
    public static void calcScores(ArrayList<Movie> movies, String[] genres, String[] actors, String[] parameter)
    {
        
        for(String par: parameter){
            for(Movie m: movies){
                if(par.equals("actor")){
                    calcActorScore(removeString(actors), m);
                }
                if(par.equals("genre")){
                    calcGenreScore(genres, m);
                }
                if(par.equals("lenght")){
                    m.setLenghtScore(m.getMovieLenght());
                }
                if(par.equals("year")){
                    m.setReleaseScore(m.getReleaseYear());
                }
                if(par.equals("rating")){
                    m.setRatingScore(m.getMovieRating());
                }
                
            }             
        }
    }
    
    /**
     * Calculate genre score
     * @param genres
     * @param movie 
     */
    private static void calcGenreScore(String[] genres, Movie movie) 
    {
        int movieGenres = movie.getGenres().length;
        int searchGenres = genres.length;
        int commonGenres = 0;
        
        for(int i = 0; i< movie.getGenres().length; i++){
            for(int j= 0; j<genres.length; j++){
                if(movie.getGenre(i) == null ? genres[j] == null : movie.getGenre(i).contains(genres[j])){
                    commonGenres++;
                }
            }
        }
        float genreScore = ((float)commonGenres) /((float)movieGenres+searchGenres-commonGenres);
        movie.setGenreScore(genreScore);
        
    }
    
    /**
     * Calculate actor score
     * @param actors
     * @param movie 
     */
    private static void calcActorScore(String[] actors, Movie movie) 
    {
        
        int movieActors = movie.getActors().length;
        int searchActors = actors.length;
        int commonActors = 0;
        
        for(int i = 0; i< movie.getActors().length; i++){
            for(int j= 0; j<actors.length; j++){
                if(movie.getActor(i) == null ? actors[j] == null : movie.getActor(i).contains(actors[j])){
                    commonActors++;
                }
            }
        }
        float actorScore = ((float)commonActors) /((float)movieActors+searchActors-commonActors); 
        movie.setActorScore(actorScore);
    }

    
    public static String[] removeString(String[] actors){
        for(int i =0; i<actors.length; i++){
            actors[i] = actors[i].replace("%", "");
        }
        return actors;
    }
}
