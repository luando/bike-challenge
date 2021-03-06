module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// to customize your Truffle configuration!
	networks: {
		development: {
			host: "127.0.0.1",
			port: 8545,
			network_id: "5777",
			gas: 3000000,
			gasPrice: 30000000000
    },
    ropsten: {
			host: "x.x.x.x",
			port: 8545,
			network_id: "*",
			gas: 3000000,
			gasPrice: 30000000000
		}
	}
};
