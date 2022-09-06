import React from 'react';
import './SortVisualizer.css';
import * as SortAlgos from '../SortAlgos/SortAlgos';
const BAR_NUMBER = 200;

const ANIMATION_SPEED = 5;
/////NOTE LOOK AT COLORS (VAR NAMES AND ACTUAL)!!!!
//CLEAN UP CODE/FIX VAR NAMES!!!!
//EXPERIMENT WITH ANIMATIONS.POP() SELECTION SORT?
export default class SortVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            sorting: false,
            stop: false,
        }
    }

    componentDidMount() {
        this.resetArray();
    }

    render() {
        const { array } = this.state;
        let button_class = this.state.sorting ? "grayedButton" : "normalButton";

        return (
            <div className="array-container">
                <style>
                    {`
                    .grayedButton {
                        background-color: #ddd;
                        color: #999;
                    }
                    .normalButton {
                        background-color: #eee;
                        color: #66a;
                    }
                `}
                </style>
                {array.map((num, i) => (
                    <div className="array-bar" key={i} style={
                        { height: `${num}px` }
                    }>
                    </div >
                ))}
                <button onClick={() => { window.location.reload(false); }}>Reload</button>
                <button className={button_class} onClick={() => this.resetArray()}>Generate New Array</button>
                <button className={button_class} onClick={() => this.mergeSort()}>Merge Sort</button>
                <button className={button_class} onClick={() => this.selectionSort()}>Selection Sort</button>
                <button className={button_class} onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button className={button_class} onClick={() => this.combSort()}>Comb Sort</button>
                <button className={button_class} onClick={() => this.insertionSort()}>Insertion Sort</button>
                <button className={button_class} onClick={() => this.shellSort()}>Shell Sort</button>
                <button className={button_class} onClick={() => this.quickSort()}>Quick Sort</button>
                <button className={button_class} onClick={() => this.heapSort()}>Heap Sort</button>
            </div >
        );
    }

    resetArray() {
        if (this.state.sorting) return;
        const array = [];
        //Ensure that array is filled with numbers 1 through arraySize
        let i = 0;
        while (i < BAR_NUMBER) {
            let randNum = Math.floor(Math.random() * 2/*change*/ * (BAR_NUMBER) + 1);
            if (!array.includes(randNum)) {
                array.push(randNum);
                i++;
            }
        }
        this.setState({ array: array });
        this.fixColor();
    }

    mergeSort() {
        if (this.state.sorting) return;
        this.setState({ sorting: true, array: [...this.state.array] });
        const animations = SortAlgos.mergeSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            if (i % 3 !== 2) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                let color = 'red'
                if (i % 3 !== 0) {
                    color = 'rgb(68, 0, 194)';
                }
                setTimeout(() => {
                    this.switchColor(barOneStyle, barTwoStyle, color);
                }
                    , i * ANIMATION_SPEED);
            }
            else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED);
            }
        }
        setTimeout(() => {
            this.sortedColor();
        }, animations.length * ANIMATION_SPEED);
    }
    selectionSort() {
        if (this.state.sorting) return;
        this.setState({ sorting: true, array: [...this.state.array] });

        const animations = SortAlgos.selectionSort(this.state.array);
        let currIdx = 0, prevBarTwoIdx = -1;
        for (let i = 0; i < animations.length - 1; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            if (i % (2 * (this.state.array.length - 1) - currIdx) !== currIdx) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                prevBarTwoIdx = barOneIdx;
                let color = 'red';
                if ((i - currIdx) % 2 === 1) {
                    color = 'rgb(68, 0, 194)';
                }
                setTimeout(() => {
                    this.switchColor(barOneStyle, barTwoStyle, color);
                }, i * ANIMATION_SPEED);

            } else if (i !== 0) {
                const [barOneVal, barTwoVal] = animations[i];
                const barOneStyle = arrayBars[currIdx].style;
                const barTwoStyle = arrayBars[prevBarTwoIdx].style;
                currIdx += 1;
                let color = 'rgb(68, 0, 194)';
                setTimeout(() => {
                    this.switchColor(barOneStyle, barTwoStyle, color);
                    this.swapHeight(barOneStyle, barTwoStyle, barOneVal, barTwoVal);
                }, i * ANIMATION_SPEED);
            }
        }
        setTimeout(() => {
            this.sortedColor();
        }, animations.length * ANIMATION_SPEED);
    }

    bubbleSort() {
        if (this.state.sorting) return;
        this.setState({ sorting: true, array: [...this.state.array] });

        const animations = SortAlgos.bubbleSort(this.state.array);
        this.modTwoSort(animations);
    }
    combSort() {
        if (this.state.sorting) return;
        this.setState({ sorting: true, array: [...this.state.array] });

        const animations = SortAlgos.combSort(this.state.array);
        this.modTwoSort(animations);
    }
    insertionSort() {
        if (this.state.sorting) return;
        this.setState({ sorting: true, array: [...this.state.array] });

        const animations = SortAlgos.insertionSort(this.state.array);
        this.modTwoSort(animations);
    }
    shellSort() {
        if (this.state.sorting) return;
        this.setState({ sorting: true, array: [...this.state.array] });

        const animations = SortAlgos.shellSort(this.state.array);
        this.modTwoSort(animations);
    }


    heapSort() {
        if (this.state.sorting) return;
        this.setState({ sorting: true, array: [...this.state.array] });

        const animations = SortAlgos.heapSort(this.state.array);
        this.modTwoSort(animations);
    }

    quickSort() {
        if (this.state.sorting) return;
        this.setState({ sorting: true, array: [...this.state.array] });

        const animations = SortAlgos.quickSort(this.state.array);
        let prevBarOneIdx = -1, prevBarTwoIdx = -1, prevPivotIdx = -1, countPivots = 0;
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneVal, barTwoVal] = animations[i];
            // If pivot changes, change color of previous pivot and new pivot
            if (barTwoVal === -1) {
                const barOneStyle = arrayBars[barOneVal].style;
                let barTwoStyle = arrayBars[barOneVal].style;
                if (prevPivotIdx !== -1) {
                    barTwoStyle = arrayBars[prevPivotIdx].style;
                }
                prevPivotIdx = barOneVal;
                countPivots += 1;
                //rgb for dark yellow
                let color = 'rgb(90, 180, 250)';
                if (prevPivotIdx !== -1) {
                    barTwoStyle.backgroundColor = '(68, 0, 194)';
                }

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                }
                    , i * ANIMATION_SPEED);
            }
            else {
                if ((i + countPivots) % 2 === 0) {
                    const barOneStyle = arrayBars[barOneVal].style;
                    const barTwoStyle = arrayBars[barTwoVal].style;

                    let color = 'red';
                    prevBarOneIdx = barTwoVal;
                    prevBarTwoIdx = barOneVal;

                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }
                        , i * ANIMATION_SPEED);
                }
                else {
                    const barOneStyle = arrayBars[prevBarTwoIdx].style;
                    const barTwoStyle = arrayBars[prevBarOneIdx].style;
                    let color = 'rgb(68, 0, 194)';
                    setTimeout(() => {
                        this.switchColor(barOneStyle, barTwoStyle, color);
                        this.swapHeight(barOneStyle, barTwoStyle, barOneVal, barTwoVal);
                    }
                        , i * ANIMATION_SPEED);
                }
            }
        }
        setTimeout(() => {
            this.sortedColor();
        }
            , animations.length * ANIMATION_SPEED);
    }


    //Change to keep loop in the function calling this one
    modTwoSort(animations) {
        let prevBarOneIdx = -1, prevBarTwoIdx = -1;
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneVal, barTwoVal] = animations[i];
            if (i % 2 === 0) {
                const barOneStyle = arrayBars[barOneVal].style;
                const barTwoStyle = arrayBars[barTwoVal].style;

                let color = 'red';
                prevBarOneIdx = barTwoVal;
                prevBarTwoIdx = barOneVal;

                setTimeout(() => {
                    this.switchColor(barOneStyle, barTwoStyle, color);
                }
                    , i * ANIMATION_SPEED);
            }
            else {
                const barOneStyle = arrayBars[prevBarTwoIdx].style;
                const barTwoStyle = arrayBars[prevBarOneIdx].style;
                let color = 'rgb(68, 0, 194)';
                setTimeout(() => {
                    this.switchColor(barOneStyle, barTwoStyle, color);
                    this.swapHeight(barOneStyle, barTwoStyle, barOneVal, barTwoVal);
                }
                    , i * ANIMATION_SPEED);
            }
        }
        setTimeout(() => {
            this.sortedColor();
        }
            , animations.length * ANIMATION_SPEED);
    }



    switchColor(barOneStyle, barTwoStyle, color) {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
    }
    swapHeight(barOneStyle, barTwoStyle, barOneVal, barTwoVal) {

        barOneStyle.height = `${barTwoVal}px`;
        barTwoStyle.height = `${barOneVal}px`;
    }
    //remove later
    checkSorted(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }

    //change color of bars to green when sorted
    sortedColor() {
        for (let i = 0; i < this.state.array.length; i++) {
            setTimeout(() => {
                const arrayBars = document.getElementsByClassName('array-bar');
                arrayBars[i].style.backgroundColor = 'rgb(90, 220, 190)';

            }, i * ANIMATION_SPEED);
        }
        setTimeout(() => {
            this.setState({ sorting: false });
        }, this.state.array.length * ANIMATION_SPEED);
    }
    //revert color of bars to default
    fixColor() {
        for (let i = 0; i < this.state.array.length; i++) {
            setTimeout(() => {
                const arrayBars = document.getElementsByClassName('array-bar');
                arrayBars[i].style.backgroundColor = 'rgb(68, 0, 194)';
            }, i / Infinity);
        }
    }
}
