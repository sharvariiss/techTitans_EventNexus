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
import {VenueManagement} from './venueManagement'
import {Event_Category} from './event_category'
import {FeedBack} from './feedback'
import { EventRegistrations } from './eventRegistrations'

@Entity(`${process.env.EVENT_TABLE}`)
export class Event extends BaseEntity {
  // Define id a the primary key
  @PrimaryGeneratedColumn()
  id: number

  // Define a name column
  @Column('varchar')
  name: string

  //Define Event Discription
  @Column({
    type: 'text',
    nullable: true,
  })
  information: string

  // Define a one-to-many relationship with the VenueManagement entity for multiple venues
@OneToMany(
    () => VenueManagement,
    VenueManagement => VenueManagement.event
)
venue: VenueManagement[];

  // Define a many-to-one relationship with the Event Category entity
  @ManyToOne(() => Event_Category, (event_category) => event_category.event, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'event_category_id',
  })
  // Create a property to access the associated event_category entity
  event_category: Event_Category

  // Define one-to-many relationships with the User entity 
  @OneToMany(
    () => EventRegistrations,
    eventRegistration => eventRegistration.event
  )
  registrations: EventRegistrations[];

  // Define one-to-many relationships with the User_Department_Mapping entity
  @OneToMany(() => FeedBack, (feedback) => feedback.event)
  feedbacks: FeedBack[]

  // Define a budget column
  @Column('varchar')
  budget: string

  // Define columns for created_at and updated_at timestamps
  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
