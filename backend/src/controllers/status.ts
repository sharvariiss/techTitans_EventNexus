import { Response, Request } from 'express'
import { connection } from '../database/connect'
import { Status } from '../database/models/entities/status'
import { Institute } from '../database/models/entities/instituteSetUp'
import { VenueManagement } from '../database/models/entities/venueManagement'
import { Roles } from '../database/models/entities/roles'
import { connect } from 'http2'

export async function CreateStatus(req: Request, res: Response) {
  try {
    // Get required data from the request body
    const { status, institute_id, venue_management_id, role_id } = req.body

    if (!status) return res.status(400).json({ message: 'Please provide with a status' })

    // Check if the status already exists
    if (
      await connection
        .getRepository(Status)
        .createQueryBuilder(process.env.STATUS_TABLE)
        .where({ status })
        .getOne()
    )
      return res.status(400).json({ message: 'Status Already Exists' })

    const institute = await connection.getRepository(Institute).findOne({ where: { id: institute_id } })

    if (!institute) return res.status(404).json({ message: 'Institute Does Not Exists' })

    const venueManagement = await connection
      .getRepository(VenueManagement)
      .findOne({ where: { id: venue_management_id } })

    if (!venueManagement) return res.status(404).json({ message: 'Venue Management Does Not Exists' })

    const role = await connection.getRepository(Roles).findOne({ where: { id: role_id } })

    if (!role) return res.status(404).json({ message: 'Role Does Not Exists' })

    if ((role.is_permission_required = false))
      return res.status(400).json({ message: 'Permission from this role is not required' })

    await Status.create({
      status,
      institute,
      venueManagement,
    }).save()

    const permittedRoles = await connection
      .getRepository(Roles)
      .find({ where: { is_permission_required: true } })

    const venue = await connection
      .getRepository(Status)
      .createQueryBuilder(process.env.STATUS_TABLE)
      .leftJoinAndSelect(process.env.STATUS_TABLE + '.institute', 'institute')
      .leftJoinAndSelect(process.env.STATUS_TABLE + '.venueManagement', 'venueManagement')
      .leftJoinAndSelect(process.env.STATUS_TABLE + '.role', 'role')
      .where('venueManagement.id = venue_management_id', { vanue_management_id: venue_management_id })
      .getMany();

    // const filteredVenue: Status[] = venue.filter((statusRecord) => {
    //   const roleIds = permittedRoles.map((role) => role.id)
    //   return (
    //     (statusRecord.status === true || statusRecord.status === false) &&
    //     roleIds.includes(statusRecord.role.id)
    //   )
    // })

    if((permittedRoles.length !== Status.length)) return res.status(200).json({ message: 'Status created' })
    
    let check = false;
    venue.forEach((statusRecord) => {
      if (statusRecord.status === true)
        check = check && true
      else
        check = false && check
    })
    if(check)
      await VenueManagement.update({id:venue_management_id},{final_status:'approved'})

    else 
       await VenueManagement.update({id:venue_management_id},{final_status:'rejected'})

    // Response
    return res.status(200).json({ message: 'Status created' })
  } catch (error) {
    // Log and return an error response for any unexpected errors
    console.log(error.message)
    return res.status(500).json({ error: error.message })
  }
}

export async function GetStatus(req: Request, res: Response) {
  try {
    // Get required data from the request body
    const reqBody = req.query
    const { status_id } = reqBody

    let status

    // Get the status by ID
    if (status_id)
      status = await connection
        .getRepository(Status)
        .createQueryBuilder(process.env.STATUS_TABLE)
        .leftJoinAndSelect(process.env.STATUS_TABLE + '.institute', 'institute')
        .leftJoinAndSelect(process.env.STATUS_TABLE + '.venueManagement', 'venueManagement')
        .leftJoinAndSelect(process.env.STATUS_TABLE + '.role', 'role')
        .where({ id: status_id })
        .getOne()

    // Handle the case where the Status is not found
    if (!status) {
      return res.status(404).json({ message: 'Status not found' })
    }

    // Return a success response with the found Status
    return res.status(200).json({ message: 'Status found', status: status })
  } catch (error) {
    // Log and return an error response for any unexpected errors
    console.log(error.message)
    return res.status(500).json({ message: error.message })
  }
}
