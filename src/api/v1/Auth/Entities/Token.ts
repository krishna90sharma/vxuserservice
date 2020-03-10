import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tokens' })
export default class Token {
  @PrimaryColumn('int', {name: 'id'})
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "int", name: 'user_id', nullable: false})
  public user_id!: number;

  @Column({ type: "varchar", name: 'token_type', nullable: true})
  public token_type!: string;

  @Column({ type: "varchar", name: 'access_token', nullable: false})
  public access_token!: string;

  @Column({ type: "varchar", name: 'refresh_token', nullable: true})
  public refresh_token!: string;

  @Column({ type: "varchar", name: 'user_agent', nullable: true})
  public user_agent!: string;

  @Column({ type: "varchar", name: 'location', nullable: true})
  public location!: string;

  @Column({ type: "timestamp without time zone", name: 'deleted_at', nullable: true, select: false})
  public deleted_at: string;

  @Column({ type: 'timestamp without time zone', name: 'created_at', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  public created_at: string;

  @Column({ type: "timestamp without time zone", name: 'updated_at', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  public updated_at: string;
}
