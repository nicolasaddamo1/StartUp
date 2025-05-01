import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchResultService } from './match_result.service';
import { MatchResultController } from './match_result.controller';
import { MatchResult } from 'src/entity/match-result.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MatchResult])],
    providers: [MatchResultService],
    controllers: [MatchResultController],
})
export class MatchResultModule { }

