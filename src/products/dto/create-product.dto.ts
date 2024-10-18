import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { trimStrings } from "src/utils";

export class CreateProductDto {

    @Transform(({ value }) => trimStrings(value))
    @IsString()
    @IsNotEmpty()
    name: string;

    @Transform(({ value }) => trimStrings(value))
    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsPositive()
    price: number;
    
    @IsInt()
    @IsPositive()
    stock: number;
}
