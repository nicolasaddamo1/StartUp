import { PartialType } from '@nestjs/mapped-types';
import { CreateUserTeamDto } from './create-user-team.dto';

export class UpdateUserTeamDto extends PartialType(CreateUserTeamDto) { }
