import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Committees } from "./committees";
import { Departments } from "./departments";
import { Event } from "./event";
import { Venue } from "./venue";
import { Status } from "./status";

@Entity(`${process.env.VENUEMANAGEMENT_TABLE}`)
export class VenueManagement extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    // Define a many-to-one relationship with the committees entity
    @ManyToOne(
        () => Committees,
        committees => committees.venue,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn(
        {
            name: 'committee_id',
        }
    )
    // Create a property to access the associated committees entity
    committees: Committees;


    // Define a many-to-one relationship with the venue entity
    @ManyToOne(
        () => Venue,
        venue => venue.venue,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn(
        {
            name: 'venue_id',
        }
    )
    // Create a property to access the associated Venue entity
    venue: Venue;


    // Define a many-to-one relationship with the event entity
    @ManyToOne(
        () => Event,
        event => event.venue,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn(
        {
            name: 'event_id',
        }
    )
    // Create a property to access the associated VenueManagement entity
    event: Event;

    // Define a many-to-one relationship with the VenueManagement entity
    @ManyToOne(
        () => Departments,
        department => department.venue,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn(
        {
            name: 'dept_id',
        }
    )
    // Create a property to access the associated VenueManagement entity
    department: Departments;

    // Define one-to-many relationships with the venue management entity 
    @OneToMany(
        () => Status,
        status => status.venueManagement
    )
    status: Status[];

    @Column({type:'varchar',nullable:true})
    final_status: string;

    // Define a column for storing the date when the event has started
    @Column('date')
    start_date: Date;

    // Define a column for storing the date when the event has ended 
    @Column('date')
    end_date: Date;

    // Define columns for start_time and end_time of an event
    @Column('date')
    start_time: Date;

    @Column('date')
    end_time: Date;

    

    
}