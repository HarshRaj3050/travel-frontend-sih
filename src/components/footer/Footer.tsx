import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <span className="font-bold text-lg">Rahgir</span>
          <span className="ml-2 text-gray-400">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-blue-400">Home</a>
          <a href="#" className="hover:text-blue-400">About</a>
          <a href="#" className="hover:text-blue-400">Contact</a>
        </div>
        <div className="flex gap-4">
          <a href="#" aria-label="Twitter" className="hover:text-blue-400">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-pink-400">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-blue-600">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer