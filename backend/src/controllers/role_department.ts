import { Response, Request } from "express";
import { connection } from "../database/connect";
import { Roles } from "../database/models/entities/roles";
import { Departments } from "../database/models/entities/departments";
import { Roles_Department_Mapping } from "../database/models/entities/roles_department_mapping";


export async function CreateRolesDepartmentMapping(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { role_id, department_id } = req.body;

        if (!role_id) return res.status(400).json({ message: "Please provide with a role_id for the Role you are trying to map" })
        if (!department_id) return res.status(400).json({ message: "Please provide with a department_id for the Department you are trying to map" })


        // Checking if the mapping already exists
        if (await connection
            .getRepository(Roles_Department_Mapping)
            .createQueryBuilder(process.env.ROLES_DEPARTMENT_MAPPING_TABLE)
            .leftJoinAndSelect(process.env.ROLES_DEPARTMENT_MAPPING_TABLE + '.role', 'role')
            .leftJoinAndSelect(process.env.ROLES_DEPARTMENT_MAPPING_TABLE + '.department', 'department')
            .where('role.id = :role_id and department.id = :department_id', { role_id, department_id })
            .getOne())
            return res.status(400).json({ message: "Mapping Already Exists" })

        const role = await connection.getRepository(Roles).createQueryBuilder(process.env.ROLES_TABLE).where({ id: role_id }).getOne()
        if (!role)
            return res.status(400).json({ message: "Role Does Not Exists" })

        const department = await connection.getRepository(Departments).createQueryBuilder(process.env.DEPARTMENT_TABLE).where({ id: department_id }).getOne()
        if (!department)
            return res.status(400).json({ message: "Department Does Not Exists" })

        await Roles_Department_Mapping.create({
            role,
            department
        }).save()

        return res.status(200).json({ message: "Role and Department Maping created" })
    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}

export async function GetRolesDepartmentMapping(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { role_id, department_id } = req.query;

        let roles_department_mapping: Roles_Department_Mapping | Roles_Department_Mapping[];

        if (role_id)
            roles_department_mapping = await connection
                .getRepository(Roles_Department_Mapping)
                .createQueryBuilder(process.env.ROLES_DEPARTMENT_MAPPING_TABLE)
                .leftJoinAndSelect(process.env.ROLES_DEPARTMENT_MAPPING_TABLE + '.role', 'role')
                .leftJoinAndSelect(process.env.ROLES_DEPARTMENT_MAPPING_TABLE + '.department', 'department')
                .where('role.id = :role_id', { role_id })
                .getOne()
        else if (department_id)
            roles_department_mapping = await connection
                .getRepository(Roles_Department_Mapping)
                .createQueryBuilder(process.env.ROLES_DEPARTMENT_MAPPING_TABLE)
                .leftJoinAndSelect(process.env.ROLES_DEPARTMENT_MAPPING_TABLE + '.role', 'role')
                .leftJoinAndSelect(process.env.ROLES_DEPARTMENT_MAPPING_TABLE + '.department', 'department')
                .where('department.id = :department_id', { department_id })
                .getOne()
        else
            roles_department_mapping = await connection
                .getRepository(Roles_Department_Mapping)
                .createQueryBuilder(process.env.ROLES_DEPARTMENT_MAPPING_TABLE)
                .leftJoinAndSelect(process.env.ROLES_DEPARTMENT_MAPPING_TABLE + '.role', 'role')
                .leftJoinAndSelect(process.env.ROLES_DEPARTMENT_MAPPING_TABLE + '.department', 'department')
                .getMany()

        if (!roles_department_mapping) return res.status(404).json({ message: "No Mapping Found" })

        return res.status(200).json({ message: "Role and Deparment Mapping Fetched", roles: roles_department_mapping })
    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}

export async function DeleteRolesDepartmentMapping(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { role_id, department_id } = req.query;
        if (!(role_id))
            return res.status(400).json({ message: "Please provide role_id" });
        if (!(department_id))
            return res.status(400).json({ message: "Please provide department_id" });

        // Delete Role Department mapping
        const response = await connection.getRepository(Roles_Department_Mapping)
            .createQueryBuilder(process.env.ROLES_DEPARTMENT_MAPPING_TABLE)
            .leftJoinAndSelect(process.env.ROLES_DEPARTMENT_MAPPING_TABLE + '.role', 'role')
            .leftJoinAndSelect(process.env.ROLES_DEPARTMENT_MAPPING_TABLE + '.department', 'department')
            .delete()
            .where('role.id = :role_id and department.id = :department_id', { role_id, department_id })
            .execute();

        // Check if the institute was not found for deletion
        if (response.affected === 0)
            return res.status(404).json({ message: "Mapping not found" });

        return res.status(200).json({ message: "Mapping Deleted" })
    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }

}