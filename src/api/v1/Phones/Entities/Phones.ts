import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'phones' })
export default class Phones {
  @PrimaryColumn('int', {name: 'id'})
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "int", name: 'address_id', nullable: true})
  public address_id!: string;

  @Column({ type: "varchar", name: 'phone', nullable: true})
  public phone!: string;

  @Column({ type: "int", name: 'type', nullable: true, default: 1})
  public type!: number;

  @Column({ type: "timestamp without time zone", name: 'deleted_at', nullable: true, select: false})
  public deleted_at: string;

  @Column({ type: 'timestamp without time zone', name: 'created_at', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  public created_at: string;

  @Column({ type: "timestamp without time zone", name: 'updated_at', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  public updated_at: string;
}
