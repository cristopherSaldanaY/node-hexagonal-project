import { DataSource } from 'typeorm'

export abstract class Bootstrap { /* Clase Abstracta  */
	/* Design Pattern: Facade: https://refactoring.guru/es/design-patterns/facade */
	abstract initialize(): Promise<string | Error | DataSource> /* metodo abstracto, que retornara un mensaje o un error o una configuracion de bd */

}
