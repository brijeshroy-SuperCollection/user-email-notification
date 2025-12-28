import { UserDetails } from "../interfaces/sqsBody/user-creation"
import { sendUserCreateEmailServices } from "../services/email-services"
import { validateUserDetailsPayload } from "../validators/userCreationPayloadValidation"
export const sendUserCreationMail = async (userInfo: UserDetails) => {
   console.log("Sending Email for New User Registration")
   console.log("Payload is \n", JSON.stringify(userInfo))

   validateUserDetailsPayload(userInfo)
   try {
      await sendUserCreateEmailServices(userInfo)
   }
   catch (err) {
      console.log("Email Sending Failed")
      throw err;
   }
   console.log("Email Sent Successfully")


}