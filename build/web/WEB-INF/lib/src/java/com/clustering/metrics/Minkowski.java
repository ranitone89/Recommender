package com.clustering.metrics;

import com.clustering.objects.PointdDim;

/**
 * 
 * @author Johannes Kastner
 *
 */
public class Minkowski {
	private PointdDim p1;
	private PointdDim p2;
	private int degree;
	
	
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
	public int getDegree() {
		return degree;
	}
	public void setDegree(int degree) {
		this.degree = degree;
	}
	
	public Minkowski(PointdDim p1, PointdDim p2, int degree) {
		this.p1 = p1;
		this.p2 = p2;
		this.degree = degree;
	}
	
	
	public float calculateDistance(){
		float sum=0;
		
		for(int i=0; i < this.p1.getDim().length; i++){
			sum = (float) (sum + Math.pow(this.p1.getDim()[i]-this.p2.getDim()[i], this.degree));
			
		}
		sum = (float) Math.pow(sum, (1.0f/this.degree));
		
		return sum;
	}

}
