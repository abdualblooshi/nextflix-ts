import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-[#111]/90 text-white py-2 text-center bottom-0">
      <span>Developed by </span>
      <Link
        className="underline"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.github.com/abdualblooshi"
      >
        Abdulrahman Alblooshi
      </Link>
    </footer>
  );
};

export default Footer;
