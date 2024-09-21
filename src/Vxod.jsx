import { useForm } from "react-hook-form"

function Vxod() {
  const { register, handleSubmit, formState: { errors }, reset, } = useForm({
    mode: "onChange"
  })

  const onSubmit = (data) => {
    console.log(data.name, data.email)
    reset()
  }

  return (
    <div className="Main_Entrance">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('name',
            {
              required: "Name is empty"
            })}
          placeholder="Name"
          type="text"
        />
        {errors.name && <div style={{ color: "red" }}>{errors.name.message}</div>}
        <br />
        <input
          {...register('email',
            {
              required: "Email is empty",
              pattern: {
                value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                message: "Please enter valid Email!"
              }
            })}
          placeholder="Email"
          type="text"
        />
        {errors.email && <div style={{ color: "red", marginBottom: "10px" }}>{errors.email.message}</div>}
        <div className="btn">
          <button>Send</button>
        </div>
      </form>
    </div>
  )
}

export default Vxod
