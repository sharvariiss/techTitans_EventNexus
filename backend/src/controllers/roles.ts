import { Response, Request } from "express";
import { connection } from "../database/connect";
import { Roles } from "../database/models/entities/roles";


export async function CreateRoles(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { name } = req.body;

        if (!name) return res.status(400).json({ message: "Please provide with a name for the Role you are trying to create" })

        // Check if the role already exists
        if (await connection.getRepository(Roles).createQueryBuilder(process.env.ROLES_TABLE).where({ name }).getOne())
            return res.status(400).json({ message: "Role Already Exists" })

        await Roles.create({
            name
        }).save()

        // Response
        return res.status(200).json({ message: "Role created" })

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}

export async function GetRoles(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { id } = req.query;

        let roles: Roles | Roles[];

        // Fetch Roles
        if (id)
            roles = await connection.getRepository(Roles).createQueryBuilder(process.env.ROLES_TABLE).where({ id }).getOne()
        else
            roles = await connection.getRepository(Roles).createQueryBuilder(process.env.ROLES_TABLE).getMany()

        if (!roles) return res.status(404).json({ message: "No Roles Found" })

        // Response
        return res.status(200).json({ message: "Roles Fetched", roles })

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}

export async function DeleteRoles(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { id } = req.query;

        const response = await connection.getRepository(Roles).createQueryBuilder(process.env.ROLES_TABLE).delete().where({ id }).execute();

        // Check if the institute was not found for deletion
        if (response.affected === 0)
            return res.status(404).json({ message: "Role not found" });

        // Response
        return res.status(200).json({ message: "Roles Deleted" })

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}