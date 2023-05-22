import User, { UserProperties } from '../domain/user';
import { UserRepository } from '../domain/user.repository'

/* implementamos UserRepository ya que tiene los contratos definidos */
/* Aqui es donde se implementan */
export default class UserInfraestructure implements UserRepository {
	list(): Promise<UserProperties[]> {
		throw new Error('Method not implemented.');
	}
	listOne(guid: string): Promise<User> {
		throw new Error('Method not implemented.');
	}
	insert(user: User): Promise<User> {
		throw new Error('Method not implemented.');
	}
	update(user: User): Promise<User> {
		throw new Error('Method not implemented.');
	}
	delete(guid: string): Promise<User> {
		throw new Error('Method not implemented.');
	}
}
