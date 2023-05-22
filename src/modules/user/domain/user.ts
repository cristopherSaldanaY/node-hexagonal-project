import { IEntity } from '../../shared/entity.interface'
import { EmailVO } from './value-objects/email.VO'

/* Estructura de datos */
/* Principio solid: Interface Segregation */
interface UserRequired {
	name: string
	lastname: string
	email: EmailVO
	password: string
}

interface UserOptional {
	refreshToken: string
	active: boolean
	guid: string
}

interface UserUpdate {
	name: string
	lastname: string
	password: string
}

export type UserProperties = Required<UserRequired> & Partial<UserOptional> /* no se pueden implementar, definicion de tipado solamente */

export default class User implements IEntity<UserProperties, UserUpdate> { /* definiciones de un usuario */
	private name: string
	private lastname: string
	private readonly email: EmailVO /* readonly para que cuando se genere se pueda leer pero no modificar */
	private password: string
	private refreshToken: string /* tener token */
	private active: boolean /* saber si esta activo */
	private readonly guid: string /* identificador unico, es un hash, tampoco cambiara por eso el readonly */

	/* definicion de inicialización */
	constructor(userProperties: UserProperties) {
		this.active = true /* cuando se crea un usuario el active viene en true */
		Object.assign(this, userProperties) /* inicializacion y asignacion de los datos */
	}

	properties(): UserProperties {
		return {
			name: this.name,
			lastname: this.lastname,
			email: this.email,
			password: this.password,
			refreshToken: this.refreshToken,
			active: this.active,
			guid: this.guid,
		}
	}

	/* apuntaremos a nuestro objeto de contexto, le damos el targety le pasaremos como fuente datos fields */
	update(fields: UserUpdate) {
		Object.assign(this, fields)
	}

	//soft-delete
	delete() {
		this.active = false
	}
}
