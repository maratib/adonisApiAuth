'use strict';
module.exports = {

	getName() {
		return 'Jim';
	},
	getAge(age) {
		return age;
	},

	async usingAwait(ms) {
		// await sleep(5000);
		console.log('Using Await');
		return new Promise(resolve => setTimeout(resolve, ms));
	
	  }
	
};

