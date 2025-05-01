import Link from 'next/link';
import React from 'react';

const Abstract = () => {
    const abstractText = "Why is there so much diversity in fictional plots? Why are some fictional stories more popular in certain countries or during specific historical periods? In this paper, we propose an evolutionary psychological framework to address these questions. Fictional stories trigger a range of evolved psychological mechanisms—such as finding mates (romance fiction), exploring the world (adventure fiction), or avoiding threats (horror fiction). While these mechanisms are universal in human cognition, they vary in intensity across individuals and contexts. We leverage insights from personality psychology, behavioral ecology, and developmental psychology to explore how and why the sensitivity of these mechanisms varies. Then, by systematically identifying which story features activate which mechanism, we generate predictions about the diversity and variability of fiction preferences. This framework provides a new lens for understanding why certain stories become popular, how and when they emerged and spread, and how different story elements cluster together. It offers a theory-driven foundation for empirically studying the psychological drivers of storytelling.";

    return (
        <section id='abstract' className='flex flex-col gap-20 items-center border-t border-gray-300 pt-32'>
            <h2 className='text-4xl'>Abstract</h2>
            <p className='px-24 xl:px-36 2xl:px-48 3xl:px-56 leading-loose text-justify'>{abstractText}</p>
            <Link href='https://osf.io/preprints/osf/me6bz' target='blank' className='text-center -mt-6 text-black bg-white p-2 border border-gray-400 w-40 rounded-lg hover:bg-gray-200 duration-200'>Read More</Link>
        </section>
    );
};

export default Abstract;