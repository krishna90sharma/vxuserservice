import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'permissions' })
export default class Permissions {
  @PrimaryColumn('int', {name: 'id'})
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "varchar", name: 'name', nullable: false})
  public name!: string;

  @Column({ type: "varchar", name: 'display_name', nullable: false})
  public display_name!: string;

  @Column({ type: "text", name: 'description', nullable: true})
  public description!: string;

  @Column({ type: "timestamp without time zone", name: 'deleted_at', nullable: true, select: false})
  public deleted_at: string;

  @Column({ type: 'timestamp without time zone', name: 'created_at', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  public created_at: string;

  @Column({ type: "timestamp without time zone", name: 'updated_at', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  public updated_at: string;
}
