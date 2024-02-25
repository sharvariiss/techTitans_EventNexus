import { Response, Request } from "express";
import { connection } from "../database/connect";
import { Event_Category } from "../database/models/entities/event_category";


export async function Create_Event_Category(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Please provide with a name for the Event_Category you are Trying to Create" })

    if (await connection.getRepository(Event_Category).createQueryBuilder(process.env.EVENT_CATEGORY_TABLE).where({ name }).getOne())
        return res.status(400).json({ message: "Event Category Already Exists" })

    await Event_Category.create({
        name
    }).save()

    return res.status(200).json({ message: "Event Category Created" })
}

export async function Get_Event_Category(req: Request, res: Response) {
    const { id } = req.query;

    let event_category: Event_Category | Event_Category[];

    if (id)
        event_category = await connection.getRepository(Event_Category).createQueryBuilder(process.env.EVENT_CATEGORY_TABLE).where({ id }).getOne()
    else
        event_category = await connection.getRepository(Event_Category).createQueryBuilder(process.env.EVENT_CATEGORY_TABLE).getMany()

    if (!event_category) return res.status(404).json({ message: "No Event Category Found" })

    return res.status(200).json({ message: "Event Category Fetched", event_category })
}

export async function Delete_Event_Category(req: Request, res: Response) {
    const { id } = req.query;

    const event_category = await connection.getRepository(Event_Category).createQueryBuilder(process.env.EVENT_CATEGORY_TABLE).where({ id }).getOne();

    if (!event_category) return res.status(404).json({ message: "No Event Category Found" })

    await connection.getRepository(Event_Category).createQueryBuilder(process.env.EVENT_CATEGORY_TABLE).delete().where({ id }).execute();

    return res.status(200).json({ message: "Event Category Deleted" })
}