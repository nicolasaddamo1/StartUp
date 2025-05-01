import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchResult } from 'src/entity/match-result.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatchResultService {
    constructor(
        @InjectRepository(MatchResult)
        private readonly matchResultRepository: Repository<MatchResult>,
    ) { }

    async findAll(): Promise<MatchResult[]> {
        return this.matchResultRepository.find();
    }

    async findOne(id: string): Promise<MatchResult> {
        const matchResult = await this.matchResultRepository.findOne({ where: { id } });
        if (!matchResult) {
            throw new NotFoundException(`Match result with ID ${id} not found`);
        }
        return matchResult;
    }

    async create(matchResult: MatchResult): Promise<MatchResult> {
        return this.matchResultRepository.save(matchResult);
    }

    async update(id: string, matchResult: MatchResult): Promise<MatchResult> {
        const { id: _, ...rest } = matchResult;
        return this.matchResultRepository.save({ id, ...rest });
    }

    async remove(id: string): Promise<void> {
        const result = await this.matchResultRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Match result with ID ${id} not found`);
        }
    }
}
