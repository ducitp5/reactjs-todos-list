
class NewsController {

    index(req, res, router){
        console.log('router - ', router)
        res.send('NewsController index')
    }

    show(req, res) {
        res.send('NewsController show')
    }

}

module.exports = new NewsController();