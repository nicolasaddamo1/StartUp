import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Team } from '../teams/entities/team.entity';

@Injectable()
export class PlayersService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepo: Repository<Player>,
        @InjectRepository(Team)
        private readonly teamRepo: Repository<Team>
    ) { }

    async create(dto: CreatePlayerDto): Promise<Player> {
        const team = await this.teamRepo.findOneBy({ id: dto.teamId });
        const player = this.playerRepo.create({ ...dto, team });
        return this.playerRepo.save(player);
    }

    findAll(): Promise<Player[]> {
        return this.playerRepo.find({ relations: ['team'] });
    }

    findOne(id: string): Promise<Player> {
        return this.playerRepo.findOne({ where: { id }, relations: ['team'] });
    }

    async update(id: string, dto: UpdatePlayerDto): Promise<Player> {
        const player = await this.playerRepo.findOneBy({ id });
        Object.assign(player, dto);
        return this.playerRepo.save(player);
    }

    async remove(id: string): Promise<void> {
        await this.playerRepo.delete(id);
    }
}
