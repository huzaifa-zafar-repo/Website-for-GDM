import { SOCIAL_LINKS } from "@/constants";

export const Footer = () => {
  return (
    <footer className="w-screen bg-gray-900 py-4 text-white" style={{backgroundColor: "#111"}}>
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-8 md:flex-row">
        <div className="text-center text-sm md:text-left">
          <p>&copy; <strong className="font-semibold">Huzzii Dev</strong>{" "}
          {new Date().getFullYear()}. All rights reserved.</p>
          <p className="text-sm opacity-75">Made by Huzzii Dev</p>
          <p className="text-sm opacity-90">📞 +92 304 3133238</p>
        </div>

        <div className="flex justify-center gap-4 md:justify-start">
          {SOCIAL_LINKS.map(({ href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className="text-white transition-colors duration-500 ease-in-out hover:opacity-75"
            >
              <Icon />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href="#"
            className="text-center text-sm transition hover:underline hover:opacity-75 md:text-right"
          >
            Privacy Policy
          </a>

          <b>|</b>

          <a
            href="#"
            className="text-center text-sm transition hover:underline hover:opacity-75 md:text-right"
          >
            Terms &amp; Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};
