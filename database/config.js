const mongoose = require('mongoose');

const dbConnection = async () => {
  try{
    await mongoose.connect(process.env.DBCNN);
    console.log('Conexión a la base de datos exitosa');
  }catch(e){
    console.log(e);
    throw new Error('Error a la hora de inicializar la base de datos');
  };
};

module.exports = {dbConnection};