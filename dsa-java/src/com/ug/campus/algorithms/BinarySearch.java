package com.ug.campus.algorithms;

import com.ug.campus.model.ServiceRequest;
import java.util.List;

public class BinarySearch {

    public static class SearchResult {
        public final ServiceRequest request;
        public final long comparisonSteps;
        public final boolean PreconditionSatisfied;

        public SearchResult(ServiceRequest request, long comparisonSteps, boolean PreconditionSatisfied) {
            this.request = request;
            this.comparisonSteps = comparisonSteps;
            this.PreconditionSatisfied = PreconditionSatisfied;
        }
    }

    public static boolean isSorted(List<ServiceRequest> requests) {
        if (requests == null || requests.size() <= 1) {
            return true;
        }
        for (int i = 0; i < requests.size() - 1; i++) {
            ServiceRequest curr = requests.get(i);
            ServiceRequest next = requests.get(i + 1);
            if (curr != null && next != null && curr.getId() != null && next.getId() != null) {
                if (curr.getId().compareToIgnoreCase(next.getId()) > 0) {
                    return false;
                }
            }
        }
        return true;
    }

    public static ServiceRequest search(List<ServiceRequest> sortedRequests, String targetId) {
        SearchResult result = searchWithSteps(sortedRequests, targetId);
        return result.request;
    }

    public static SearchResult searchWithSteps(List<ServiceRequest> requests, String targetId) {
        if (requests == null || targetId == null || requests.isEmpty()) {
            return new SearchResult(null, 0, true);
        }

        if (!isSorted(requests)) {
            return new SearchResult(null, 0, false);
        }

        int low = 0;
        int high = requests.size() - 1;
        long steps = 0;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            ServiceRequest midReq = requests.get(mid);
            steps++;

            if (midReq == null || midReq.getId() == null) {
                low = mid + 1;
                continue;
            }

            int cmp = midReq.getId().compareToIgnoreCase(targetId);
            if (cmp == 0) {
                return new SearchResult(midReq, steps, true);
            } else if (cmp < 0) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return new SearchResult(null, steps, true);
    }
}
