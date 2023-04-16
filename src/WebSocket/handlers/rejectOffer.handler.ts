import { messageFactory } from '..';
import { HandlerExecuteContext, IHandler, RejectOfferResponse, WsEventTypes } from '../types';

export class RejectOfferHandler implements IHandler {
	type = WsEventTypes.PRE_OFFER_REJECT;

	execute(context: HandlerExecuteContext): void {
		const { whoCallId, callableId } = context.data as RejectOfferResponse;
		console.log('REJECT', context.data);
		const msg = messageFactory.RejectOfferMessage(whoCallId, callableId);

		if (whoCallId === context.socket.id) {
			context.socket.emit(WsEventTypes.PRE_OFFER_REJECT, msg);
		} else {
			context.socket.to(whoCallId).emit(WsEventTypes.PRE_OFFER_REJECT, msg);
		}

		if (callableId === context.socket.id) {
			context.socket.emit(WsEventTypes.PRE_OFFER_REJECT, msg);
		} else {
			context.socket.to(callableId).emit(WsEventTypes.PRE_OFFER_REJECT, msg);
		}
	}
}
