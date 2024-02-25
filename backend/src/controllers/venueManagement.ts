import {VenueManagement} from '../database/models/entities/venueManagement'
import {connection} from '../database/connect'
import {Venue} from '../database/models/entities/venue'
import {Committees} from '../database/models/entities/committees'
import {Departments} from '../database/models/entities/departments'
import {Response, Request} from 'express'
import {Event} from '../database/models/entities/event'

export async function CreateVenueManagement(req, res) {
  try {
    // Get required data from request
    const reqBody = req.body
    const {start_date, end_date, start_time, end_time, venue_id, committees_id, dept_id, event_id} =
      reqBody

    const startDate = new Date(start_date)
    const endDate = new Date(end_date)
    const startTime = new Date(start_time)
    const endTime = new Date(end_time)
    // Check if Venue Management already exists

    // const venue_Management = await connection
    //   .getRepository(VenueManagement)
    //   .createQueryBuilder(process.env.VENUEMANAGEMENT_TABLE)
    //   .leftJoinAndSelect(process.env.VENUEMANAGEMENT_TABLE + '.venue', 'venue')
    //   .leftJoinAndSelect(process.env.VENUEMANAGEMENT_TABLE + '.event', 'event')
    //   .leftJoinAndSelect(process.env.VENUEMANAGEMENT_TABLE + '.committees', 'committees')
    //   .leftJoinAndSelect(process.env.VENUEMANAGEMENT_TABLE + '.department', 'department')
    //   .where({id: venue_id})
    //   .getOne()
    // // check wether Venue Management already exists
    // if (venue_Management) {
    //   return res.status(400).json({message: 'Venue Management Already Exists'})
    // }
    // Query the venue
    const venue = await connection
      .getRepository(Venue)
      .createQueryBuilder(process.env.VENUE_TABLE)
      .where({id: venue_id})
      .getOne()

    if (!venue) {
      return res.status(400).json({message: 'Venue does not Exists'})
    }
    //Query the Event
    const event = await connection
      .getRepository(Event)
      .createQueryBuilder(process.env.EVENT_TABLE)
      .where({id: event_id})
      .getOne()
    if (!event) {
      return res.status(400).json({message: 'Event does not Exists'})
    }

    //Query the Committees
    const committees = await connection
      .getRepository(Committees)
      .createQueryBuilder(process.env.COMMITTEES_TABLE)
      .where({id: committees_id})
      .getOne()
    if (!committees) {
      return res.status(400).json({message: 'Committees does not Exists'})
    }

    //Query the Department
    const departments = await connection
      .getRepository(Departments)
      .createQueryBuilder(process.env.DEPARTMENT_TABLE)
      .where({id: dept_id})
      .getOne()
    if (!departments) {
      return res.status(400).json({message: 'Department does not Exists'})
    }

    // Create a new VenueManagement
    const venueManagement = VenueManagement.create({
      start_date: startDate,
      end_date: endDate,
      start_time: startTime,
      end_time: endTime,
    })
    // Save the Venue in the database
    const savedVenueManagement = await venueManagement.save()

    return res
      .status(200)
      .json({message: 'Venue Management Created', VenueManagement: savedVenueManagement})
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({message: 'Internal Server Error'})
  }
}

export async function GetVenueManagement(req: Request, res: Response) {
  try {
    // Get required data from the request body
    const reqBody = req.query
    const {venue_management_id} = reqBody

    let venueManagement

    // Get the VenueManagement by ID
    if (venue_management_id)
      venueManagement = await connection
        .getRepository(VenueManagement)
        .createQueryBuilder(process.env.VENUEMANAGEMENT_TABLE)
        .leftJoinAndSelect(process.env.VENUEMANAGEMENT_TABLE + '.venue', 'venue')
        .leftJoinAndSelect(process.env.VENUEMANAGEMENT_TABLE + '.event', 'event')
        .leftJoinAndSelect(process.env.VENUEMANAGEMENT_TABLE + '.committees', 'committees')
        .leftJoinAndSelect(process.env.VENUEMANAGEMENT_TABLE + '.department', 'department')
        .where({id: venue_management_id})
        .getOne()
    else
      venueManagement = await connection
        .getRepository(VenueManagement)
        .createQueryBuilder(process.env.VENUEMANAGEMENT_TABLE)
        .leftJoinAndSelect(process.env.VENUEMANAGEMENT_TABLE + '.venue', 'venue')
        .leftJoinAndSelect(process.env.VENUEMANAGEMENT_TABLE + '.event', 'event')
        .leftJoinAndSelect(process.env.VENUEMANAGEMENT_TABLE + '.committees', 'committees')
        .leftJoinAndSelect(process.env.VENUEMANAGEMENT_TABLE + '.department', 'department')
        .getMany()

    // Handle the case where the VenueManagement is not found
    if (!venueManagement) {
      return res.status(404).json({message: 'Venue Management not found'})
    }

    // Return a success response with the found VenueManagement
    return res
      .status(200)
      .json({message: 'Venue Management found', venueManagement: venueManagement})
  } catch (error) {
    // Log and return an error response for any unexpected errors
    console.log(error.message)
    return res.status(500).json({message: error.message})
  }
}

// Define the function to handle the deletion of a VenueManagement
export async function DeleteVenueManagement(req: Request, res: Response) {
  try {
    // Get required data from the request body
    const reqBody = req.body
    const {venue_management_id} = reqBody

    let venueManagement

    // Check if venueManagementId is provided for deletion by ID
    if (venue_management_id)
      venueManagement = await connection
        .getRepository(VenueManagement)
        .createQueryBuilder(process.env.INSTITUTE_TABLE)
        .delete()
        .where({id: venue_management_id})
        .execute()

    // Check if the VenueManagement was not found for deletion
    if (venueManagement.affected === 0)
      return res.status(404).json({message: 'Venue Management not found'})

    // Return a success response after successful deletion
    return res.status(200).json({message: 'Venue Management Deleted'})
  } catch (error) {
    // Log and return an error response for any unexpected errors
    console.log(error.message)
    return res.status(500).json({error: error.message})
  }
}
