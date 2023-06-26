// Design patern Singleton: https://refactoring.guru/es/design-patterns/singleton
export abstract class DTO<Properies, DTO>{
	abstract execute(data: Properies): DTO // Design pattern Facade
}

