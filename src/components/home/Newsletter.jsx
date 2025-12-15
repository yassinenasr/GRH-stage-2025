import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import event1 from '../../assets/event1.jpg';
import event2 from'../../assets/event2.jpg';
import { FaCalendarAlt } from 'react-icons/fa';

function Newsletter() {
  useEffect(() => {
    Aos.init();
  }, [])

  const events = [
    {
      id: 1,
      image: event1,
      date: "13. Dec. 2025",
      title: "HACK V 1.0"
    },
    {
      id: 2,
      image: event2,
      date: "11. Dec. 2025",
      title: "Be there❤️‍🔥🐎"
    }
  ];

  return (
    <section className="relative bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 md:mb-0">
            Manifestations
          </h2>
          <div className="max-w-xl text-gray-600">
            <p>
              L'alignement sur les standards internationaux, conduit à se développer à l'international, à co-construire ses programmes
            </p>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col" data-aos="fade-up">
              {/* Image */}
              <div className="relative overflow-hidden rounded-lg shadow-lg mb-6 aspect-video group">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Date */}
              <div className="flex items-center text-gray-600 mb-3">
                <FaCalendarAlt className="mr-2" />
                <span className="text-sm font-medium">{event.date}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                {event.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Newsletter;
