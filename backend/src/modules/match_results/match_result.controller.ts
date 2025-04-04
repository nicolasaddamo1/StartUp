// src/modules/match_results/match_result.controller.ts
import {
    Controller, Post, Get, Body, Param, Put, Delete,
} from '@nestjs/common';
import { MatchResultService } from './match_result.service';
import { CreateMatchResultDto } from './dto/create-match_result.dto';
import { UpdateMatchResultDto } from './dto/update-match_result.dto';

@Controller('match-results')
export class MatchResultController {
    constructor(private readonly matchResultService: MatchResultService) { }

    @Post()
    create(@Body() dto: CreateMatchResultDto) {
        return this.matchResultService.create(dto);
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
    update(@Param('id') id: string, @Body() dto: UpdateMatchResultDto) {
        return this.matchResultService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.matchResultService.remove(id);
    }
}