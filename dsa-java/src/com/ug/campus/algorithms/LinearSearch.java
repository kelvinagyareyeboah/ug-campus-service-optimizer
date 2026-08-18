package com.ug.campus.algorithms;

import com.ug.campus.model.ServiceRequest;
import java.util.List;

public class LinearSearch {

    public static class SearchResult {
        public final ServiceRequest request;
        public final long comparisonSteps;

        public SearchResult(ServiceRequest request, long comparisonSteps) {
            this.request = request;
            this.comparisonSteps = comparisonSteps;
        }
    }

    public static ServiceRequest search(List<ServiceRequest> requests, String targetId) {
        SearchResult result = searchWithSteps(requests, targetId);
        return result.request;
    }

    public static SearchResult searchWithSteps(List<ServiceRequest> requests, String targetId) {
        if (requests == null || targetId == null) {
            return new SearchResult(null, 0);
        }

        long steps = 0;
        for (int i = 0; i < requests.size(); i++) {
            steps++;
            ServiceRequest req = requests.get(i);
            if (req != null && targetId.equalsIgnoreCase(req.getId())) {
                return new SearchResult(req, steps);
            }
        }
        return new SearchResult(null, steps);
    }
}
