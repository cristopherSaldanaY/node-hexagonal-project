import { UserOptional } from '../interfaces/userOptional.interface'
import { UserRequired } from '../interfaces/userRequireed.interface'

export type UserProperties = Required<UserRequired> & Partial<UserOptional>

