"use client";

import { Facebook, Instagram, Phone, Mail, MapPin, X } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content py-12 px-6 mt-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-wide">
            Foot<span className="text-primary">Wear</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Premium shoes designed for comfort, performance, and style.  
            Step into quality with FootwearZoon.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 pt-2">
            <a className="p-2 rounded-full bg-base-300 hover:bg-primary hover:text-white transition">
              <Facebook size={18} />
            </a>
            <a className="p-2 rounded-full bg-base-300 hover:bg-primary hover:text-white transition">
              <Instagram size={18} />
            </a>
            <a className="p-2 rounded-full bg-base-300 hover:bg-primary hover:text-white transition">
              <X size={18} /> {/* Twitter X Logo */}
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="footer-title text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href={"/"} className="link link-hover">Home</Link></li>
            <li><Link href={"/shop"} className="link link-hover">Shop</Link></li>
            <li><Link href={"/men"} className="link link-hover">Men's Shoes</Link></li>
            <li><Link href={"/women"} className="link link-hover">Women's Shoes</Link></li>
            <li><Link href={"/kids"} className="link link-hover">Kids</Link></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="footer-title text-lg font-semibold mb-3">Customer Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href={"/"} className="link link-hover">About Us</Link></li>
            <li><Link href={"/"} className="link link-hover">Contact Us</Link></li>
            <li><Link href={"/"} className="link link-hover">FAQs</Link></li>
            <li><Link href={"/"} className="link link-hover">Returns & Exchanges</Link></li>
            <li><Link href={"/"} className="link link-hover">Shipping Policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="footer-title text-lg font-semibold mb-3">Get in Touch</h3>

          <p className="flex items-center gap-2 text-sm">
            <Phone size={18} /> +1 (234) 567-890
          </p>

          <p className="flex items-center gap-2 mt-2 text-sm">
            <Mail size={18} /> support@footwearzoon.com
          </p>

          <p className="flex items-center gap-2 mt-2 text-sm">
            <MapPin size={18} /> New York, United States
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center mt-10 pt-5 text-sm opacity-70">
        © {new Date().getFullYear()} Footwear — All rights reserved.
      </div>
    </footer>
  );
}
