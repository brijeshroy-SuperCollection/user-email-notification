import { userCreateEmailPayload } from "../helpers/create-email-payload-helper";
import { UserDetails } from "../interfaces/sqsBody/user-creation";
// // import { getSSMParam } from "./ssm-connect";
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
  
    try{
           console.log("Sending message")
 const response = await sgMail.send(emailPayload);
    console.log("Email Successfully sent",JSON.stringify(response))
    }
   catch (err: any) {
    console.error("SENDGRID ERROR MESSAGE >>>", err?.message);
    console.error("SENDGRID ERROR STACK >>>", err?.stack);

    if (err?.response) {
      console.error(
        "SENDGRID RESPONSE STATUS >>>",
        err.response.statusCode
      );
      console.error(
        "SENDGRID RESPONSE BODY >>>",
        JSON.stringify(err.response.body, null, 2)
      );
    }

    throw err;
  }


}




// sgMail.setApiKey(process.env.API_KEY!);

// export const sendUserCreateEmailServices = async (userInfo: any) => {
//   const emailPayload = userCreateEmailPayload(
//     userInfo,
//     process.env.API_EMAIL!
//   );

//   console.log("EMAIL PAYLOAD >>>", JSON.stringify(emailPayload, null, 2));

//   try {
//     const response = await sgMail.send(emailPayload);
//     console.log("SENDGRID RESPONSE >>>", JSON.stringify(response, null, 2));
//   } catch (err: any) {
//     console.error("SENDGRID ERROR MESSAGE >>>", err?.message);
//     console.error("SENDGRID ERROR STACK >>>", err?.stack);

//     if (err?.response) {
//       console.error(
//         "SENDGRID RESPONSE STATUS >>>",
//         err.response.statusCode
//       );
//       console.error(
//         "SENDGRID RESPONSE BODY >>>",
//         JSON.stringify(err.response.body, null, 2)
//       );
//     }

//     throw err;
//   }
// };
