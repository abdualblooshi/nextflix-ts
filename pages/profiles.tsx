import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
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

const Profiles = () => {
  // we have
  // default-{color}.png
  // there's blue green red and slate.
  // this function would return a random path to one of those images.

  const { data: user } = useCurrentUser();

  const getRandomProfileImage = () => {
    const colors = ["blue", "green", "red", "slate"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return `/images/default-${randomColor}.png`;
  };

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => {}}>
            <div className="group flex-row w-44 mx-auto">
              <div
                className="
                w-44
                h-44
                rounded-md
                flex
                items-center
                justify-center
                border-2
                border-transparent
                group-hover:cursor-pointer
                group-hover:border-white
                overflow-hidden
              "
              >
                <Image
                  src={getRandomProfileImage()}
                  alt="Profile"
                  width={200}
                  height={200}
                />
              </div>
              <div
                className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white
                "
              >
                {user?.firstName}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
