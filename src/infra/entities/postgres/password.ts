import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('passwords')
export class PgPassword {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column()
  password!: string

  @Column({ name: 'user_id' })
  userId!: string
}
