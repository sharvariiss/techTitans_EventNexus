import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { VenueManagement} from './venueManagement'

@Entity(`${process.env.VENUE_TABLE}`)
export class Venue extends BaseEntity {
  // Define a primary key
  @PrimaryGeneratedColumn()
  id: number

  // Define a name column
  @Column('varchar')
  name: string

  // Define a one-to-many relationship with the VenueManagement entity for multiple venues
@OneToMany(
    () => VenueManagement,
    VenueManagement => VenueManagement.venue
)
venue: VenueManagement[];

  // Define columns for created_at and updated_at timestamps
  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
