import { Module } from '@nestjs/common';
import { ReservacionesService } from './reservaciones.service';
import { ReservacionesController } from './reservaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservacion } from './entities/reservacione.entity';

@Module({
	controllers: [ReservacionesController],
	providers: [ReservacionesService],
	imports: [TypeOrmModule.forFeature([Reservacion])],
})
export class ReservacionesModule {}
