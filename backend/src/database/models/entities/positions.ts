import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity(`${process.env.POSITION_TABLE}`)
export class Positions extends BaseEntity {
    // Define id a the primary key
    @PrimaryGeneratedColumn()
    id: number;

    //Difine a name column
    @Column('varchar')
    name: string;

    // Define columns for created_at and updated_at timestamps
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}