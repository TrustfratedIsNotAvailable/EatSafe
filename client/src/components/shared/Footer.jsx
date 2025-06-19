// import { Link, NavLink } from "react-router";
// import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="bg-blue-50 border-t border-gray-200 mt-10 mx-auto">
//       <div className="max-w-11/12 mx-auto px-4 py-10 grid md:grid-cols-3 gap-8 text-gray-700">
//         {/* Brand & Description */}
//         <div>
//           <h2 className="text-xl font-bold mb-2">React App Store</h2>
//           <p className="text-sm">
//             Discover and share the best web apps in one place. Built for devs and users alike.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
//           <ul className="space-y-2 text-sm">
//             <li><Link to="/" className="hover:text-blue-600">Terms of Service</Link></li>
//             <li><Link to="/" className="hover:text-blue-600">Privacy Policy</Link></li>
//             <li><Link to="/" className="hover:text-blue-600">Developer Resources</Link></li>
//           </ul>
//         </div>

//         {/* Social Media */}
//         <div>
//           <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
//           <div className="flex space-x-4 text-2xl">
//             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
//               <FaFacebook />
//             </a>
//             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-500">
//               <FaTwitter />
//             </a>
//             <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
//               <FaGithub />
//             </a>
//             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
//               <FaLinkedin />
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="text-center text-sm py-4 border-t border-gray-300 text-gray-500">
//         &copy; {new Date().getFullYear()} React App Store. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;

const Footer = () => {
  return (
    <footer className="bg-[#F4FDF5] text-gray-700 py-8 px-4 sm:px-8 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold text-[#2E7D32]">🥦 EatSafe Vault</h2>
          <p className="text-sm text-gray-600 mt-1">
            Smart fridge tracking to reduce food waste and keep your kitchen organized.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} EatSafe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
