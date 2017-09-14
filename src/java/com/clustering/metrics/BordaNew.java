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
public class BordaNew {

	private PointdDim p1;
	private ArrayList<Cluster> clusters;
	private int lastCluster;

	public int getLastCluster() {
		return lastCluster;
	}

	public void setLastCluster(int lastCluster) {
		this.lastCluster = lastCluster;
	}

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

	public BordaNew(ArrayList<Cluster> clusters, PointdDim p1, int lastCluster) {
		this.clusters = clusters;
		this.p1 = p1;
		this.lastCluster= lastCluster;
	}

	public int getBestObject() {

		//int[] bordaValues = new int[clusters.size()];
		ArrayList<BordaObject> finalSet = new ArrayList<BordaObject>();
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
				
				if(i==0){
					BordaObject o1 = new BordaObject();
					o1.setId(c.getId());
					o1.setValue(0);
					finalSet.add(o);
				}

			}
			long s1= System.nanoTime();
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
			long s2=System.nanoTime();
			System.out.println("Sort1: "+(s2-s1));
			int j = 1;
			//System.out.println();
			//System.out.println("Values");
			for (BordaObject obj : set) {

				int val = set.size() - j;
				int oldVal = (int) finalSet.get(obj.getId()).getValue();
				finalSet.get(obj.getId()).setValue(oldVal+val);
				//bordaValues[obj.getId()] += val;
				//System.out.print("ID:"+obj.getId()+" Va:"+val+"; ");
				j++;
			}
			//System.out.println();
			
			sets.add(set);

		}
		long s3=System.nanoTime();
		Collections.sort(finalSet, new Comparator<BordaObject>() {
			@Override
			public int compare(BordaObject o1, BordaObject o2) {

				if (o1.getValue() > ((BordaObject) o2).getValue()) {
					return -1;
				} else if (o1.getValue() <= ((BordaObject) o2).getValue()) {
					return 1;
				}
				return 0;
			}
		});
		long s4=System.nanoTime();
		System.out.println("Sort2: "+(s4-s3));
		
		int counter= 1;
		int bestPos = Integer.MAX_VALUE;
		//int posValue = 0;
		int[] bestPosId= new int[finalSet.size()];
		
		//look out if there is only one maximum
		if(finalSet.get(0).getValue()>finalSet.get(1).getValue()){
			bestPos=finalSet.get(0).getId();
		return bestPos;
		}else{
			while(finalSet.get(counter).getValue()==finalSet.get(0).getValue()){
				bestPosId[counter]=finalSet.get(counter).getId();
				counter++;
				if(counter>= finalSet.size()){
					break;
				}
			}
			bestPosId[0]=finalSet.get(0).getId();
		}
		
		
		for(int a=0;a< bestPosId.length;a++){
			if(bestPosId[a]==this.getLastCluster()){
				bestPos=bestPosId[a];
				break;
			}
	
			
		}
		
		if(bestPos == Integer.MAX_VALUE){
			bestPos=finalSet.get(0).getId(); 
		}
		
		
		
		//System.out.println("Beste Position: "+bestPos);
		//System.out.println();


		return bestPos;

	}
	
	
	public int getBestObject1() {

		ArrayList<BordaObject> finalSet = new ArrayList<BordaObject>();
		
		//System.out.println("Betrachte Punkt "+ this.p1.getId()+" "+Arrays.toString(this.p1.getDim()));
		//go through all dimensions(Voters)
		for (int i = 0; i < this.p1.getDim().length; i++) {
			//create a set in order to save the distances between one dimension of a point and the same dimension of the clusters
			BordaObject[] set = new BordaObject[this.clusters.size()];
		//	long c1= System.nanoTime();
			
			
			for (int k=0; k<this.clusters.size();k++) {
				if(k==this.clusters.size()){
					break;
				}
				//calculate the distances 
				float dist = Math.abs(this.p1.getDim()[i] - this.clusters.get(k).getCenterOfGravity().getDim()[i]);
				//System.out.print("D(P"+i +",C"+c.getId() +")="+newDistances[i]+"; ");
				
				//save them in a borda object
				BordaObject o = new BordaObject();
				o.setId(this.clusters.get(k).getId());
				o.setValue(dist);
				
				//in the first iteration of the dimensions create the List in order to sum up the final borda values for the borda-Winner
				if(i==0){
					BordaObject o1 = new BordaObject();
					o1.setId(this.clusters.get(k).getId());
					o1.setValue(0);
					finalSet.add(o1);
				}
					//add the distance to the set at the current last position
					set[k]=o;
					BordaObject temp;
					
					//use insertion sort in order to put the current object to the right position according to the distances ascending 
					int it=k+1;
					for(int j = k ; j >= 0 ; j--){
						
						if(j>0){
						if(o.getValue() < set[j-1].getValue() ){
		                    temp = o;
		                    set[j] = set[j-1];
		                    set[j-1] = temp;
		                  
		                }}
		                
						//while inserting and sorting the last object, allocate the votings fro m the back to the front of the list
		                if(k==this.clusters.size()-1){
		                	int val = set.length - it;
	        				int id=set[j].getId();
	        				BordaObject idToFetch= finalSet.get(id);
	        				int oldVal = (int) idToFetch.getValue();
	        				finalSet.get(id).setValue(oldVal+val);
	        				it--;
	        				
	                    }
		            }
				
			}
			
		//	long s2=System.nanoTime();
		//	System.out.println("Sort1: "+(s2-c1));
			//System.out.println();
			//System.out.println("Values");
			

		}
		//long s3=System.nanoTime();
		//after all dimensions got calculated, sort the finalset with the summed up values with insertion sort
		BordaObject tmp1;
		for (int i1 = 1; i1 < finalSet.size(); i1++) {
            for(int j1 = i1 ; j1 > 0 ; j1--){
                if(finalSet.get(j1).getValue() > finalSet.get(j1-1).getValue()){
                    tmp1 = finalSet.get(j1);
                    finalSet.set(j1, finalSet.get(j1-1));
                    finalSet.set((j1-1), tmp1);
                }
            }
        }
		//long s4=System.nanoTime();
		//System.out.println("Sort2: "+(s4-s3));
		
		//long f1= System.nanoTime();
		int counter= 1;
		int bestPos = Integer.MAX_VALUE;
		//look out if there is only one maximum
		if(finalSet.get(0).getValue()>finalSet.get(1).getValue()){
			bestPos=finalSet.get(0).getId();
		//	long f3= System.nanoTime();
		//	System.out.println("Best Object: "+ (f3-f1));
			//System.out.println("Bestpos nur eine: "+bestPos);
		return bestPos;
		}else{
			//if there is more than one maximum
			while(finalSet.get(counter).getValue()==finalSet.get(0).getValue()){
				// check if the cluster from last iteration is represented in the set of the bordawinners
				if(finalSet.get(counter).getId()==this.getLastCluster()){
					bestPos=finalSet.get(counter).getId();
					//System.out.println("Bestpos gefunden letzte iteration: "+bestPos);
					return bestPos;
				}counter++;
				//if all cluster are bordawinners pick out one by random
				if(counter>= finalSet.size()){
					bestPos=finalSet.get(0).getId(); 
				//	System.out.println("Bestpos random 1: "+bestPos);
					return bestPos;
				}
			}
			}
		
		// if no cluster from last iteration is represented pick out the cluster id of the borda winners by random
		if(bestPos == Integer.MAX_VALUE){
			bestPos=finalSet.get(0).getId(); 
		}
	//	long f2= System.nanoTime();
		//System.out.println("Best Object: "+ (f2-f1));
		
		//System.out.println("Beste Position: "+bestPos);
		//System.out.println();


		return bestPos;

	}
	
	public static void main(String[] args){
	
		ArrayList<Cluster> clusters = new ArrayList<Cluster>();
		
		Cluster e2 = new Cluster();
		e2.setId(0);
		
		PointdDim cog3 =new PointdDim();
		cog3.setId(2);
		float[] dim2 = new float[3];
		dim2[0]=13.56f;
		dim2[1]=4.5f;
		dim2[2]=8.9f;
		cog3.setDim(dim2);
		e2.setCenterOfGravity(cog3);
		clusters.add(e2);
		
		Cluster e1 = new Cluster();
		e1.setId(1);
		
		PointdDim cog2 =new PointdDim();
		cog2.setId(1);
		float[] dim1 = new float[3];
		dim1[0]=9.56f;
		dim1[1]=5.5f;
		dim1[2]=12.9f;
		cog2.setDim(dim1);
		e1.setCenterOfGravity(cog2);
		clusters.add(e1);
		
		
		Cluster e = new Cluster();
		e.setId(2);
		
		PointdDim cog1 =new PointdDim();
		cog1.setId(0);
		float[] dim = new float[3];
		dim[0]=2.56f;
		dim[1]=7.5f;
		dim[2]=1.9f;
		cog1.setDim(dim);
		e.setCenterOfGravity(cog1);
		clusters.add(e);
		
		
		
		
		
		PointdDim p1 =new PointdDim();
		p1.setId(0);
		float[] dim3 = new float[3];
		dim3[0]=1.56f;
		dim3[1]=5.5f;
		dim3[2]=9.9f;
		p1.setDim(dim3);
		
		
		BordaNew b = new BordaNew(clusters, p1, 1);
		System.out.println(b.getBestObject1());
	}
	
	
	

}
