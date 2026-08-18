package com.ug.campus.algorithms;

import com.ug.campus.model.ServiceRequest;
import java.util.List;

public class SelectionSort {

    public static class SortStats {
        public final long comparisons;
        public final long swaps;

        public SortStats(long comparisons, long swaps) {
            this.comparisons = comparisons;
            this.swaps = swaps;
        }
    }

    public static void sort(List<ServiceRequest> requests) {
        sortWithStats(requests);
    }

    public static SortStats sortWithStats(List<ServiceRequest> requests) {
        if (requests == null || requests.size() <= 1) {
            return new SortStats(0, 0);
        }

        int n = requests.size();
        long comparisons = 0;
        long swaps = 0;

        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                comparisons++;
                String idJ = requests.get(j) != null ? requests.get(j).getId() : "";
                String idMin = requests.get(minIdx) != null ? requests.get(minIdx).getId() : "";

                if (idJ.compareToIgnoreCase(idMin) < 0) {
                    minIdx = j;
                }
            }

            if (minIdx != i) {
                ServiceRequest temp = requests.get(i);
                requests.set(i, requests.get(minIdx));
                requests.set(minIdx, temp);
                swaps++;
            }
        }

        return new SortStats(comparisons, swaps);
    }
}
