import { useState } from "react";

export const ToggleTheme = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <>
      <button onClick={() => setIsDark(!isDark)}>Toggle theme</button>
      <div className={isDark ? "dark" : ""}>
        <div className="h-screen text-3xl bg-primary dark:bg-primary-dark dark:text-white">
          hi there
        </div>
      </div>
    </>
  );
};
