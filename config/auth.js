// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1824784101112300', // your App ID
        'clientSecret'  : '749f069bf385d77707934b9effed330c', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'googleAuth' : {
        'clientID'      : '469846503364-vsarejtqsj18aatj4qjiorb39oiub1ht.apps.googleusercontent.com',
        'clientSecret'  : '0x4OnzTxkfBXW03c3jTH0ApJ',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};