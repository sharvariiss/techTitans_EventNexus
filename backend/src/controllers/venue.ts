import { Response, Request } from "express";
import { connection } from "../database/connect";
import { Venue } from "../database/models/entities/venue";


export async function Create_Venue(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Please provide with a name for the Venue you are Trying to Create" })

    if (await connection.getRepository(Venue).createQueryBuilder(process.env.VENUE_TABLE).where({ name }).getOne())
        return res.status(400).json({ message: "Departments Already Exists" })

    await Venue.create({
        name
    }).save()

    return res.status(200).json({ message: "Venue created" })
}

export async function Get_Venue(req: Request, res: Response) {
    const { id } = req.query;

    let venue: Venue | Venue[];

    if (id)
        venue = await connection.getRepository(Venue).createQueryBuilder(process.env.VENUE_TABLE).where({ id }).getOne();
    else
        venue = await connection.getRepository(Venue).createQueryBuilder(process.env.VENUE_TABLE).getMany()

    if (!venue) return res.status(404).json({ message: "No Venue Found" })

    return res.status(200).json({ message: "Venue Fetched", venue })
}

export async function Delete_Venue(req: Request, res: Response) {
    const { id } = req.query;

    const venue = await connection.getRepository(Venue).createQueryBuilder(process.env.VENUE_TABLE).where({ id }).getOne();

    if (!venue) return res.status(404).json({ message: "No Venue Found" })

    await connection.getRepository(Venue).createQueryBuilder(process.env.VENUE_TABLE).delete().where({ id }).execute();

    return res.status(200).json({ message: "Venue Deleted" })
}