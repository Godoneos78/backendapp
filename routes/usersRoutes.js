const UsersController = require('../controllers/usersController');
//const { create } = require('../models/user');

module.exports=(app)=> {
    //TRAER DATOS
    app.get('/api/users/getAll', UsersController.getAll);
    //GUARDAR O CREAR DATOS
    app.post('/api/users/create',UsersController.register);

    app.post('/api/users/login',UsersController.login);
}