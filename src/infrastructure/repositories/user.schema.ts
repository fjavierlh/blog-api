import { DataTypes } from 'sequelize';
import sequelize from '../config/postgres';

const UserModel = sequelize.define('users', {
	id: {
		type: DataTypes.UUID,
		allowNull: false,
		primaryKey: true
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	role: {
		type: DataTypes.ENUM('ADMIN', 'PUBLISHER'),
		allowNull: false
	}
});

export { UserModel };