import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from 'src/entity/club.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateClubDto } from './dto/create-club.entity';
import { UpdateClubDto } from './dto/update-club.entity';

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
            url: 'https://v3.football.api-sports.io/players?league=128&season=2023',
            headers: {
                'x-rapidapi-key': process.env.API_KEY,
                'x-rapidapi-host': 'v3.football.api-sports.io'
            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
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
