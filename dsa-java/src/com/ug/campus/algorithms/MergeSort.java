package com.ug.campus.algorithms;

import com.ug.campus.model.ServiceRequest;
import java.util.ArrayList;
import java.util.List;

public class MergeSort {

    public static void sort(List<ServiceRequest> requests) {
        if (requests == null || requests.size() <= 1) {
            return;
        }
        mergeSort(requests, 0, requests.size() - 1);
    }

    private static void mergeSort(List<ServiceRequest> requests, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(requests, left, mid);
            mergeSort(requests, mid + 1, right);
            merge(requests, left, mid, right);
        }
    }

    private static void merge(List<ServiceRequest> requests, int left, int mid, int right) {
        List<ServiceRequest> leftList = new ArrayList<>(requests.subList(left, mid + 1));
        List<ServiceRequest> rightList = new ArrayList<>(requests.subList(mid + 1, right + 1));

        int i = 0, j = 0, k = left;

        while (i < leftList.size() && j < rightList.size()) {
            String idL = leftList.get(i) != null ? leftList.get(i).getId() : "";
            String idR = rightList.get(j) != null ? rightList.get(j).getId() : "";

            if (idL.compareToIgnoreCase(idR) <= 0) {
                requests.set(k++, leftList.get(i++));
            } else {
                requests.set(k++, rightList.get(j++));
            }
        }

        while (i < leftList.size()) {
            requests.set(k++, leftList.get(i++));
        }

        while (j < rightList.size()) {
            requests.set(k++, rightList.get(j++));
        }
    }
}
