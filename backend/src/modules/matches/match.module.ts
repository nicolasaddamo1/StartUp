/*************  ✨ Windsurf Command ⭐  *************/
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchService } from './match.service';
import { Partido } from 'src/entity/match.entity';
import { MatchController } from './match.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Partido])],
    controllers: [MatchController],
    providers: [MatchService],
    exports: [MatchService],
})
export class MatchModule { }
/*******  178eff26-570f-49d3-881c-339413c7d99c  *******/