import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_role' })
export default class UserRole {
  @PrimaryColumn('int', {name: 'id'})
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "int", name: 'user_id', nullable: false})
  public user_id!: string;

  @Column({ type: "int", name: 'role_id', nullable: false})
  public role_id!: string;
}
