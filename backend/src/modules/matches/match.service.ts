// src/match/match.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match } from 'src/entity/match.entity';
import { Team } from 'src/entity/team.entity';
import { League } from 'src/entity/league.entity';

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Match)
        private matchRepo: Repository<Match>,

        @InjectRepository(Team)
        private teamRepo: Repository<Team>,

        @InjectRepository(League)
        private leagueRepo: Repository<League>,
    ) { }

    async create(dto: CreateMatchDto): Promise<Match> {
        const homeTeam = await this.teamRepo.findOneByOrFail({ id: dto.homeTeamId });
        const awayTeam = await this.teamRepo.findOneByOrFail({ id: dto.awayTeamId });
        const league = await this.leagueRepo.findOneByOrFail({ id: dto.leagueId });

        const match = this.matchRepo.create({
            ...dto,
            homeTeam,
            awayTeam,
            league,
        });

        return this.matchRepo.save(match);
    }

    findAll(): Promise<Match[]> {
        return this.matchRepo.find({ relations: ['homeTeam', 'awayTeam', 'league'] });
    }

    async findOne(id: string): Promise<Match> {
        const match = await this.matchRepo.findOne({
            where: { id },
            relations: ['homeTeam', 'awayTeam', 'league'],
        });

        if (!match) throw new NotFoundException('Match not found');
        return match;
    }

    async update(id: string, dto: UpdateMatchDto): Promise<Match> {
        const match = await this.findOne(id);

        if (dto.homeTeamId) {
            match.homeTeam = await this.teamRepo.findOneByOrFail({ id: dto.homeTeamId });
        }

        if (dto.awayTeamId) {
            match.awayTeam = await this.teamRepo.findOneByOrFail({ id: dto.awayTeamId });
        }

        if (dto.leagueId) {
            match.league = await this.leagueRepo.findOneByOrFail({ id: dto.leagueId });
        }

        Object.assign(match, dto);
        return this.matchRepo.save(match);
    }

    async remove(id: string): Promise<void> {
        const match = await this.findOne(id);
        await this.matchRepo.remove(match);
    }
}
