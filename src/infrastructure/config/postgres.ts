import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://pguser:pguser@localhost:5432/pgdb');

sequelize.authenticate()
	.then(() => console.log('Connection success'))
	.catch(err =>  console.log(err));

sequelize.sync({force: true})
	.then(() => console.log('Databases and tables created'))
	.catch(err => console.log(err));

export default sequelize;
