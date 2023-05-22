import {validate as uuidValidate } from 'uuid'
import { ValueObject } from './vo.class'

interface GuidProps {
	value: string
}

export class GuidVO extends ValueObject<GuidProps> {

	private constructor(props: GuidProps){
		super(props)
	}

	static create(guid: string){

		if(!uuidValidate(guid)){
			throw new Error('its not a valid guid')
		}

		return new GuidVO({value: guid})
	}

	get value(): string {
		return this.props.value
	}
}