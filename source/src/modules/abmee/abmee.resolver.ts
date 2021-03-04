import { Args, Context, Info, Query, Resolver } from '@nestjs/graphql';
import { DataSources } from '~modules/data-sources/data-sources';
import { AirQuality } from './abmee.model';


@Resolver()
export class AmbeeResolver {
    @Query(() => AirQuality)
    async getAirQuality(
        @Context('dataSources') { ambeeApi }: DataSources,
        @Info() info: any,
        @Args('lat', { type: () => String }) lat: string,
        @Args('long', { type: () => String }) long: string
    ): Promise<AirQuality> {
        info.cacheControl.setCacheHint({ maxAge: 3600, scope: 'PUBLIC' });
        return await ambeeApi.getAirQuality(lat, long);
    }
}