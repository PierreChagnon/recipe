import Link from 'next/link';
import React from 'react';

const Abstract = () => {
    const abstractText = "We hypothesize that fictional stories are highly successful in human cultures partly because they activate evolved cognitive mechanisms, for instance for finding mates (e.g., in romance fiction), exploring the world (e.g., in adventure and speculative fiction), or avoiding predators (e.g., in horror fiction). In this paper, we put forward a comprehensive framework to study fiction through this evolutionary lens. The primary goal of this framework is to carve fictional stories at their cognitive joints using an evolutionary framework. Reviewing a wide range of adaptive variations in human psychology – in personality and developmental psychology, behavioral ecology, and evolutionary biology, among other disciplines –, this framework also addresses the question of interindividual differences in preferences for different features in fictional stories. It generates a wide range of predictions about the patterns of combinations of such features, according to the pattenrs of variations in the mechanisms triggered by fictional stories. As a result of a highly collaborative effort, we present a comprehensive review of evolved cognitive mechanisms that fictional stories activate. To generate this review, we (1) listed more than 70 adaptive challenges humans faced in the course of their evolution, (2) identified the adaptive psychological mechanisms that evolved in response to such challenges, (3) specified four sources of adaptive variability for the sensitivity of each mechanism (i.e., personality traits, sex, age, and ecological conditions), and (4) linked these mechanisms to the story features that trigger them. This comprehensive framework lays the ground for a theory-driven research program for the study of fictional stories, their content, distribution, structure, and cultural evolution.";

    return (
        <section className='flex flex-col gap-12 items-center'>
            <h2 className='text-4xl text-center'>Abstract</h2>
            <p className='px-24 leading-loose text-justify'>{abstractText}</p>
            <Link href='/' className='text-center text-white bg-black p-4 border border-black w-40 rounded-lg hover:bg-white hover:text-black duration-200'>Read More</Link>
        </section>
    );
};

export default Abstract;