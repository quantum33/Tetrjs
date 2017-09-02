class Drop {
    constructor(interval) {
        this.interval = interval;
        this.counter = 0;
        this.time = 0;
        this.lastTime = 0;
    }

    setTime(value) {
        console.log(`CLASS > setTime to ${value}ms`);
        this.time = value;

        //set counter
        const deltaTime = (this.time - this.lastTime);
        this.counter += deltaTime;
    }
    
    isReadyToMovePiece() { return this.counter > this.interval; }

    initializeCounter() { this.counter = 0; }
}

export {Drop};

// const drop = {
//     interval: 1000, // 1000 ms
//     count: 0,
//     time: 0,
//     setTime: (value) => {
//         console.log(`setTime to ${value}ms`);
//         time = value;

//         //set counter
//         const deltaTime = (time - lastTime);
//         //console.log(this.counter);
//         count += deltaTime;
//     },
//     isReadyToMovePiece: () => { count > interval; },
//     initializeCounter: () => { count = 0; }
// };