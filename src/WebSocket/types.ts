import { Socket } from 'socket.io';
import { StoreType } from '../Store/store';

export interface IHandler {
	type: 'index' | string;
	execute: (context: HandlerExecuteContext) => void;
}

export interface IController {
	socket: Socket;
	store: StoreType;
}

export interface IControllerConstructor {
	new (socket: Socket, store: StoreType): IController
}

export interface HandlerExecuteContext {
	data: any;
	socket: Socket;
	store: StoreType;
}

export enum CallType {
	CHAT_PERSONAL_CODE = 'CHAT_PERSONAL_CODE',
	CHAT_STRANGER = 'CHAT_STRANGER',
	//
	VIDEO_PERSONAL_CODE = 'VIDEO_PERSONAL_CODE',
	VIDEO_STRANGER = 'VIDEO_STRANGER',
}

export enum WsEventTypes {
	/**
	 * PREOFFER
	 */
	PRE_OFFER = 'pre-offer',
	PRE_OFFER_ERROR = 'pre-offer.error',
	PRE_OFFER_REJECT = 'pre-offer.reject',
	PRE_OFFER_ACCEPT = 'pre-offer.accept',
}

/**
 *
 * MESSAGES
 */
export interface PreOfferRequest {
	type: CallType;
	whoCall: string;
	callable: string;
}

export type PreOfferResponse = Omit<PreOfferRequest, 'callable'>;

// ERROR
export type PreOfferErrorResponse = {
	message: string;
};

export interface AcceptOfferResponse {
	callableId: string;
	whoCallId: string;
}
export interface RejectOfferResponse {
	callableId: string;
	whoCallId: string;
}
