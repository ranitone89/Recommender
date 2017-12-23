/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.recommender;

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
        this.setId(id);
        this.setDesc(desc);
        this.setGenres(genres);
        this.setActors(actors);
        this.setReleased(released);
        this.setLenght(lenght);
        this.setRating(rating);
        setComparations(comparationString);
    } 
    
    private void setComparations(String comString){
        String[] comparation = comString.split(";");
        this.comparations = new Integer[comparation.length][];

        for (int i = 0; i < comparation.length; i++) {
            String[] row = comparation[i].split(",");
            this.comparations[i] = new Integer[row.length];

            for(int j=0; j < row.length; j++) {
                this.comparations[i][j] = Integer.parseInt(row[j]);
            }
        }     
    }

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String[] getActors() {
		return actors;
	}

	public void setActors(String[] actors) {
		this.actors = actors;
	}

	public Integer[] getReleased() {
		return released;
	}

	public void setReleased(Integer[] released) {
		this.released = released;
	}

	public String[] getGenres() {
		return genres;
	}

	public void setGenres(String[] genres) {
		this.genres = genres;
	}

	public Integer[] getLenght() {
		return lenght;
	}

	public void setLenght(Integer[] lenght) {
		this.lenght = lenght;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}
}
