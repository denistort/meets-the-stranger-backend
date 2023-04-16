import 'reflect-metadata';
import { MetaDataKeys } from './metadata.constants';

export interface ModuleMetaData {
	created_at: string;
	name: string;
	childModules: Function[];
	controllers: any[];
	services: any[];
}

export interface ModuleProps {
	controllers: any[];
	childModules: Function[];
	services: any[];
}

export function Module(props: ModuleProps) {
	return (constructor: Function) => {
		const moduleMetaData: ModuleMetaData = {
			controllers: props.controllers,
			childModules: props.childModules,
			services: props.services,
			created_at: new Date().toLocaleDateString(),
			name: constructor.name,
		};
		Reflect.defineMetadata(MetaDataKeys.MODULE_META_DATA, moduleMetaData, constructor.prototype);
	};
}
