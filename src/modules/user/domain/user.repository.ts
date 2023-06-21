import { UserNotFoundException } from './exceptions/user.exception';
import User, { UserUpdate } from './user'
import { Result } from 'neverthrow';

/* Principio SOLID: INVERSION DEPENDENCY */
export interface UserRepository {
	/* DESIGN PATTERN: Facade */
	insert(user: User): Promise<User>
	list(): Promise<User[]>
	listOne(guid: string): Promise<Result<User, UserNotFoundException>>
	update(guid: string, user: Partial<UserUpdate>): Promise<Result<User, UserNotFoundException>>
	delete(guid: string): Promise<Result<User, UserNotFoundException>>
}


