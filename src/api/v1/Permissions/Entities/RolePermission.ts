import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'role_permission' })
export default class RolePermission {
  @PrimaryColumn('int', {name: 'id'})
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "int", name: 'role_id', nullable: false})
  public role_id!: string;

  @Column({ type: "int", name: 'permission_id', nullable: false})
  public permission_id!: string;
}
