import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthGuard } from '~guards/auth.guard';
import { CoreModule } from '~modules/core/core.module';
import { DataSourcesModule } from '~modules/data-sources/data-sources.module';
import { config } from '~utils/gql.config';
import { AmbeeModule } from '~modules/abmee/ambee.module';

@Module({
  imports: [
    CoreModule,
    DataSourcesModule,
    AmbeeModule,
    GraphQLModule.forRoot(config),
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },]
})
export class AppModule { }
