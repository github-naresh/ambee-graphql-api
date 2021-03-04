import { Inject, Injectable, Logger } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { EnvService } from './env.service';

@Injectable()
export class AwsService {

  protected RETRIES = 3;
  private logger = new Logger(AwsService.name);

  constructor(@Inject(EnvService) protected readonly envService: EnvService) { }

  async storeAirQualityData(stats: any) {
    const configuration = {
      region: this.envService.get('AWS_REGION'),
    };

    if (
      this.envService.get('AWS_ENPOINT') !== '' &&
      this.envService.get('AWS_ENPOINT') !== undefined
    ) {
      configuration[`endpoint`] = this.envService.get('AWS_ENPOINT');
    }

    try {
      const client = new DynamoDB.DocumentClient(configuration);
      const params = {
        TableName: 'air_quality',
        Key: {
          stats,
        },
      };
      return (await client.get(params).promise()).Item;
    } catch (error) {
      this.logger.error({ error });
    }

    return null;
  }
}