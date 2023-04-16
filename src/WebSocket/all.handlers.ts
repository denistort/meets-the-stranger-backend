import { AcceptOfferHandler } from './handlers/acceptOffer.hanlder.js';
import { PreOfferHandler } from './handlers/preOffer.handler.js';
import { RejectOfferHandler } from './handlers/rejectOffer.handler.js';
import { IHandler } from './types';

export const allHandlers = new Set<IHandler>([
	new PreOfferHandler(),
	new AcceptOfferHandler(),
	new RejectOfferHandler(),
]);
