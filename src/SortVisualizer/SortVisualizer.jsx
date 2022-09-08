import React from 'react';
import './SortVisualizer.css';
import * as SortAlgos from '../SortAlgos/sortingAlgos';

let BAR_NUMBER = Math.floor(window.innerWidth / 6);
let BAR_NUMBER_MAX = BAR_NUMBER * 3;
let ANIMATION_SPEED = 400 / BAR_NUMBER;
let ANIMATION_MULTIPLIER = 1;
let ALG_NAME = 'Not Selected';
let ALG_TC = 'N/A';
let ALG_SC = 'N/A';
let FAST_MODE = 'Inactive';
let SLOW_MODE = 'Inactive';

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
        document.title = "Sort Visualizer"
        this.resetArray();
    }

    render() {
        window.addEventListener('resize'
            , () => {
                BAR_NUMBER = Math.floor(window.innerWidth / 6);
                BAR_NUMBER_MAX = BAR_NUMBER * 3;
                ANIMATION_SPEED = 400 / BAR_NUMBER;
                // eslint-disable-next-line
                this.state.array = [];
                this.resetArray();
            });
        const { array } = this.state;
        let button_class = this.state.sorting ? "grayedButton" : "normalButton";
        let new_array_button = this.state.sorting ? "grayedButton" : "new";
        let speed_button = this.state.sorting ? "grayedButton" : "other";
        let slider = this.state.sorting ? "grayedSlider" : "normalSlider";
        return (
            <div className="full">
                <div className="buttons">
                    <button onClick={() => { window.location.reload(false); }}>Reload</button>
                    <div className={speed_button}>
                        <style>
                            {`
                            .new {
                                background-color: #EEE;
                            }
                            .other{ background-color:#DDD;}
                            `}
                        </style>
                        <button className={new_array_button} onClick={() => { if (this.state.sorting) { return; } FAST_MODE = 'Inactive'; SLOW_MODE = 'Inactive'; this.resetArray() }}>New Array</button>
                        <button className={speed_button} onClick={() => { if (this.state.sorting) { return; } SLOW_MODE = 'Active'; FAST_MODE = 'Inactive'; ANIMATION_SPEED = 150; this.resetArray() }}>Slow Mode</button>
                        <button className={speed_button} onClick={() => { if (this.state.sorting) { return; } FAST_MODE = 'Active'; SLOW_MODE = 'Inactive'; ANIMATION_SPEED = .5; this.resetArray() }}>Fast Mode</button>

                    </div>
                    <button className={button_class} onClick={() => { ALG_NAME = 'Selection Sort'; ALG_TC = 'O(n^2)'; ALG_SC = 'O(1)'; ANIMATION_MULTIPLIER = 1; this.selectionSort(); }}>Selection</button>
                    <button className={button_class} onClick={() => { ALG_NAME = 'Bubble Sort'; ALG_TC = 'O(n^2)'; ALG_SC = 'O(1)'; ANIMATION_MULTIPLIER = 1; this.bubbleSort() }}>Bubble</button>
                    <button className={button_class} onClick={() => { ALG_NAME = 'Insertion Sort'; ALG_TC = 'O(n^2)'; ALG_SC = 'O(1)'; ANIMATION_MULTIPLIER = 1; this.insertionSort() }}>Insertion</button>
                    <button className={button_class} onClick={() => { ALG_NAME = 'Shell Sort'; ALG_TC = 'O(n*(log(n))^2)'; ALG_SC = 'O(1)'; ANIMATION_MULTIPLIER = .33; this.shellSort() }}>Shell</button>
                    <button className={button_class} onClick={() => { ALG_NAME = 'Merge Sort'; ALG_TC = 'O(n*log(n))'; ALG_SC = 'O(n)'; ANIMATION_MULTIPLIER = 1; this.mergeSort(); }}>Merge</button>
                    <button className={button_class} onClick={() => { ALG_NAME = 'Quick Sort'; ALG_TC = 'O(n*log(n))'; ALG_SC = 'O(log(n))'; ANIMATION_MULTIPLIER = .33; this.quickSort() }}>Quick</button>
                    <button className={button_class} onClick={() => { ALG_NAME = 'Heap Sort'; ALG_TC = 'O(n*log(n))'; ALG_SC = 'O(1)'; ANIMATION_MULTIPLIER = .33; this.heapSort() }}>Heap</button>
                    <button className={button_class} onClick={() => { ALG_NAME = 'Counting Sort'; ALG_TC = 'O(n + range)'; ALG_SC = 'O(range)'; ANIMATION_MULTIPLIER = .33; this.countingSort() }}>Counting</button>

                    <style>
                        {`
                            .grayedButton {
                                background-color: #EEE;
                            color: #AAA;
                    }
                            .normalButton {
                                background-color: #CCC;
                            color: #230;
                    }
                            .grayedSlider {
                                background-color: #DDD;
                    }
                `}</style>

                </div >
                <div className="slider">
                    <h3>Size & Speed Slider<br></br>Array Size: {BAR_NUMBER}</h3>
                    <input
                        type="range"
                        min="10"
                        max={(window.innerWidth / 3)}
                        value={BAR_NUMBER}
                        className={slider}
                        onChange={(e) => {
                            if (this.state.sorting) return;

                            BAR_NUMBER = e.target.value;
                            BAR_NUMBER_MAX = BAR_NUMBER * 3;
                            ANIMATION_SPEED = 400 / BAR_NUMBER;
                            if (FAST_MODE === 'Active') {
                                ANIMATION_SPEED = .5;
                            }
                            if (SLOW_MODE === 'Active') {
                                ANIMATION_SPEED = 150;
                            }
                            // eslint-disable-next-line
                            this.state.array = [];
                            this.resetArray();
                        }}
                    />
                    <div className="alg-info">
                        <div className="alg-info-analysis">
                            <p>Algorithm: {ALG_NAME}</p>
                            <p>Average Time Complexity: {ALG_TC}</p>
                            <p>Worst-Case Space Complexity: {ALG_SC}</p>
                            <p>Slow Mode: {SLOW_MODE}</p>
                            <p>Fast Mode: {FAST_MODE}</p>
                        </div>
                    </div>
                </div>
                <div className="array-container">
                    {
                        array.map((num, i) => (
                            <div className="array-bar"
                                key={i}
                                style={
                                    {
                                        height: `${num}px`,
                                        width: `${(window.innerWidth / 3 / BAR_NUMBER) * Math.floor(BAR_NUMBER_MAX / BAR_NUMBER) - 2}px`
                                    }
                                }>
                            </div >
                        ))
                    }
                </div >
            </div >
        );
    }

    resetArray() {
        if (this.state.sorting) return;
        const array = [];
        let i = 0;
        while (i < BAR_NUMBER) {
            let randNum = Math.floor(Math.random() * 2 * 100 + 1);
            if (!array.includes(randNum)) {
                array.push(randNum * 2);
                i++;
            }
        }
        ALG_NAME = 'Not Selected';
        ALG_TC = 'N/A';
        ALG_SC = 'N/A';
        this.setState({ array: array });
        this.fixColor();
    }

    bubbleSort() {
        if (this.state.sorting) return;
        this.setState({ sorting: true, array: [...this.state.array] });

        const animations = SortAlgos.bubbleSort(this.state.array);
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

    countingSort() {
        if (this.state.sorting) return;
        this.setState({ sorting: true, array: [...this.state.array] });

        const animations = SortAlgos.countingSort(this.state.array);
        this.modTwoSort(animations);
    }

    //change color of bars  when sorted
    sortedColor() {
        for (let i = 0; i < this.state.array.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            //light grey hex code #ddd
            arrayBars[i].style.backgroundColor = 'rgb(0,0,0,0.33)';
        }
        setTimeout(() => {
            this.setState({ sorting: false });
            this.fixColor();
        }, this.state.array.length * ANIMATION_SPEED / ANIMATION_MULTIPLIER);
    }

    //revert color of bars to default
    fixColor() {
        for (let i = 0; i < this.state.array.length; i++) {
            setTimeout(() => {
                const arrayBars = document.getElementsByClassName('array-bar');
                arrayBars[i].style.backgroundColor = 'rgb(90, 220, 190)';
            }, i / Infinity);
        }
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
                let color = '#DEE2FC';
                if (i % 3 !== 0) {
                    color = 'rgb(90, 220, 190)';
                }
                setTimeout(() => {
                    this.switchColor(barOneStyle, barTwoStyle, color);
                }
                    , i * ANIMATION_SPEED / ANIMATION_MULTIPLIER);
            }
            else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED / ANIMATION_MULTIPLIER);
            }
        }
        setTimeout(() => {
            this.sortedColor();
        }, animations.length * ANIMATION_SPEED / ANIMATION_MULTIPLIER);
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
                let color = '#DEE2FC';
                if ((i - currIdx) % 2 === 1) {
                    color = 'rgb(90, 220, 190)';
                }
                setTimeout(() => {
                    this.switchColor(barOneStyle, barTwoStyle, color);
                }, i * ANIMATION_SPEED / ANIMATION_MULTIPLIER);

            } else if (i !== 0) {
                const [barOneVal, barTwoVal] = animations[i];
                const barOneStyle = arrayBars[currIdx].style;
                const barTwoStyle = arrayBars[prevBarTwoIdx].style;
                currIdx += 1;
                let color = 'rgb(90, 220, 190)';
                setTimeout(() => {
                    this.switchColor(barOneStyle, barTwoStyle, color);
                    this.swapHeight(barOneStyle, barTwoStyle, barOneVal, barTwoVal);
                }, i * ANIMATION_SPEED / ANIMATION_MULTIPLIER);
            }
        }
        setTimeout(() => {
            this.sortedColor();
        }, animations.length * ANIMATION_SPEED / ANIMATION_MULTIPLIER);
    }



    quickSort() {
        if (this.state.sorting) return;
        this.setState({ sorting: true, array: [...this.state.array] });

        const animations = SortAlgos.quickSort(this.state.array);
        let prevBarOneIdx = -1, prevBarTwoIdx = -1, countPivots = 0;
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneVal, barTwoVal] = animations[i];
            // If pivot changes, change color of previous pivot and new pivot
            if (barTwoVal === -1) {
                const barOneStyle = arrayBars[barOneVal].style;
                countPivots += 1;
                let color = '#E05D5D';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                }
                    , i * ANIMATION_SPEED / ANIMATION_MULTIPLIER);
            }
            else {
                if ((i + countPivots) % 2 === 0) {
                    prevBarOneIdx = barTwoVal;
                    prevBarTwoIdx = barOneVal;
                    this.modTwoIsZero(arrayBars, barOneVal, barTwoVal, i);
                }
                else {
                    this.modTwoIsOne(arrayBars, barOneVal, barTwoVal, prevBarOneIdx, prevBarTwoIdx, i);
                }
            }
        }
        setTimeout(() => {
            this.sortedColor();
        }
            , animations.length * ANIMATION_SPEED / ANIMATION_MULTIPLIER);
    }
    /*  Used to change color of bars when i % 2 === 0, and swap heights
        of the bars when i % 2 === 1 (entire animations array). */
    modTwoSort(animations) {
        let prevBarOneIdx = -1, prevBarTwoIdx = -1;
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneVal, barTwoVal] = animations[i];
            if (i % 2 === 0) {
                prevBarOneIdx = barTwoVal;
                prevBarTwoIdx = barOneVal;
                this.modTwoIsZero(arrayBars, barOneVal, barTwoVal, i);
            }
            else {
                this.modTwoIsOne(arrayBars, barOneVal, barTwoVal, prevBarOneIdx, prevBarTwoIdx, i);
            }
        }
        setTimeout(() => {
            this.sortedColor();
        }
            , animations.length * ANIMATION_SPEED / ANIMATION_MULTIPLIER);
    }
    /*  Used to change color of bars when i % 2 === 0. */
    modTwoIsZero(arrayBars, barOneVal, barTwoVal, i) {
        const barOneStyle = arrayBars[barOneVal].style;
        const barTwoStyle = arrayBars[barTwoVal].style;
        let color = '#DEE2FC';

        setTimeout(() => {
            this.switchColor(barOneStyle, barTwoStyle, color);
        }
            , i * ANIMATION_SPEED / ANIMATION_MULTIPLIER);
    }
    /*  Used to swap heights of the bars when i % 2 === 1. */
    modTwoIsOne(arrayBars, barOneVal, barTwoVal, prevBarOneIdx, prevBarTwoIdx, i) {
        const barOneStyle = arrayBars[prevBarTwoIdx].style;
        const barTwoStyle = arrayBars[prevBarOneIdx].style;
        let color = 'rgb(90, 220, 190)';

        setTimeout(() => {
            this.switchColor(barOneStyle, barTwoStyle, color);
            this.swapHeight(barOneStyle, barTwoStyle, barOneVal, barTwoVal);
        }
            , i * ANIMATION_SPEED / ANIMATION_MULTIPLIER);
    }

    switchColor(barOneStyle, barTwoStyle, color) {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
    }
    swapHeight(barOneStyle, barTwoStyle, barOneVal, barTwoVal) {

        barOneStyle.height = `${barTwoVal}px`;
        barTwoStyle.height = `${barOneVal}px`;
    }
}
