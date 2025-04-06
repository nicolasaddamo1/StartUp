// src/modules/points/dto/update-point.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreatePointDto } from './create-point.dto';

export class UpdatePointDto extends PartialType(CreatePointDto) { }
