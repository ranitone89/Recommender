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
public class Cluster {
    private int clusterid;
    private ArrayList<Movie> movies;
    
    public Cluster(int clusterid, ArrayList<Movie> movies)
    {
        this.clusterid = clusterid;
        this.movies = movies;
    }
}