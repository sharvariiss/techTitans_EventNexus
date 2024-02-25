import { Response, Request } from "express";
import { connection } from "../database/connect";
import { Departments } from "../database/models/entities/departments";


export async function CreateDepartments(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { name } = req.body;

        if (!name) return res.status(400).json({ message: "Please provide with a name for the Departments you are Trying to Create" })

        // Check if the Department already exists
        if (await connection.getRepository(Departments).createQueryBuilder(process.env.DEPARTMENT_TABLE).where({ name }).getOne())
            return res.status(400).json({ message: "Departments Already Exists" })

        // Create Department
        await Departments.create({
            name
        }).save()

        // Response
        return res.status(200).json({ message: "Departments created" })
        
    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}

export async function GetDepartments(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { id } = req.query;

        let departments: Departments | Departments[];

        // Fetch Department
        if (id)
            departments = await connection.getRepository(Departments).createQueryBuilder(process.env.DEPARTMENT_TABLE).where({ id }).getOne()
        else
            departments = await connection.getRepository(Departments).createQueryBuilder(process.env.DEPARTMENT_TABLE).getMany()

        if (!departments) return res.status(404).json({ message: "No Departments Found" })

        // Response
        return res.status(200).json({ message: "Departments Fetched", departments })

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}

export async function DeleteDepartments(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { id } = req.query;
        if (!id) return res.status(400).json({ message: "Please provide id" })

        // Delete Department
        const department = await connection.getRepository(Departments).createQueryBuilder(process.env.DEPARTMENT_TABLE).delete().where({ id }).execute();

        // Check if the User was not found for deletion
        if (department && department.affected === 0)
            return res.status(404).json({ message: "Department not found" });

        // Response
        return res.status(200).json({ message: "Departments Deleted" })

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}