const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger =require('morgan');
const cors = require('cors');
//const req = require('express/lib/request');
//const res = require('express/lib/response');
/*
* Rutas
*/
const users = require('./routes/usersRoutes');
const req = require('express/lib/request');
const res = require('express/lib/response');


const port = process.env.PORT || 3007;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
        extended:true
}));
app.use(cors());
app.disable('x-powered-by');

app.set('port',port);

/*
* Llamando a la ruta
*/
users(app);

server.listen(3007, '192.168.1.3' || 'localhost', function(){
        console.log('Aplicacion de NodeJS' + port + 'Iniciada...')
});

app.get('/',(req,res)=>{
    res.send('Ruta raiz del back');
});


//ERROR O MANEJO DE ERROR
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports={ // para usar variables en otros archivos
    app: app,
    server: server
}


//200 -ES UNA RESPUESTA EXITOSA
//404 -QUE LA URL NO EXITE
//500 -ERROR INTERNO DEL SERVIDOR