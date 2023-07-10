import { NextPageContext } from "next";
import { signOut, getSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";

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
      <h1 className="text-4xl text-red-400">
        Welcome to Nextflix <span className="font-semibold">John</span>!
      </h1>
      <h2 className="text-2xl text-red-400">
        You are signed in with {user?.email}
      </h2>
      <br />
      <button
        className="bg-[#F2F2F2] text-[#111] px-10 py-4 rounded-lg w-full"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </>
  );
}
