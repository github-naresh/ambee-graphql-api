import { Module, HttpModule } from '@nestjs/common';
import { AmbeeResolver } from './abmee.resolver';
import { AmbeeService } from './ambee.service';
import { CoreModule } from '~modules/core/core.module';
import { DataSourcesModule } from '~modules/data-sources/data-sources.module';

@Module({
    imports: [CoreModule, HttpModule, DataSourcesModule],
    providers:[AmbeeResolver, AmbeeService]
})
export class AmbeeModule {}
