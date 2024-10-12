import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

function Entrance() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange"
  });

  const onSubmit = (data) => {
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("name", data.name);
    navigate('/main');
  };

  return (
    <div className="Main_Entrance">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('name', {
            required: "Name is empty"
          })}
          placeholder="Name"
          type="text"
        />
        <div style={{ height: "30px"}}>
          {errors.name && <div style={{ color: "red", display: "flex" }}>{errors.name.message}</div>}
        </div>
        <br />
        <input
          {...register('email', {
            required: "Email is empty",
            pattern: {
              value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
              message: "Please enter valid Email!"
            }
          })}
          placeholder="Email"
          type="text"
        />
        <div style={{ height: "30px"}}>
          {errors.email && <div style={{ color: "red", marginBottom: "10px", display: "flex" }}>{errors.email.message}</div>}
        </div>
        <div className="btn">
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  )
}

export default Entrance;
