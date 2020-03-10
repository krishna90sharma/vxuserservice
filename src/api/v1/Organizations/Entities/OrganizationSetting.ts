import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'organization_setting' })
export default class OrganizationSetting {
  @PrimaryColumn('int', { name: 'id' })
  @PrimaryGeneratedColumn()
  public id!: number

  @Column({ type: 'int', name: 'drp_area_location', nullable: true })
  public drp_area_location!: string

  @Column({ type: 'int', name: 'drp_logofftime', nullable: false })
  public drp_logofftime!: string

  @Column({ type: 'int', name: 'temperature_scale', nullable: false })
  public temperature_scale!: number

  @Column({ type: 'int', name: 'enable_test_mode', nullable: true })
  public enable_test_mode!: string

  @Column({ type: 'int', name: 'enable_show_unassigned_device', nullable: true })
  public enable_show_unassigned_device!: string

  @Column({ type: 'int', name: 'display_tracker_yes', nullable: true })
  public display_tracker_yes!: string

  @Column({ type: 'int', name: 'display_logo', nullable: true })
  public display_logo!: string

  @Column({ type: 'varchar', name: 'font_color', nullable: true })
  public font_color!: string

  @Column({ type: 'varchar', name: 'bg_color', nullable: true })
  public bg_color!: string

  @Column({ type: 'int', name: 'cluster_grid_size', default: 100 })
  public cluster_grid_size!: number

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
