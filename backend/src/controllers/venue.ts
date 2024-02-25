import { Response, Request } from "express";
import { connection } from "../database/connect";
import { Venue } from "../database/models/entities/venue";


export async function CreateVenue(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { name } = req.body;

        if (!name) return res.status(400).json({ message: "Please provide with a name for the Venue you are trying to create" })
        
        // Check if the venue already exists
        if (await connection.getRepository(Venue).createQueryBuilder(process.env.VENUE_TABLE).where({ name }).getOne())
            return res.status(400).json({ message: "Venue Already Exists" })

        await Venue.create({
            name
        }).save()

        // Response
        return res.status(200).json({ message: "Venue created" })

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}

export async function GetVenue(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { id } = req.query;

        let venue: Venue | Venue[];

        if (id)
            venue = await connection.getRepository(Venue).createQueryBuilder(process.env.VENUE_TABLE).where({ id }).getOne();
        else
            venue = await connection.getRepository(Venue).createQueryBuilder(process.env.VENUE_TABLE).getMany()

        if (!venue) return res.status(404).json({ message: "No Venue Found" })

        // Response
        return res.status(200).json({ message: "Venue Fetched", venue })

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}

export async function DeleteVenue(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { id } = req.query;

        const response = await connection.getRepository(Venue).createQueryBuilder(process.env.VENUE_TABLE).delete().where({ id }).execute();

        // Check if the institute was not found for deletion
        if (response.affected === 0)
            return res.status(404).json({ message: "Venue not found" });


        // Response
        return res.status(200).json({ message: "Venue Deleted" })

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}