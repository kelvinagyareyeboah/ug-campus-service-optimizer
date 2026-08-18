package com.ug.campus.algorithms;

import com.ug.campus.model.ServiceRequest;
import java.util.List;

public class InsertionSort {

    public static class SortStats {
        public final long comparisons;
        public final long shifts;

        public SortStats(long comparisons, long shifts) {
            this.comparisons = comparisons;
            this.shifts = shifts;
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
        long shifts = 0;

        for (int i = 1; i < n; i++) {
            ServiceRequest key = requests.get(i);
            String keyId = key != null ? key.getId() : "";
            int j = i - 1;

            while (j >= 0) {
                comparisons++;
                String prevId = requests.get(j) != null ? requests.get(j).getId() : "";
                if (prevId.compareToIgnoreCase(keyId) > 0) {
                    requests.set(j + 1, requests.get(j));
                    shifts++;
                    j--;
                } else {
                    break;
                }
            }
            requests.set(j + 1, key);
        }

        return new SortStats(comparisons, shifts);
    }
}
