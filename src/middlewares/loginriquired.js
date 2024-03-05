import jwt from 'jsonwebtoken'
import Cliente from '../models/Cliente';

require('dotenv').config()

export default async (req, res, next) =>{

    const { authorization } = req.headers;
    if (!authorization){
        return res.status(401).json({
            errors: 'Login required'
        })
    }

    const [texto, token] = authorization.split(" ")

    try{
        const data = jwt.verify(token, process.env.TOKENSECRET)
        const { id, email } = data
        const cliente = await Cliente.findOne({
            where: {
                id,
                email,
            }
        });

        if (cliente){
            req.id = id;
            req.email = email;
            return next()
        }

        return res.status(400).json({
            errors: 'Cliente não encontrado'
        });
    }catch(err){
        return res.status(401).json({
            errors: 'Token expired'
        });
    }
}
