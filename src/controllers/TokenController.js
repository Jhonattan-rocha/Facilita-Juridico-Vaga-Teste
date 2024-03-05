import Cliente from '../models/Cliente';
import jwt from "jsonwebtoken";

require('dotenv').config()

class TokenController {
  async store(req, res, next) {
    try{
    
        const { email='', password='' } = req.body;
        const md5 = require('md5')
    
        if (!email || !password){   
            return res.status(400).json({
                result: null,
                error: "Email ou senha vazios"
            });
        }
    
        const cliente = await Cliente.findOne({where: {
            email: email
        }});
    
        if(cliente.getDataValue("password_hash") === String(md5(password))){
            const { id, email } = cliente;
            const ex = "7d"
            const token = jwt.sign({id, email}, process.env.TOKENSECRET, {
                expiresIn: ex,
            });
            return res.status(200).json({token: token, cliente: { nome: cliente.nome, email: cliente.email}});
        }  
    
        return res.status(404).json({
            result: null,
            error: "Cliente não encontrado, senha inválida"
        });
    }catch(err){
        return res.status(404).json({
            result: null,
            error: "Cliente não encontrado, senha inválida"
        });
    }
  };

  async verifyToken(req, res){
    try{
        const verify = jwt.verify(req.body.token, process.env.TOKENSECRET);
        if(verify){
            return res.status(200).json({
                result: "Token valido"
            });
        };
    }catch(err){
        return res.status(400).json({
            result: null,
            error: "Token inválido"
        });
    }
  }
};

export default new TokenController();
