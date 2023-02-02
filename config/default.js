module.exports = {

	// A fancy name for your instance
	// To prevent confusion, you should change this. Be creative!
	name: 'Yet Another Elysium Instance',

	// Short description of your instance
	description: 'A place to chat!',

	// Network port on which the server should listen
	port: 3030,

	// MongoDB Connection String
	database: 'mongodb://127.0.0.1:27017',

	// The name for the database
	// Change this if you're running multiple Elysium instances on the same MongoDB instance
	database_name: 'Elysium',

	// ################################ Advanced Settings ################################
	// From this point forward, you should only change stuff if you know what you're doing
	// ###################################################################################

	// CORS Header
	// This allows any client to connect by default
	// Can be restricted to only the local client by supplying your domain. Note that non-browser based clients can still connect.
	cors: '*',

	// How many salting rounds should be used for bcrypt hashing
	//
	// This is highly hardware-specific. To find a good value for your system, use `npm run bcrypt-perf`.
	// You'll want hashing to take as long as possible without annoying the users. 
	// The default value was chosen based on execution time of 2 seconds on an Intel Core I7 7700-HQ
	bcrypt_rounds: 15

}