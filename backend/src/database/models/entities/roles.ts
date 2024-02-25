import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user";
import { Roles_Department_Mapping } from "./roles_department_mapping";
import { Institute } from "./instituteSetUp";
import { Status } from "./status";

@Entity(`${process.env.ROLES_TABLE}`)
export class Roles extends BaseEntity {
    // Define primary key id
    @PrimaryGeneratedColumn()
    id: number;

    //Define a name column
    @Column('varchar')
    name: string;

    // Define a column for storing the permission granting as text
    @Column('boolean')
    is_permission_required: boolean;

    // Define one-to-many relationships with the User entity 
    @OneToMany(
        () => User,
        user => user.role
    )
    users: User[];

    // Define one-to-many relationships with the status entity 
    @OneToMany(
        () => Status,
        status => status.role
    )
    status: Status[];

    // Define one-to-many relationships with the User_Department_Mapping entity 
    @OneToMany(
        () => Roles_Department_Mapping,
        user => user.role
    )
    role_department_mapping: Roles_Department_Mapping[];

    // Define a many-to-one relationship with the institute entity
    @ManyToOne(
        () => Institute,
        institute => institute.role,
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


    // Define columns for created_at and updated_at timestamps
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}