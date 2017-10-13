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
public class Search {
    
    private String[] genres;
    private String[] actors;
    
    public Search(String []genres, String []actors){
        this.genres = genres;
        setActors(actors);        
    }
    
    public String[] getGenres(){
        return this.genres;
    }

    public String getGenre(int position){
        return this.genres[position];
    }
    
    private void setGenres(String[] genres){
        this.genres = genres;
    }   

    public String[] getActors(){
        return this.actors;
    }
    
    public String getActor(int position){
        return this.actors[position];
    }
    
    private void setActors(String[] actors){
        for(int i =0; i<actors.length; i++){
            actors[i] = actors[i].replace("%", "");
        }
        this.actors = actors;
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
}
