import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, } from "class-validator";

export class PaginationDto {


    @Transform(({value}) => value && parseInt(value))
    @IsNumber()
    @IsPositive()
    @IsOptional()
    offset: number = 1;

    @Transform(({value}) => value && parseInt(value))
    @IsNumber()
    @IsPositive()
    @IsOptional()
    limit: number = 10;

}
