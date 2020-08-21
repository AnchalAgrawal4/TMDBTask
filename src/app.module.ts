import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { topEpisodesServices } from './services/top-episodes/top-episodes.service';
import { PopularSeriesService } from './services/popular-series/popular-series.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, topEpisodesServices, PopularSeriesService],
})
export class AppModule {}
