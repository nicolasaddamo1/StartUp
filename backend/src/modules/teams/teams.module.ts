import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Jugador } from "src/entity/player.entity";
import { Equipo } from "src/entity/team.entity";
import { EquipoController } from "./teams.controller";
import { EquipoService } from "./team.service";

@Module({
imports:[TypeOrmModule.forFeature([Equipo, Jugador])],
controllers:[EquipoController],
providers:[EquipoService]
})
export class EquioModule{}