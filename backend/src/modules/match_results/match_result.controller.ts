import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MatchResultService } from './match_result.service';
import { CreateMatchResultDto } from './dto/create-match_result.dto';
import { MatchResult } from 'src/entity/match-result.entity';
import { Partido } from 'src/entity/match.entity';
import { Equipo } from 'src/entity/team.entity';
import { UpdateMatchResultDto } from './dto/update-match_result.dto';

@Controller('match-results')
export class MatchResultController {
    constructor(private readonly matchResultService: MatchResultService) { }

    @Post()
    create(@Body() createMatchResultDto: CreateMatchResultDto) {
        const matchResult: MatchResult = {
            ...createMatchResultDto,
            id: '',
            goalsLocal: 0,
            goalsVisit: 0,
            winner: '',
            partido: new Partido,
            equipoLocal: new Equipo,
            equipoVisitante: new Equipo
        };
        return this.matchResultService.create(matchResult);
    }

    @Get()
    findAll() {
        return this.matchResultService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.matchResultService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateMatchResultDto: UpdateMatchResultDto) {
        const matchResult: MatchResult = {
            ...updateMatchResultDto,
            id,
            goalsLocal: updateMatchResultDto.goalsLocal || 0,
            goalsVisit: updateMatchResultDto.goalsVisit || 0,
            winner: updateMatchResultDto.winner || '',
            partido: new Partido,
            equipoLocal: new Equipo,
            equipoVisitante: new Equipo



        };
        return this.matchResultService.update(id, matchResult);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.matchResultService.remove(id);
    }
}
