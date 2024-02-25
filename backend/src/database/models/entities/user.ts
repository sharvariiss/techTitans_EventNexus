import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Institute } from "./instituteSetUp";
import { Roles } from "./roles";
import { Departments } from "./departments";
import { FeedBack } from "./feedback";
import { EventRegistrations } from "./eventRegistrations";

@Entity(`${process.env.USER_TABLE}`)
export class User extends BaseEntity {
    // Define a primary key for the id column
    @PrimaryGeneratedColumn()
    id: number;

    // Define a name column
    @Column('varchar')
    name: string;

    // Define a email column
    @Column({
        type:'varchar',
        nullable:true
    })
    phone_number: string;

    // Define a unique constraint for the email column
    @Column({
        unique: true
    })
    email: string;

    // Define a column for storing the password as text
    @Column('varchar')
    password: string;

    @Column({
        type: 'boolean',
        default: false
    })
    is_admin: boolean;

    // Define a 'forgotPasswordToken' column as a nullable string or null.
    @Column({
        type: 'varchar',
        nullable: true,
    })
    forgot_password_token: string | null;

    // Define a 'forgotPasswordTokenExpiry' column as a nullable date or null.
    @Column({
        type: 'varchar',
        nullable: true,
    })
    forgot_password_token_expiry: Date | null;

    // Define a many-to-one relationship with the Institute entity
    @ManyToOne(
        () => Institute,
        institute => institute.users,
        {
            onDelete: 'CASCADE',
        }
    )
    @JoinColumn(
        {
            name: 'institute_id'
        }
    )
    institute: Institute;

    // Define one-to-many relationships with the User entity 
    @OneToMany(
        () => EventRegistrations,
        eventRegistration => eventRegistration.user
    )
    registrations: EventRegistrations[];

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

    // Define one-to-many relationships with the User_Department_Mapping entity 
    @OneToMany(
        () => FeedBack,
        feedback => feedback.event
    )
    feedbacks: FeedBack[];

    // Define columns for created_at and updated_at timestamps
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}