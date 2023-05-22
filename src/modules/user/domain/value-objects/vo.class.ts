
export abstract class ValueObject<Props> {

	/* solo tendran acceso las clases hijas que hereden, y solo pueden leer */
	protected readonly props: Props

	constructor(props: Props){
		this.props = Object.freeze(props) /* con freeze si detecta un problema se detiene */
	}
}
