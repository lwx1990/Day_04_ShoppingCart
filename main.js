//Load libraries
const express = require('express')
const handlebars = require('express-handlebars')


//Create PORT
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

//Create an instance of express
const app = express()

app.use(express.static(__dirname + '/static'))

//Configure handlebars
app.engine('hbs', handlebars({defaultLayout: 'default.hbs'}))

app.set('view engine', 'hbs')


app.get('/', (req, res) => {
    const shopcart = []
    res.status(200)
    res.type('text/html')
    res.render('index', {
        cartState: JSON.stringify(shopcart)
    })
})


app.post('/', express.urlencoded({extended: true}), express.json(),
    (req, res) => {
        console.info('body: ', req.body)  
        const shopcart = JSON.parse(req.body.cartState)  
        shopcart.push({
            item: req.body.item,
            quantity: req.body.quantity,
            unitPrice: req.body.unitPrice
        })   
        // shopcart.push(req.body)
        res.status(200)
        res.type('text/html')
        res.render('index', {
            shopcart: shopcart,
            cartState: JSON.stringify(shopcart)
        })
        
    }
)



//Start express
app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`)
})