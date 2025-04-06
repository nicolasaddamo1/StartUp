import { PartialType } from '@nestjs/mapped-types';
import { CreateUserTeamDto } from './user-team.dto';

export class UpdateUserTeamDto extends PartialType(CreateUserTeamDto) { }
