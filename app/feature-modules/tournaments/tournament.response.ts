export const tournament_responses = {
    tournament_created : {
        statusCode:200,
        message:"tournament is crested successfully"
    },
    tournament_not_created : {
        statusCode:400,
        message: "tournament not created!"
    },
    tournament_updated : {
        statusCode:200,
        message:"tournament is updated successfully"
    },
    tournament_not_updated : {
        statusCode:400,
        message:"tournament is not updated"
    },
    tournament_deleted : {
        statusCode:200,
        message:"tournament is deleted successfully"
    },
    tournament_not_deleted : {
        statusCode:400,
        message:"tournament is not deleted"
    },
    tournament_not_found : {
        statusCode:404,
        message:"tournament not found"
    },
    tournament_pending : {
        statusCode:200,
        message:"Asked for changes."
    },
    cannot_play : {
        statusCode : 400,
        message : "This tournament can't be played"
    }
}