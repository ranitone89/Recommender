/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.recommender;

import java.io.Serializable;
import java.util.ArrayList;

/**
 *
 * @author Nemanja Ranitovic
 */
public class Recommendation{
    
    private int methodid;
    private int clusterid;
    private ArrayList<Movie> movies;
    
    public Recommendation(int methodid,int clusterid, ArrayList<Movie> movies)
    {
        this.clusterid = clusterid;
        this.movies = movies;
        this.methodid = methodid;
    }
    
    public ArrayList<Movie> getMovies(){
        return movies;
    }

    public int getClusterId(){
        return clusterid;
    }
    
    public void setClusterId(int clusterid){
        System.out.println("This add cluster id");
        this.clusterid = clusterid;
    }
}
