export function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

export function factory(interval = 1000, runTimes = 10) {
    let timeout;
    let count = 0;
    const queue = [];

    function next() {
        if (timeout) return;

        timeout = setTimeout(() => {
            count = 0;
            timeout = undefined;
            limit();
        }, interval);
    }

    function run() {
        const queued = queue.shift();
        queued && queued();
        limit();
    }

    function limit(func) {
        if (func) queue.push(func);
        if (!queue.length) return;

        if (++count <= runTimes) run();
        else next();
    }

    return limit;
}
