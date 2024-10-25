import { useNavigate } from 'react-router-dom';

const About = () => {
  const nav = useNavigate();

  return (
    <main className="flex flex-col items-center min-h-screen px-4 py-10 bg-gray-100">
      <h1 className="mb-8 text-5xl font-bold text-gray-800">About Us</h1>

      <section className="max-w-2xl p-6 mb-6 bg-white rounded-lg shadow-md">
        <p className="text-lg text-center text-gray-700">
          At <strong>B-Card</strong>, we specialize in crafting professional, high-quality business cards that make lasting impressions. Whether you're looking to stand out or keep it sleek and simple, we've got you covered.
        </p>
      </section>

      <section className="max-w-2xl p-6 mb-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-3xl font-semibold text-center text-gray-800">Our Mission</h2>
        <p className="text-lg text-center text-gray-700">
          Our mission is to help professionals and businesses leave their mark with beautifully designed, custom business cards that reflect their brand and values.
        </p>
      </section>

      <section className="max-w-2xl p-6 mb-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-3xl font-semibold text-center text-gray-800">Why Choose Us</h2>
        <ul className="text-lg text-gray-700 list-disc list-inside">
          <li><strong>Customization:</strong> We offer a wide range of design options tailored to your specific needs.</li>
          <li><strong>Quality:</strong> Premium materials and sharp printing ensure your cards look great every time.</li>
          <li><strong>Fast & Reliable:</strong> Quick turnaround times with reliable delivery, so you can start networking without delay.</li>
        </ul>
      </section>
    </main>
  );
};

export default About;
