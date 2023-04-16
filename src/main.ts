import express from 'express';
import http from 'http';
import { join } from 'path';
import cors from 'cors';
import { makeStore } from './Store/store.js';
import { WsApp } from './common/WebSocket/WsApp.js';
import { AppModule } from './modules/app.module.js';

const PORT = parseInt(process.env.PORT as string, 10) || 3000;

const app = express();
const server = http.createServer(app);

export const store = makeStore();
const wsApp = new WsApp(server, store);
wsApp.addRootModule(AppModule);

store.subscribe((state) => {
	console.log(state.connectedPeers, 'Стор обновился');
});

app.use(cors());
app.use(express.static(join(__dirname, '../public')));

app.get('/', (_req, res) => {
	const indexHtmlPath = join(__dirname, '../public/index.html');
	res.sendFile(indexHtmlPath);
});

server.listen(PORT, () => {
	console.log(`Applcation started on ${PORT}`);
});
