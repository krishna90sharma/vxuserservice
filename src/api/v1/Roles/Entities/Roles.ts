import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'roles' })
export default class Roles {
  @PrimaryColumn('int', {name: 'id'})
  @PrimaryGeneratedColumn()
  public id!: number;

  public permissions!: string[];
  public user_create!: string;
  public total_users!: number;

  @Column({ type: "varchar", name: 'name', nullable: false})
  public name!: string;

  @Column({ type: "int", name: 'created_by_user', nullable: true})
  public created_by_user!: number;

  @Column({ type: "int", name: 'organization_id', nullable: true})
  public organization_id!: number;

  @Column({ type: "varchar", name: 'display_name', nullable: false})
  public display_name!: string;

  @Column({ type: "int", name: 'status', nullable: false, default: 1, comment: '0: Inactive, 1: Active'})
  public status!: string;

  @Column({ type: "text", name: 'description', nullable: true})
  public description!: string;

  @Column({ type: "timestamp without time zone", name: 'deleted_at', nullable: true, select: false})
  public deleted_at: string;

  @Column({ type: 'timestamp without time zone', name: 'created_at', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  public created_at: string;

  @Column({ type: "timestamp without time zone", name: 'updated_at', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  public updated_at: string;
}
