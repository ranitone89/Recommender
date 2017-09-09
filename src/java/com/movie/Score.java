/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.movie;

import java.util.ArrayList;

/**
 *
 * @author Nemanja Ranitovic
 */
public class Score {
    
    public Score(ArrayList<Movie> movies, Search search)
    {
        //calcGenreScore(search,movies);
        calcActorScore(search,movies);
    }

    private void calcGenreScore(Search search, ArrayList<Movie> movies) 
    {
        int movieNum = 0;
        int searchNum = search.getGenres().length;
        
        for(Movie m: movies){
            movieNum = m.getGenres().length;
            int commonNum = 0;
            for(int i = 0; i< m.getGenres().length; i++){
                for(int j= 0; j<search.getGenres().length; j++){
                    if(m.getGenre(i) == null ? search.getGenre(j) == null : m.getGenre(i).equals(search.getGenre(j))){
                        commonNum++;
                    }
                }
            }
            double genreScore = ((double)commonNum) /((double)movieNum+searchNum-commonNum);
            System.out.println("Title: "+m.getTitle()+" Genres "+m.printGenres()+" Search Genre: "+search.printGenres()+" Score Genre: "+genreScore);
            System.out.println("SearchNum: "+searchNum+ " MovieNum: "+movieNum + " Common: "+commonNum);
        } 
        
    }

    private void calcActorScore(Search search, ArrayList<Movie> movies) 
    {
        int movieNum = 0;
        int searchNum = search.getActors().length;
        
        for(Movie m: movies){
            movieNum = m.getActors().length;
            int commonNum = 0;
            for(int i = 0; i< m.getActors().length; i++){
                for(int j= 0; j<search.getActors().length; j++){
                    if(m.getActor(i) == null ? search.getActor(j) == null : m.getActor(i).equals(search.getActor(j))){
                        commonNum++;
                    }
                }
            }
            double actorScore = ((double)commonNum) /((double)movieNum+searchNum-commonNum);
            System.out.println("Title: "+m.getTitle()+"\n Actors "+m.printActor(2)+"\n Search Actor: "+search.printActors()+" Score Actor: "+actorScore);
            System.out.println("SearchNum: "+searchNum+ " MovieNum: "+movieNum + " Common: "+commonNum);
        } 
        
    }

    
}
