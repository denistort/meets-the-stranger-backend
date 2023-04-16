import { messageFactory } from '..';
import { getNotFoundUserMessage } from '../constants';
import { HandlerExecuteContext, IHandler, PreOfferRequest, WsEventTypes } from '../types';

export class PreOfferHandler implements IHandler {
	public type = 'pre-offer';

	execute(context: HandlerExecuteContext): void {
		const { type, whoCall, callable } = context.data as unknown as PreOfferRequest;
		// Searching for existing user;
		let existCallable = false;
		context.store.getState().connectedPeers.forEach((id) => {
			if (id === callable) {
				existCallable = true;
			}
		});

		if (existCallable) {
			const msg = messageFactory.preOfferMessage(whoCall, type);
			context.socket.to(callable).emit(WsEventTypes.PRE_OFFER, msg);
		} else {
			const msg = messageFactory.preOfferErrorMessage(getNotFoundUserMessage(callable));
			context.socket.emit(WsEventTypes.PRE_OFFER_ERROR, msg);
		}
	}
}
