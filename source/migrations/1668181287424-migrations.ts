import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1668181287424 implements MigrationInterface {
    name = 'migrations1668181287424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`reservacion\` (\`idreservacion\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`correo\` varchar(255) NOT NULL, \`telefono\` varchar(255) NOT NULL, \`estado\` varchar(255) NOT NULL, \`descripcion\` text NOT NULL, \`date-created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`idreservacion\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`reservacion\``);
    }

}
