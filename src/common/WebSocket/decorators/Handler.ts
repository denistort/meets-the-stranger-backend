import 'reflect-metadata';

export interface HandlerMetaData {
	handler: <T>(data: T) => void;
	event: 'index' | string;
	key: string;
}

export function Handler(name: string | undefined) {
	return (target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
		const key = `${name}:handler`;
		const meta: HandlerMetaData = {
			handler: descriptor.value,
			key,
			event: name || 'index',
		};

		Reflect.defineMetadata(key, meta, target);
	};
}
