import { useState } from "react";

export const Form = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  if (status === "success") {
    return <h1>That's right!</h1>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello submit");
    try {   
      await submitForm(message);
      setStatus("success");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h3>City quiz</h3>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea onChange={(e) => setMessage(e.target.value)} />
        <button disabled={message === ""}>
          <p>Submit</p>
        </button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
};

function submitForm(answer) {
  console.log(answer);
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== "lima";
      if (shouldError) {
        reject(new Error("Good guess but a wrong answer. Try again!"));
      } else {
        resolve();
      }
    }, 1500);
  });
}
