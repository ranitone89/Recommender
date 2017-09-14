package com.clustering.metrics;

import com.clustering.objects.PointdDim;

/**
 * 
 * @author Johannes Kastner
 *
 */
public class D2 {
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
	
	public D2(PointdDim p1, PointdDim p2) {
	
		this.p1 = p1;
		this.p2 = p2;
	}
	
	
	public float calculateDistance(int factor){
		float sum=0;
		
		for(int i=0; i < this.p1.getDim().length; i++){
			float dist = (float) Math.pow(Math.abs(this.p1.getDim()[i]-this.p2.getDim()[i]), 2);
			dist = dist * factor;
			sum = sum + dist;
			
		}
		
		return sum;
	}
	
	
	
}
