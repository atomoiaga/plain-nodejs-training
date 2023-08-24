# plain-nodejs-training
This is the code from a NodeJS training

!keys are not used for anything, since they do not present sensitive information

# Commands


│ NPM / NODE relevant commands
```
nvm use / nvm install / nvm list -> manage node and npm version

npm install prettier -> global intallation of a resource

npm install --save-dev prettier -> install a resource only for dev env

npm init -> dsetup a project

npx prettier --write . -> npx is used as an executable for some libraries
```
│ Create Self Signed
```
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```
│ NODE Profiling
```
node --prof server.js // Start Profiler

node --prof-process <log-file> > processed.txt // Parse Profiler Data Result

ab -k -c 20 -n 60 -m POST "http://localhost:3000/writeasd" // Load Test
```
