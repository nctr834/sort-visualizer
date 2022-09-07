import React from 'react';
import './SortVisualizer.css';
import * as SortAlgos from '../SortAlgos/SortAlgos';

let BAR_NUMBER_MAX = (window.innerWidth / 6) + 1;
let ANIMATION_SPEED = 400 / BAR_NUMBER_MAX;
let ANIMATION_MULTIPLIER = 1;

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
        let slider = this.state.sorting ? "grayedSlider" : "normalSlider";
        return (
            <div className="full">

                <input
                    type="range"
                    min="10"
                    max={(window.innerWidth / 3) + 1}
                    value={BAR_NUMBER_MAX}
                    className={slider}
                    onChange={(e) => {
                        BAR_NUMBER_MAX = e.target.value;
                        ANIMATION_SPEED = 400 / BAR_NUMBER_MAX;
                        this.state.array = [];
                        this.resetArray();
                    }}
                />

                <div className="button-container">
                    <button onClick={() => { window.location.reload(false); }}>Reload</button>
                    <button className={button_class} onClick={() => this.resetArray()}>New Array</button>
                    <button className={button_class} onClick={() => { ANIMATION_MULTIPLIER = 1; this.mergeSort(); }}>Merge Sort</button>
                    <button className={button_class} onClick={() => { ANIMATION_MULTIPLIER = 2; this.selectionSort(); }}>Selection Sort</button>
                    <button className={button_class} onClick={() => { ANIMATION_MULTIPLIER = 2; this.bubbleSort() }}>Bubble Sort</button>
                    <button className={button_class} onClick={() => { ANIMATION_MULTIPLIER = .33; this.combSort() }}>Comb Sort</button>
                    <button className={button_class} onClick={() => { ANIMATION_MULTIPLIER = 1; this.insertionSort() }}>Insertion Sort</button>
                    <button className={button_class} onClick={() => { ANIMATION_MULTIPLIER = .33; this.shellSort() }}>Shell Sort</button>
                    <button className={button_class} onClick={() => { ANIMATION_MULTIPLIER = .33; this.quickSort() }}>Quick Sort</button>
                    <button className={button_class} onClick={() => { ANIMATION_MULTIPLIER = .33; this.heapSort() }}>Heap Sort</button>
                    <h3>Size/Speed</h3>

                    <style>
                        {`
                    .grayedButton {
                        background-color: #ddd;
                        color: #999;
                    }
                    .normalButton {
                        background-color: #DDD;
                        color: #230;
                    }
                    .grayedSlider {
                        background-image: linear-gradient(to right, #aaa, #aaa 100%);
                    }
                    .normalSlider {
                    }

                `}</style>

                </div >
                <div className="array-container">
                    {
                        array.map((num, i) => (
                            <div className="array-bar"
                                key={i}
                                style={
                                    {
                                        height: `${num}px`,
                                        width: `${window.innerWidth / 3 / BAR_NUMBER_MAX}px`
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
        while (i < BAR_NUMBER_MAX) {
            let randNum = Math.floor(Math.random() * 2 * 100 + 1);
            if (!array.includes(randNum)) {
                array.push(randNum * 2);
                i++;
            }
        }
        this.setState({ array: array });
        this.fixColor();
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

    //change color of bars  when sorted
    sortedColor() {
        for (let i = 0; i < this.state.array.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            arrayBars[i].style.backgroundColor = '#9FE2BF';
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
                let color = '#F1EB9C';
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
                let color = '#F1EB9C';
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
                let color = '#AF0000';
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

    modTwoIsZero(arrayBars, barOneVal, barTwoVal, i) {
        const barOneStyle = arrayBars[barOneVal].style;
        const barTwoStyle = arrayBars[barTwoVal].style;
        let color = '#F1EB9C';

        setTimeout(() => {
            this.switchColor(barOneStyle, barTwoStyle, color);
        }
            , i * ANIMATION_SPEED / ANIMATION_MULTIPLIER);
    }
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
