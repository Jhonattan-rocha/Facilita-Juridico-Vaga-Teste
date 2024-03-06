import Cliente from "../models/Cliente";

class ClienteController {
  async store(req, res) {
    try {
      const cliente = await Cliente.create(req.body);
      return res.status(200).json({result: cliente.rows});
    }catch(err){
      return res.status(400).json({
            result: null,
            error: "Erro ao cadastrar o cliente"
      });
    };
  };

  async route(req, res) {
    try {
      const clientes = await Cliente.calculateRoute(req.body);
      return res.status(200).json({result: clientes});
    }catch(err){
      console.log(err)
      return res.status(400).json({
        result: null,
        error: "Erro ao calcular a rota"
      });
    }
  }

  async index(req, res){
    try{
      let clientes = null
      if(req.query.filter){
        let filter = String(req.query.filter).split(",")
        clientes = await Cliente.findWhere(filter[0], filter[1]);
      }else{
        clientes = await Cliente.findAll()
      }
      return res.status(200).json({result: clientes.rows});
    }catch(err){
      console.log(err)
      return res.status(400).json({
            result: null,
            error: "Erro ao buscar os clientes"
      });
    };
  };

  async show(req, res){
    try{
      const id = req.params.id;
      if (!id){
        return res.status(404).json({
          result: null,
          error: "ID inválido ou não encontrado"
        });
      };
      const cliente = await Cliente.findByPk(id);
      return res.status(200).json({result: cliente.rows});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar o cliente"
      });
    };
  };

  async update(req, res){
    try{
      const id = req.params.id;
      if (!id){
        return res.status(200).json({
          result: null,
          error: "ID não encontrado ou inválido"
        });
      };
      const cliente = await Cliente.findByPk(id);

      if (!cliente){
        return res.status(404).json({
          result: null,
          error: "Cliente não encontrado"
        });
      };
      const result = await Cliente.update(id, {...req.body});

      return res.status(200).json({result: result.rows});
    }catch(err){
      return res.status(400).json({
            result: null,
            error: "Erro ao buscar o cliente"
      });
    };
  };

  async delete(req, res){
    try{
      const id = req.params.id;

      if (!id){
        return res.status(404).json({
          result: null,
          error: "ID não encontrado ou inválido"
        });
      };
      const cliente = await Cliente.findByPk(id);

      if (!cliente){
        return res.status(404).json({
          result: null,
          error: "Cliente não encontrado"
        });
      };

      await Cliente.delete(id);

      return res.status(200).json({result: cliente.rows});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar o cliente"
      });
    };
  };
}; 

export default new ClienteController();
