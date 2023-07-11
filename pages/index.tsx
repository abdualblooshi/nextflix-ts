import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  // print session for debugging
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: user } = useCurrentUser();
  return (
    <>
      <Navbar />
      <Billboard />
      <MovieList data={user?.favoriteMovies} title="My Favorites" />
    </>
  );
}
