import { Response, Request } from "express";
import { connection } from "../database/connect";
import { Event } from "../database/models/entities/event";
import { Event_Category } from "../database/models/entities/event_category";


export async function CreateEvent(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { name , information, budget, event_category_id } = req.body;

        if (!name) return res.status(400).json({ message: "Please provide a name for the Event you are trying to create" })

        // Check if the Event already exists
        if (await connection.getRepository(Event).createQueryBuilder(process.env.EVENT_TABLE).where({ name }).getOne())
            return res.status(400).json({ message: "Event Already Exists" })

        const event_category = await connection.getRepository(Event_Category).createQueryBuilder(process.env.EVENT_CATEGORY_TABLE).where({ id : event_category_id}).getOne()
        
        if(!event_category)
            return res.status(404).json({ message: "Event Category not found" })
        // Create Event Category 
        await Event.create({
            name,
            information,
            budget,
            event_category
        }).save()

        // Response
        return res.status(200).json({ message: "Event Created" })

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}

export async function GetEvent(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { id } = req.query;

        let event: Event | Event[];

        // Fetch Event 
        if (id)
            event = await connection.getRepository(Event).createQueryBuilder(process.env.EVENT_TABLE).where({ id }).getOne()
        else
        event = await connection.getRepository(Event).createQueryBuilder(process.env.EVENT_TABLE).getMany()

        if (!event) return res.status(404).json({ message: "No Event Found" })

        // Response
        return res.status(200).json({ message: "Event Fetched", event })

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}

export async function DeleteEvent(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { id } = req.query;

        const event =  await connection.getRepository(Event).createQueryBuilder(process.env.EVENT_TABLE).delete().where({ id }).execute();
        
        // Check if the User was not found for deletion
        if (event && event.affected === 0)
            return res.status(404).json({ message: "Event not found" });

        // Response
        return res.status(200).json({ message: "Event Deleted" })
        
    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}


//add update