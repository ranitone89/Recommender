package com.clustering.kmeans;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import com.clustering.metrics.Borda;
import com.clustering.metrics.BordaNew;
import com.clustering.metrics.BrayCurtis;
import com.clustering.metrics.Canberra;
import com.clustering.metrics.Euclidean;
import com.clustering.metrics.Manhattan;
import com.clustering.objects.Cluster;
import com.clustering.objects.FinalClustering;
import com.clustering.objects.PointdDim;

/**
 * 
 * @author Johannes Kastner
 *
 *class for managing all k-means based clustering algorithms
 */
public class Kmeans {

	/**
	 * Function to cluster a set of Points with k-means
	 * @param points	points to cluster
	 * @param k			number of desired clusters
	 * @param distance	distance which should be chosen (0: Euclidean, 1: Canberra, 2: Bray Curtis, 3: Manhattan) 
	 * 
	 * @param sort  initialization of list of points (0: simple initializiation of centroids, 1: k-means++
	 * @return FinalClustering Object for benchmarking
	 */
	public static FinalClustering kMeansClustering(ArrayList<PointdDim> points, int k, int distance, int sort) {
		// System.out.println("Start kmeans with k="+k+" and "+points.size()+" points");
		boolean firstRound = true;
		ArrayList<ArrayList<Cluster>> clustersOld = new ArrayList<ArrayList<Cluster>>();

		long start1 = System.nanoTime();
		// initialize the k clusters with clustering-centroids
		ArrayList<Cluster> clusters;
		switch (sort) {
		case 0:
			clusters = Sort.init(points, k);
			break;
		case 1:
			clusters = Sort.kmeansplusplus(points, k);
			break;
		default:
			clusters = Sort.init(points, k);
			break;
		}
		// long end1 = System.nanoTime();
		// System.out.println("init kmeans: "+((end1-start1)/1000));

		// long start2 = System.nanoTime();
		// now start the iterations until the clusters are stable
		int round = 0;
		boolean checkLoop = false;
		while (!checkLoop) {
			// System.out.println("~~~~~~Runde:" + round + "~~~~~~");
			if (round > 0) {
				firstRound = false;
			}

			// now go through the list of all points and calculate the distances
			// of each dimension to the centroids of each Cluster
			for (PointdDim p : points) {
				float dist = Float.MAX_VALUE;
				int bestId = 0;
				for (Cluster c : clusters) {
					float newDist = 0;

					switch (distance) {
					case 0:
						Euclidean e = new Euclidean(p, c.getCenterOfGravity());
						newDist = e.calculateDistance();

						break;
					case 1:
						Canberra can = new Canberra(p, c.getCenterOfGravity());
						newDist = can.calculateDistance();
						break;
					case 2:
						BrayCurtis b = new BrayCurtis(p, c.getCenterOfGravity());
						newDist = b.calculateDistance();
						break;
					case 3:
						Manhattan m = new Manhattan(p, c.getCenterOfGravity());
						newDist = m.calculateDistance();
						break;

					default:
						Euclidean e1 = new Euclidean(p, c.getCenterOfGravity());
						newDist = e1.calculateDistance();
						break;
					}

					// System.out.println("Distanz von Punkt "+p.getId() +" zu
					// Cluster "+c.getId() +" betr�gt "+ newDist);
					if (newDist < dist) {
						dist = newDist;
						bestId = c.getId();
					}
				}
				clusters.get(bestId).getClusterPoints().add(p);
				// System.out.println("Punkt "+p.getId() +" zu Cluster "+bestId
				// +" hinzugefuegt");

			}

			// now go through all Clusters in order to recalculate the new
			// centroids
			ArrayList<Cluster> clustersNew = new ArrayList<Cluster>();

			for (Cluster c : clusters) {
				clustersNew.add(recalculateCentroid(c));
			}

			checkLoop = checkClusters(firstRound, clusters, clustersOld, 1);
			clustersOld.add(clusters);

			clusters = clustersNew;

			round++;
		}
		//System.out.println(":::Iteration i=" + (clustersOld.size()));
		//for (Cluster c : clustersOld.get(clustersOld.size() - 1)) {

			//String pointsString = "";
			//for (PointdDim p : c.getClusterPoints()) {
			///	pointsString += p.getId() + ",";
			//}
			//System.out.println(":::Punkte in Cluster " + c.getId() + " {" + pointsString + "}:::");
		//}
		long end2 = System.nanoTime();
		FinalClustering f = new FinalClustering();
		f.setStartTime(start1);
		f.setEndTime(end2);
		f.setIterations(round);
		f.setClustering(clustersOld);
		// System.out.println("Restliche Zeit: "+((end2-start2)/1000));
		return f;
	}

	/**
	 * Function to cluster a set of Points with k-means with borda as distance measure
	 * @param points	points to cluster
	 * @param k			number of desired clusters
	  * 
	 * @param sort  initialization of list of points (0: simple initializiation of centroids, 1: k-means++
	 * @return FinalClustering Object for benchmarking
	 */
	public static FinalClustering kMeansClusteringBorda(ArrayList<PointdDim> points, int k, int sort) {
		// System.out.println("Start kmeans with borda k="+k+" and
		// "+points.size()+" points");
		boolean firstRound = true;
		ArrayList<ArrayList<Cluster>> clustersOld = new ArrayList<ArrayList<Cluster>>();

		long start1 = System.nanoTime();
		// initialize the k clusters with clustering-centroids
		ArrayList<Cluster> clusters;
		switch (sort) {
		case 0:
			clusters = Sort.init(points, k);
			break;
		case 1:
			clusters = Sort.kmeansplusplus(points, k);
			break;
		default:
			clusters = Sort.init(points, k);
			break;
		}
		// long end1 = System.nanoTime();
		// System.out.println("init kmeans: "+((end1-start1)/1000));

		// long start2 = System.nanoTime();
		// now start the iterations until the clusters are stable
		int round = 0;
		boolean checkLoop = false;
		while (!checkLoop) {
			// System.out.println("~~~~~~Runde:" + round + "~~~~~~");
			if (round > 0) {
				firstRound = false;
			}

			// now go through the list of all points and calculate the distances
			// of each dimension to the centroids of each Cluster
			for (PointdDim p : points) {

				clusters.get(new Borda(clusters, p).getBestObject()).getClusterPoints().add(p);
				// System.out.println("Punkt "+p.getId() +" zu Cluster "+bestId
				// +" hinzugefuegt");

			}

			// now go through all Clusters in order to recalculate the new
			// centroids
			ArrayList<Cluster> clustersNew = new ArrayList<Cluster>();

			for (Cluster c : clusters) {
				clustersNew.add(recalculateCentroid(c));
			}

			checkLoop = checkClusters(firstRound, clusters, clustersOld, 10);
			clustersOld.add(clusters);

			clusters = clustersNew;

			round++;
		}
		// System.out.println(":::Iteration i=" + (clustersOld.size()));
		// for (Cluster c : clustersOld.get(clustersOld.size() - 1)) {

		// String pointsString = "";
		// for (PointdDim p : c.getClusterPoints()) {
		// pointsString += p.getId() + ",";
		// }
		// System.out.println(":::Punkte in Cluster " + c.getId() + " {" +
		// pointsString + "}:::");
		// c.setClusterPoints(new HashSet<Point>());
		// }
		long end2 = System.nanoTime();
		FinalClustering f = new FinalClustering();
		f.setStartTime(start1);
		f.setEndTime(end2);
		f.setIterations(round);
		f.setClustering(clustersOld);
		// System.out.println("Restliche Zeit: "+((end2-start2)/1000000));
		return f;
	}

	/**
	 * Function to cluster a set of Points with k-means with Borda as distance Measure(OPTIMIZED)
	 * @param points	points to cluster
	 * @param k			number of desired clusters
	 * 
	 * @param sort  initialization of list of points (0: simple initializiation of centroids, 1: k-means++
	 * @return FinalClustering Object for benchmarking
	 */
	public static FinalClustering kMeansClusteringBordaNew(ArrayList<PointdDim> points, int k, int sort) {
		// System.out.println("Start kmeans with borda k="+k+" and "+points.size()+" points");
		boolean firstRound = true;
		ArrayList<ArrayList<Cluster>> clustersOld = new ArrayList<ArrayList<Cluster>>();
		int[] currentClustering = new int[points.size()];
		long start1 = System.nanoTime();
		// initialize the k clusters with clustering-centroids
		ArrayList<Cluster> clusters;
		switch (sort) {
		case 0:
			clusters = Sort.init(points, k);
			break;
		case 1:
			clusters = Sort.kmeansplusplus(points, k);
			break;
		default:
			clusters = Sort.init(points, k);
			break;
		}
		// long end1 = System.nanoTime();
		// System.out.println("init kmeans: "+((end1-start1)/1000));

		// long start2 = System.nanoTime();
		// now start the iterations until the clusters are stable
		int round = 0;
		boolean checkLoop = false;
		while (!checkLoop) {
			// System.out.println("~~~~~~Runde:" + round + "~~~~~~");
			if (round > 0) {
				firstRound = false;
			}

			// now go through the list of all points and calculate the distances
			// of each dimension to the centroids of each Cluster
			for (PointdDim p : points) {

				int lastClustering = Integer.MAX_VALUE;
				//long s1 = System.nanoTime();
				if (!firstRound) {
					//long f1 = System.nanoTime();
					
					lastClustering = currentClustering[p.getId()];
					int newPos = new BordaNew(clusters, p, lastClustering).getBestObject1();
					//long f2= System.nanoTime();
					//System.out.println("create Borda object: "+(f2-f1));
					clusters.get(newPos).getClusterPoints().add(p);
					currentClustering[p.getId()] = newPos;
					//long f3=System.nanoTime();
					//System.out.println("best Borda object: "+(f3-f2));

				} else {
				//	long f1 = System.nanoTime();
					int newPos = new BordaNew(clusters, p, lastClustering).getBestObject1();
				//	long f2= System.nanoTime();
					//System.out.println("create Borda object: "+(f2-f1));
					//System.out.println(newPos);
					clusters.get(newPos).getClusterPoints().add(p);
					//long f3=System.nanoTime();
					//System.out.println("best Borda object: "+(f3-f2));
					
					currentClustering[p.getId()] = newPos;
				}

				//long s2 = System.nanoTime(); 
				//System.out.println("bordatime:"+ (s2-s1));

			}

			// now go through all Clusters in order to recalculate the new
			// centroids
			ArrayList<Cluster> clustersNew = new ArrayList<Cluster>();

			for (Cluster c : clusters) {
				clustersNew.add(recalculateCentroid(c));
			}

			checkLoop = checkClusters(firstRound, clusters, clustersOld, 1);
			clustersOld.add(clusters);

			clusters = clustersNew;

			round++;
		}
		//System.out.println(":::Iteration i=" + (clustersOld.size()));
		//for (Cluster c : clustersOld.get(clustersOld.size() - 1)) {

			//String pointsString = "";
			//for (PointdDim p : c.getClusterPoints()) {
			//	pointsString += p.getId() + ",";
			//}
			//System.out.println(":::Punkte in Cluster " + c.getId() + " {" + pointsString + "}:::");
			// c.setClusterPoints(new HashSet<Point>());
	//	}
		long end2 = System.nanoTime();
		FinalClustering f = new FinalClustering();
		f.setStartTime(start1);
		f.setEndTime(end2);
		f.setIterations(round);
		f.setClustering(clustersOld);
		// System.out.println("Restliche Zeit: "+((end2-start2)/1000));
		return f;
	}

	/**
	 * function to recalculate the cluster centroids
	 * @param c
	 * @return
	 */
	private static Cluster recalculateCentroid(Cluster c) {
		Cluster newCluster = new Cluster();
		int length = c.getCenterOfGravity().getDim().length;
		float[] values = new float[length];
		int counter = 0;
		// String points = "(";
		for (PointdDim p1 : c.getClusterPoints()) {
			for (int i = 0; i < length; i++) {
				values[i] += p1.getDim()[i];
			}
			// points+= p1.getId()+",";

			counter++;

		}
		// points+=")";
		// String vals ="(";
		for (int j = 0; j < length; j++) {
			values[j] /= counter;
			// vals+= values[j]+",";
		}
		// vals+=")";

		newCluster.setCenterOfGravityOld(c.getCenterOfGravity());
		newCluster.setCenterOfGravity(new PointdDim());
		newCluster.getCenterOfGravity().setId(newCluster.getId());
		newCluster.getCenterOfGravity().setDim(values);
		newCluster.setId(c.getId());
		newCluster.setClusterPoints(new HashSet<PointdDim>());

		// System.out.println("Cluster "+ c.getId()+ "bestehend aus "+ points+ "neuer Centroid"+vals);

		return newCluster;

	}

	/**
	 * function to check if clusters are equals
	 * @param firstRound parameter for first round. check is skipped in first round
	 * @param clusters current set of clusters
	 * @param clustersOld	set of clusters from last iterartion
	 * @param lookBackInterval	interval to look back(not only last clustered set is investigated)
	 * @return true if sets are equals, else false
	 */
	static boolean checkClusters(boolean firstRound, ArrayList<Cluster> clusters,
			ArrayList<ArrayList<Cluster>> clustersOld, int lookBackInterval) {
		lookBackInterval = (int) (clustersOld.size() * 0.99) + 1;
		if (firstRound) {
			// System.out.println("Erste Runde");
			return false;
		} else {

			for (int j = 1; j <= clustersOld.size(); j++) {

				ArrayList<Cluster> clusterOldLast = clustersOld.get(clustersOld.size() - j);

				boolean equals = true;

				int counter = 0;

				for (Cluster c : clusters) {

					Set<PointdDim> currentClusterPoints = c.getClusterPoints();
					Set<PointdDim> oldClusterPoints = clusterOldLast.get(counter).getClusterPoints();

					if ((currentClusterPoints.equals(oldClusterPoints)) == false) {
						equals = false;
						break;
					}
					counter++;
				}
				if (equals) {
					return true;
				}
				if (lookBackInterval == 0) {
					break;
				}
				lookBackInterval--;
			}
			if (clustersOld.size() >= 300) {
				return true;
			}

		}
		return false;
	}

}
