const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
      connectTimeout: 60000, 
    }
  },
});

// Restante do seu código do Sequelize...


const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
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
});

const ListaTarefas = sequelize.define('ListaTarefas', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Usuario.hasMany(ListaTarefas);
ListaTarefas.belongsTo(Usuario);

ListaTarefas.hasMany(Tarefa);
Tarefa.belongsTo(ListaTarefas);

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
