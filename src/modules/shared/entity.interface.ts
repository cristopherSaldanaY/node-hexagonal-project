/* generico para usar sus metodos */
export interface IEntity<Properties, PropertiesUpdate> {
	properties: () => Properties
	delete: () => void
	update: (fields: PropertiesUpdate) => void /* recibe fields de tipo PropertiesUpdate */
}
