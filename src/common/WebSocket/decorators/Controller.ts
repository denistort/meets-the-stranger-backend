import 'reflect-metadata';

export interface IControllerMetaData {
	prefix: string;
	uniqueSymbol: Symbol;
	created_at: string;
	name: string;
}

export interface DecoratorControllerProps {
	uniqueSymbol: Symbol;
	prifex?: string;
}
export function Controller(props: DecoratorControllerProps) {
	return (constructor: Function) => {
		const controllerMetaData: IControllerMetaData = {
			prefix: props.prifex || '',
			uniqueSymbol: props.uniqueSymbol,
			created_at: new Date().toLocaleDateString(),
			name: constructor.name,
		};
		const methodsNames = Object.getOwnPropertyNames(constructor.prototype).filter(
			(methodName) => methodName !== 'constructor'
		);
		console.log(methodsNames);
		console.log(Reflect.getMetadataKeys(constructor));

		Reflect.defineMetadata('controllerMetaData', controllerMetaData, constructor.prototype);
	};
}
