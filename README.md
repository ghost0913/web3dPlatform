# web3dPlatform
a learning platform build in web3d

## Local Deployment
1. Modify the configuration file
  a. app.js modify the server of front-end connection
  	const server = app.listen(3000, 'localhost',() => {
  b. User.js modify the mysql connetion to be consistent with your own database(user:root, password:123456, database:project)

   
2. cmd
   npm install -dev
   npm start
3. View in browse£ºhttp:127.0.0.1:3000 (If it has been loading, you can change the browser)
