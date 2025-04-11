import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Jugador } from "src/entity/player.entity";
import { Repository } from "typeorm";

@Injectable()
export class PointsService{
    constructor(
        @InjectRepository(Jugador) private readonly playerRepository: Repository<Jugador>
    ){}

    async playerPoints(){

        
    }

}