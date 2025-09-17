import React, { useState } from "react";
import { Mic, MapPin } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// AgriMitra UI prototype (React + TailwindCSS)
// Fixed JSX syntax issues (missing/extra quotes) and ensured all tags are properly closed.

export default function AgriMitraUI() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("English");

  // Farmer data form
  const [crop, setCrop] = useState("Wheat");
  const [soilType, setSoilType] = useState("Loamy");
  const [area, setArea] = useState("1.5 acres");

  // Voice assistant state
  const [isListening, setIsListening] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState("");

  // Location + satellite state
  const [location, setLocation] = useState(null);
  const [satelliteImage, setSatelliteImage] = useState(null);

  // Mobile tabs state (simple client-side routing simulation)
  const [activeTab, setActiveTab] = useState("home");

  const handleLogin = () => {
    if (username && password) {
      setIsLoggedIn(true);
    } else {
      alert("Please enter username and password");
    }
  };

  const handleVoiceToggle = () => {
    if (!isListening) {
      setIsListening(true);
      setVoiceMessage("Listening... (demo mode)");
      setTimeout(() => {
        setIsListening(false);
        setVoiceMessage("Suggested Tip: Irrigate wheat fields in the morning to retain moisture.");
      }, 2500);
    } else {
      setIsListening(false);
      setVoiceMessage("Stopped listening.");
    }
  };

  const handleGetLocation = () => {
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setLocation({ lat, lon });
          // Placeholder satellite image. Replace with real provider in production.
          setSatelliteImage(
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/India_satellite_image.jpg/640px-India_satellite_image.jpg"
          );
        },
        (err) => {
          alert("Unable to get location: " + err.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const weatherData = [
    { day: "Mon", rain: 12, temp: 28 },
    { day: "Tue", rain: 5, temp: 30 },
    { day: "Wed", rain: 20, temp: 26 },
    { day: "Thu", rain: 8, temp: 27 },
    { day: "Fri", rain: 15, temp: 29 },
    { day: "Sat", rain: 10, temp: 31 },
    { day: "Sun", rain: 25, temp: 25 },
  ];

  const featureData = [
    { feature: "Rainfall", importance: 40 },
    { feature: "Soil pH", importance: 25 },
    { feature: "Temperature", importance: 20 },
    { feature: "Fertilizer", importance: 15 },
  ];

  // --- Login Screen ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 font-sans">
        <div className="bg-white shadow-lg rounded-lg p-8 w-80">
          <h1 className="text-2xl font-semibold text-center text-green-700 mb-6">AgriMitra Login</h1>

          <img
            src="https://cdn-icons-png.flaticon.com/512/2909/2909765.png"
            alt="farm icon"
            className="mx-auto mb-4 w-16 h-16"
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button onClick={handleLogin} className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Login
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">Demo login accepts any details</p>
        </div>
      </div>
    );
  }

  // --- Main App ---
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-green-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-semibold">AgriMitra</h1>
        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white text-green-700 px-2 py-1 text-xs md:text-sm rounded"
            aria-label="Choose language"
          >
            <option>English</option>
            <option>हिन्दी</option>
            <option>ਪੰਜਾਬੀ</option>
            <option>বাংলা</option>
          </select>
        </div>
      </header>

      {/* Desktop Sidebar + Main */}
      <div className="hidden md:grid md:grid-cols-12 md:gap-4">
        {/* Sidebar */}
        <aside className="md:col-span-3 bg-white p-4 m-4 rounded-lg shadow">
          <h2 className="font-medium mb-2">Farmer</h2>
          <img src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png" alt="farmer" className="w-20 h-20 mb-3" />
          <p className="text-sm text-gray-600">Name: {username || "Ramesh"}</p>
          <p className="text-sm text-gray-600">Region: Punjab</p>

          <h2 className="font-medium mt-4 mb-2">Field Details</h2>
          <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs text-gray-500">Crop</label>
              <input type="text" value={crop} onChange={(e) => setCrop(e.target.value)} className="w-full p-1 border rounded text-sm" />
            </div>

            <div>
              <label className="block text-xs text-gray-500">Soil Type</label>
              <input type="text" value={soilType} onChange={(e) => setSoilType(e.target.value)} className="w-full p-1 border rounded text-sm" />
            </div>

            <div>
              <label className="block text-xs text-gray-500">Area</label>
              <input type="text" value={area} onChange={(e) => setArea(e.target.value)} className="w-full p-1 border rounded text-sm" />
            </div>
          </form>

          <h2 className="font-medium mt-4 mb-2">Location & Satellite</h2>
          <button onClick={handleGetLocation} className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700">
            <MapPin className="w-4 h-4" /> Get Location
          </button>

          {location && (
            <div className="mt-3 text-sm text-gray-600">
              <p>
                Lat: {location.lat.toFixed(4)}, Lon: {location.lon.toFixed(4)}
              </p>

              {satelliteImage && (
                <img src={satelliteImage} alt="satellite" className="mt-2 rounded shadow w-full" />
              )}
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="md:col-span-9 p-4 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-sm text-gray-600">Predicted Yield</h2>
              <img src="https://cdn-icons-png.flaticon.com/512/415/415733.png" alt="yield" className="mb-2 w-12 h-12" />
              <p className="text-xl font-bold mt-1">{crop === "Wheat" ? "3.6 t/acre" : "2.8 t/acre"}</p>
              <p className="text-xs text-green-600 mt-1">+12% vs last season</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-sm text-gray-600">Soil Type</h2>
              <img src="https://cdn-icons-png.flaticon.com/512/628/628283.png" alt="soil" className="mb-2 w-12 h-12" />
              <p className="text-xl font-bold mt-1">{soilType}</p>
              <p className="text-xs text-gray-500 mt-1">Best suited for {crop}</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-sm text-gray-600">Estimated Revenue</h2>
              <img src="https://cdn-icons-png.flaticon.com/512/1040/1040230.png" alt="revenue" className="mb-2 w-12 h-12" />
              <p className="text-xl font-bold mt-1">₹{area.includes("acre") ? "45,000" : "60,000"}</p>
              <p className="text-xs text-gray-500 mt-1">Based on avg market price</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-medium text-gray-700">Weather Forecast (7-day)</h2>
            <div className="h-52 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weatherData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="temp" stroke="#82ca9d" name="Temperature (°C)" />
                  <Line type="monotone" dataKey="rain" stroke="#8884d8" name="Rainfall (mm)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-medium text-gray-700">Actionable Recommendations</h2>
            <ol className="list-decimal list-inside text-sm space-y-2 mt-2">
              <li>Ensure timely irrigation to maintain soil moisture.</li>
              <li>Apply recommended fertilizers for {crop} growth.</li>
              <li>Monitor for pest risks in {soilType} soil conditions.</li>
            </ol>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-2 bg-green-600 text-white rounded text-sm">Mark Done</button>
              <button className="flex-1 py-2 border rounded text-sm">Save</button>
            </div>
          </div>

          {/* Voice Assistant Section */}
          <div className="bg-white p-4 rounded shadow flex items-center gap-4">
            <button
              onClick={handleVoiceToggle}
              className={`p-3 rounded-full border ${isListening ? "bg-red-100 border-red-400" : "bg-green-100 border-green-400"}`}
              aria-pressed={isListening}
            >
              <Mic className={`w-6 h-6 ${isListening ? "text-red-600" : "text-green-600"}`} />
            </button>

            <div>
              <h2 className="font-medium text-gray-700">AI Voice Assistant</h2>
              <p className="text-sm text-gray-600">{voiceMessage || "Ask AgriMitra for crop tips, weather updates, and advice."}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-medium text-gray-700">Model Insights</h2>
            <p className="text-sm text-gray-600 mt-1">Model: Gradient Boosting + LSTM</p>
            <p className="text-sm text-gray-600">Confidence: 78%</p>
            <div className="h-52 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="feature" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="importance" fill="#4caf50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Layout (Tabs + Pages) */}
      <div className="md:hidden">
        {/* Tabs */}
        <nav className="flex justify-around bg-white border-b text-sm font-medium">
          <button onClick={() => setActiveTab("home")} className={`py-3 flex-1 text-center ${activeTab === "home" ? "font-semibold" : ""}`}>
            Home
          </button>
          <button onClick={() => setActiveTab("field")} className={`py-3 flex-1 text-center ${activeTab === "field" ? "font-semibold" : ""}`}>
            Field
          </button>
          <button onClick={() => setActiveTab("recommend")} className={`py-3 flex-1 text-center ${activeTab === "recommend" ? "font-semibold" : ""}`}>
            Recommend
          </button>
          <button onClick={() => setActiveTab("insights")} className={`py-3 flex-1 text-center ${activeTab === "insights" ? "font-semibold" : ""}`}>
            Insights
          </button>
        </nav>

        {/* Mobile Pages */}
        <section className="p-4 space-y-4">
          {activeTab === "home" && (
            <>
              <div className="bg-white rounded-lg p-4 shadow">
                <h2 className="text-sm text-gray-600">Predicted Yield</h2>
                <p className="text-xl font-bold mt-1">{crop === "Wheat" ? "3.6 t/acre" : "2.8 t/acre"}</p>
                <p className="text-xs text-green-600 mt-1">+12% vs last season</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow">
                <h2 className="text-sm text-gray-600">Weather Forecast (7-day)</h2>
                <div className="h-40 mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weatherData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="temp" stroke="#82ca9d" name="Temperature (°C)" />
                      <Line type="monotone" dataKey="rain" stroke="#8884d8" name="Rainfall (mm)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {activeTab === "field" && (
            <>
              <div className="bg-white rounded-lg p-4 shadow">
                <h2 className="text-sm text-gray-600">Soil Type</h2>
                <p className="text-xl font-bold mt-1">{soilType}</p>
                <p className="text-xs text-gray-500 mt-1">Best suited for {crop}</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow">
                <h2 className="text-sm text-gray-600">Estimated Revenue</h2>
                <p className="text-xl font-bold mt-1">₹{area.includes("acre") ? "45,000" : "60,000"}</p>
                <p className="text-xs text-gray-500 mt-1">Based on avg market price</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow">
                <h2 className="text-sm text-gray-600">Location & Satellite</h2>
                <button onClick={handleGetLocation} className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                  <MapPin className="w-4 h-4" /> Get Location
                </button>

                {location && (
                  <div className="mt-3 text-sm text-gray-600">
                    <p>
                      Lat: {location.lat.toFixed(4)}, Lon: {location.lon.toFixed(4)}
                    </p>

                    {satelliteImage && (
                      <img src={satelliteImage} alt="satellite" className="mt-2 rounded shadow w-full" />
                    )}
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === "recommend" && (
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-medium text-gray-700">Actionable Recommendations</h2>
              <ol className="list-decimal list-inside text-sm space-y-2 mt-2">
                <li>Ensure timely irrigation to maintain soil moisture.</li>
                <li>Apply recommended fertilizers for {crop} growth.</li>
                <li>Monitor for pest risks in {soilType} soil conditions.</li>
              </ol>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-2 bg-green-600 text-white rounded text-sm">Mark Done</button>
                <button className="flex-1 py-2 border rounded text-sm">Save</button>
              </div>
            </div>
          )}

          {activeTab === "insights" && (
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-medium text-gray-700">Model Insights</h2>
              <p className="text-sm text-gray-600 mt-1">Model: Gradient Boosting + LSTM</p>
              <p className="text-sm text-gray-600">Confidence: 78%</p>
              <div className="h-52 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={featureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="feature" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="importance" fill="#4caf50" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center py-3 text-xs text-gray-500">© AgriMitra | Empowering Farmers</footer>
    </div>
  );
}
