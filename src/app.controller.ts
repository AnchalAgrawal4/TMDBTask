import { Controller, Get, Param } from '@nestjs/common';
import { topEpisodesServices } from './services/top-episodes/top-episodes.service';
import { PopularSeriesService } from './services/popular-series/popular-series.service';

@Controller()
export class AppController {
  constructor(
    private readonly topEpisodesService: topEpisodesServices,
    private readonly popularSeriesService: PopularSeriesService,
  ) {}

  @Get('topEpisodes/:SeriesId')
  async getTopEpisodes(@Param('SeriesId') params) {
    const data = this.topEpisodesService.getData(params.toString());
    const tvSeries = await data.then(result => result).catch(error => error);
    let seasonsLength = tvSeries.seasons.length;
    let allSeasons = [];
    for (let i = 0; i < seasonsLength; i++) {
      const seasonsData = await this.topEpisodesService
        .getSeasonsData(params.toString(), i.toString())
        .then(result => result);
      allSeasons.push(seasonsData.episodes);
    }

    let allEpisodes = [];
    for (let i = 0; i < allSeasons.length; i++) {
      for (let j = 0; j < allSeasons[i].length; j++) {
        allEpisodes.push(allSeasons[i][j]);
      }
    }
    let episodeData = [];
    let response = new Map();
    allEpisodes.forEach(function(episode) {
      response.set(episode.vote_average, episode.name);
    });
    let mapAsc = new Map([...response.entries()].sort().reverse());
    mapAsc.forEach((value: string, key: number) => {
      let tv: Tv = { episodeName: '', averageVotes: 0 };
      tv.averageVotes = key;
      tv.episodeName = value;
      episodeData.push(tv);
    });
    return episodeData.slice(0, 20);
  }

  @Get('analytics/popularSeries')
  async getPopularSeries() {
    const data = await this.popularSeriesService
      .getPopularSeriesData()
      .then(response => response.results.slice(0, 5))
      .catch(error => error);

    let popularSeries = new Map();
    data.forEach(function(series) {
      popularSeries.set(series.original_name, series.popularity);
      console.log(series.original_name);
    });
    let fivePopularSeries = [];
    popularSeries.forEach((value: number, key: string) => {
      let popularSeriesInterface: PopularSeries = {
        seriesName: '',
        accessCount: 0,
      };
      popularSeriesInterface.seriesName = key;
      popularSeriesInterface.accessCount = value;
      fivePopularSeries.push(popularSeriesInterface);
    });
    return fivePopularSeries;
  }
}

export interface Tv {
  episodeName: string;
  averageVotes: number;
}

export interface PopularSeries {
  seriesName: string;
  accessCount: number;
}
