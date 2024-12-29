const path = require('path'); // Import the path module

class NewsController {

    index(req, res, router){
        console.log('router - ', router)
        res.send('NewsController index')
    }

    show(req, res) {
        res.send('NewsController show')
    }

    edit(req, res) {
        console.log('req - ', req.body)
        res.send('NewsController edit')
    }

    sendFile(req, res) {
        res.sendFile(path.join(__dirname, '../views/layouts/index.html'));
    }
}

module.exports = new NewsController();