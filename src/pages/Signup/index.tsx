import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminSchema, TAdminSchema } from "../../schemas/admin.schema";
import busPeople from "../../assets/business-people.png";
import { signUp } from "../../services/admin.service";
import { Toaster } from "react-hot-toast";
import { doAlert } from "../../utils/alert";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAdminSchema>({
    resolver: zodResolver(adminSchema),
  });

  const onSubmit = (data: TAdminSchema) => {
    signUp(data).then((response) => {
      doAlert(response.info, response.success);
      if (response.success) {
        setTimeout(() => {
          if (response.success) {
            navigate("/login");
          }
        }, 4000);
      }
    });
  };

  return (
    <>
      <Toaster />
      <div
        className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80')",
        }}
      >
        <div className="bg-gray-800 w-full h-screen flex items-center justify-center sm:w-auto bg-opacity-50 px-8 py-8 shadow-lg backdrop-blur-md sm:px-16">
          <div className="text-white">
            <div className="mb-4 flex flex-col items-center">
              <img src={busPeople} width="150" alt="Business People" />
              <h1 className="mt-4 text-2xl">Registrarse</h1>
              <span className="text-sm">
                Ingresa tus datos por favor para continuar
              </span>
            </div>
            <form
              className="flex flex-col items-center gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-96 mb-1">
                <label className="block mb-1 text-gray-300" htmlFor="username">
                  Username
                </label>
                <input
                  className="w-full rounded-lg border border-gray-300 bg-gray-700 text-white py-2 px-3"
                  {...register("username")}
                  placeholder="hdhumanez"
                />
                <p>{errors.username?.message}</p>
              </div>
              <div className="w-96 mb-1">
                <label className="block mb-1 text-gray-300" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full rounded-lg border border-gray-300 bg-gray-700 text-white py-2 px-3"
                  type="password"
                  {...register("password")}
                  placeholder="*********"
                />
                <p>{errors.password?.message}</p>
              </div>
              <button
                type="submit"
                className="w-full sm:w-1/2 mt-6 rounded-lg bg-yellow-600 hover:bg-yellow-500 py-2 text-white font-medium shadow-lg transition-colors"
              >
                Registrarse
              </button>
              <Link
                to="/login"
                className="mt-4 text-sm text-gray-300 underline"
              >
                iniciar sesión
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
