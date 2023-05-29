import { DataSource } from 'typeorm'
import { Bootstrap } from './base.bootstrap'

let appDataSource: DataSource

export default class extends Bootstrap {
	/* metodo abstracto heredado */
	initialize(): Promise<DataSource> {
		const AppDataSource = new DataSource({
			/* configuracion de conexión */ type: 'mysql',
			host: 'localhost',
			port: 3308,
			username: 'adminUser',
			password: '12345',
			database: 'bddnode',
			synchronize: true,
			logging: true,
			entities: [],
			migrations: [],
			subscribers: [],
		})

		appDataSource = AppDataSource

		return AppDataSource.initialize()
	}

	static get dataSource(): DataSource {
		return appDataSource
	}
}
