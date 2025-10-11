'use client';

export default function Contact() {
  const iframeClass =
    'w-full h-[100vh] ';

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 p-6 flex flex-col items-center ">
      

      <div className="w-full transition-all duration-500 mt-20">
        <iframe
          src="https://contact-form-iota-opal.vercel.app/"
          className={iframeClass}
        ></iframe>
      </div>
      
    </main>
  );
}
