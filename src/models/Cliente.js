import Connection from "./Connection";

class Cliente{
    async createtable(){
      let con = await Connection();
      let sql = `
        CREATE TABLE Cliente (
          id SERIAL PRIMARY KEY,
          nome VARCHAR(255),
          telefone VARCHAR(14),
          email VARCHAR(255) UNIQUE
        );
      `;
      con.query(sql, async (err, result) => {
        if(!err){
          console.log(result);
        }else{
          console.log(err);
        }
        await con.end();
      });
    }

    async findByPk(id=Number()){
      const con = await Connection();
      let sql = `
        SELECT id, nome, telefone, email from cliente where id=${id};
      `;
      let res = await con.query(sql);
      await con.end();
      if(res){
        return res;
      }
      return null;   
    }

    async create(body={}){
      const con = await Connection();
      let sql = `
        INSERT INTO cliente (nome, telefone, email) VALUES ($1, $2, $3);
      `;
      let values = [body.nome, body.telefone, body.email];
      let res = await con.query(sql, values);
      await con.end();
      if (res){
        return res;
      }
      return null;
    }

    async findAll(){
      const con = await Connection();
      let sql = `
        SELECT id, nome, telefone, email from cliente;
      `;
      let res = await con.query(sql);
      await con.end();
      if(res){
        return res;
      }
      return null;
    }

    async update(id=Number(), body={}){
      const con = await Connection();
      let sql = `
        UPDATE cliente
        SET nome = $1, telefone = $2, email = $3
        WHERE id = $4;
      `;
      let values = [body.nome, body.telefone, body.email, id];
      let res = await con.query(sql, values);
      await con.end();
      if(res){
        return res;
      }
      return null;
    }

    async delete(id=Number()){
      const con = await Connection();
      let sql = `
        DELETE FROM cliente
        WHERE id = $1;
      `;
      let res = await con.query(sql, [id]);
      await con.end();
      if(res){
        return res;
      }
      return null;
    }
}

export default new Cliente();
