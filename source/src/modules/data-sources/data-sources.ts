import { EnvService } from '~modules/core/env.service';
import { AmbeeApi } from './ambee.api.';

export interface DataSources {
    ambeeApi: AmbeeApi;
}

export const getDataSources = (envService: EnvService) => {
    return () => ({
        ambeeApi: new AmbeeApi(envService),
    });
};