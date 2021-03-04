import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AirQuality {

    @Field({ nullable: true })
    NQ2: number;

    @Field({ nullable: true })
    PM10: number;

    @Field({ nullable: true })
    PM25: number;

    @Field({ nullable: true })
    CO: number;

    @Field({ nullable: true })
    SO2: number;

    @Field({ nullable: true })
    OZONE: number;

    @Field({ nullable: true })
    AQI: number;

    @Field({ nullable: true })
    updatedAt: string;
}