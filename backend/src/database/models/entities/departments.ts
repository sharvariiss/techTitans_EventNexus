import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import {CommitteeHead} from './committeeHead'
import {User} from './user'
import {Roles_Department_Mapping} from './roles_department_mapping'
import { VenueManagement} from './venueManagement'

@Entity(`${process.env.DEPARTMENT_TABLE}`)
export class Departments extends BaseEntity {
  // Defind a primary key column
  @PrimaryGeneratedColumn()
  id: number

  // Define a name column
  @Column('varchar')
  name: string

  // Define a one-to-many relationship with the Committee entity for multiple departments
  @OneToMany(() => CommitteeHead, (Committee) => Committee.department)
  committee: CommitteeHead[]

  // Define one-to-many relationships with the User entity
  @OneToMany(() => User, (user) => user.department)
  users: User[]

  // Define one-to-many relationships with the User_Department_Mapping entity
  @OneToMany(() => Roles_Department_Mapping, (user) => user.role)
  role_department_mapping: Roles_Department_Mapping[]

  // Define a one-to-many relationship with the VenueManagement entity for multiple venues
@OneToMany(
    () => VenueManagement,
    VenueManagement => VenueManagement.department
)
venue: VenueManagement[];

@UpdateDateColumn()
  updated_at: Date
}
