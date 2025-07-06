import React from 'react';

const About = () => {
    return (
        <div>
            <section class="py-14 lg:py-24 relative">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative ">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-9">
                        <div class="img-box">
                            <img src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/assets/mission.png" alt="About Us tailwind page"
                                class="max-lg:mx-auto object-cover"/>
                        </div>
                        <div class="lg:pl-[100px] flex items-center">
                            <div class="data w-full">
                                <h2 class="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center relative"> Our Mission </h2>
                                <p class="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                                    <b className='text-black'>The News Daily </b> is committed to delivering reliable, unbiased news coverage that informs, inspires, and engages our readers. Our mission is to provide insightful analysis and in-depth reporting on the most important issues facing our world today.
                                </p>
                                <br/>
                                <p class="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                                    We believe that access to accurate information is essential for a well-informed society. Through our journalism, we aim to empower our readers to make informed decisions and participate actively in their communities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="py-14 lg:py-24 relative">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative ">
                    <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-9 ">

                        <div class="lg:pr-24 flex items-center">
                            <div class="data w-full">
                                <img src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/assets/team.png" alt="About Us tailwind page"
                                    class="block lg:hidden mb-9 mx-auto object-cover"/>
                                <h2 class="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center"> Our Team</h2>
                                <p class="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                                    Our team of dedicated journalists, editors, and contributors brings together diverse perspectives and expertise to deliver high-quality news content. With a focus on integrity and excellence, we uphold the highest standards of journalistic ethics in all our reporting.
                                </p>
                                <br/>
                                <p class="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                                    Meet the individuals behind <b className='text-black'>The News Daily </b> who are passionate about uncovering the truth and bringing you the latest updates from around the globe.
                                </p>
                            </div>
                        </div>
                        <div class="img-box ">
                            <img src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/assets/team.png" alt="About Us tailwind page"
                                class="hidden lg:block object-cover"/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;
