import { NextPageContext } from "next";
import { signOut, getSession } from "next-auth/react";

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
  return (
    <>
      <h1 className="text-4xl text-red-400">Nextflix: A netflix clone haha</h1>
      <button
        className="bg-gray-500 text-white px-10 py-4 rounded-lg"
        onClick={() => signOut()}
      />
    </>
  );
}
