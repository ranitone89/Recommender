package com.clustering.objects;

import java.util.Set;

/**
 * 
 * @author Johannes Kastner
 *
 */
public class Cluster {
	
	private int id;
	private PointdDim centerOfGravity;
	private PointdDim centerOfGravityOld;
	private Set<PointdDim> clusterPoints;
	
	public Cluster(){
		
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public PointdDim getCenterOfGravity() {
		return centerOfGravity;
	}
	public void setCenterOfGravity(PointdDim centerOfGravity) {
		this.centerOfGravity = centerOfGravity;
	}
	public Set<PointdDim> getClusterPoints() {
		return clusterPoints;
	}
	public void setClusterPoints(Set<PointdDim> clusterPoints) {
		this.clusterPoints = clusterPoints;
	}

	public PointdDim getCenterOfGravityOld() {
		return centerOfGravityOld;
	}

	public void setCenterOfGravityOld(PointdDim centerOfGravityOld) {
		this.centerOfGravityOld = centerOfGravityOld;
	}
	
	
	

}
