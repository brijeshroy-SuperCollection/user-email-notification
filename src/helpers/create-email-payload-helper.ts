import { UserDetails } from "../interfaces/sqsBody/user-creation";

export const userCreateEmailPayload = ( userInfo : UserDetails,senderEmailId:string) =>{
    console.log("Creating email Payload for user creation process")
    console.log("Details are :- ",JSON.stringify(userInfo));
    console.log("Sender emailid is",senderEmailId)

    const idString = userInfo.category !== 'CUSTONMER' ? `a member of our ${userInfo.category} team` : "estemeed customer."

    const emailPayload = {
        to:userInfo.email,
        from:senderEmailId,
        Subject : "Welcome Mail from SuperCollection",
        text: "Hello"
        // text : `Hello ${userInfo.name},
        //         The Entire Super-collection Welcomes you as our ${idString}. Your userid is ${userInfo.userId}
        //         Thank You
                
        //         SuperCollection Team`
    }

    console.log("Msg payload is",JSON.stringify(emailPayload))


    return emailPayload

    
    
}