
// src/modules/match_results/dto/update-match_result.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateMatchResultDto } from './create-match_result.dto';

export class UpdateMatchResultDto extends PartialType(CreateMatchResultDto) { }
