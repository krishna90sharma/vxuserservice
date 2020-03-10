import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm'
import Address from './Address'

@Entity({ name: 'address_details' })
export default class AddressDetail {
  @PrimaryColumn('int', { name: 'id' })
  @PrimaryGeneratedColumn()
  public id!: number

  @OneToOne(() => Address)
  @JoinColumn({ name: 'billing_id' })
  billing: Address

  @OneToOne(() => Address)
  @JoinColumn({ name: 'shipping_id' })
  shipping: Address

  @Column({ type: 'varchar', name: 'address_1', nullable: true })
  public address_1!: string

  @Column({ type: 'varchar', name: 'address_2', nullable: true })
  public address_2!: string

  @Column({ type: 'varchar', name: 'city', nullable: true })
  public city!: string

  @Column({ type: 'varchar', name: 'state', nullable: true })
  public state!: string

  @Column({ type: 'varchar', name: 'zip_code', nullable: true })
  public zip_code!: string

  @Column({ type: 'varchar', name: 'country', nullable: true })
  public country!: string

  @Column({ type: 'int', name: 'type', nullable: true, default: 1 })
  public type!: number

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
