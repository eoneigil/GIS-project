import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { UserService } from './services/userService';

function Entrance() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange"
  });


  const onSubmit = async (data) => {
    const users = await UserService.getAll(data);
    const user = users.find(user => user.Name === data.name && user.Password.toString() === data.password);
    if (user) {
      sessionStorage.isLoggedIn = "true"
      navigate("/main")
    }
    else {
      console.log("NOOOOO")
    }
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
          {...register('password', {
            required: "Password is empty",
          })}
          placeholder="Password"
          type="password"
          autoComplete='none'
        />
        <div style={{ height: "30px"}}>
          {errors.password && <div style={{ color: "red", marginBottom: "10px", display: "flex" }}>{errors.password.message}</div>}
        </div>
        <div className="btn">
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  )
}

export default Entrance;
