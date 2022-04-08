const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: 'mongodb://localhost/cocktailMenu',
        options: {useNewUrlParser: true},
    },
    facebook: {
        appId: '718422199316941',
        appSecret: 'e822dc5e22ab51742e7d8b8ec4d8b6f9'
    }
};