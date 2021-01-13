#!/usr/bin/env node

(function () {
    const parseArguments = (args: string[]): Args => {
        const startIndex = args.findIndex(item => item === "--start");
        const endIndex = args.findIndex(item => item === "--end");
        const result: Args = {
            start: 0,
            end: 10
        };
    
        if (startIndex !== -1) {
            const start = parseInt(args[startIndex + 1]);
    
            if (Number.isNaN(start)) throw new Error("Sorry, your start parameter needs to be a number");
    
            result.start = start;
        }
    
        if (endIndex !== -1) {
            const end = parseInt(args[endIndex + 1]);
    
            if (Number.isNaN(end)) throw new Error("Sorry, your end parameter needs to be a number");
    
            result.end = end;
        }
    
        return result;
    }

    const run = () => {
        const validArgs = process.argv.slice(2);
        const parsedArgs = parseArguments(validArgs);

        for (let i = parsedArgs.start; i <= parsedArgs.end; i++) {
            console.log(i);
        }
    }

    run();
})();

interface Args {
    start: number,
    end: number
};