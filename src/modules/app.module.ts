import { Module } from '../common/WebSocket/decorators/Module';
import { PreOfferModule } from './pre-offer/pre-offer.module';

@Module({
	controllers: [],
	childModules: [PreOfferModule],
	services: [],
})
export class AppModule {}
