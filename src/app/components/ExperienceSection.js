export default function ExperienceCard() {
  return (
    <section className="text-black px-4 md:pl-20 pr-6 py-10 max-w-2xl pt-28 mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
        Experience
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 relative text-center md:text-left">
        {/* Logo */}
        <img
          src="/fpt-is-logo.png"
          alt="FPT IS Logo"
          className="w-16 h-16 object-contain -mt-2 hover:scale-115"
        />

        {/* Content */}
        <div>
          <h3 className="text-lg font-bold">Junior Software Engineer</h3>
          <p className="text-black-400">FPT IS · Full-time</p>
          <p className="text-sm text-black-500">Jan 2025 - Present </p>
          <p className="text-sm text-black-500">
            Banani, Dhaka, Bangladesh · On-site
          </p>

          <p className="mt-4 text-black-200 leading-relaxed text-justify">
            I contribute to web development using JavaScript, Next.js, and
            Node.js, focusing on performance and user experience. Passionate
            about learning and growing as a full-stack developer.
          </p>
        </div>
      </div>
    </section>
  );
}
