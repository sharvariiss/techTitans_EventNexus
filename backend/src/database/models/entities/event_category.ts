import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./event";

@Entity(`${process.env.EVENT_CATEGORY_TABLE}`)
export class Event_Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column('varchar')
    name: string;

    // Define a one-to-many relationship with the Event entity for multiple event categories
    @OneToMany(
        () => Event,
        Event => Event.event_category
    )
    event: Event[];
}