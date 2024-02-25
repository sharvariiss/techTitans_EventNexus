import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user";
import { Roles_Department_Mapping } from "./roles_department_mapping";

@Entity(`${process.env.ROLES_TABLE}`)
export class Roles extends BaseEntity {
    // Define primary key id
    @PrimaryGeneratedColumn()
    id: number;

    //Define a name column
    @Column('varchar')
    name: string;

    // Define one-to-many relationships with the User entity 
    @OneToMany(
        () => User,
        user => user.role
    )
    users: User[];

    // Define one-to-many relationships with the User_Department_Mapping entity 
    @OneToMany(
        () => Roles_Department_Mapping,
        user => user.role
    )
    role_department_mapping: Roles_Department_Mapping[];

    // Define columns for created_at and updated_at timestamps
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}