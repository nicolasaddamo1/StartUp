import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-players.dto';
import { UpdatePlayerDto } from './dto/update-players.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('player')
export class PlayerController {
    constructor(
        private readonly playerService: PlayerService,
    ) { }

    @Get()
    @HttpCode(200)
    async findAllPlayers() {
        return await this.playerService.findAllPlayers();
    }

    @Get(':id')
    @HttpCode(200)
    async findPlayerById(@Param('id') id: string) {
        return await this.playerService.findPlayerById(id);
    }

    @Post()
    @HttpCode(201)
    async createPlayer(@Body() player: CreatePlayerDto) {
        return await this.playerService.createPlayer(player);
    }

    @Put(':id')
    @HttpCode(202)
    async updatePlayer(@Param('id') id: string, @Body() player: UpdatePlayerDto) {
        return await this.playerService.updatePlayer(id, player);
    }

    @Delete(':id')
    @HttpCode(204)
    async deletePlayer(@Param('id') id: string) {
        return await this.playerService.deletePlayer(id);
    }

}
