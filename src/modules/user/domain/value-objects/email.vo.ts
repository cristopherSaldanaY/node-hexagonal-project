import { ValueObject } from './vo.class'

interface EmailProps {
	value: string
}

export class EmailVO extends ValueObject<EmailProps> {
	/* super con el constructor de la clase padre por eso pasamos props */
	private constructor(props: EmailProps) {
		super(props)
	}

	/* definimos metodos, le damos el metodo creacional */
	static create(email: string) {
		if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi)) {
			throw new Error('Its not a valid email address')
		}

		return new EmailVO({ value: email })
	}

	/* acceder al valor */
	get value(): string {
		return this.props.value
	}
}


