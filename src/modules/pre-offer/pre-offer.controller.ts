import { Socket } from 'socket.io';
import { Controller } from '../../common/WebSocket/decorators/Controller';
import { Handler } from '../../common/WebSocket/decorators/Handler';
import { StoreType } from '../../Store/store';
import { PreOfferRequest, WsEventTypes } from '../../WebSocket/types';
import { messageFactory } from '../../WebSocket';
import { getNotFoundUserMessage } from '../../WebSocket/constants';

@Controller({
	prifex: 'pre-offer',
	uniqueSymbol: Symbol.for('pre-offer-controller'),
})
export class PreOfferController {
	socket: Socket;
	store: StoreType;

	constructor(socket: Socket, store: StoreType) {
		this.socket = socket;
		this.store = store;
	}

	@Handler('index')
	index({ type, whoCall, callable }: PreOfferRequest) {
		
		// Searching for existing user;
		let existCallable = false;
		this.store.getState().connectedPeers.forEach((id) => {
			if (id === callable) {
				existCallable = true;
			}
		});

		if (existCallable) {
			const msg = messageFactory.preOfferMessage(whoCall, type);
			this.socket.to(callable).emit(WsEventTypes.PRE_OFFER, msg);
		} else {
			const msg = messageFactory.preOfferErrorMessage(getNotFoundUserMessage(callable));
			this.socket.emit(WsEventTypes.PRE_OFFER_ERROR, msg);
		}
	}

	@Handler('wewe')
	log() {}

	@Handler('wewqweq')
	close() {}
}
