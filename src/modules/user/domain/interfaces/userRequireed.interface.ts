import { EmailVO } from '../value-objects/email.vo'

// Principio SOLID: Interface Segregation
export interface UserRequired {
	name: string
	lastname: string
	email: EmailVO
	password: string
}

