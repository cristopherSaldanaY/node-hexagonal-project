import { Router } from 'express'
import UserApplication from '../../application/user.application'
import { UserRepository } from '../../domain/user.repository'
import UserInfraestructure from '../../infraestructure/user.infraestructure'
import userController from './user.controller'

const infraestructure: UserRepository = new UserInfraestructure()
const application = new UserApplication(infraestructure)
const controller = new userController(application)

class UserRouter {
	readonly expressRouter: Router

	constructor() {
		this.expressRouter = Router()
	}

	mountRoutes() {
		//this.expressRouter.post('/', controller.insert())
	}
}

export default new UserRouter().expressRouter

