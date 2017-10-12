package com.clustering.metrics;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

import com.clustering.objects.BordaObject;
import com.clustering.objects.Cluster;
import com.clustering.objects.PointdDim;

/**
 * 
 * @author Johannes Kastner
 *
 */
public class Borda {

	private PointdDim p1;
	private ArrayList<Cluster> clusters;

	public ArrayList<Cluster> getClusters() {
		return clusters;
	}

	public void setClusters(ArrayList<Cluster> clusters) {
		this.clusters = clusters;
	}

	public PointdDim getP1() {
		return p1;
	}

	public void setP1(PointdDim p1) {
		this.p1 = p1;
	}

	public Borda(ArrayList<Cluster> clusters, PointdDim p1) {
		this.clusters = clusters;
		this.p1 = p1;
	}

	public int getBestObject() {

		int[] bordaValues = new int[clusters.size()];
		float[] newDistances = new float[this.p1.getDim().length];
		ArrayList<ArrayList<BordaObject>> sets = new ArrayList<ArrayList<BordaObject>>();
		
		//System.out.println("Betrachte Punkt "+ this.p1.getId()+" "+Arrays.toString(this.p1.getDim()));
		for (int i = 0; i < this.p1.getDim().length; i++) {
			ArrayList<BordaObject> set = new ArrayList<BordaObject>();
			for (Cluster c : this.clusters) {

				newDistances[i] = Math.abs(this.p1.getDim()[i] - c.getCenterOfGravity().getDim()[i]);
				//System.out.print("D(P"+i +",C"+c.getId() +")="+newDistances[i]+"; ");

				BordaObject o = new BordaObject();
				o.setId(c.getId());
				o.setValue(newDistances[i]);
				set.add(o);

			}
			Collections.sort(set, new Comparator<BordaObject>() {
				@Override
				public int compare(BordaObject o1, BordaObject o2) {

					if (o1.getValue() >= ((BordaObject) o2).getValue()) {
						return 1;
					} else if (o1.getValue() < ((BordaObject) o2).getValue()) {
						return -1;
					}
					return 0;
				}
			});
			int j = 1;
			//System.out.println();
			//System.out.println("Values");
			for (BordaObject obj : set) {

				int val = set.size() - j;
				bordaValues[obj.getId()] += val;
				//System.out.print("ID:"+obj.getId()+" Va:"+val+"; ");
				j++;
			}
		//	System.out.println();
			
			sets.add(set);

		}

		int bestPos = 0;
		int posValue = 0;
		for (int a = 0; a < bordaValues.length; a++) {
			if (bordaValues[a] > posValue) {
				posValue = bordaValues[a];
				bestPos = a;
			}
		}
		//System.out.println("Beste Position: "+bestPos);
		//System.out.println();


		return bestPos;

	}

}
