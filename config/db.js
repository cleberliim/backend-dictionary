const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/dictionary-api', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB');
  } catch (err) {
    console.error('Erro na conexão com o MongoDB', err);
    process.exit(1); // Finaliza o processo se não conseguir conectar
  }
};

module.exports = connectDB;
