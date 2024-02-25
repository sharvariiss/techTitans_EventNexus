import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Event } from "./event"
import { User } from "./user";

@Entity(`${process.env.FEEDBACK_TABLE}`)
export class FeedBack extends BaseEntity {
    // Define id a the primary key
    @PrimaryGeneratedColumn()
    id: number;

    //Define Event Discription
    @Column({
        type: 'text'
    })
    feedback: string;

    // Define a many-to-one relationship with the Event entity
    @ManyToOne(
        () => Event,
        event => event.feedbacks,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn(
        {
            name: 'event_id',
        }
    )
    // Create a property to access the associated Event entity
    event: Event;

    
    // Define a many-to-one relationship with the User entity
    @ManyToOne(
        () => User,
        user => user.feedbacks,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn(
        {
            name: 'user_id',
        }
    )
    // Create a property to access the associated User entity
    user: User;

    // Define columns for created_at and updated_at timestamps
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}