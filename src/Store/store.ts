export const makeStore = () => {
	let state = {
		connectedPeers: new Set<string>(),
	};

	type State = typeof state;
	type Subscriber = (state: State) => void;

	const subscribers = new Set<Subscriber>();

	const subscribe = (subscriber: Subscriber) => {
		subscribers.add(subscriber);
	};
	const unsubscribe = (subscriber: Subscriber) => {
		subscribers.delete(subscriber);
	};
	const notify = () => {
		subscribers.forEach((subscriber) => subscriber(getState()));
	};
	// Getters
	const getState = (): State => state;

	// Setters
	const addConnectedPeer = (peer: string): void => {
		const newPeers = new Set([...state.connectedPeers, peer]);
		state = {
			...state,
			connectedPeers: newPeers,
		};
		notify();
	};

	const removeConnectedPeer = (peer: string): void => {
		const newPeers = new Set([...state.connectedPeers].filter((id) => id !== peer));
		state = {
			...state,
			connectedPeers: newPeers,
		};
		notify();
	};

	return {
		getState,
		addConnectedPeer,
		removeConnectedPeer,
		subscribe,
		unsubscribe,
	};
};

export type StoreType = ReturnType<typeof makeStore>;
