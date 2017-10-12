package com.clustering.metrics;

import com.clustering.objects.PointdDim;

/**
 * 
 * @author Johannes Kastner
 *
 * Manage the Averaged Euclidean Distance between 2 d-Dimensional Points
 */
public class AverageDistance {
	private PointdDim p1;
	private PointdDim p2;
	
	public PointdDim getP1() {
		return p1;
	}
	public void setP1(PointdDim p1) {
		this.p1 = p1;
	}
	public PointdDim getP2() {
		return p2;
	}
	public void setP2(PointdDim p2) {
		this.p2 = p2;
	}
	
	/**
	 * Constructs an Metrics Object for calculating the Averaged Euclidean Distance between 2 d-dimensional points
	 * @param p1 
	 * @param p2
	 */
	public AverageDistance(PointdDim p1, PointdDim p2) {
		this.p1=p1;
		this.p2=p2;
	}
	
	
	public float calculateDistance(){
		float sum=0;
		
		for(int i=0; i < this.p1.getDim().length; i++){
			sum = (float) (sum + Math.pow(Math.abs(this.p1.getDim()[i]-this.p2.getDim()[i]), 2));
			
		}
		sum = sum/this.p1.getDim().length;
		sum = (float) Math.sqrt(sum);
		
		return sum;
	}
	
	
	
	
	
	
}
