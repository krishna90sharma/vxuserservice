import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm'
import AddressDetail from './AddressDetail'

@Entity({ name: 'address' })
export default class Address {
  @PrimaryColumn('int', { name: 'id' })
  @PrimaryGeneratedColumn()
  public id!: number

  @Column({ type: 'varchar', name: 'addressable_type', nullable: true })
  public addressable_type!: string

  @Column({ type: 'int', name: 'addressable_id', nullable: true })
  public addressable_id!: string

  @Column({ type: 'int', name: 'billing_id', nullable: true })
  public billing_id!: string

  @OneToOne(() => AddressDetail)
  @JoinColumn({ name: 'billing_id' })
  billing: AddressDetail

  @Column({ type: 'int', name: 'shipping_id', nullable: true })
  public shipping_id!: string

  @Column({ type: 'int', name: 'default', default: 0 })
  public default!: string

  @Column({ type: 'int', name: 'ship_make_default', default: 0 })
  public ship_make_default!: string

  @OneToOne(() => AddressDetail)
  @JoinColumn({ name: 'shipping_id' })
  shipping: AddressDetail

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
