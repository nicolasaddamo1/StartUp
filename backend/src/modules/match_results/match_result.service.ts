// src/modules/match_results/match_result.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMatchResultDto } from './dto/create-match_result.dto';
import { UpdateMatchResultDto } from './dto/update-match_result.dto';
import { MatchResult } from 'src/entity/match-result.entity';
import { Player } from 'src/entity/player.entity';
import { Match } from 'src/entity/match.entity';

@Injectable()
export class MatchResultService {
    constructor(
        @InjectRepository(MatchResult)
        private matchResultRepo: Repository<MatchResult>,

        @InjectRepository(Player)
        private playerRepo: Repository<Player>,

        @InjectRepository(Match)
        private matchRepo: Repository<Match>,
    ) { }

    async create(dto: CreateMatchResultDto) {
        const player = await this.playerRepo.findOneByOrFail({ id: dto.playerId });
        const match = await this.matchRepo.findOneByOrFail({ id: dto.matchId });

        const matchResult = this.matchResultRepo.create({
            ...dto,
            player,
            match,
        });

        return this.matchResultRepo.save(matchResult);
    }

    findAll() {
        return this.matchResultRepo.find();
    }

    async findOne(id: string) {
        const result = await this.matchResultRepo.findOneBy({ id });
        if (!result) throw new NotFoundException('Match result not found');
        return result;
    }

    async update(id: string, dto: UpdateMatchResultDto) {
        const result = await this.findOne(id);
        Object.assign(result, dto);
        return this.matchResultRepo.save(result);
    }

    async remove(id: string) {
        const result = await this.findOne(id);
        return this.matchResultRepo.remove(result);
    }
}
