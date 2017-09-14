package com.clustering.metrics;

import com.clustering.objects.PointdDim;

/**
 * 
 * @author Johannes Kastner
 *
 */
public class Canberra {
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

	public Canberra(PointdDim p1, PointdDim p2) {
		this.p1 = p1;
		this.p2 = p2;
	}

	public float calculateDistance() {
		float sum = 0;

		for (int i = 0; i < this.p1.getDim().length; i++) {
			float x = Math.abs(this.p1.getDim()[i]);
			float y = Math.abs(this.p2.getDim()[i]);

			if (x + y != 0) {
				sum = (float) (sum + (Math.abs(this.p1.getDim()[i] - this.p2.getDim()[i]))
						/ (x+y));
			} else {
				sum += 0;
			}
		}

		return sum;
	}

}
