import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_permissions' })
export default class UserPermission {
  @PrimaryColumn('int', {name: 'id'})
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "int", name: 'user_id', nullable: false})
  public user_id!: string;

  @Column({ type: "int", name: 'permission_id', nullable: false})
  public permission_id!: string;
}
