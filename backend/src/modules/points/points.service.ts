import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Jugador } from "src/entity/player.entity";
import { Equipo } from "src/entity/team.entity";
import { Repository } from "typeorm";

@Injectable()
export class PointsService{
    constructor(
        @InjectRepository(Jugador) private readonly playerRepository: Repository<Jugador>,
        @InjectRepository(Equipo) private readonly teamRepository: Repository<Equipo>
    ){}

    async playerPoints(){

        const player = await this.playerRepository.findOne({where:{}})
    }

}