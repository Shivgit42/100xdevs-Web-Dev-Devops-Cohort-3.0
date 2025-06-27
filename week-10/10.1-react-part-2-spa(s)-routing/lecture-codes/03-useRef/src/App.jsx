import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

function App() {
  return (
    <div>
      <FocusInput />

      <hr />
      <Clock />

      <hr />
      <br />
      <Chat />
    </div>
  );
}

function FocusInput() {
  const inputRef = useRef();

  return (
    <div>
      Signup
      <input ref={inputRef} id="name" type="text" />
      <input type="text" />
      <button onClick={() => inputRef.current.focus()}>Submit</button>
    </div>
  );
}

function Clock() {
  const [currentCount, setCurrentCount] = useState(0);
  let timer = useRef(null);

  function startClock() {
    let value = setInterval(() => {
      setCurrentCount((c) => c + 1);
    }, 1000);
    timer.current = value;
  }

  function stopClock() {
    console.log(timer);
    clearInterval(timer.current);
  }

  /* bad approach using raw variable
  function Clock() {
    const [currentCount, setCurrentCount] = useState(0);
    let timer = 0
  
    function startClock() {
      timer = setInterval(() => {
        setCurrentCount((c) => c + 1);
      }, 1000);
    }
  
    function stopClock() {
    console.log(timer) // output: 0, as it is overridden on every re-render, this was not persisting timer variable
      clearInterval(timer);
    }
*/
  return (
    <div>
      {currentCount}
      <br />
      <button onClick={startClock}>Start</button>
      <button onClick={stopClock}>Stop</button>
    </div>
  );
}

//another example scroll to bottom
function Chat() {
  const [messages, setMessages] = useState(["Hello!", "How are you?"]);
  const messageBoxRef = useRef(null);

  const addMessage = () => {
    setMessages((prev) => [...prev, "New Message"]);
  };

  useEffect(() => {
    messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
  }, [messages]);

  return (
    <>
      <div
        ref={messageBoxRef}
        style={{
          height: "200px",
          overflowY: "scroll",
          border: "1px solid black",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <button onClick={addMessage}>Add Message</button>
    </>
  );
}

export default App;
