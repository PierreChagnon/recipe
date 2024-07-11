import { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        console.log('Sending message...')

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Message sent successfully!');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
            alert('Failed to send message.');
        }
    };

    return (
        <div id='contact-form' className="flex flex-col w-full items-center pt-32 pb-32 border-t border-gray-300">
            <h2 className='text-4xl mb-16'>Contact us</h2>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <div className="mb-4 flex gap-2">
                    <input
                        placeholder='Name'
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 px-4 font-light border border-gray-400 rounded focus:outline-none focus:border-gray-600"
                    />
                    <input
                        placeholder='Email'
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 px-4 font-light border border-gray-400 rounded focus:outline-none focus:border-gray-600"
                    />
                </div>
                <div className="mb-4 w-full">
                    <input
                        placeholder='Subject'
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full p-2 px-4 font-light border border-gray-400 rounded focus:outline-none focus:border-gray-600"
                    />
                </div>
                <div className="mb-4 w-full">
                    <textarea
                        placeholder='Message'
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-gray-600 h-32"
                    />
                </div>
                <button
                    type="submit"
                    className='text-center text-black bg-white p-2 border border-gray-400 w-40 rounded-lg hover:bg-gray-200 duration-200'
                >
                    Envoyer
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
