import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('users')
export class PgUser {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'username' })
  userName!: string
}
