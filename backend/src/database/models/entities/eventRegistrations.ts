import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Roles } from "./roles";
import {Event} from "./event"
import { User } from "./user";
@Entity(`${process.env.EVENTREGISTRATIONS_TABLE}`)
export class EventRegistrations extends BaseEntity {
    // Define id a the primary key
    @PrimaryGeneratedColumn()
    id: number;

    // Define a many-to-one relationship with the Department entity
    @ManyToOne(
        () => Event,
        event => event.registrations,
        {
            onDelete: 'CASCADE',
        }
    )
    @JoinColumn(
        {
            name: 'department_id'
        }
    )
    event: Event;

    // Define a many-to-one relationship with the Roles entity
    @ManyToOne(
        () => User,
        user => user.registrations,
        {
            onDelete: 'CASCADE',
        }
    )
    @JoinColumn(
        {
            name: 'role_id'
        }
    )
    user: User;

    // Define columns for created_at and updated_at timestamps
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}