import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class topEpisodesServices {
  constructor(private readonly httpService: HttpService) {}

  async getData(id: string) {
    const response = await this.httpService
      .get(
        'https://api.themoviedb.org/3/tv/' +
          id +
          '?api_key=0b5e220ef1b6902418e6223846fb0742&language=en-US',
      )
      .toPromise();
    return response.data;
  }

  async getSeasonsData(id: string, seasonId: string) {
    const response = await this.httpService
      .get(
        'https://api.themoviedb.org/3/tv/' +
          id +
          '/season/' +
          seasonId +
          '?api_key=0b5e220ef1b6902418e6223846fb0742&language=en-US',
      )
      .toPromise();
    return response.data;
  }
}
