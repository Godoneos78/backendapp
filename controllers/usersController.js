const User = require ('../models/user');
//const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
module.exports={

    async getAll(req,res,next){
        try{
            const data= await User.getAll();
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);
        }
        catch(error){
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los usuarios'
            });
        }  
    },

    async register(req,res,next) {
        try {

            const user = req.body;
            const data = await User.create(user);
            return res.status(201).json({
                success:true,
                message:'El registro se realizo conrrectamente',
                data: data.id
            });
            
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                menssage: 'Hubo un error en el registro del usuario',
                error: error
            });
        }
    },


    async login(req,res,next){
            try{
                const email= req.body.email;
                const password=req.body.password;

                const myUser = await User.findByIdEmail(email);

                if (!myUser){
                    return res.status(201).json({
                        success: false,
                        message: 'El usuario no fue encontrado'
                    });
                }
                if(User.isPasswordMatched(password,myUser,password)){

                    const token = jwt.sign({id: myUser.id,email:myUser.email}, keys.secretOrKey,{
                      //  expiresIn:(60*60*24)
                    });
                    const data = {
                        id: myUser.id,
                        name: myUser.name,
                        lastname: myUser.lastname,
                        email: myUser.email,
                        phone: myUser.phone,
                        image: myUser.image,
                        sesion_token: `JWT ${token}`
                    }
                    return res.status(201).json({
                        success: true,
                        data: data 
                    });
                }
                else{
                    res.status(201).json({
                        success: false,
                        message: 'La contraseña es incorrecta',
                        
                    });
                }
            }
            catch(error){
                console.log(`Error: ${error}`);
                return res.status(501).json({
                success: false,
                message: 'Error al momento de hacer login',
                error: error
                });
            }
    }


};

