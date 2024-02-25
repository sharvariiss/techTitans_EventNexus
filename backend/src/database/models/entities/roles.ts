import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity(`${process.env.ROLES_TABLE}`)
export class Roles extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column('varchar')
    name: string;

}