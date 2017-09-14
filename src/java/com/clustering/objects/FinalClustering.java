package com.clustering.objects;

import java.util.ArrayList;

/**
 * 
 * @author Johannes Kastner
 *
 */
public class FinalClustering {
	
	private long startTime;
	private long endTime;
	private int iterations;
	private ArrayList<ArrayList<Cluster>>clustering;
	
	public FinalClustering(){
		
	}
	
	
	public long getStartTime() {
		return startTime;
	}
	public void setStartTime(long startTime) {
		this.startTime = startTime;
	}
	public long getEndTime() {
		return endTime;
	}
	public void setEndTime(long endTime) {
		this.endTime = endTime;
	}
	public ArrayList<ArrayList<Cluster>> getClustering() {
		return clustering;
	}
	public void setClustering(ArrayList<ArrayList<Cluster>> clustering) {
		this.clustering = clustering;
	}


	public int getIterations() {
		return iterations;
	}


	public void setIterations(int iterations) {
		this.iterations = iterations;
	}

}
