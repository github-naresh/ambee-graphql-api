import { HttpException, HttpService, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '~modules/core/config.service';
import { EnvService } from '~modules/core/env.service';

@Injectable()
export class AmbeeService {
    private logger = new Logger(AmbeeService.name);

    constructor(
        @Inject(EnvService) protected readonly envService: EnvService,
        @Inject(HttpService) protected readonly httpService: HttpService,
        @Inject(ConfigService) protected readonly configService: ConfigService,
    ) { }


    async getAirQuality(lat: string, long: string) {
        try {

            const url = `${this.envService.get('API_ENDPOINT')}/latest/by-lat-lng`;
            const options = {
                params: { lat, long },
                headers: { 'x-api-key': this.envService.get('API_KEY'), 'Content-type': 'application/json' }
            };
            const resp = await this.httpService.get(url, options).toPromise();
            return resp.data;
        } catch (error) {
            this.logger.error({ error });
            throw new HttpException('Please try again later.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
