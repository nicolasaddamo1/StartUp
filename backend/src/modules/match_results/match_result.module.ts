// src/modules/match_results/match_result.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchResultService } from './match_result.service';
import { MatchResultController } from './match_result.controller';
import { MatchResult } from 'src/entity/match-result.entity';
import { Player } from 'src/entity/player.entity';
import { Match } from 'src/entity/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MatchResult, Player, Match])],
  controllers: [MatchResultController],
  providers: [MatchResultService],
})
export class MatchResultModule { }
