import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'password_resets' })
export default class PasswordResets {
  @PrimaryColumn('int', { name: 'id' })
  @PrimaryGeneratedColumn()
  public id!: number

  @Column({ type: 'varchar', name: 'token', nullable: false, select: false })
  public token!: string

  @Column({ type: 'varchar', name: 'email', nullable: false, unique: false })
  public email!: string

  @Column({
    type: 'timestamp without time zone',
    name: 'created_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP'
  })
  public created_at: Date

  @Column({
    type: 'timestamp without time zone',
    name: 'expired_at',
    nullable: false
  })
  public expired_at: Date
}
