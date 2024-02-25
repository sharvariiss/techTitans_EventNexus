import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { VenueManagement} from './venueManagement'
import {CommitteeHead} from './committeeHead'

@Entity(`${process.env.COMMITTEES_TABLE}`)
export class Committees extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  // Define a one-to-many relationship with the VenueManagement entity for multiple venues
@OneToMany(
  () => VenueManagement,
  VenueManagement => VenueManagement.committees
)
venue: VenueManagement[];

  // Commitee Head relation
  @OneToOne(() => CommitteeHead)
  @JoinColumn({
    name: 'commitee_head_id',
  })
  commitee_head: CommitteeHead
}
