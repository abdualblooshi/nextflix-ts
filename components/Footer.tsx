import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-zinc-900/90 text-white py-6 text-center fixed bottom-0">
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
