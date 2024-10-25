/* eslint-disable tailwindcss/classnames-order */
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { SignInJoiSchema } from "../../validations/SigninSchema.joi";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userActions } from "../../Store/UserSlice";
import { decode } from "../../Services/tokenService";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const initialFormData = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialFormData,
    mode: "onChange",
    resolver: joiResolver(SignInJoiSchema),
  });

  const submit = async (form: typeof initialFormData) => {
    try {
      const token = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        form
      );

      localStorage.setItem("token", token.data);
      const id = decode(token.data)._id;
      axios.defaults.headers.common["x-auth-token"] = token.data;
      const user = await axios.get(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`
      );
      dispatch(userActions.login(user.data));
      toast.success("Sign In Successful");
      nav("/");
    } catch (error) {
      console.error(error);
      toast.error("Sign In Failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="flex flex-col w-full max-w-md gap-4 p-6 bg-white rounded-md shadow-md"
        onSubmit={handleSubmit(submit)}
      >
        <h1 className="mb-4 text-2xl font-bold text-center">Sign In</h1>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="p-2 border rounded-md"
          />
          <span className="mt-1 text-sm text-red-500">
            {errors.email?.message}
          </span>
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="p-2 border rounded-md"
          />
          <span className="mt-1 text-sm text-red-500">
            {errors.password?.message}
          </span>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
