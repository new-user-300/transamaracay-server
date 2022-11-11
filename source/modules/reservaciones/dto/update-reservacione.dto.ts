import { ApiProperty } from '@nestjs/swagger';

export class UpdateReservacioneDto {
	@ApiProperty({ type: String, description: 'Nombre de la persona a reservar' })
	nombre: string;

	@ApiProperty({ type: String, description: 'Correo de la persona a reservar' })
	correo: string;

	@ApiProperty({ type: String, description: 'Telefono de la persona a reservar' })
	telefono: string;

	@ApiProperty({ type: String, description: 'Estado de la persona a reservar' })
	estado: string;

	@ApiProperty({ type: String })
	descripcion: string;
}
