export const level_responses = {
    level_added : {
        statusCode:200,
        message:"this level is added successfully"
    },
    level_not_added : {
        statusCode:400,
        message: "level not added!"
    },
    level_updated : {
        statusCode:200,
        message:"this level is updated successfully"
    },
    level_not_updated : {
        statusCode:400,
        message:"this level is  successfully"
    },
    level_deleted : {
        statusCode:200,
        message:"this level is deleted successfully"
    },
    level_not_deleted : {
        statusCode:400,
        message:"this level is not deleted"
    },
    level_not_found : {
        statusCode:404,
        message:"level NOT FOUND"
    }
}