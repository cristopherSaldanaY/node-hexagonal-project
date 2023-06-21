import DatabaseBootstrap from '../../../bootstrap/database.bootstrap'
import { UserEmailInvalidException, UserNotFoundException } from '../domain/exceptions/user.exception'
import User, { UserUpdate } from '../domain/user'
import { UserRepository } from '../domain/user.repository'
import { EmailVO, EmailResult } from '../domain/value-objects/email.vo'
import { UserEntity } from './user.entity'
import { Result, err, ok } from 'neverthrow'

/* implementamos UserRepository ya que tiene los contratos definidos */
/* Aqui es donde se implementan */
export default class UserInfraestructure implements UserRepository {
	async insert(user: User): Promise<User> {
		const userInsert = new UserEntity()
		const { guid, name, lastname, email, password, refreshToken, active } = user.properties()
		Object.assign(userInsert, {
			guid,
			name,
			lastname,
			email: email.value,
			password,
			refreshToken,
			active,
		})

		await DatabaseBootstrap.dataSource.getRepository(UserEntity).save(userInsert)
		return user
	}

	async list(): Promise<User[]> {
		const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)
		const result = await repo.find({ where: { active: true } })

		return result.map((element: UserEntity) => {
			const emailResult = EmailVO.create(element.email)

			// neverTrow
			if (emailResult.isErr()) {
				throw new UserEmailInvalidException()
			}

			return new User({
				guid: element.guid,
				name: element.name,
				lastname: element.lastname,
				email: emailResult.value,
				password: element.password,
				refreshToken: element.refreshToken,
				active: element.active,
			})
		})
	}

	async listOne(guid: string): Promise<Result<User, UserNotFoundException>> {
		const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)

		const result = await repo.findOne({ where: { guid } })
		const EmailResult = EmailVO.create(result.email)

		if (EmailResult.isErr()) {
			return err(new UserEmailInvalidException())
		}

		if (!result) {
			return err(new UserNotFoundException())
		} else {
			return ok(
				new User({
					guid: result.guid,
					name: result.name,
					lastname: result.lastname,
					email: EmailResult.value,
					password: result.password,
					refreshToken: result.refreshToken,
					active: result.active,
				}),
			)
		}
	}

	async update(guid: string, user: Partial<UserUpdate>): Promise<Result<User, UserNotFoundException>> {
		const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)

		const userFound = await repo.findOne({ where: { guid } })

		if (userFound) {
			Object.assign(userFound, user)
			const userEntity = await repo.save(userFound)
			const EmailResult = EmailVO.create(userEntity.email)

			if (EmailResult.isErr()) {
				return err(new UserEmailInvalidException())
			}

			return ok(
				new User({
					guid: userEntity.guid,
					name: userEntity.name,
					lastname: userEntity.lastname,
					email: EmailResult.value,
					password: userEntity.password,
					refreshToken: userEntity.refreshToken,
					active: userEntity.active,
				}),
			)
		}
	}

	async delete(guid: string): Promise<Result<User, UserNotFoundException>> {
		const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)

		const userFound = await repo.findOne({ where: { guid } })

		if (userFound) {
			userFound.active = false
			const userEntity = await repo.save(userFound)
			const EmailResult = EmailVO.create(userEntity.email)

			if (EmailResult.isErr()) {
				return err(new UserEmailInvalidException())
			}

			return ok(
				new User({
					guid: userEntity.guid,
					name: userEntity.name,
					lastname: userEntity.lastname,
					email: EmailResult.value,
					password: userEntity.password,
					refreshToken: userEntity.refreshToken,
					active: userEntity.active,
				}),
			)
		} else {
			return err(new UserNotFoundException())
		}
	}
}
