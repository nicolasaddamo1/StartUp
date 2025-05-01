import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Controller('matches')
export class MatchController {
    constructor(private readonly matchService: MatchService) { }

    @Post()
    create(@Body() createMatchDto: CreateMatchDto) {
        return this.matchService.create(createMatchDto);
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
    update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
        return this.matchService.update(id, updateMatchDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.matchService.remove(id);
    }
}

