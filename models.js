// models.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sua_base_de_dados', 'seu_usuario', 'sua_senha', {
  host: 'localhost',
  dialect: 'postgres',
});

// Defina os modelos aqui (Usuario, Tarefa, ListaTarefas)

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Adicione outros campos conforme necessário
});

const Tarefa = sequelize.define('Tarefa', {
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  concluida: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  // Adicione outros campos conforme necessário
});

const ListaTarefas = sequelize.define('ListaTarefas', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Adicione outros campos conforme necessário
});

// Relacionamentos entre os modelos
Usuario.hasMany(ListaTarefas);
ListaTarefas.belongsTo(Usuario);

ListaTarefas.hasMany(Tarefa);
Tarefa.belongsTo(ListaTarefas);

// Sincronize os modelos com o banco de dados
sequelize.sync({ force: true })
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar modelos:', error);
  });

module.exports = {
  Usuario,
  Tarefa,
  ListaTarefas,
};
