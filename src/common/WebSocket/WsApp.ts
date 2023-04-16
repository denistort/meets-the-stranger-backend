import 'reflect-metadata';
import { Server } from 'socket.io';
import { Container } from 'inversify';

import { StoreType } from '../../Store/store';
import { MetaDataKeys } from './decorators/metadata.constants';
import { ModuleMetaData } from './decorators/Module';
import { IControllerMetaData } from './decorators/Controller';
import { HandlerMetaData } from '../../common/WebSocket/decorators/Handler';


export class WsApp {
	ioServer: Server;
	store: StoreType;
	modules: Set<ModuleMetaData> = new Set();
	handlers: Set<Omit<HandlerMetaData, 'key'>> = new Set();
	container: Container = new Container();

	constructor(server: any, store: StoreType) {
		this.ioServer = new Server(server, {
			cors: {
				origin: '*',
				methods: ['GET', 'POST'],
				allowedHeaders: ['my-custom-header'],
			},
		});
		this.store = store;
	}

	public addRootModule(module: any): WsApp {
		const keys = Reflect.getMetadataKeys(new module());
		if (keys.length === 0) {
			throw Error('This is not a module');
		}
		const metadataKey = keys.at(0);
		if (metadataKey !== MetaDataKeys.MODULE_META_DATA) {
			throw Error('Metadata key is not a module-meta-data');
		}
		//
		this.traverse(module);
		this.registerControllers();
		this.registerListeners();
		//
		return this;
	}

	private traverse(constructorModule: any) {
		let created;
		if (typeof constructorModule === 'object') {
			created = constructorModule
		}
		if (typeof constructorModule === 'function') {
			created = new constructorModule();
		}

		const keys = Reflect.getMetadataKeys(created);
		if (keys.length === 0) {
			throw Error('This is not a module');
		}
		const metadataKey = keys.at(0);
		if (metadataKey !== MetaDataKeys.MODULE_META_DATA) {
			throw Error('Metadata key is not a module-meta-data');
		}
		const metadata: ModuleMetaData = Reflect.getMetadata(metadataKey, created);
		console.log(metadata);
		this.modules.add(metadata);

		if (metadata.childModules.length > 0) {
			metadata.childModules.forEach((module) => {
				this.traverse(module);
			});
		}
	}

	private registerControllers() {
		this.modules.forEach((module) => {
			const controllers = module.controllers;
			controllers.forEach((controller) => {
				const c = new controller(this.ioServer, this.store);
				const keys = Reflect.getMetadataKeys(c);
				const controllerMeta: IControllerMetaData = Reflect.getMetadata('controllerMetaData', c);

				const filtered = keys.filter((key) => key !== 'controllerMetaData');

				filtered.forEach((key) => {
					const meta: HandlerMetaData = Reflect.getMetadata(key, c);
					const modifiedMeta = {
						event:
							meta.event === 'index'
								? controllerMeta.prefix
								: controllerMeta.prefix + '.' + meta.event,
						handler: meta.handler.bind(c),
					};
					this.handlers.add(modifiedMeta);
					console.log(modifiedMeta);
				});
			});
		});
	}
	private registerListeners() {
		this.ioServer.on('connection', (socket) => {
			console.log(`User with id ${socket.id} is conneted`);

			this.store.addConnectedPeer(socket.id);
			// register;
			this.handlers.forEach(({ event, handler }) => {
				console.log(event);
				socket.on(event, (data: any) => handler(data));
				console.log(`HANDLER FOR ${event} binded ${new Date().toLocaleDateString()}`);
			});
			//
			socket.on('disconnect', () => {
				this.store.removeConnectedPeer(socket.id);
			});
		});
	}
}
