import { CallType, PreOfferErrorResponse, PreOfferResponse, RejectOfferResponse } from './types';

export class MessageFactory {
	public preOfferMessage(whoCall: string, type: CallType): PreOfferResponse {
		return {
			whoCall,
			type,
		};
	}

	public preOfferErrorMessage(message: string): PreOfferErrorResponse {
		return {
			message,
		};
	}

	public RejectOfferMessage(whoCallId: string, callableId: string): RejectOfferResponse {
		return {
			whoCallId,
			callableId,
		};
	}
}
