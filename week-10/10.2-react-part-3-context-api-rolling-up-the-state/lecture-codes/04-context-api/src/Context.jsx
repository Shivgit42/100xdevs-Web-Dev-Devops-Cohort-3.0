import { useState } from "react";
import { createContext } from "react";

const BulbContext = createContext();

const BulBProvider = ({ children }) => {
  const [bulbOn, setBulbOn] = useState(false);

  return (
    <div>
      <BulbContext.Provider
        value={{
          bulbOn: bulbOn,
          setBulbOn: setBulbOn,
        }}
      >
        {children}
      </BulbContext.Provider>
    </div>
  );
};

export { BulBProvider, BulbContext };
