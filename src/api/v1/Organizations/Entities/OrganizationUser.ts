import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'organization_user' })
export default class OrganizationUser {
  @PrimaryColumn('int', {name: 'id'})
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "int", name: 'user_id', nullable: false})
  public user_id!: string;

  @Column({ type: "int", name: 'organization_id', nullable: false})
  public organization_id!: string;

  @Column({ type: "timestamp without time zone", name: 'deleted_at', nullable: true})
  public deleted_at: string;

  @Column({ type: 'timestamp without time zone', name: 'created_at', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  public created_at: string;

  @Column({ type: "timestamp without time zone", name: 'updated_at', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  public updated_at: string;
}
