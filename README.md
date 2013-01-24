# Node.js beyond Hello World

0. Hello world! http://nodejs.org
1. Set up repo
  1a. Configure .gitignore to ignore `node_modules/`
  1b. Write `package.json` http://package.json.nodejitsu.com/
    * Add some dependencies
      * axon http://npm.im/axon
      * fixed-array http://npm.im/fixed-array
      * redis http://npm.im/redis
  1c. npm install
  1d. npm shrinkwrap
  1e. install/start Redis if not already on your system http://redis.io
2. Write some code
  2a. Read/Write data with Redis
  2b. Axon
  2c. Put it all together
3. Homework
  3a. Fork this project http://github.com/brycebaril/snug
  3b. Convert 2a to use Express.js http://npm.im/express
  3c. Convert 2b to make the workers log their work to files
  3d. Convert 2c to use Socket.IO (or http://npm.im/shoe or standard websockets) to update the list live
  3e. Let me know how it goes, or if you have any questions!
