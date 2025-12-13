import React from 'react';
import { FaBuilding, FaUniversity, FaIndustry, FaGlobe } from 'react-icons/fa';

function PartnersAndMap() {
    const partners = [
        { id: 1, name: "ENET'COM", icon: <FaUniversity className="text-4xl text-blue-900" /> },
        { id: 2, name: "Technopole", icon: <FaIndustry className="text-4xl text-red-600" /> },
        { id: 3, name: "CRNS", icon: <FaGlobe className="text-4xl text-blue-500" /> },
        { id: 4, name: "BIAT", icon: <FaBuilding className="text-4xl text-orange-500" /> },
        { id: 5, name: "Technopole Sfax", icon: <FaIndustry className="text-4xl text-red-600" /> },
    ];

    return (
        <section className="bg-white">
            {/* Partners Section */}
            <div className="py-12 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-12">
                        Partenaires
                    </h2>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 transition-all duration-500">
                        {partners.map((partner) => (
                            <div key={partner.id} className="flex flex-col items-center gap-2 group cursor-pointer">
                                <div className="transform group-hover:scale-110 transition-transform duration-300">
                                    {partner.icon}
                                </div>
                                <span className="font-bold text-gray-700 group-hover:text-blue-900 transition-colors">{partner.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="w-full h-96 md:h-[500px] relative transition-all duration-700">
                <iframe
                    src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=ISSAT%20Kairouan+(ISSAT%20Kairouan)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ISSAT Kairouan Location"
                ></iframe>
            </div>
        </section>
    );
}

export default PartnersAndMap;
