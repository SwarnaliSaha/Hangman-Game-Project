export const user_responses = {
    user_created : {
        statusCode:200,
        message:"user is crested successfully"
    },
    user_not_created : {
        statusCode:400,
        message: "user not created!"
    },
    user_updated : {
        statusCode:200,
        message:"user is updated successfully"
    },
    user_not_updated : {
        statusCode:400,
        message:"user is not updated successfully"
    },
    user_deleted : {
        statusCode:200,
        message:"user is deleted successfully"
    },
    user_not_deleted : {
        statusCode:400,
        message:"user is not deleted"
    },
    user_not_found : {
        statusCode:404,
        message:"user NOT FOUND"
    },
    moderator_access_given : {
        statusCode : 200,
        message : "User is given the modertor access successfully"
    },
    moderator_access_not_given : {
        statusCode : 200,
        message : "Sorry ! Moderator access is already given."
    }
}