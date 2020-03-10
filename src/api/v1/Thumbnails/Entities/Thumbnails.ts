import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'thumbnails' })
export default class Thumbnails {
  @PrimaryColumn('int', {name: 'id'})
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "varchar", name: 'name', nullable: true})
  public name!: string;

  @Column({ type: "int", name: 'type', nullable: true, default: 1})
  public type!: number;

  @Column({ type: "varchar", name: 'format', nullable: true})
  public format!: string;

  @Column({ type: "varchar", name: 'size', nullable: true})
  public size!: string;

  @Column({ type: "varchar", name: 'path', nullable: true})
  public path!: string;

  @Column({ type: "varchar", name: 'original_path', nullable: true})
  public original_path!: string;

  @Column({ type: "timestamp without time zone", name: 'deleted_at', nullable: true, select: false})
  public deleted_at: string;

  @Column({ type: 'timestamp without time zone', name: 'created_at', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  public created_at: string;

  @Column({ type: "timestamp without time zone", name: 'updated_at', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  public updated_at: string;
}
