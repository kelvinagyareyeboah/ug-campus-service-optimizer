package com.ug.campus.algorithms;

import com.ug.campus.model.ServiceRequest;
import java.util.List;

public class QuickSort {

    public static void sort(List<ServiceRequest> requests) {
        if (requests == null || requests.size() <= 1) {
            return;
        }
        quickSort(requests, 0, requests.size() - 1);
    }

    private static void quickSort(List<ServiceRequest> requests, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(requests, low, high);
            quickSort(requests, low, pivotIndex - 1);
            quickSort(requests, pivotIndex + 1, high);
        }
    }

    private static int partition(List<ServiceRequest> requests, int low, int high) {
        ServiceRequest pivot = requests.get(high);
        String pivotId = pivot != null ? pivot.getId() : "";
        int i = low - 1;

        for (int j = low; j < high; j++) {
            String currentId = requests.get(j) != null ? requests.get(j).getId() : "";
            if (currentId.compareToIgnoreCase(pivotId) <= 0) {
                i++;
                ServiceRequest temp = requests.get(i);
                requests.set(i, requests.get(j));
                requests.set(j, temp);
            }
        }

        ServiceRequest temp = requests.get(i + 1);
        requests.set(i + 1, requests.get(high));
        requests.set(high, temp);

        return i + 1;
    }
}
