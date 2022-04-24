import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('password')
export class PgPassword {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column()
  password!: string

  @Column()
  userId!: string
}
