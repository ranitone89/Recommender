/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.movie;

import java.util.ArrayList;

/**
 *
 * @author Administrator
 */
public class Recommendation {
    
    private int methodid;
    private int clusterid;
    private ArrayList<Movie> movies;
    
    public Recommendation(int methodid,int clusterid, ArrayList<Movie> movies)
    {
        this.clusterid = clusterid;
        this.movies = movies;
        this.methodid = methodid;
    }
}
