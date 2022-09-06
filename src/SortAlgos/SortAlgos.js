//driver for merge sort
export const mergeSort = (arr) => {
    const auxiliary = arr.slice();
    const animations = [];
    mergeSortHelper(arr, auxiliary, animations, 0, arr.length - 1);
    return animations;
}
export const mergeSortHelper = (arr, auxiliary, animations, left, right) => {
    if (left >= right) return;
    const middle = Math.floor((left + right) / 2);
    mergeSortHelper(arr, auxiliary, animations, left, middle);
    mergeSortHelper(arr, auxiliary, animations, middle + 1, right);
    mergeHalves(arr, auxiliary, animations, left, middle, right);
}
export const mergeHalves = (arr, auxiliary, animations, left, middle, right) => {
    for (let i = left; i <= right; i++) {
        auxiliary[i] = arr[i];
    }
    let leftIndex = left;
    let rightIndex = middle + 1;
    let currentIndex = left;
    while (leftIndex <= middle && rightIndex <= right) {
        animations.push([leftIndex, rightIndex]);
        animations.push([leftIndex, rightIndex]);
        if (auxiliary[leftIndex] <= auxiliary[rightIndex]) {
            animations.push([currentIndex, auxiliary[leftIndex]]);
            arr[currentIndex++] = auxiliary[leftIndex++];
        } else {
            animations.push([currentIndex, auxiliary[rightIndex]]);
            arr[currentIndex++] = auxiliary[rightIndex++];
        }
    }
    while (leftIndex <= middle) {
        animations.push([leftIndex, leftIndex]);
        animations.push([leftIndex, leftIndex]);
        animations.push([currentIndex, auxiliary[leftIndex]]);
        arr[currentIndex++] = auxiliary[leftIndex++];
    }
    while (rightIndex <= right) {
        animations.push([rightIndex, rightIndex]);
        animations.push([rightIndex, rightIndex]);
        animations.push([currentIndex, auxiliary[rightIndex]]);
        arr[currentIndex++] = auxiliary[rightIndex++];
    }
}

export const selectionSort = (arr) => {
    const animations = [];
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
            animations.push([minIndex, j]);
            animations.push([minIndex, j]);
        }
        if (minIndex !== i) {
            animations.push([arr[i], arr[minIndex]]);
            swap(arr, i, minIndex);
        }
        else {
            animations.push([arr[i], arr[i]]);
        }
    }
    return animations;
}

export const bubbleSort = (arr) => {
    const animations = [];
    for (let i = 0; i < arr.length; i++) {
        let j;
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
export const combSort = (arr) => {
    const animations = [];
    let gap = arr.length;
    let shrink = 1.3;
    let swapped = true;
    while (gap > 1 || swapped) {
        if (gap > 1) {
            gap = Math.floor(gap / shrink);
        }
        let i = 0;
        swapped = false;
        while (i + gap < arr.length) {
            if (arr[i] > arr[i + gap]) {
                animations.push([i, i + gap]);
                animations.push([arr[i], arr[i + gap]]);
                swap(arr, i, i + gap);
                swapped = true;
            }
            i++;
        }
    }
    return animations;
}


export const insertionSort = (arr) => {
    const animations = [];
    for (let i = 1; i < arr.length; i++) {
        let j = i;
        while (j > 0 && arr[j] < arr[j - 1]) {
            animations.push([j, j - 1]);
            animations.push([arr[j], arr[j - 1]]);
            swap(arr, j, j - 1);
            j--;
        }
    }
    return animations;
}
export const shellSort = (arr) => {
    const animations = [];
    let gap = Math.floor(arr.length / 2);
    while (gap > 0) {
        for (let i = gap; i < arr.length; i++) {
            let j = i;
            while (j >= gap && arr[j] < arr[j - gap]) {
                animations.push([j, j - gap]);
                animations.push([arr[j], arr[j - gap]]);
                swap(arr, j, j - gap);
                j -= gap;
            }
        }
        gap = Math.floor(gap / 2);
    }
    return animations;
}

//driver for quick sort
export const quickSort = (arr) => {
    const animations = [];
    quickSortHelper(arr, 0, arr.length - 1, animations);
    return animations;
}
export const quickSortHelper = (arr, left, right, animations) => {
    if (left >= right) return;
    const middle = Math.floor((left + right) / 2);
    const pivot = arr[middle];
    //pivot animation
    animations.push([middle, -1]);
    let leftIndex = left;
    let rightIndex = right;
    while (leftIndex <= rightIndex) {
        while (arr[leftIndex] < pivot) {
            leftIndex++;
        }
        while (arr[rightIndex] > pivot) {
            rightIndex--;
        }
        if (leftIndex <= rightIndex) {
            animations.push([leftIndex, rightIndex]);
            animations.push([arr[leftIndex], arr[rightIndex]]);
            swap(arr, leftIndex, rightIndex);
            leftIndex++;
            rightIndex--;
        }
    }
    quickSortHelper(arr, left, rightIndex, animations);
    quickSortHelper(arr, leftIndex, right, animations);
}

export const heapSort = (arr) => {
    const animations = [];
    heapSortHelper(arr, animations);
    return animations;
}
export const heapSortHelper = (arr, animations) => {
    const heapSize = arr.length;
    for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
        heapify(arr, heapSize, i, animations);
    }
    for (let i = heapSize - 1; i > 0; i--) {
        animations.push([0, i]);
        animations.push([arr[0], arr[i]]);
        swap(arr, 0, i);
        heapify(arr, i, 0, animations);
    }
}
export const heapify = (arr, heapSize, i, animations) => {
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let largest = i;
    if (left < heapSize && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < heapSize && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest !== i) {
        animations.push([i, largest]);
        animations.push([arr[i], arr[largest]]);
        swap(arr, i, largest);
        heapify(arr, heapSize, largest, animations);
    }
}

//swap function
export const swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/* export const mergeSort = (arr) => {
    const animations = [];
    if (arr.length <= 1) return arr;
    mergeSortHelper(arr, 0, arr.length - 1, animations);
    return animations;
}

export const mergeSortHelper = (arr, left, right, animations) => {
    if (left === right) return;
    const middle = Math.floor((left + right) / 2);
    mergeSortHelper(arr, left, middle, animations);
    mergeSortHelper(arr, middle + 1, right, animations);
    merge(arr, left, middle, right, animations);
}

export const merge = (arr, left, middle, right, animations) => {
    let leftArray = arr.slice(left, middle + 1);
    let rightArray = arr.slice(middle + 1, right + 1);
    let leftIndex = 0;
    let rightIndex = 0;
    let j = left;
    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
        if (leftArray[leftIndex] < rightArray[rightIndex]) {
            animations.push([j, leftArray[leftIndex]]);
            arr[j] = leftArray[leftIndex];
            leftIndex++;
        }
        else {
            animations.push([j, rightArray[rightIndex]]);
            arr[j] = rightArray[rightIndex];
            rightIndex++;
        }
        j++;
    }
    while (leftIndex < leftArray.length) {
        animations.push([j, leftArray[leftIndex]]);
        arr[j] = leftArray[leftIndex];
        leftIndex++;
        j++;
    }
    while (rightIndex < rightArray.length) {
        animations.push([j, rightArray[rightIndex]]);
        arr[j] = rightArray[rightIndex];
        rightIndex++;
        j++;
    }
}
 */
