import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity(`${process.env.EVENT_CATEGORY_TABLE}`)
export class Event_Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column('varchar')
    name: string;
}