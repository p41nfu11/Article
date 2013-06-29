module.exports = {
	dev:{
		fb:{
			appId: 'appId',
			appSecret: 'appSecret',
			url: 'http://localhost:5000/'
		},
        admins: [
            'my@facebook.email'
        ],
        saplo:{
            api_key: 'apiKey',
            secret_key: 'apiSecret',
            collection_id: 'WeSaveAllOurTextsInSameCollection'
        },
		dbUrl: 'mongodb://localhost/farticle'
    }
}