import { UserDetails } from "../interfaces/sqsBody/user-creation"

export const createDbPayload = (userInfo: UserDetails) =>{
    console.log('Creating Db Payload for email idemopotency')
    const dbQuery = 'Insert into email_idempotency (event_key) values ($1) returning id'
    const dbParams = [userInfo.userId] 
    
    console.log('The query is :- ',dbQuery);
    console.log("The Params are",dbParams)

    return {dbQuery,dbParams}
}