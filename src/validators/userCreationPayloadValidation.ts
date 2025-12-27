import { UserDetails } from "../interfaces/sqsBody/user-creation";
import { USER_INFO_SCHEMA } from "../schemas/userCreationSchema"

export const validateUserDetailsPayload = (userInfo: UserDetails) => {

    const { error, value } = USER_INFO_SCHEMA.validate(userInfo, { abortEarly: false })



    if (error) {
        throw new Error(JSON.stringify(error.details))
    }

    console.log(value)



}