import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from 'src/entity/club.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateClubDto } from './dto/create-club.entity';
import { UpdateClubDto } from './dto/update-club.entity';
import { HttpService } from '@nestjs/axios';

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
        private readonly httpService: HttpService,
    ) { }

    async traerclubesAtravesdeApi() {
        const axios = require('axios');

        const API_KEY = '02ed2fdbe4f54dd08570fe1b354c87a2';
        const API_URL = 'https://api.football-data.org/v4';

        async function getArgentinianPlayers() {
            try {
                // 1. Obtener equipos de la liga argentina
                const { data: teams } = await axios.get(`${API_URL}/competitions/2024/teams`, {
                    headers: { 'X-Auth-Token': API_KEY }
                });
                console.log('Equipos encontrados:', teams);

                // 2. Procesar cada equipo para obtener jugadores
                const players: Player[] = [];

                function isTeam(data: any): data is Team {
                    return typeof data.id === 'number' &&
                        typeof data.name === 'string' &&
                        (data.squad === undefined || Array.isArray(data.squad));
                }

                function isPlayer(data: any): data is Player {
                    return typeof data.id === 'number' &&
                        typeof data.name === 'string';
                }
                for (const team of teams.teams) {
                    // Algunas APIs incluyen jugadores aquí, otras requieren otro request
                    if (team.squad && Array.isArray(team.squad)) {
                        const validPlayers = team.squad.filter(isPlayer) as Player[];
                        players.push(...validPlayers.map((p) => ({
                            id: p.id,
                            name: p.name,
                            position: p.position,
                            team: team.name
                        })));
                    }
                }

                return players;
            } catch (error) {
                console.error('Error:', error.response?.data || error.message);
                return [];
            }
        }

        // Uso
        getArgentinianPlayers().then(players => {
            console.log('Jugadores encontrados:', players.length);
            console.log(players.slice(0, 5)); // Muestra los primeros 5
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
