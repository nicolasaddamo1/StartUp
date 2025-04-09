import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Jugador } from 'src/entity/player.entity';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './dto/create-players.dto';
import { UpdatePlayerDto } from './dto/update-players.dto';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Jugador) private playerRepository: Repository<Jugador>,
    ) { }
    async findAllPlayers(): Promise<Jugador[]> {
        const jugadores = await this.playerRepository.find();
        if (!jugadores) throw new Error('No se encontraron jugadores');
        return jugadores
    }

    async findPlayerById(id: string): Promise<Jugador> {
        const jugador = await this.playerRepository.findOne({ where: { id } });
        if (!jugador) throw new Error('Jugador no encontrado');
        return jugador;
    }

    async createPlayer(player: CreatePlayerDto): Promise<Jugador> {
        const newPlayer = this.playerRepository.create(player);
        return await this.playerRepository.save(newPlayer);
    }

    async updatePlayer(id: string, player: UpdatePlayerDto): Promise<Jugador> {
        const existingPlayer = await this.playerRepository.findOne({ where: { id } });
        if (!existingPlayer) throw new Error('Jugador no encontrado');
        Object.assign(existingPlayer, player);
        return await this.playerRepository.save(existingPlayer);
    }

    async deletePlayer(id: string): Promise<void> {
        const result = await this.playerRepository.delete(id);
        if (result.affected === 0) throw new Error('Jugador no encontrado');
    }

}
