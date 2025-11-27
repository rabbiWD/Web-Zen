"use client";

import { Facebook, Instagram, Phone, Mail, MapPin, X } from "lucide-react";
import Link from "next/link";

export default function Footer() {
return ( <footer className="bg-gray-900 text-gray-200 py-16 px-6"> <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

    {/* Brand */}
    <div className="space-y-4">
      <h2 className="text-3xl font-extrabold tracking-tight text-white">
        Web<span className="text-primary">Zen</span>
      </h2>
      <p className="text-gray-400 text-sm leading-relaxed">
        Premium shoes designed for comfort, performance, and style. Step into quality with FootwearZoon.
      </p>

      {/* Social Icons */}
      <div className="flex gap-4 pt-2">
        <a className="p-2 rounded-full bg-gray-800 hover:bg-primary hover:text-white transition flex items-center justify-center">
          <Facebook size={18} />
        </a>
        <a className="p-2 rounded-full bg-gray-800 hover:bg-primary hover:text-white transition flex items-center justify-center">
          <Instagram size={18} />
        </a>
        <a className="p-2 rounded-full bg-gray-800 hover:bg-primary hover:text-white transition flex items-center justify-center">
          <X size={18} />
        </a>
      </div>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold mb-4 text-white border-b border-gray-700 pb-2">Quick Links</h3>
      <ul className="space-y-2 text-sm">
        <li><Link href="/" className="hover:text-primary transition">Home</Link></li>
        <li><Link href="/shop" className="hover:text-primary transition">Shop</Link></li>
        <li><Link href="/men" className="hover:text-primary transition">Men's Shoes</Link></li>
        <li><Link href="/women" className="hover:text-primary transition">Women's Shoes</Link></li>
        <li><Link href="/kids" className="hover:text-primary transition">Kids</Link></li>
      </ul>
    </div>

    {/* Customer Support */}
    <div>
      <h3 className="text-lg font-semibold mb-4 text-white border-b border-gray-700 pb-2">Customer Support</h3>
      <ul className="space-y-2 text-sm">
        <li><Link href="/" className="hover:text-primary transition">About Us</Link></li>
        <li><Link href="/" className="hover:text-primary transition">Contact Us</Link></li>
        <li><Link href="/" className="hover:text-primary transition">FAQs</Link></li>
        <li><Link href="/" className="hover:text-primary transition">Returns & Exchanges</Link></li>
        <li><Link href="/" className="hover:text-primary transition">Shipping Policy</Link></li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h3 className="text-lg font-semibold mb-4 text-white border-b border-gray-700 pb-2">Get in Touch</h3>

      <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg mt-2">
        <Phone size={18} className="text-primary" />
        <span className="text-sm">+1 (234) 567-890</span>
      </div>

      <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg mt-2">
        <Mail size={18} className="text-primary" />
        <span className="text-sm">support@footwearzoon.com</span>
      </div>

      <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg mt-2">
        <MapPin size={18} className="text-primary" />
        <span className="text-sm">New York, United States</span>
      </div>
    </div>
  </div>

  {/* Bottom Footer */}
  <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
    © {new Date().getFullYear()} Footwear — All rights reserved.
  </div>
</footer>

);
}
