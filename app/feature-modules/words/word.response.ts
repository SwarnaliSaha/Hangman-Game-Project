export const word_responses = {
    word_added : {
        statusCode:200,
        message:"this word is added successfully"
    },
    word_not_added : {
        statusCode:400,
        message: "word not added!"
    },
    word_updated : {
        statusCode:200,
        message:"this word is updated successfully"
    },
    word_not_updated : {
        statusCode:400,
        message:"this word is  successfully"
    },
    word_deleted : {
        statusCode:200,
        message:"this word is deleted successfully"
    },
    word_not_deleted : {
        statusCode:400,
        message:"this word is not deleted"
    },
    word_not_found : {
        statusCode:404,
        message:"word NOT FOUND"
    }
}