import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

function Newsletter() {
    useEffect(() => {
       Aos.init(); 
    },[])
  return (
    <section className="relative bg-gray-200 " style={ {borderTop: "2px solid #000000ff", borderBottom :"2px solid #000000ff"}}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">

          {/* CTA box */}
          <div className="relative bg-grayshade-400 rounded py-10 px-8 md:py-16 md:px-12 shadow-2xl overflow-hidden mt-4" data-aos="zoom-y-out">

            {/* Background illustration */}
            <div className="absolute right-0 bottom-0 pointer-events-none hidden lg:block" aria-hidden="true">
              <svg width="428" height="328" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient cx="35.542%" cy="34.553%" fx="35.542%" fy="34.553%" r="96.031%" id="ni-a">
                    <stop stopColor="#c6afff" offset="0%" />
                    <stop stopColor="#5c1bff" offset="44.317%" />
                    <stop stopColor="#4b03ff" offset="100%" />
                  </radialGradient>
                </defs>
                <g fill="none" fillRule="evenodd">
                  <g fill="#b99dff">
                    <ellipse fillOpacity=".04" cx="185" cy="15.576" rx="16" ry="15.576" />
                    <ellipse fillOpacity=".24" cx="100" cy="68.402" rx="24" ry="23.364" />
                    <ellipse fillOpacity=".12" cx="29" cy="251.231" rx="29" ry="28.231" />
                    <ellipse fillOpacity=".64" cx="29" cy="251.231" rx="8" ry="7.788" />
                    <ellipse fillOpacity=".12" cx="342" cy="31.303" rx="8" ry="7.788" />
                    <ellipse fillOpacity=".48" cx="62" cy="126.811" rx="2" ry="1.947" />
                    <ellipse fillOpacity=".12" cx="78" cy="7.072" rx="2" ry="1.947" />
                    <ellipse fillOpacity=".64" cx="185" cy="15.576" rx="6" ry="5.841" />
                  </g>
                  <circle fill="url(#ni-a)" cx="276" cy="237" r="200" />
                </g>
              </svg>
            </div>

            <div className="relative flex flex-col lg:flex-row justify-between items-center">

              {/* CTA content */}
              <div className="text-center lg:text-left lg:max-w-xl"> 
                <h3 className="h2 mb-4 text-purpleshade-400 text-3xl font-extrabold text-center ">N’hésitez pas</h3>
                <p className="text-gray-300 text-lg mb-6">Vous disposez d’un champ pour laisser une question ou un avis concernant notre plateforme, ainsi qu’un champ pour renseigner votre adresse e-mail si nous avons besoin de vous contacter.</p>

                {/* CTA form */}
                <form className="w-full lg:w-auto">
                                                          <input type="text" className="w-full appearance-none bg-grayshade-400 border border-grayshade-200 focus:border-grayshade-100 focus:outline-none rounded-sm px-4 py-3 mb-2 sm:mb-0 sm:mr-2 text-white placeholder-gray-500" placeholder="Question/Avis" aria-label="Your email…" />

                    <input type="email" className="w-full appearance-none bg-grayshade-400 border border-grayshade-200 focus:border-grayshade-100 mt-4 focus:outline-none rounded-sm px-4 py-3 mb-2 sm:mb-0 sm:mr-2 text-white placeholder-gray-500" placeholder="Your email…" aria-label="Votre email…" />
                    <a className="btn text-white bg-purpleshade-400 hover:bg-purpleshade-300 shadow w-full px-4 py-3 mb-2 mt-4" href="#0">Envoyer </a>
                </form>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Newsletter;
