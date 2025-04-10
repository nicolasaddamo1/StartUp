import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClubService } from './club.service';
import { Club } from 'src/entity/club.entity';
import { CreateClubDto } from './dto/create-club.entity';
import { DeleteResult } from 'typeorm';
import { UpdateClubDto } from './dto/update-club.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('club')
export class ClubController {
    constructor(
        private readonly clubService: ClubService
    ) { }

    @Get()
    async findAll(): Promise<Club[]> {
        return this.clubService.findAll();
    }

    @Get('traerclubes')
    async traerclubesAtravesdeApi() {
        return this.clubService.traerclubesAtravesdeApi();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Club> {
        return this.clubService.findOne(id);
    }

    @Post()
    async create(@Body() club: CreateClubDto): Promise<Club> {
        return this.clubService.create(club);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() club: UpdateClubDto): Promise<Club> {
        const clubToUpdate = await this.clubService.findOne(id);
        if (!clubToUpdate) throw new Error('El club no existe');
        if (clubToUpdate.id !== id) throw new Error('El id del club no coincide con el id de la URL');
        return this.clubService.update(id, club);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<DeleteResult> {
        if (!id) throw new Error('El id del club es obligatorio');
        const clubToDelete = await this.clubService.findOne(id);
        if (!clubToDelete) throw new Error('El club no existe');
        if (clubToDelete.id !== id) throw new Error('El id del club no coincide con el id de la URL');
        return this.clubService.delete(id);
    }
}
