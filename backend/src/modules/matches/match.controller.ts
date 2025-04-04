// src/match/match.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Controller('matches')
export class MatchController {
    constructor(private readonly matchService: MatchService) { }

    @Post()
    create(@Body() dto: CreateMatchDto) {
        return this.matchService.create(dto);
    }

    @Get()
    findAll() {
        return this.matchService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.matchService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateMatchDto) {
        return this.matchService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.matchService.remove(id);
    }
}
