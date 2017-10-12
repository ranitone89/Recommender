package com.clustering.objects;

import com.movie.Movie;

/**
 * 
 * @author Johannes Kastner
 *
 */
public class PointdDim {
	
	private int id;
	private float[] dim;
        private Movie movieDim;
	
	/**
	 *  only needed for seeding in kmeans++  
	 */
	private float dist;
	
	public PointdDim(){
		this.dist = Long.MAX_VALUE;
	}
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public float[] getDim() {
		return dim;
	}
	public void setDim(float[] dim) {
		this.dim = dim;
	}

        public Movie getMovieDim() {
		return movieDim;
	}
        
	public void setMovieDim(Movie movieDim) {
		this.movieDim = movieDim;
	}
        
	public float getDist() {
		return dist;
	}


	public void setDist(float dist2) {
		this.dist = dist2;
	}
	
        @Override
	public String toString() {
		String s = "";
                for(int i = 0; i<dim.length; i++){
                    s += " "+dim[i];
                }
                return s;
	}	
	

}
