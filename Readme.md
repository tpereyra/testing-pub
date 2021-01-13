
Install this package in your project

    npm install git+https://github.com/silvio-sisto/testing-pub/#eslint-module

Install the dependencies

    npm install
    npm install eslint

Create a codemetrics generator config file 'config.json' for your project

Ejemplo:

    {
    "projectName" : "kinloch",
    "producerName" : "Juan Arguello",
    "productName" : "Code Metrics Automation",
    "indicator" : "ESLint",
    "goal" : "<=10",
    "productStatus" : "1",
    "technology" : "TypeScript",
    "filesPattern": "C:/Workspace/kinloch/BotBuilder-Samples/samples/javascript_nodejs/02.echo-bot/**/*.js"
    }

Create eslint config file

    ./node_modules/.bin/eslint --init

  

Run the codemetrics generator

    node .\node_modules\@southworks\sw-codemetrics-generator\index.js

or

    npm run cm-auto



