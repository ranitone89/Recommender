/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.recommender;

import java.sql.Array;
import java.util.ArrayList;

/**
 *
 * @author Nemanja Ranitovic
 */
public class Scenario {

    private int id;
    private String desc;
    private String[] actors;
    private String[] genres;
    private Integer[] released;
    private Integer[] lenght;
    
    private int rating;
    private Integer[][] comparations;
    
    public Scenario(int id, String desc, String[] actors,String[] genres, Integer[] released,Integer[] lenght, int rating,String comparationString) {
        this.id = id;
        this.desc = desc;
        this.genres = genres;
        this.actors = actors;
        this.released = released;
        this.lenght = lenght;
        this.rating = rating;
        setComparations(comparationString);
    } 
    
    private void setComparations(String comString){
        String[] comparation = comString.split(";");
        this.comparations = new Integer[comparation.length][];
        System.out.println("com.recommender.Scenario.setComparations(): "+comparation.length);
       
        for (int i = 0; i < comparation.length; i++) {
            String[] row = comparation[i].split(",");
            this.comparations[i] = new Integer[row.length];

            for(int j=0; j < row.length; j++) {
                this.comparations[i][j] = Integer.parseInt(row[j]);
            }
        }     
    }
}
