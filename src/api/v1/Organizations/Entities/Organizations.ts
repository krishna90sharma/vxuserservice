import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import Thumbnails from '../../Thumbnails/Entities/Thumbnails'
import OrganizationSetting from './OrganizationSetting'
import User from '../../Users/Entities/User'

@Entity({ name: 'organizations' })
export default class Organizations {
  @PrimaryColumn('int', { name: 'id' })
  @PrimaryGeneratedColumn()
  public id!: number

  @OneToOne(() => Thumbnails, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'thumbnail_id' })
  public thumbnail: Thumbnails | any

  @OneToOne(() => OrganizationSetting, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'setting_id' })
  public setting: OrganizationSetting | any

  public owner!: User

  @Column({ type: 'int', name: 'thumbnail_id', nullable: true })
  public thumbnail_id!: string

  @Column({ type: 'int', name: 'setting_id', nullable: true })
  public setting_id!: string

  @Column({ type: 'varchar', name: 'name', nullable: true })
  public name!: string

  @Column({ type: 'int', name: 'type', nullable: false, default: 1 })
  public type!: number

  @Column({ type: 'text', name: 'description', nullable: true })
  public description!: string

  @Column({ type: 'varchar', name: 'country', nullable: true })
  public country!: string

  @Column({ type: 'varchar', name: 'address', nullable: true })
  public address!: string

  @Column({ type: 'int', name: 'address_id', nullable: true })
  public address_id!: string

  @Column({ type: 'varchar', name: 'phone', nullable: true })
  public phone!: string

  @Column({ type: 'varchar', name: 'url', nullable: true })
  public url!: string

  @Column({type: 'int', name: 'create_by', nullable: true})
  public create_by!: number

  @Column({type: 'int', name: 'updated_by', nullable: true})
  public updated_by!: number

  @Column({ type: 'timestamp without time zone', name: 'deleted_at', nullable: true, select: false })
  public deleted_at: string

  @Column({
    type: 'timestamp without time zone',
    name: 'created_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP'
  })
  public created_at: string

  @Column({
    type: 'timestamp without time zone',
    name: 'updated_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP'
  })
  public updated_at: string
}
