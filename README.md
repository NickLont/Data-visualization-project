# Angular Data Visualization Thesis Project

##Installation instructions:

## Prerequisites

Node.js and npm are essential to Angular development. 
    
<a href="https://docs.npmjs.com/getting-started/installing-node" target="_blank" title="Installing Node.js and updating npm">
Get it now</a> if it's not already installed on your machine.
 
**Verify that you are running at least node `v4.x.x` and npm `3.x.x`**
by running `node -v` and `npm -v` in a terminal/console window.
Older versions produce errors.

## Create a new project

Clone this repo into new project folder (e.g., `my-proj`).
```shell
git clone https://github.com/NickLont/Data-visualization-project.git  my-proj
cd my-proj
```

## Install npm packages

> See npm and nvm version notes above

Install the npm packages described in the `package.json` and verify that it works:

```shell
npm install --global
npm start
```
Open browser to [`http://localhost:3001`](http://localhost:3001)

if you want to use other port, open `package.json` file, then change port in `--port 3001` START script. Also
open config/webpack.dev.js and change output.publicPath `http://localhost:3001/`
