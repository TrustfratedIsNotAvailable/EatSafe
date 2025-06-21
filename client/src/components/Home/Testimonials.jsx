// const Testimonials = () => {
//   const quotes = [
//     {
//       name: "Ayesha R.",
//       text: "This app helped me reduce food waste in my home by half. I love the expiry reminders!",
//     },
//     {
//       name: "Kamal H.",
//       text: "Easy to use and very helpful for managing my pantry. The dashboard is super clear.",
//     },
//     {
//       name: "Sarah N.",
//       text: "I donated food I would have thrown out. It feels great to help others!",
//     },
//   ];

//   return (
//     <div className="py-12 px-4 md:px-8 max-w-6xl mx-auto text-center">
//       <h2 className="text-3xl font-bold text-[#1B5E20] mb-10">
//         💬 What Our Users Say
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {quotes.map((quote, i) => (
//           <div
//             key={i}
//             className="bg-white border border-gray-200 shadow rounded-xl p-6"
//           >
//             <p className="text-gray-700 italic mb-4">“{quote.text}”</p>
//             <p className="text-sm font-semibold text-[#1B5E20]">{quote.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Testimonials;

import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Ayesha R.",
    text: "This app helped me reduce food waste in my home by half. I love the expiry reminders!",
    rating: 5,
    image:
      "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Kamal H.",
    text: "Easy to use and very helpful for managing my pantry. The dashboard is super clear.",
    rating: 4,
    image:
      "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sarah N.",
    text: "I donated food I would have thrown out. It feels great to help others!",
    rating: 5,
    image:
      "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { name, text, rating, image } = testimonials[index];

  return (
    <div className="py-12 px-4 md:px-8 max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-[#1B5E20] mb-8">
        💬 What Our Users Say
      </h2>

      <div className="bg-white border border-gray-200 shadow rounded-xl p-6 relative">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-2 border-green-500"
        />
        <p className="italic text-gray-700 mb-4">“{text}”</p>
        <div className="flex justify-center mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-yellow-400 ${
                i < rating ? "opacity-100" : "opacity-20"
              }`}
            />
          ))}
        </div>
        <p className="font-semibold text-[#1B5E20]">{name}</p>

        {/* Manual Controls */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${
                index === i ? "bg-green-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

