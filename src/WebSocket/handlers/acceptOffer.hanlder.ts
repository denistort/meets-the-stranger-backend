import { HandlerExecuteContext, IHandler, WsEventTypes } from "../types";

export class AcceptOfferHandler implements IHandler {
	type = WsEventTypes.PRE_OFFER_ACCEPT;

	execute(context: HandlerExecuteContext): void {};
	
}