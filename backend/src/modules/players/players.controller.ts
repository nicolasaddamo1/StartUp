import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-players.dto';
import { UpdatePlayerDto } from './dto/update-players.dto';

@Controller('players')
export class PlayersController {
    constructor(private readonly service: PlayersService) { }

    @Post()
    create(@Body() dto: CreatePlayerDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdatePlayerDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
