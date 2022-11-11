import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { dataSourceTypeOrm } from './config/mysql.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservacionesModule } from './modules/reservaciones/reservaciones.module';

@Global()
@Module({
	imports: [
		TypeOrmModule.forRoot({ ...dataSourceTypeOrm, autoLoadEntities: true }),
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `${
				process.env.NODE_ENV ? process.env.NODE_ENV : 'production'
			}.env`,
		}),

		ReservacionesModule,
	],
})
export class AppModule {}
