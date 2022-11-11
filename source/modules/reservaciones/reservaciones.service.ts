import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservacioneDto } from './dto/create-reservacione.dto';
import { UpdateReservacioneDto } from './dto/update-reservacione.dto';
import { Reservacion } from './entities/reservacione.entity';

@Injectable()
export class ReservacionesService {
	constructor(
		@InjectRepository(Reservacion)
		private reservacionRepository: Repository<Reservacion>
	) {}

	create(createReservacioneDto: CreateReservacioneDto) {
		return this.reservacionRepository.save(createReservacioneDto);
	}

	findAll() {
		return this.reservacionRepository.find();
	}

	findOne(id: number) {
		return this.reservacionRepository.findOne({ where: { idreservacion: id } });
	}

	async update(idreservacion: number, updateReservacioneDto: UpdateReservacioneDto) {
		await this.reservacionRepository.update({ idreservacion }, updateReservacioneDto);
		return this.findOne(idreservacion);
	}

	async remove(id: number) {
		await this.reservacionRepository.delete({ idreservacion: id });
	}
}
