import { Inject, Injectable } from '@nestjs/common';
import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { EnvService } from '~modules/core/env.service';

// The data source class
@Injectable()
export class AmbeeApi extends RESTDataSource {

    constructor(
        @Inject(EnvService) protected readonly envService: EnvService,
    ) {
        super();
        this.baseURL = this.envService.get('API_ENDPOINT');
    }

    willSendRequest(request: RequestOptions) {
        request.headers.set('x-api-key', this.envService.get('API_KEY'));
        request.headers.set('Content-type', 'application/json');
    }

    async getAirQuality(lat: string, lng: string) {
        const params = { lat, lng };
        const response: AirQualityReponse = await this.get(`/latest/by-lat-lng`, params);
        return response.stations[0];
    }
}

interface AirQualityReponse {
    message: string,
    stations: Array<any>
  }