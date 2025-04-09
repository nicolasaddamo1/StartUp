import { IsOptional, IsString } from "class-validator";

export class CreateClubDto {

    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsString()
    escudo_url?: string;

}