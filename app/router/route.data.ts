import { Route,Routes } from "./route.type"
import Routers from "../feature-modules/index"
import { ExcludedPath, ExcludedPaths } from "../utility/middlewares";

export const routes : Routes =[
    new Route('/auth',Routers.AuthRouter),
    new Route('/role',Routers.RoleRouter),
    new Route('/users',Routers.UserRouter),
    new Route("/category",Routers.CategoryRouter),
    new Route('/level',Routers.LevelRouter),
    new Route('/words',Routers.WordRouter),
    new Route('/tournament',Routers.TournamentRouter),
    new Route('/comments',Routers.CommentRouter)
];

export const excludedPaths: ExcludedPaths = [
//   new ExcludedPath("/auth/login", "POST"),
    new ExcludedPath("/auth/generateNewToken", "POST")
];