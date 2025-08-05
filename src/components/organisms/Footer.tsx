import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-lg">
                <div className="w-5 h-5 border-2 border-black rounded-full relative">
                  <div className="w-1.5 h-1.5 bg-black rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>
              <div>
                <h3 className="text-white text-lg font-light tracking-wide">RPH Medicine</h3>
                <p className="text-gray-400 text-sm">Management System</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Advanced healthcare management platform designed for medical professionals. 
              Streamlining medicines with secure, efficient, and reliable solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-medium mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors duration-200">Dashboard</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors duration-200">Patient Records</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors duration-200">Appointments</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors duration-200">Reports</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white text-sm font-medium mb-4 tracking-wide">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors duration-200">Documentation</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors duration-200">Contact Support</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors duration-200">System Status</a></li>
            </ul>
          </div>
        </div>

        {/* Compliance and Security Badges */}
        <div className="border-t border-gray-800 pt-6 mb-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-xs">HIPAA Compliant</span>
            </div>
            <div className="w-px h-4 bg-gray-700 hidden md:block"></div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-400 text-xs">SOC 2 Certified</span>
            </div>
            <div className="w-px h-4 bg-gray-700 hidden md:block"></div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-400 text-xs">ISO 27001</span>
            </div>
            <div className="w-px h-4 bg-gray-700 hidden md:block"></div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span className="text-gray-400 text-xs">256-bit SSL</span>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-500 text-xs">
                © 2025 RPH Medicine Management System. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <a href="#" className="text-gray-500 text-xs hover:text-white transition-colors duration-200">Privacy Policy</a>
                <span className="text-gray-700">|</span>
                <a href="#" className="text-gray-500 text-xs hover:text-white transition-colors duration-200">Terms of Service</a>
                <span className="text-gray-700">|</span>
                <a href="#" className="text-gray-500 text-xs hover:text-white transition-colors duration-200">Cookie Policy</a>
              </div>
            </div>
            
            {/* Version and Status */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-500 text-xs">System Online</span>
              </div>
              <span className="text-gray-600 text-xs">v1.0.1</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;