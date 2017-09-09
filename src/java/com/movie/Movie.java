/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.movie;
import java.util.Arrays;
/**
 *
 * @author Nemanja Ranitovic
 */
public class Movie {
    
    private String title;
    private int movieId;
    private String[] genres;
    private String[] actors;
    private int releaseYear;
    private int movieLenght;
    private float rating;

    public Movie(int movieId, String title, String genres, String actors, int movieLenght, int releaseYear, float rating)
    {
        this.movieId = movieId;
        this.title = title;
        setGenres(genres);
        setActors(actors);
        this.releaseYear = releaseYear;
        this.movieLenght = movieLenght;
        this.rating = rating;
    }
    
    public String getTitle(){
        return this.title;
    }
    
    private void setTitle(String title){
        this.title = title;
    }
    
    
    public int getMovieId(){
        return this.movieId;
    }
    
    private void setMovieId(int movieId){
        this.movieId = movieId;
    }
    
    public String[] getGenres(){
        return this.genres;
    }
    
    public String getGenre(int position){
        return this.genres[position];
    }
    
    private void setGenres(String genres){
        this.genres = stringToArray(genres,"Genre");
    }   

    public String[] getActors(){
        return this.actors;
    }
    
    private void setActors(String actors){
        this.actors = stringToArray(actors,"Actor");
    }      

    public int getReleaseYear(){
        return this.releaseYear;
    }
    
    private void setReleaseYear(int releaseYear){
        this.releaseYear = releaseYear;
    }    

    public int getMovieLenght(){
        return this.movieLenght;
    }
    
    private void setMovieLenght(int movieLenght){
        this.movieLenght = movieLenght;
    } 

    public float getMovieRating(){
        return this.rating;
    }
    
    private void setMovieRating(float rating){
        this.rating = rating;
    } 
    
    
    private String[] stringToArray(String str, String mode){
        String[] temp = new String[20];

        if("Genre".equals(mode)){
            /* delimiter */
            String delimiter = ",";
            /* given string will be split by the argument delimiter provided. */
            temp = str.split(delimiter);
            /* print substrings */
        }
        if("Actor".equals(mode)){
            /* delimiter */
            //String delimiter = "(?<=\\G\\d+,\\d+),";
            /* given string will be split by the argument delimiter provided. */
            temp = str.split(",(?!\\s+)");
            /* print substrings */            
        }
        return temp;
    }

    public String printGenre( int position )
    {
        return this.genres[position];
    } 
    
    public String printGenres()
    {
        return Arrays.toString(this.genres);
    } 

    public String printActor(int position)
    {
        return this.actors[position];
    }

    public String printActors()
    {
        return Arrays.toString(this.actors);
    }
    
     public String getActor(int position) {
        return this.actors[position]; 
    }
    
}