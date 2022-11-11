import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ReservacionesService } from './reservaciones.service';
import { CreateReservacioneDto } from './dto/create-reservacione.dto';
import { UpdateReservacioneDto } from './dto/update-reservacione.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@Controller('reservaciones')
@ApiTags('Reservacion')
export class ReservacionesController {
	constructor(private readonly reservacionesService: ReservacionesService) {}

	@Post()
	@ApiBody({ type: CreateReservacioneDto })
	create(@Body() createReservacioneDto: CreateReservacioneDto) {
		return this.reservacionesService.create(createReservacioneDto);
	}

	@Get()
	findAll() {
		return this.reservacionesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.reservacionesService.findOne(id);
	}

	@Put(':id')
	@ApiBody({ type: UpdateReservacioneDto })
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateReservacioneDto: UpdateReservacioneDto
	) {
		return this.reservacionesService.update(id, updateReservacioneDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.reservacionesService.remove(id);
	}
}
