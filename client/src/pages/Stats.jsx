import { useQuery } from "@tanstack/react-query";
import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

const statsQuery = {
    queryKey: ["stats"],
    queryFn: async () => {
        const response = await customFetch.get("/jobs/stats");

        return response.data;
    },
};

export const loader = (queryClient) => async () => {
    const data = await queryClient.ensureQueryData(statsQuery);
    // return data;

    return null; // we can do this since we are not accessing the data from this loader
};

const Stats = () => {
    // const { defaultStats, monthlyApplications } = useLoaderData();

    const { data } = useQuery(statsQuery);

    const { defaultStats, monthlyApplications } = data;

    return (
        <>
            <StatsContainer defaultStats={defaultStats} />
            {monthlyApplications?.length > 1 && (
                <ChartsContainer data={monthlyApplications} />
            )}
        </>
    );
};
export default Stats;
