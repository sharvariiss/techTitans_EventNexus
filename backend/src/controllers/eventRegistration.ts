import { Response, Request } from "express";
import { connection } from "../database/connect";
import { Roles } from "../database/models/entities/roles";
import { Departments } from "../database/models/entities/departments";
import { Roles_Department_Mapping } from "../database/models/entities/roles_department_mapping";
import { EventRegistrations } from "../database/models/entities/eventRegistrations";
import { Event } from "../database/models/entities/event";
import { User } from "../database/models/entities/user";


export async function CreateEventRegistration(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { user_id, event_id } = req.body;

        if (!user_id) return res.status(400).json({ message: "Please provide a user_id " })
        if (!event_id) return res.status(400).json({ message: "Please provide a event_id" })


        // Checking if the mapping already exists
        if (await connection
            .getRepository(EventRegistrations)
            .createQueryBuilder(process.env.ROLES_DEPARTMENT_MAPPING_TABLE)
            .leftJoinAndSelect(process.env.ROLES_DEPARTMENT_MAPPING_TABLE + '.user', 'user')
            .leftJoinAndSelect(process.env.ROLES_DEPARTMENT_MAPPING_TABLE + '.event', 'event')
            .where('user.id = :user_id and event.id = :event_id', { user_id, event_id })
            .getOne())
            return res.status(400).json({ message: "Mapping Already Exists" })

        const event = await connection.getRepository(Event).createQueryBuilder(process.env.EVENT_TABLE).where({ id: event_id }).getOne()
        if (!event)
            return res.status(400).json({ message: "Event Does Not Exists" })

        const user = await connection.getRepository(User).createQueryBuilder(process.env.USER_TABLE).where({ id: user_id }).getOne()
        if (!user)
            return res.status(400).json({ message: "User Does Not Exists" })

        await EventRegistrations.create({
            event,
            user
        }).save()

        return res.status(200).json({ message: "Event Registration done" })

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}

export async function GetEventRegistration(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { user_id, event_id } = req.query;

        let eventRegistration: EventRegistrations | EventRegistrations[];

        if (user_id)
            eventRegistration = await connection
                .getRepository(EventRegistrations)
                .createQueryBuilder(process.env.ROLES_DEPARTMENT_MAPPING_TABLE)
                .leftJoinAndSelect(process.env.ROLES_DEPARTMENT_MAPPING_TABLE + '.user', 'user')
                .leftJoinAndSelect(process.env.ROLES_DEPARTMENT_MAPPING_TABLE + '.event', 'event')
                .where('user.id = :user_id', { user_id })
                .getOne()
        else if (event_id)
            eventRegistration = await connection
                .getRepository(EventRegistrations)
                .createQueryBuilder(process.env.ROLES_DEPARTMENT_MAPPING_TABLE)
                .leftJoinAndSelect(process.env.ROLES_DEPARTMENT_MAPPING_TABLE + '.user', 'user')
                .leftJoinAndSelect(process.env.ROLES_DEPARTMENT_MAPPING_TABLE + '.event', 'event')
                .where('event.id = :event_id', { event_id })
                .getOne()
        else
            eventRegistration = await connection
                .getRepository(EventRegistrations)
                .createQueryBuilder(process.env.ROLES_DEPARTMENT_MAPPING_TABLE)
                .leftJoinAndSelect(process.env.ROLES_DEPARTMENT_MAPPING_TABLE + '.user', 'user')
                .leftJoinAndSelect(process.env.ROLES_DEPARTMENT_MAPPING_TABLE + '.event', 'event')
                .getMany()

        if (!eventRegistration) return res.status(404).json({ message: "No Mapping Found" })

        return res.status(200).json({ message: "Registration Mapping Fetched", event_registrations: eventRegistration })
    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}

