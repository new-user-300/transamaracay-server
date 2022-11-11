import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Reservacion } from 'source/modules/reservaciones/entities/reservacione.entity';

const pathEnv = process.env.NODE_ENV || 'development';

require('dotenv').config({ path: `${pathEnv}.env` });

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;

const extra =
	pathEnv === 'production'
		? {
				ssl: {
					rejectUnauthorized: 'false',
				},
		  }
		: {};

export const dataSourceTypeOrm: DataSourceOptions = {
	namingStrategy: new SnakeNamingStrategy(),
	type: 'mysql',
	host: DB_HOST,
	port: parseInt(DB_PORT),
	username: DB_USER,
	password: DB_PASSWORD,
	database: DB_DATABASE,
	entities: [Reservacion],
	synchronize: false,
	migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
	migrationsRun: pathEnv === 'development' ? true : false,
	extra,
	logging: pathEnv === 'development' ? true : false,
};

export default new DataSource(dataSourceTypeOrm);
