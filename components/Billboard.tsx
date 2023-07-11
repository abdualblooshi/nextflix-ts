import React from "react";
import useBillbaord from "@/hooks/useBillboard";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsPlayFill } from "react-icons/bs";
import { useRouter } from "next/router";
import useInfoModalStore from "@/hooks/useInfoModalStore";

const Billboard = () => {
  const { data } = useBillbaord();
  const router = useRouter();

  return (
    <div className="relative h-[56.25vw]">
      <video
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
        src={data?.videoUrl}
        poster={data?.thumbnailUrl}
        autoPlay
        loop
        muted
      ></video>
      <div className="absolute top-[30%] md:top=[40%] ml-4 md:ml-16">
        <p className="text-1xl md:text-6xl font-bold text-white h-full w-[50%] lg:text-6xl drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-2xl mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[40%] drop-shadow-xl">
          {data?.description}
        </p>
        <div
          className="
            flex
            flex-row
            items-center
            mt-3
            md:mt-4
            gap-3
            md:text-2xl
            "
        >
          <button
            className="
          bg-white
          text-[#111]
          rounded-md
          py-1 md:py-2
          px-2 md:px-4
          w-auto
          text-xs
          lg:text-3xl
          font-semibold
          flex-row
          flex
          items-center
          hover:bg-opacity-60
          transition
          "
            onClick={() => router.push(`/watch/${data?.id}`)}
          >
            <BsPlayFill className="mr-1" />
            Play
          </button>
          <button
            className="
          bg-white
          text-white
          bg-opacity-30
          rounded-md
          py-1 md:py-2
          px-2 md:px-4
          w-auto
          text-xs
          lg:text-3xl
          font-semibold
          flex-row
          flex
          items-center
          hover:bg-opacity-20
          transition
          "
          >
            <AiOutlineInfoCircle className="mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
