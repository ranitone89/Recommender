package com.clustering.kmeans;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

import com.clustering.metrics.D2;
import com.clustering.objects.Cluster;
import com.clustering.objects.PointdDim;

/**
 * 
 * @author Johannes Kastner
 *class for mananging the first step of k-means. initialization and sort
 */
public class Sort {

	/**
	 * sorts points w.r.t. a given parameter
	 * @param points
	 * @param pos
	 * @return sorted list of points
	 */
	public static ArrayList<PointdDim> sortPoints(ArrayList<PointdDim> points, final int pos) {

		Collections.sort(points, new Comparator<PointdDim>() {

			@Override
			public int compare(PointdDim point1, PointdDim point2) {
				return Float.compare(point1.getDim()[pos], point2.getDim()[pos]);
			}
		});
		return points;
	}

	/**
	 * shuffles the list of points by random
	 * @param points
	 * @return the shuffled list of points
	 */
	public static ArrayList<PointdDim> shufflePoints(ArrayList<PointdDim> points) {

		Collections.shuffle(points);
		return points;
	}

	/**
	 * performs k-means++ seeding
	 * @param points list of points
	 * @param k	number of desired clusters
	 * @return initialized clusters
	 */
	public static ArrayList<Cluster> kmeansplusplus(ArrayList<PointdDim> points, int k) {

		final int factor = 10;

		// random for random values
		Random rand = new Random();
		// set for already added clusterpoints
		Set<Integer> added = new HashSet<Integer>();

		// init the clusters list
		ArrayList<Cluster> clusters = new ArrayList<Cluster>();

		// choose randomly one point and add it to the cluster
		Cluster c = new Cluster();
		c.setId(0);
		int pos = rand.nextInt(points.size());
		c.setCenterOfGravity(points.get(pos));
		c.setClusterPoints(new HashSet<PointdDim>());
		clusters.add(c);
		// add the added point to the set
		added.add(pos);

	//	 System.out.println("Initial Cluster point: "+pos);

		Cluster current = c;
		float totalSum = 0;
		while (clusters.size() < k) {
			float[] values = new float[points.size()];
			totalSum = 0;
			// go through all points
			int i = 0;
			for (PointdDim p1 : points) {
				// check if point is already an added point
				if (added.contains(i)) {
					// point is already on list
					values[i] = -1;
					i++;
				} else {
					// System.out.println("Betrachte point: "+p1.getId()+" an
					// position "+i);
					float dist = new D2(p1, current.getCenterOfGravity()).calculateDistance(factor);
					// System.out.println("Distanz Punkt "+p1.getId() +" zu " +current.getId()+" betr�gt "+ dist);
					if (p1.getDist() > dist) {
						p1.setDist(dist);
					//	System.out.println("Current dist is closer!");
					}
					// System.out.println("k�rzeste Distanz betr�gt
					// "+p1.getDist());
					totalSum = totalSum + p1.getDist();
					values[i] = totalSum;
					// System.out.println("Summe f�r Zufallswert betr�gt "+totalSum);
					i++;
				}
			}
			Cluster c1 = new Cluster();
			c1.setId(clusters.size());
			int index = getRandomValue(values, totalSum, points, added, rand, factor);
			c1.setCenterOfGravity(points.get(index));
			c1.setClusterPoints(new HashSet<PointdDim>());
			clusters.add(c1);
			current = c1;

		}

	//	 System.out.println("Clusterpoints:");
		// for(int i=0;i< clusters.size();i++){
			//	System.out.println("Punkt "+clusters.get(i).getId()+" "+Arrays.toString(clusters.get(i).getCenterOfGravity().getDim()));
		//	}
		// System.out.println();
		return clusters;
	}

	/**
	 * function to get a random value for seeding
	 * @param values
	 * @param totalSum
	 * @param points
	 * @param added
	 * @param rand
	 * @param factor
	 * @return
	 */
	private static int getRandomValue(float[] values, float totalSum, ArrayList<PointdDim> points, Set<Integer> added,
			Random rand, int factor) {
		int randomValue = rand.nextInt((int) totalSum);

		// System.out.println("Random Zufallswert: "+randomValue);

		int lastPos = 0;
		for (int i = 0; i < values.length; i++) {

			if (values[i] != -1) {
				if (randomValue < values[i]) {
					lastPos = i;
					// System.out.println("Summe von "+values[i] + "wurde durch Randomwert "+randomValue+" �berschritten durch Punkt an Position"+(lastPos));
					break;
				} else {
					lastPos = i;
					// System.out.println("Aktuelle Zwischensumme von Punkt an
					// Position"+i+" betr�gt "+values[i]);
				}
			} else {
				lastPos = i + 1;
			}
		}

		// System.out.println("Neuer Clusterpunkt ist Punkt an Position "+lastPos);
		added.add(lastPos);

		return lastPos;
	}

	/**
	 * classic k-means initialization of clusters
	 * @param points
	 * @param k
	 * @return
	 */
	public static ArrayList<Cluster> init(ArrayList<PointdDim> points, int k) {
		ArrayList<Cluster> clusters = new ArrayList<Cluster>();
		shufflePoints(points);
		for (int i = 0; i < k; i++) {
			Cluster c = new Cluster();
			c.setId(i);
			c.setCenterOfGravity(points.get(i));
			c.setClusterPoints(new HashSet<PointdDim>());
			clusters.add(c);
		}
		// System.out.println("Clusterpoints:");
	//	 for(int i=0;i< clusters.size();i++){
				//System.out.println("Punkt "+clusters.get(i).getId()+" "+Arrays.toString(clusters.get(i).getCenterOfGravity().getDim()));
		//	}
	//	 System.out.println();
		return clusters;
	}

}
