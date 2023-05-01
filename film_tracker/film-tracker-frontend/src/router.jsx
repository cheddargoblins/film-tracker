import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { HomePage } from "./Pages/HomePage";
import { LoginPage } from "./Pages/LoginPage";
import { AccountPage } from "./Pages/AccountPage";
import { MovieDetailsPage } from "./Pages/MovieDetailsPage";
import { SearchResultsPage } from "./Pages/SearchResultsPage";
import { TheaterInfoPage } from "./Pages/TheaterInfoPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: < App />,
        children: [
        {
            index: true,
            element: <HomePage />,
        },
        {
                path: "user/",
                element: <LoginPage />,
            },
            {
                path: "user/home/",
                element: <AccountPage />,
            },
            {
                path: "movie/search/:search_query",
                element: <SearchResultsPage />,
            },            
            {
                path: "movie/details/:movieId",
                element: <MovieDetailsPage />,
            },
            {
                path: "movie/times",
                element: <TheaterInfoPage />,
            },
        ],
    }
]);

export default router;
