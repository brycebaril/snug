# Node.js beyond Hello World

Step 0: Be familiar with the Hello World example at http://nodejs.org

1. Set up repo
    1. Configure .gitignore to ignore `node_modules/`
    1. Write `package.json` http://package.json.nodejitsu.com/
        * Add some dependencies
            * axon http://npm.im/axon
            * fixed-array http://npm.im/fixed-array
            * redis http://npm.im/redis
    1. npm install
    1. npm shrinkwrap
    1. install/start Redis if not already on your system http://redis.io
1. Write some code
    1. Read/Write data with Redis
    1. Create a work pool with Axon
    1. Put it all together
1. Homework
    1. Fork this project http://github.com/brycebaril/snug
    1. Convert 2a to use Express.js http://npm.im/express
    1. Convert 2b to make the workers log their work to files
    1. Convert 2c to use Socket.IO (or http://npm.im/shoe or standard websockets) to update the list live
    1. Let me know how it goes, or if you have any questions!
