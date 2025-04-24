import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from 'src/entity/club.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateClubDto } from './dto/create-club.entity';
import { UpdateClubDto } from './dto/update-club.entity';
import * as fs from 'fs';
interface Player {
    id: number;
    name: string;
    position?: string;
}

interface Team {
    id: number;
    name: string;
    squad?: Player[];
}
@Injectable()
export class ClubService {
    constructor(

        @InjectRepository(Club)
        private clubRepository: Repository<Club>,
    ) { }



    async traerclubesAtravesdeApi() {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: process.env.URL,
            headers: {
                'x-rapidapi-key': process.env.API_KEY,
                'x-rapidapi-host': 'v3.football.api-sports.io'
            }
        };

        try {
            const response = await axios(config);
            // Guardar la respuesta en un archivo JSON
            fs.writeFileSync('clubes.json', JSON.stringify(response.data, null, 2));
            return response.data;
        } catch (error) {
            // Guardar el error en un archivo JSON de errores
            fs.writeFileSync('error.json', JSON.stringify(error, null, 2));
            throw error;
        }
    }
    async findAll(): Promise<Club[]> {
        return this.clubRepository.find();
    }

    async findOne(id: string): Promise<Club> {

        const club = await this.clubRepository.findOne({ where: { id } });
        if (!club) throw new Error('El club no existe');

        return club;
    }

    async create(club: CreateClubDto): Promise<Club> {
        return this.clubRepository.save(club);
    }

    async update(id: string, club: UpdateClubDto): Promise<Club> {
        const clubToUpdate = await this.clubRepository.findOne({ where: { id } });
        if (!clubToUpdate) throw new Error('El club no existe');

        return this.clubRepository.save({ ...clubToUpdate, ...club });
    }

    async delete(id: string): Promise<DeleteResult> {
        const result = await this.clubRepository.delete(id);
        if (result.affected === 0) throw new Error('El club no existe');
        return result;
    }
}
