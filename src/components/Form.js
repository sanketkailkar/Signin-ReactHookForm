import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./index.css";

const Form = () => {
  const schema = yup.object().shape({
    fullName: yup.string().required("Your Full Name is Required!"),
    email: yup.string().email().required("Email is Required!"),
    age: yup.number().positive().integer().min(18).required("Age must be 18 or greater"),
    password: yup.string().min(4).max(20).required("Passwords Don't Match"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Don't Match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h2>Let's sign you in</h2>
      <input className="input" type="text" placeholder="Enter Full Name..." {...register("fullName")} />
      <p>{errors.fullName?.message}</p>
      <input className="input" type="text" placeholder="Enter Email..." {...register("email")} />
      <p>{errors.email?.message}</p>
      <input className="input" type="number" placeholder="Enter Age..." {...register("age")} />
      <p>{errors.age?.message}</p>
      <input className="input"
        type="password"
        placeholder="Enter Password..."
        {...register("password")}
      />
      <p>{errors.password?.message}</p>
      <input className="input"
        type="password"
        placeholder="Enter Confirm Password..."
        {...register("confirmPassword")}
      />
      <p>{errors.confirmPassword?.message}</p>
      <input className="btn" type="submit" value="Sign in" onSubmit={onSubmit()} />
    </form>
  );
};

export default Form;