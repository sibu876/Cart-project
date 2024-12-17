import React,{ useEffect} from 'react'

function About() {

  useEffect(() => {
    document.title = "BargainBay-About"
  })

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4">
      <div className="max-w-3xl bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">About Me</h1>
        <p className="text-lg text-gray-700 mb-6">
          Hello! I'm Sibghatullah Sibu, a passionate developer with experience in building web applications using modern technologies like React. I love creating intuitive and dynamic user interfaces. Below are my contact details and social profiles:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         
          <a
            href="https://www.linkedin.com/in/sibghatullah-sibu-b130a4244"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-4 bg-blue-400 rounded-full text-white text-xl hover:bg-blue-700 transition duration-300"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>

         
          <a
            href="tel:+917295081356"
            className="flex items-center justify-center p-4 bg-green-400 rounded-full text-white text-xl hover:bg-green-700 transition duration-300"
          >
            <i className="fas fa-phone-alt"></i>
          </a>

        
          <a
            href="mailto:sibghatullah366@gmail.com"
            className="flex items-center justify-center p-4 bg-red-400 rounded-full text-white text-xl hover:bg-red-700 transition duration-300"
          >
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>
    </div>
  )
}

export default About
