import { UserDetails } from "../interfaces/sqsBody/user-creation";

export const userCreateEmailPayload = ( userInfo : UserDetails,senderEmailId:string) =>{
    console.log("Creating email Payload for user creation process")
    console.log("Details are :- ",(userInfo));
    console.log("Sender emailid is",senderEmailId)

     const idString = userInfo.category !== 'CUSTOMER' ? `a member of our ${userInfo.category} team` : "our estemeed customer."

    const emailPayload = {
        to:userInfo.email,
        from:senderEmailId,
  subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        text : `
        Hello ${userInfo.name},\n 
        The Entire Super-Collection Team welcomes you as ${idString}. Your userid is ${userInfo.userId}.\n
        Thank You
                
        SuperCollection Team`
    }

    console.log("Msg payload is",JSON.stringify(emailPayload))


    return emailPayload

    
    
}