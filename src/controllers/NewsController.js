
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

}

module.exports = new NewsController();