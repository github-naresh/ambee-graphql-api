import { Module } from '@nestjs/common';
import { CoreModule } from '~modules/core/core.module';
import { AmbeeApi } from './ambee.api.';

@Module({
    imports: [CoreModule],
    providers: [AmbeeApi],
})
export class DataSourcesModule { }
