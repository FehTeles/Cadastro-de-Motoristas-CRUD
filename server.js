import { fastify } from "fastify";
import { DatabaseMemory } from "./database_memory.js";

const server = fastify();
const db = new DatabaseMemory();

server.post("/motoristas", (request, reply) => {
  const { nome, email, cpf, dataNasc, placa, modelo } = request.body;
  db.create({
    nome: nome,
    email: email,
    cpf: cpf,
    dataNasc: dataNasc,
    placa: placa,
    modelo: modelo,
  });
  return reply.status(201).send(); // 201 = Created
});


server.get("/motoristas", async () => {
  const motoristas = db.list();
  return motoristas;
});

server.put("/motoristas/:id", (request, reply) => {
  const { id } = request.params.id;
  const { nome, email, cpf, dataNasc, placa, modelo } = request.body;
  
  db.update(id, {
    nome: nome,
    email: email,
    cpf: cpf,
    dataNasc: dataNasc,
    placa: placa,
    modelo: modelo,
  });
  return reply.status(204).send(); 
});

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
