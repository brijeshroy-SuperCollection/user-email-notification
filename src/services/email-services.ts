import { userCreateEmailPayload } from "../helpers/create-email-payload-helper";
import { UserDetails } from "../interfaces/sqsBody/user-creation";
import { getSSMParam } from "./ssm-connect";
import  sgMail from "@sendgrid/mail"


export const sendUserCreateEmailServices = async  (userInfo : UserDetails)=>{

    const ssmParamArr = ["/user/email-api-key","/user/master-email"]

    const emailSSMConfig = await  getSSMParam("email" ,ssmParamArr);
    const senderEmailId = emailSSMConfig["/user/email-api-key"]!;

    const emailPayload = userCreateEmailPayload(userInfo,senderEmailId)

    sgMail.setApiKey(emailSSMConfig["/user/email-api-key"]!)
    try{
    await sgMail.send(emailPayload)
    console.log("Email Successfully sent")
    }
    catch(err)
    {
        console.log("Error is",JSON.stringify(err))
        throw err;
    }



}