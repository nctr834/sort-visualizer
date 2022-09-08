/* This file contains the implementation of various sorting algorithms.
Within each sorting algorithm, an animations array is created to store
the indices and values of the array that are being compared, swapped, or
overwritten. When the animations array is returned, it is used to animate
the sorting process by modifying the array bars' heights and colors accordingly. */

/*  Selection sort sorts an array by repeatedly:
        finding the smallest element (from i+1 to arr.length-1)
        and putting it at i. */
export const selectionSort = (arr) => {
    const animations = [];
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        // Find the smallest element in the array
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
            // When indices are pushed, it is to change color of the relevant bars.
            animations.push([minIndex, j]);
            animations.push([minIndex, j]);
        }
        // Swap the smallest element with i if minIndex != i
        if (minIndex !== i) {
            // When values are pushed, it is to swap (or just change) the heights of the relevant bars.
            animations.push([arr[i], arr[minIndex]]);
            swap(arr, i, minIndex);
        }
        else {
            animations.push([arr[i], arr[i]]);
        }
    }
    return animations;
}

/*  Bubble sort sorts an array by repeatedly:
        swapping arr[j] & arr[j+1] until j reaches arr.length - i - 1. */
export const bubbleSort = (arr) => {
    const animations = [];
    for (let i = 0; i < arr.length; i++) {
        let j;
        // When arr[j] > arr[j+1], swap them
        for (j = 0; j < arr.length - i - 1; j++) {
            animations.push([j + 1, j]);
            animations.push([Math.min(arr[j], arr[j + 1]), Math.max(arr[j], arr[j + 1])]);
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
    return animations;
}

/*  Insertion sort sorts an array by repeatedly putting arr[j] in front of the value smaller than it in the
    range 0 to i. 0 to i is always sorted as a result; once i reaches arr.length-1, the array is sorted. */
export const insertionSort = (arr) => {
    const animations = [];
    for (let i = 1; i < arr.length; i++) {
        let j = i;
        // Swap arr[j] with the value smaller than it (arr[j-1])
        while (j > 0 && arr[j] < arr[j - 1]) {
            animations.push([j, j - 1]);
            animations.push([arr[j], arr[j - 1]]);
            swap(arr, j, j - 1);
            j--;
        }
    }
    return animations;
}
/* Shell sort sorts an array by repeatedly:
        sorting subarrays of arr with a gap of Math.floor(arr.length / 2).
    This algorithm is an improvement of insertion sort (it also swaps elements that have a long distance
    (index-wise)) since it sorts subarrays instead of the whole array (as partially sorted arrays are sorted faster
     than O(n^2)). */
export const shellSort = (arr) => {
    const animations = [];
    let gap = Math.floor(arr.length / 2);
    while (gap > 0) {
        for (let i = gap; i < arr.length; i++) {
            let j = i;
            // Swap arr[j] with the value smaller than it (arr[j-gap])
            while (j >= gap && arr[j] < arr[j - gap]) {
                animations.push([j, j - gap]);
                animations.push([arr[j], arr[j - gap]]);
                swap(arr, j, j - gap);
                j -= gap;
            }
        }
        // Reduce the gap (by half)
        gap = Math.floor(gap / 2);
    }
    return animations;
}

/* Merge sort sorts an array by repeatedly:
        dividing the array into two halves,
        sorting the two halves,
        and merging the two halves. */
export const mergeSort = (arr) => {
    const auxiliary = arr.slice();
    const animations = [];
    mergeSortHelper(arr, auxiliary, animations, 0, arr.length - 1);
    return animations;
}
export const mergeSortHelper = (arr, auxiliary, animations, left, right) => {
    if (left === right) return;
    const middle = Math.floor((left + right) / 2);
    // Sort the left half
    mergeSortHelper(arr, auxiliary, animations, left, middle);
    // Sort the right half
    mergeSortHelper(arr, auxiliary, animations, middle + 1, right);
    mergeHalves(arr, auxiliary, animations, left, middle, right);
}
export const mergeHalves = (arr, auxiliary, animations, left, middle, right) => {
    // Copy the array to auxiliary
    for (let i = left; i <= right; i++) {
        auxiliary[i] = arr[i];
    }
    let leftIndex = left;
    let rightIndex = middle + 1;
    let currentIndex = left;
    while (leftIndex <= middle && rightIndex <= right) {
        animations.push([leftIndex, rightIndex]);
        animations.push([leftIndex, rightIndex]);
        // If the left value is smaller, push assign it to arr[currentIndex],
        // otherwise assign the right value to arr[currentIndex]
        if (auxiliary[leftIndex] <= auxiliary[rightIndex]) {
            animations.push([currentIndex, auxiliary[leftIndex]]);
            arr[currentIndex++] = auxiliary[leftIndex++];
        } else {
            animations.push([currentIndex, auxiliary[rightIndex]]);
            arr[currentIndex++] = auxiliary[rightIndex++];
        }
    }
    // If there are still values in the left half, push them to arr[currentIndex]
    while (leftIndex <= middle) {
        animations.push([leftIndex, leftIndex]);
        animations.push([leftIndex, leftIndex]);
        animations.push([currentIndex, auxiliary[leftIndex]]);
        arr[currentIndex++] = auxiliary[leftIndex++];
    }
    // If there are still values in the right half, push them to arr[currentIndex]
    while (rightIndex <= right) {
        animations.push([rightIndex, rightIndex]);
        animations.push([rightIndex, rightIndex]);
        animations.push([currentIndex, auxiliary[rightIndex]]);
        arr[currentIndex++] = auxiliary[rightIndex++];
    }
}

/*  Quick sort sorts an array by repeatedly:
        setting a pivot (Math.floor((left + right) / 2)),
        putting all values smaller than the pivot value to the left of it,
        putting all values larger than the pivot value to the right of it,
        and sorting the left and right halves. */
export const quickSort = (arr) => {
    const animations = [];
    quickSortHelper(arr, 0, arr.length - 1, animations);
    return animations;
}
export const quickSortHelper = (arr, left, right, animations) => {
    if (left >= right) return;
    const middle = Math.floor((left + right) / 2);
    const pivot = arr[middle];
    // pivot animation
    animations.push([middle, -1]);
    let leftIndex = left;
    let rightIndex = right;
    while (leftIndex <= rightIndex) {
        // Find the first value that is larger than the pivot value
        while (arr[leftIndex] < pivot) {
            leftIndex++;
        }
        // Find the first value that is smaller than the pivot value
        while (arr[rightIndex] > pivot) {
            rightIndex--;
        }
        // Swap arr[leftIndex] and arr[rightIndex] if leftIndex <= rightIndex (larger value should be on the right)
        if (leftIndex <= rightIndex) {
            animations.push([leftIndex, rightIndex]);
            animations.push([arr[leftIndex], arr[rightIndex]]);
            swap(arr, leftIndex, rightIndex);
            leftIndex++;
            rightIndex--;
        }
    }
    // Sort the left and right halves
    quickSortHelper(arr, left, rightIndex, animations);
    quickSortHelper(arr, leftIndex, right, animations);
}

/*  Heap sort sorts an array by repeatedly:
        building a max heap,
        swapping the first and last values,
        and reducing the heap size by 1. */
export const heapSort = (arr) => {
    const animations = [];
    heapSortHelper(arr, animations);
    return animations;
}
export const heapSortHelper = (arr, animations) => {
    const heapSize = arr.length;
    // Build the max heap
    for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
        heapify(arr, heapSize, i, animations);
    }
    // Swap the first and last values, and reduce the heap size by 1
    for (let i = heapSize - 1; i > 0; i--) {
        animations.push([0, i]);
        animations.push([arr[0], arr[i]]);
        swap(arr, 0, i);
        heapify(arr, i, 0, animations);
    }
}
// Heapify the subtree (which is rooted at index i)
export const heapify = (arr, heapSize, i, animations) => {
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let largest = i;
    // If the left child is larger than the parent, set the largest to the left child
    if (left < heapSize && arr[left] > arr[largest]) {
        largest = left;
    }
    // If the right child is larger than the parent, set the largest to the right child
    if (right < heapSize && arr[right] > arr[largest]) {
        largest = right;
    }
    // If the largest isn't the parent, swap the parent and largest then heapify the subtree
    if (largest !== i) {
        animations.push([i, largest]);
        animations.push([arr[i], arr[largest]]);
        swap(arr, i, largest);
        heapify(arr, heapSize, largest, animations);
    }
}

/*  Counting sort sorts an array by counting the number of times each value appears,
        and then placing the values in the correct position (determined by the count). */
export const countingSort = (arr) => {
    const animations = [];
    // Find the max value in the array
    const max = Math.max.apply(null, arr);
    // Find the min value in the array
    const min = Math.min.apply(null, arr);
    // Create an array of length max - min + 1, and fill it with 0s
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    // Count the number of times each value - min appears in the array
    for (let i = 0; i < arr.length; i++) {
        animations.push([i, i]);
        animations.push([arr[i], arr[i]]);
        count[arr[i] - min]++;
    }
    // Add the previous count to the current count for each index
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }
    // Create a new array to store the sorted values
    const output = new Array(arr.length);
    // Place the values in the correct position
    for (let i = arr.length - 1; i >= 0; i--) {
        // Find the index of the value in the count array
        output[count[arr[i] - min] - 1] = arr[i];
        // Decrement the count for the value by 1 since the value has been placed in the output array.
        // The next value with the same value will be placed in the next index
        count[arr[i] - min]--;
    }
    // Copy the values from the output array to the original array
    for (let i = 0; i < arr.length; i++) {
        animations.push([i, i]);
        animations.push([output[i], output[i]]);
        arr[i] = output[i];
    }
    return animations;
}

//swap function for swapping values in an array
export const swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
