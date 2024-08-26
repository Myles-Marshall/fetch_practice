// Ensure nodemon is added to the PATH
// `$env:PATH += ";C:\Users\your.user.name\AppData\Roaming\npm"`

// Install nodemon globally
// `npm i -g nodemon`

// Command to run this script with nodemon
// `nodemon --exec "node" startRepl.js`

const repl = require('repl');
const fs = require('fs');
const path = require('path');

const scripts = ['./html_stuff/fetch.js'];

const loadFunctions = () => {
    scripts.forEach(script => {
        try {
            delete require.cache[require.resolve(script)];
            require(script);
            console.log(`${script} loaded successfully`);
        } catch (error) {
            console.error(`Error loading ${script}:`, error);
        }
    });
}

loadFunctions();

const replServer = repl.start({ prompt: '> ' });

scripts.forEach(script => {
    fs.watchFile(path.resolve(__dirname, script), (curr, prev) => {
        console.log(`${script} changed, reloading...`);
        try {
            delete require.cache[require.resolve(script)];
            require(script);
            console.log(`${script} reloaded successfully`);
        } catch (error) {
            console.error(`Error reloading ${script}:`, error);
        }
    });
});