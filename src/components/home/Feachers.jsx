import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import newsStudentLaptop from "../../assets/news_student_laptop.png";
import newsGraduation from "../../assets/news_graduation.png";
import newsElection from "../../assets/news_election.png";
import { RiArrowRightLine } from "react-icons/ri";

function Features() {
  useEffect(() => {
    AOS.init();
  }, []);

  const newsItems = [
    {
      id: 1,
      date: { day: "12", month: "Déc." },
      image: newsStudentLaptop,
      title: "التسجيل الاستثنائي الرابع بالسنة الأولى إجازة",
      description: "بلاغ التسجيل الاستثنائي الرابع بالسنة الأولى من الشهادة الوطنية للإجازة",
      details: "بلاغ التسجيل الاستثنائي الرابع بالسنة الأولى من الشهادة الوطنية للإجازة آخر أجل للتسجيل: 15 ديسمبر 2025",
      isNew: true,
    },
    {
      id: 2,
      date: { day: "10", month: "Déc." },
      image: newsGraduation,
      title: "نتائج انتخابات ممثلي الطلبة بالمجلس العلمي للمعهد",
      description: "نتائج انتخابات ممثلي الطلبة بالمجلس العلمي للمعهد بعنوان السنة الجامعية 2025-2026",
      details: "",
      isNew: true,
    },
    {
      id: 3,
      date: { day: "06", month: "Déc." },
      image: newsElection,
      title: "انتخابات ممثلي الطلبة",
      description: "قائمة المترشحين لانتخابات ممثلي الطلبة بالمجلس العلمي للمعهد بعنوان السنة الجامعية 2025-2026",
      details: "",
      isNew: false, // Based on image, only first two have "New" ribbon? Or maybe all. Let's assume first two based on color. Actually image shows red banner on 3rd too but different text. Let's stick to "New" for consistency or custom text.
      customBanner: "انتخابات ممثلي الطلبة", // The 3rd one has a full banner
      customBannerColor: "bg-red-600",
    },
  ];

  return (
    <section className="relative bg-white py-12 md:py-20 overflow-hidden">
      {/* Watermark Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 flex justify-center items-start overflow-hidden opacity-20">
        <span className="text-[15vw] font-bold text-gray-400 whitespace-nowrap uppercase leading-none mt-[-2vw] animate-marquee">
          Institut Supérieur des Sciences Appliquées et de Technologie de Kairouan
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Nouveautés
          </h2>
          <a href="#" className="flex items-center gap-2 text-blue-500 font-semibold hover:text-blue-600 transition-colors mt-4 md:mt-0">
            <span className="w-4 h-1 bg-blue-500 inline-block"></span>
            Toute l'actualité
          </a>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 group hover:shadow-xl transition-shadow duration-300 flex flex-col"
              data-aos="fade-up"
              data-aos-delay={item.id * 100}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-cyan-500 text-white p-2 rounded-md text-center min-w-[3.5rem] shadow-md">
                  <div className="text-xl font-bold leading-none">{item.date.day}</div>
                  <div className="text-xs font-medium uppercase">{item.date.month}</div>
                </div>

                {/* New Ribbon / Banner */}
                {item.isNew && (
                  <div className="absolute top-4 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 shadow-md transform translate-x-2">
                    <div className="relative">
                      New
                      <div className="absolute top-0 right-full w-0 h-0 border-t-[12px] border-t-transparent border-r-[8px] border-r-red-700 border-b-[12px] border-b-transparent mt-[-4px] mr-[-8px] z-[-1]"></div>
                    </div>
                  </div>
                )}

                {/* Custom Banner (like the 3rd card) */}
                {item.customBanner && (
                  <div className={`absolute top-0 left-0 w-full ${item.customBannerColor} text-white text-center py-2 font-bold shadow-md`}>
                    {item.customBanner}
                  </div>
                )}

                {/* Overlay Text for 1st card style */}
                {item.id === 1 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-center p-4">
                    <h3 className="text-white text-2xl font-bold drop-shadow-md leading-tight">
                      {item.title}
                    </h3>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col justify-between text-right" dir="rtl">
                <div>
                  {item.id !== 1 && (
                    <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                      {item.description}
                    </h3>
                  )}
                  {item.id === 1 && (
                    <>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                        {item.description}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {item.details}
                      </p>
                    </>
                  )}
                  {item.id !== 1 && (
                    <h3 className="text-gray-800 font-medium mb-2">
                      {item.title}
                    </h3>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end text-blue-600 font-bold group-hover:text-blue-700 transition-colors">
                  <span className="ml-2">Plus de détails</span>
                  <span className="w-6 h-1 bg-blue-500 inline-block"></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Large Arrow Decoration */}
        <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-cyan-500 opacity-80 pointer-events-none">
          <svg width="100" height="150" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10 L80 75 L10 140" stroke="currentColor" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

      </div>
    </section>
  );
}

export default Features;
