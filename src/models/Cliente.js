import Connection from "./Connection";

class Cliente{
    async createTable(){
      let con = await Connection();
      let sql = `
        CREATE TABLE Cliente (
          id SERIAL PRIMARY KEY,
          nome VARCHAR(255),
          telefone VARCHAR(20),
          email VARCHAR(255) UNIQUE,
          cord_X FLOAT,
          cord_Y FLOAT
        );
      `;
      await con.query(sql);
      await con.end();
    }

    calculateDist(pointI, pointF) {
      return Math.sqrt(Math.pow(pointF.cord_x - pointI.cord_x, 2) + Math.pow(pointF.cord_y - pointI.cord_y, 2));
    }
    
    getBiggerDistPoint(point={}, clientes=[]) {
      let maior = Number.MIN_VALUE;
      let cli = null;
      for(let cliente of clientes){
        let dist = this.calculateDist(point, cliente);
        if(dist > maior){
          maior = dist;
          cli = {...cliente};
        }
      }
      return cli;
    }

    compararDist(a, b) {
      const distanciaA = Math.sqrt(Math.pow(a.cord_x, 2) + Math.pow(a.cord_y, 2));
      const distanciaB = Math.sqrt(Math.pow(b.cord_x, 2) + Math.pow(b.cord_y, 2));
    
      // Retorna a diferença absoluta entre as distâncias
      return Math.abs(distanciaA) - Math.abs(distanciaB);
    }
    
    async calculateRoute(point) {
      const clientes = await this.findAll();

      /**buscando o ultimo ponto a ser visitado antes de voltar */
      let last_ponit = this.getBiggerDistPoint(point, clientes.rows);
      let bigger_dist = this.calculateDist(point, last_ponit);

      // pontos onde passará na ida e na volta
      let route_go = []   

      let len = clientes.rows.length
      let current = {...point};

      clientes.rows = clientes.rows.sort(this.compararDist);

      for(let i=0; i<len; i++){
        let dist = this.calculateDist(current, clientes.rows[i]);
        // colocar todos os clientes com a distancia menor que o ultimo elemento
        if(dist <= bigger_dist){
          route_go.push(clientes.rows[i]);
          current = {...clientes.rows[i]};
          console.log(dist, clientes.rows[i]);
        }
      }

      // ordernar com base na diferença absoluta das distancias
      route_go = route_go.sort(this.compararDist);
      route_go.push({...point});
      return route_go;
    }

    async findByPk(id=Number()){
      const con = await Connection();
      let sql = `
        SELECT id, nome, telefone, email, cord_x, cord_y from cliente where id=${id};
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
        INSERT INTO cliente (nome, telefone, email, cord_x, cord_y) VALUES ($1, $2, $3, $4, $5);
      `;
      let values = [body.nome, body.telefone, body.email, body.cord_x, body.cord_y];
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
        SELECT id, nome, telefone, email, cord_x, cord_y from cliente;
      `;
      let res = await con.query(sql);
      await con.end();
      if(res){
        return res;
      }
      return null;
    }

    async findWhere(field = String(), value = String()) {
      const con = await Connection();
      let sql = `
        SELECT id, nome, telefone, email, cord_x, cord_y FROM cliente WHERE LOWER(${field}) LIKE LOWER($1);
      `;
      let res = await con.query(sql, [`%${value}%`]);
      await con.end();
      if (res) {
        return res;
      }
      return null;
    }       

    async update(id=Number(), body={}){
      const con = await Connection();
      let sql = `
        UPDATE cliente
        SET nome = $1, telefone = $2, email = $3, cord_x = $4, cord_y = $5
        WHERE id = $6;
      `;
      let values = [body.nome, body.telefone, body.email, body.cord_x, body.cord_y, id];
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
