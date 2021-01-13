const { ESLint } = require("eslint");
const fs = require('fs');
// Format date according to Code Quality file
function formatDateMMDDYYYY(date) {
    return (date.getMonth() + 1) +
    "/" + date.getDate() +
    "/" + date.getFullYear();
}
// Returns the ISO week of the date.
function getISOWeek() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    let week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}
function getStatus(result, goal) {
    const expectedResult = goal.replace( /^\D+/g, '');
    return result <= expectedResult;
}

function getErrorCount(results) {
    let count = 0;
    results.forEach(result => {
        count += result.errorCount;
    });
    return count;
}

(async function main() {
    let rawdata = fs.readFileSync('codemetrics-config.json');
    let projectSettings = JSON.parse(rawdata);
    const date = new Date();
    let projectName = projectSettings.projectName;
    let isoWeek = getISOWeek();
    let year = date.getFullYear();
    let producerName = projectSettings.producerName;
    let productName = projectSettings.productName;
    let indicator = projectSettings.indicator;
    let goal = projectSettings.goal;
    let productStatus = projectSettings.productStatus;
    let technology = projectSettings.technology;
    let filesPattern = projectSettings.filesPattern;
    const isoWeekString = ("" + isoWeek).length < 2 ? "0" + isoWeek : isoWeek;
    const fileName = `${ projectName }-${ year }w${ isoWeekString }.tsv`;
    // Create an instance.
    const eslint = new ESLint();
    // Lint files.
    const results = await eslint.lintFiles([filesPattern]);
    // Output it.
    const errorCount = getErrorCount(results);

    //console.log(JSON.stringify(results));

    let status = getStatus(errorCount, goal) ? 1 : 0;
    // Build tsv file
    let fields = [year, isoWeek, projectName, producerName, productName, 
        indicator, errorCount, goal, status, productStatus, technology, formatDateMMDDYYYY(date)];
    let tsv = fields.join("\t");
    // Save tsv file
    fs.writeFileSync(fileName, tsv);
    console.log(`File ${ fileName } successfully generated!!!!`);
    //console.log(errorCount);
    if(errorCount > 0) {
        const formatter = await eslint.loadFormatter("stylish");
        const resultText = formatter.format(results);
        console.log(resultText);
    }
})().catch((error) => {
    process.exitCode = 1;
    console.error(error);
});