import { IsNotEmpty, IsUUID, IsString, IsInt, Min } from 'class-validator';

export class CreateUserTeamDto {
    @IsUUID()
    userId: string;

    @IsString()
    @IsNotEmpty()
    teamName: string;

}
