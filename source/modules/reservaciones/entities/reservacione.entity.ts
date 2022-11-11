import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Reservacion {
	@PrimaryGeneratedColumn()
	idreservacion: number;

	@Column()
	nombre: string;

	@Column()
	correo: string;

	@Column()
	telefono: string;

	@Column()
	estado: string;

	@Column({ type: 'text' })
	descripcion: string;

	@CreateDateColumn({ name: 'date-created' })
	dateCreated: Date;
}
