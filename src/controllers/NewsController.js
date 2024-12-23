
class NewsController {

    index(req, res){
        res.send('NewsController index')

    }

    show(req, res) {
        res.send('NewsController show')
    }

}

module.exports = new NewsController();