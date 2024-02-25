import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Institute } from "./instituteSetUp";
import { VenueManagement } from "./venueManagement";
import { Roles } from "./roles";

@Entity(`${process.env.STATUS_TABLE}`)
export class Status extends BaseEntity {
    // Define primary key id
    @PrimaryGeneratedColumn()
    id: number;

    //Define a status column
    @Column('boolean')
    status: boolean;

    // Define a many-to-one relationship with the institute entity
    @ManyToOne(
        () => Institute,
        institute => institute.status,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn(
        {
            name: 'institute_id',
        }
    )
    // Create a property to access the associated institute entity
    institute: Institute;

    // Define a many-to-one relationship with the Role entity
    @ManyToOne(
        () => Roles,
        roles => roles.status,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn(
        {
            name: 'role_id',
        }
    )
    // Create a property to access the associated Role entity
    role: Roles;

    // Define a many-to-one relationship with the status entity
    @ManyToOne(
        () => VenueManagement,
        venueManagement => venueManagement.status,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn(
        {
            name: 'venue_management_id',
        }
    )
    // Create a property to access the associated venue management entity
    venueManagement: VenueManagement;


    // Define columns for created_at and updated_at timestamps
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}