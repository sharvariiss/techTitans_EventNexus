import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user";
import { Departments } from "./departments";
import { Roles } from "./roles";

@Entity(`${process.env.ROLES_DEPARTMENT_MAPPING_TABLE}`)
export class Roles_Department_Mapping extends BaseEntity {
    // Define id a the primary key
    @PrimaryGeneratedColumn()
    id: number;

    // Define a many-to-one relationship with the Department entity
    @ManyToOne(
        () => Departments,
        department => department.users,
        {
            onDelete: 'CASCADE',
        }
    )
    @JoinColumn(
        {
            name: 'department_id'
        }
    )
    department: Departments;

    // Define a many-to-one relationship with the Roles entity
    @ManyToOne(
        () => Roles,
        roles => roles.users,
        {
            onDelete: 'CASCADE',
        }
    )
    @JoinColumn(
        {
            name: 'role_id'
        }
    )
    role: Roles;

    // Define columns for created_at and updated_at timestamps
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}