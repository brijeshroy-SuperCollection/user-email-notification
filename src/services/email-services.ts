import { userCreateEmailPayload } from "../helpers/create-email-payload-helper";
import { UserDetails } from "../interfaces/sqsBody/user-creation";
// import { getSSMParam } from "./ssm-connect";
import  sgMail from "@sendgrid/mail"


export const sendUserCreateEmailServices = async  (userInfo : UserDetails)=>{

//     const ssmParamArr = ["/user/email-api-key","/user/master-email"]
//     let emailSSMConfig : any;
//     try{
//  emailSSMConfig = await  getSSMParam("email" ,ssmParamArr);
//     }
//     catch(err)
//     {
//         console.log("Error is", JSON.stringify(err))
//         throw err;
//     }
    // const senderEmailId = emailSSMConfig["/user/email-api-key"]!;

    const emailPayload = userCreateEmailPayload(userInfo,process.env.API_EMAIL!)
    console.log("Sending message")

    sgMail.setApiKey(process.env.API_KEY!)
    sgMail
  .send(emailPayload)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
    // try{
    // await sgMail.send(emailPayload)
    // console.log("Email Successfully sent")
    // }
    // catch(err)
    // {
    //     console.log("Error is",JSON.stringify(err))
    //      throw err;
    // }



}