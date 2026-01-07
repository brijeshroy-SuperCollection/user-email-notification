import { createDbPayload } from "../helpers/create-Db-payload-helper";
import { UserDetails } from "../interfaces/sqsBody/user-creation"
import { insertEmailRecord } from "../services/db-insert-services";
import { sendUserCreateEmailServices } from "../services/email-services"
import { validateUserDetailsPayload } from "../validators/userCreationPayloadValidation"
export const sendUserCreationMail = async (userInfo: UserDetails) => {
   console.log("Sending Email for New User Registration");
   console.log("Payload is \n", JSON.stringify(userInfo))

   validateUserDetailsPayload(userInfo)
   try {
      const { dbQuery, dbParams } = createDbPayload(userInfo)
      const dbRes = await insertEmailRecord(dbQuery, dbParams)
      console.log("Entry created in email idempotency table :- ",dbRes)
   }
   catch (error) {
      console.log("Error encountered is :-", error);
      throw error
   }
   try {
      await sendUserCreateEmailServices(userInfo)
   }
   catch (err) {
      console.log("Email Sending Failed")
      throw err;
   }
   console.log("Email Sent Successfully")


}