/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.recommender;
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
    private float[] scores = new float[5];
    private String[] scoresString = new String[5];

    public Movie(int movieId, String title, String genres, String actors, int movieLenght, int releaseYear, float rating)
    {
        this.movieId = movieId;
        this.title = title;
        this.releaseYear = releaseYear;
        this.movieLenght = movieLenght;
        this.rating = rating;
        setGenres(genres);
        setActors(actors);
        setLenghtScore(movieLenght);
        setReleaseScore(releaseYear);
        setRatingScore(rating);
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
        setLenghtScore(movieLenght);
        setReleaseScore(releaseYear);
        setRatingScore(rating);
        setScores(scores);
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
    
    /*Set rating scores*/
    public void setActorScore(float actorScore){
        this.scores[0] = actorScore;
        this.scoresString[0] = ""+actorScore;
    } 
    
    public void setGenreScore(float movieScore){
        this.scores[1] = movieScore;
        this.scoresString[1] = ""+movieScore;
    } 
    
    private void setLenghtScore(int movieLenght){
        this.scores[2] = (float)movieLenght;
        this.scoresString[2] = ""+movieLenght;
    }
    
    private void setReleaseScore(int releaseYear){
        this.scores[3] = (float)releaseYear;
        this.scoresString[3] = ""+releaseYear;
    }    

    
    private void setRatingScore(float rating){
        this.scores[4] = rating;
        this.scoresString[4] = ""+rating;
    } 

    /*Get rating scores*/
    public float getActorScore(){
        return scores[0];
    } 

    public float getGenreScore(){
        return scores[1];
    } 

    public float getLenghtScore(){
        return scores[2];
    }
    
    public float getReleaseScore(){
        return scores[3];
    }    

    public float getRatingScore(){
        return scores[4];
    } 

    public float[] getScores(){
        return scores;
    }
    
    public String[] getStringScores(){
        return this.scoresString;
    } 

    
    @Override
    public String toString(){
        return "A: "+this.getActorScore()+" G: "+this.getGenreScore()+" L: "+this.getLenghtScore()+" Rel: "+this.getReleaseScore()+" Rank: "+this.getRatingScore();
    }

    private void setScores(String scores) {
        scores = scores.replaceAll("[\\[\\](){}]","");
        System.out.println("Parsed: "+scores);
        
        String[] scoreArray = scores.split(",");
        setActorScore(Float.parseFloat(scoreArray[0]));
        setGenreScore(Float.parseFloat(scoreArray[1]));
        setLenghtScore(Integer.parseInt(scoreArray[2]));
        setReleaseScore(Integer.parseInt(scoreArray[3]));
        setRatingScore(Float.parseFloat(scoreArray[4]));   
    }
 
     
}