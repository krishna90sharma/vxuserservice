import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import Organizations from '../../Organizations/Entities/Organizations'
import Roles from '../../Roles/Entities/Roles'
import Thumbnails from '../../Thumbnails/Entities/Thumbnails'

@Entity({ name: 'users' })
export default class User {
  @PrimaryColumn('int', { name: 'id' })
  @PrimaryGeneratedColumn()
  public id!: number

  public role!: Roles | object
  public permissions!: string[]
  public organization!: Organizations
  public thumbnail!: Thumbnails | object
  public sub!: object
  public organization_id!: number
  public organization_type!: number

  @Column('int', { name: 'thumbnail_id', nullable: true })
  public thumbnail_id!: number

  @Column({ type: 'varchar', name: 'first_name', nullable: false })
  public first_name!: string

  @Column({ type: 'varchar', name: 'last_name', nullable: false })
  public last_name!: string

  @Column({ type: 'varchar', name: 'password', nullable: false, select: false })
  public password!: string

  @Column({ type: 'varchar', name: 'email', nullable: false, unique: false })
  public email!: string

  @Column({ type: 'varchar', name: 'language', nullable: false, default: 'en' })
  public language!: string

  @Column({ type: 'varchar', name: 'phone', nullable: true })
  public phone!: string

  @Column({ type: 'varchar', name: 'job_title', nullable: true })
  public job_title!: string

  @Column({ type: 'int', name: 'address_id', nullable: true })
  public address_id!: string

  @Column({ type: 'int', name: 'is_email_verified', nullable: false, default: 1 })
  public is_email_verified!: number

  @Column({ type: 'int', name: 'status', nullable: false, default: 0 })
  public status!: number

  @Column({ type: 'int', name: 'create_by', nullable: false, default: 0 })
  public create_by!: number

  @Column({ type: 'int', name: 'updated_by', nullable: true })
  public updated_by!: number

  @Column({ type: 'timestamp without time zone', name: 'deleted_at', nullable: true, select: false })
  public deleted_at: Date

  @Column({
    type: 'timestamp without time zone',
    name: 'created_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP'
  })
  public created_at: Date

  @Column({
    type: 'timestamp without time zone',
    name: 'updated_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP'
  })
  public updated_at: Date
}
