import {SQSEvent} from "aws-lambda"
import { SendEmailCommand } from "@aws-sdk/client-ses"
import { sendUserCreationMail } from "./routes/routeHandler"

export const handler = async (event:SQSEvent) =>{
    console.log("Email Processing Lambda started")
    console.log("Lambda is \n",JSON.stringify(event))
    let count = 0
    for(const record of event.Records){
        console.log(`Record ${count} \n ${JSON.stringify(record)}`)
        const mainBody = JSON.parse(record.body)
        const useCase = mainBody.eventType
     
        try{
        switch(useCase){
            case  "USER_CREATED" :
            await  sendUserCreationMail(mainBody)
            break;

            default : 
            console.log("Action not configured")
        }
    }
    catch(err)
    {
        console.log(` ${useCase} notificatiom Process failed`)
        throw err ;
    }
    }
}