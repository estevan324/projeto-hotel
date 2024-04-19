import { table } from 'console';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableReservations1713488561687
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const reservation = new Table({
      name: 'reservation',
      columns: [
        {
          name: 'id',
          type: 'int',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'guestName',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'checkIn',
          type: 'date',
          isNullable: false,
        },
        {
          name: 'checkOut',
          type: 'date',
          isNullable: false,
        },
        {
          name: 'roomId',
          type: 'int',
          isNullable: false,
          unsigned: true,
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
          onUpdate: 'CURRENT_TIMESTAMP',
        },
      ],
    });

    await queryRunner.createTable(reservation);

    await queryRunner.createForeignKey(
      reservation,
      new TableForeignKey({
        columnNames: ['roomId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'room',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('reservation');
  }
}
