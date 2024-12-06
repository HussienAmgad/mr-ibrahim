import React, { useState, useEffect } from "react";

export default function Toggle() {
  const [isChecked, setIsChecked] = useState(false);

  // التبديل بين الوضعين عند تحميل الصفحة استنادًا إلى تفضيلات النظام أو التبديل اليدوي
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsChecked(savedTheme === "dark");
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // إذا لم تكن هناك تفضيلات محفوظة، يتم تفعيل الوضع الداكن استنادًا إلى النظام
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsChecked(prefersDarkScheme);
      if (prefersDarkScheme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  // دالة لتحديث الوضع عندما يتغير التبديل
  const handleToggle = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isChecked}
        onChange={handleToggle}
      />
      <div
        className={`w-14 h-8 bg-gray-700 peer-focus:outline-none rounded-full peer dark:bg-gray-500 transition-all flex items-center px-1 ${
          isChecked ? "justify-end" : "justify-start"
        }`}
      >
        {/* أيقونة الشمس */}
        <div
          className={`w-6 h-6 rounded-full bg-white flex items-center justify-center transition-all`}
        >
          {isChecked ? (
            <i className="fas fa-moon text-gray-600"></i>
          ) : (
            <i className="fas fa-sun text-yellow-400"></i>
          )}
        </div>
      </div>
    </label>
  );
}
