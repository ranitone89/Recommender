/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.recommender;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
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
    private List<Float> scores = new ArrayList<Float>();
    private List<String> scoresString = new ArrayList<String>();

    public Movie(int movieId, String title, String genres, String actors, int movieLenght, int releaseYear, float rating)
    {
        this.movieId = movieId;
        this.title = title;
        this.releaseYear = releaseYear;
        this.movieLenght = movieLenght;
        this.rating = rating;
        setGenres(genres);
        setActors(actors);
    }

    public Movie(int movieId, String title, String genres, String actors, int movieLenght, int releaseYear, float rating, String scores)
    {
        this.movieId = movieId;
        this.title = title;
        this.releaseYear = releaseYear;
        this.movieLenght = movieLenght;
        this.rating = rating;
        setGenres(genres);
        setActors(actors);
        setScores(scores);
    }
    
    
    public String getTitle(){
        return this.title;
    }
      
    public int getMovieId(){
        return this.movieId;
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
    
    public int getMovieLenght(){
        return this.movieLenght;
    }

    public float getMovieRating(){
        return this.rating;
    }
    
      
    private String[] stringToArray(String str, String mode){
        String[] temp = new String[200];
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
    
    /*Set rating scores*/
    public void setActorScore(float actorScore){
        this.scores.add(actorScore);
        this.scoresString.add(""+actorScore);
    } 
    
    public void setGenreScore(float movieScore){
        this.scores.add(movieScore);
        this.scoresString.add(""+movieScore);
    } 
    
    public void setLenghtScore(int movieLenght){
        this.scores.add((float) movieLenght);
        this.scoresString.add(""+movieLenght);
    }
    
    public void setReleaseScore(int releaseYear){
        this.scores.add((float)releaseYear);
        this.scoresString.add(""+releaseYear);
    }    

    
    public void setRatingScore(float rating){
        this.scores.add(rating);
        this.scoresString.add(""+rating);
    } 


    public float[] getScores(){
        return getFloats(scores);
    }
    
    public String[] getStringScores(){
        return getStrings(this.scoresString);
    } 
    
    /**
     * Set scores for movies in evaluation mode
     * @param scores 
     */
    private void setScores(String scores) {
        scores = scores.replaceAll("[\\[\\](){}]","");     
        String[] scoreArray = scores.split(",");
        for(String score: scoreArray) {
            this.scores.add(Float.parseFloat(score));
            this.scoresString.add(score);
        }
    }
    
    /**
     * Convert List of floats to array of floats
     * @param values
     * @return 
     */
    public static float[] getFloats(List<Float> values) {
        int length = values.size();
        float[] result = new float[length];
        for (int i = 0; i < length; i++) {
            result[i] = values.get(i).floatValue();
        }
        return result;
    }

    
    /**
     * Convert List of strings to array of strings
     * @param values
     * @return 
     */
    public static String[] getStrings(List<String> values) {
        int length = values.size();
        String[] result = new String[length];
        for (int i = 0; i < length; i++) {
            result[i] = values.get(i);
        }
        return result;
    }    
    
    
}