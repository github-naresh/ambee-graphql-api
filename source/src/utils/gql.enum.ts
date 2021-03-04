import { registerEnumType } from '@nestjs/graphql';

export enum Device {
    browser = 'browser',
    mobile = 'mobile'
}

export const registerEnum = () => {
    registerEnumType(Device, {
        name: 'Device',
    });
}
