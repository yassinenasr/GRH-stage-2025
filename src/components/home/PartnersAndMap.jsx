import React from 'react';
import partnersLogos from '../../assets/partners_logos.png';

function PartnersAndMap() {
    return (
        <section className="bg-white">
            {/* Partners Section */}
            <div className="py-12 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-12">
                        Accreditation and Quality Assurance
                    </h2>
                    <div className="flex justify-center items-center">
                        <img
                            src={partnersLogos}
                            alt="Partenaires: IAS, ISO 21001:2018, Global Inter Certification, ISCT Group"
                            className="max-w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                        />
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
