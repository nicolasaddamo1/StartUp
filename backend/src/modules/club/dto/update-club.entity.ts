import { IsOptional, IsString } from "class-validator";

export class UpdateClubDto {

    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsString()
    escudo_url?: string;

}