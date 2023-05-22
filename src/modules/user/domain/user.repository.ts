import User, { UserProperties } from './user'

/* Principio SOLID: INVERSION DEPENDENCY */
export interface UserRepository {
	/* DESIGN PATTERN: Facade */
	list(): Promise<UserProperties[]>
	listOne(guid: string): Promise<User>
	insert(user: User): Promise<User>
	update(user: User): Promise<User>
	delete(guid: string): Promise<User>
}


