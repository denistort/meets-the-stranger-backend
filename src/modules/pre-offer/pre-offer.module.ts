import { Module } from '../../common/WebSocket/decorators/Module';
import { AfterOfferModule } from './after-offer/after-offer.module';
import { PreOfferController } from './pre-offer.controller';
import { PreOfferService } from './pre-offer.service';

@Module({
	childModules: [AfterOfferModule],
	controllers: [PreOfferController],
	services: [PreOfferService],
})
export class PreOfferModule {}