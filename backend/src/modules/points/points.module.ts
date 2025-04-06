// src/modules/points/points.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';
import { Point } from 'src/entity/points.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Point])],
  controllers: [PointsController],
  providers: [PointsService],
})
export class PointsModule { }
