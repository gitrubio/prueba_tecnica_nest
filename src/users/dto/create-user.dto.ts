import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"
import { trimStrings } from "src/utils"

export class CreateUserDto {

    @Transform(({ value }) => trimStrings(value))
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string
}
