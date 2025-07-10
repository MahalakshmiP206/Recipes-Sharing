"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    birthday: "",
    website: "",
    bio: "",
    location: "",
    dietaryPreference: "",
    cuisine: "",
    level: "",
    interests: "",
  });

  const handleProfileChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("🎉 Profile saved successfully!");
  };

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  return (
    <main className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        👤 Profile Settings
      </h1>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-10">
        <Image
          src="/images/profile img.jpg"
          width={120}
          height={120}
          alt="Profile"
          className="rounded-full shadow-md"
        />
        <p className="text-sm mt-3 text-gray-500">
          Profile picture
        </p>
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-lg">
        <div>
          <label className="block font-semibold mb-1">Full Name</label>
          <input
            name="fullName"
            value={profile.fullName}
            onChange={handleProfileChange}
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Phone Number</label>
          <input
            name="phone"
            value={profile.phone}
            onChange={handleProfileChange}
            className="w-full border p-2 rounded-lg"
            placeholder="e.g., +91 98765 43210"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Birthday</label>
          <input
            type="date"
            name="birthday"
            value={profile.birthday}
            onChange={handleProfileChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleProfileChange}
            rows={3}
            className="w-full border p-2 rounded-lg"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            name="location"
            value={profile.location}
            onChange={handleProfileChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Dietary Preference</label>
          <select
            name="dietaryPreference"
            value={profile.dietaryPreference}
            onChange={handleProfileChange}
            className="w-full border p-2 rounded-lg"
          >
            <option value="">Select</option>
            <option value="Vegan">Vegan</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Veg">Non-Vegetarian</option>
            <option value="Keto">Keto</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Favorite Cuisine</label>
          <input
            name="cuisine"
            value={profile.cuisine}
            onChange={handleProfileChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Cooking Level</label>
          <select
            name="level"
            value={profile.level}
            onChange={handleProfileChange}
            className="w-full border p-2 rounded-lg"
          >
            <option value="">Select</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">
            Website / Portfolio
          </label>
          <input
            name="website"
            value={profile.website}
            onChange={handleProfileChange}
            className="w-full border p-2 rounded-lg"
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Your Interests</label>
          <input
            name="interests"
            value={profile.interests}
            onChange={handleProfileChange}
            className="w-full border p-2 rounded-lg"
            placeholder="e.g., Baking, Thai food, Travel cooking"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="text-center mt-10">
        <button
          onClick={handleSave}
          className="bg-primary hover:bg-primary/90 transition px-8 py-3 rounded-xl font-semibold shadow text-black"
        >
          💾 Save Profile
        </button>
      </div>
    </main>
  );
}
