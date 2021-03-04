import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { EnvService } from './env.service';
import { AwsService } from './aws.service';

@Module({
  providers: [
    AwsService,
    {
      provide: ConfigService,
      useValue: new ConfigService(),
    },
    {
      provide: EnvService,
      useValue: new EnvService(),
    },
  ],
  exports: [AwsService, ConfigService, EnvService],
})
export class CoreModule { }
