/*************  ✨ Windsurf Command ⭐  *************/
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Match)
        private readonly matchRepository: Repository<Match>,
    ) { }

    async findAll(): Promise<Match[]> {
        return await this.matchRepository.find();
    }

    async findOne(id: string): Promise<Match> {
        const match = await this.matchRepository.findOne(id);
        if (!match) {
            throw new NotFoundException(`Match with ID ${id} not found`);
        }
        return match;
    }

    async create(createMatchDto: CreateMatchDto): Promise<Match> {
        const match = this.matchRepository.create(createMatchDto);
        return await this.matchRepository.save(match);
    }

    async update(id: string, updateMatchDto: UpdateMatchDto): Promise<Match> {
        await this.matchRepository.update(id, updateMatchDto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const result = await this.matchRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Match with ID ${id} not found`);
        }
    }
}

/*******  61889f08-35be-4da4-aea1-da4bf7bff0b2  *******/