import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class PopularSeriesService {
  constructor(private readonly httpService: HttpService) {}

  async getPopularSeriesData() {
    const response = await this.httpService
      .get(
        'https://api.themoviedb.org/3/tv/popular?api_key=0b5e220ef1b6902418e6223846fb0742&language=en-US&page=1',
      )
      .toPromise();
    return response.data;
  }
}
