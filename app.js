const express = require('express');
const bodyParser = require('body-parser');
const { Usuario, Tarefa, ListaTarefas } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Rotas aqui (CRUD para Usuario, Tarefa, ListaTarefas)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


// Rotas para Usuario

// Criar um novo usuário
app.post('/usuarios', async (req, res) => {
    try {
      const usuario = await Usuario.create(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  
  // Obter todos os usuários
  app.get('/usuarios', async (req, res) => {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  
  // Obter um usuário específico por ID
  app.get('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const usuario = await Usuario.findByPk(id);
      if (usuario) {
        res.json(usuario);
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  
  // Atualizar um usuário por ID
  app.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [updated] = await Usuario.update(req.body, {
        where: { id: id },
      });
      if (updated) {
        const updatedUsuario = await Usuario.findByPk(id);
        res.json(updatedUsuario);
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário por ID:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  
  // Excluir um usuário por ID
  app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Usuario.destroy({
        where: { id: id },
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao excluir usuário por ID:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  
  // Rotas para Tarefa

// Criar uma nova tarefa
app.post('/tarefas', async (req, res) => {
    try {
      const tarefa = await Tarefa.create(req.body);
      res.status(201).json(tarefa);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  
  // Obter todas as tarefas
  app.get('/tarefas', async (req, res) => {
    try {
      const tarefas = await Tarefa.findAll();
      res.json(tarefas);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  
  // Obter uma tarefa específica por ID
  app.get('/tarefas/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const tarefa = await Tarefa.findByPk(id);
      if (tarefa) {
        res.json(tarefa);
      } else {
        res.status(404).json({ error: 'Tarefa não encontrada' });
      }
    } catch (error) {
      console.error('Erro ao buscar tarefa por ID:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  
  // Atualizar uma tarefa por ID
  app.put('/tarefas/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [updated] = await Tarefa.update(req.body, {
        where: { id: id },
      });
      if (updated) {
        const updatedTarefa = await Tarefa.findByPk(id);
        res.json(updatedTarefa);
      } else {
        res.status(404).json({ error: 'Tarefa não encontrada' });
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa por ID:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  
  // Excluir uma tarefa por ID
  app.delete('/tarefas/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Tarefa.destroy({
        where: { id: id },
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Tarefa não encontrada' });
      }
    } catch (error) {
      console.error('Erro ao excluir tarefa por ID:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  
  // Rotas para ListaTarefas
  

// Rotas para ListaTarefas

// Criar uma nova lista de tarefas
app.post('/listatarefas', async (req, res) => {
    try {
      const listaTarefas = await ListaTarefas.create(req.body);
      res.status(201).json(listaTarefas);
    } catch (error) {
      console.error('Erro ao criar lista de tarefas:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  
  // Obter todas as listas de tarefas
  app.get('/listatarefas', async (req, res) => {
    try {
      const listasTarefas = await ListaTarefas.findAll();
      res.json(listasTarefas);
    } catch (error) {
      console.error('Erro ao buscar listas de tarefas:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  
  // Obter uma lista de tarefas específica por ID
  app.get('/listatarefas/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const listaTarefas = await ListaTarefas.findByPk(id, {
        include: [{ model: Tarefa }],
      });
      if (listaTarefas) {
        res.json(listaTarefas);
      } else {
        res.status(404).json({ error: 'Lista de tarefas não encontrada' });
      }
    } catch (error) {
      console.error('Erro ao buscar lista de tarefas por ID:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  
  // Atualizar uma lista de tarefas por ID
  app.put('/listatarefas/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [updated] = await ListaTarefas.update(req.body, {
        where: { id: id },
      });
      if (updated) {
        const updatedListaTarefas = await ListaTarefas.findByPk(id);
        res.json(updatedListaTarefas);
      } else {
        res.status(404).json({ error: 'Lista de tarefas não encontrada' });
      }
    } catch (error) {
      console.error('Erro ao atualizar lista de tarefas por ID:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  
  // Excluir uma lista de tarefas por ID
  app.delete('/listatarefas/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await ListaTarefas.destroy({
        where: { id: id },
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Lista de tarefas não encontrada' });
      }
    } catch (error) {
      console.error('Erro ao excluir lista de tarefas por ID:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  

  