import { useEffect, useState } from "react";
import { IActivity } from "../../interfaces/activity.interface";
import {
  addActivity,
  deleteActivity,
  getActivities,
} from "../../services/activities.service";
import useAuth from "../../context/useAuth";
import toast, { Toaster } from "react-hot-toast";
import Table from "../../components/Table";
import Modal from "../../components/modal/Modal";
import { ACTIVITIES_HEADER_TABLE } from "../../utils/constants/table";
import {
  TActivitySchema,
  activitySchema,
} from "../../schemas/activities.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { doAlert } from "../../utils/alert";

const Activities: React.FC = () => {
  const { auth, search } = useAuth();
  const { token } = auth;
  const [activities, setActivities] = useState<Array<IActivity>>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TActivitySchema>({
    resolver: zodResolver(activitySchema),
  });

  const onDeleteActivity = (id: string) => {
    deleteActivity(id, token).then((data) => {
      if (!data.success) {
        return toast.error(data.info);
      }
      const filteredActivities = activities.filter((act) => act.id !== id);
      setActivities(filteredActivities);
    });
  };

  const onSubmit = (data: TActivitySchema) => {
    addActivity(data, token).then((response) => {
      if (!response.success) {
        return doAlert(response.info, response.success);
      }
      setActivities([...activities, response.data]);
      toast.success("Actividad registrada correctamente");
    });
  };

  useEffect(() => {
    getActivities(token, search).then((response) =>
      setActivities(response.data)
    );
  }, [token, search]);

  console.log(errors);

  return (
    <section className="h-screen">
      <Toaster />
      <Table
        title="Mis actividades agronómicas"
        description="Lista de actividades registradas"
        header={ACTIVITIES_HEADER_TABLE}
      >
        {activities.map((activity, index) => (
          <tr
            key={activity.id}
            className={`${index % 2 === 1 ? "bg-gray-50" : ""}`}
          >
            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
              {activity.id}
            </td>
            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
              {activity.date.toLocaleString()}
            </td>
            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
              {activity.activityType}
            </td>
            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
              {activity.inputsUsed}
            </td>
            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
              {activity.duration} horas
            </td>
            <td className="p-4 whitespace-nowrap text-gray-600">
              <button
                className="bg-red-600 text-white font-bold rounded-md px-2 py-1"
                onClick={() => onDeleteActivity(activity.id as string)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </Table>

      <Modal titleBtn="Agregar Actividad" header="Actividades" isForm={true}>
        <form className="my-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="activity_type">Tipo de actividad</label>
            <input
              type="text"
              {...register("activityType")}
              className="w-full p-2 border rounded"
            />
            <p className="text-red-500 text-xs italic">
              {errors.activityType?.message}
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="activity_date">Fecha</label>
            <input
              type="datetime-local"
              {...register("date")}
              className="w-full p-2 border rounded"
            />
            <p className="text-red-500 text-xs italic">
              {errors.date?.message}
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="duration">Duración (horas)</label>
            <input
              type="number"
              {...register("duration", { valueAsNumber: true })}
              className="w-full p-2 border rounded"
            />
            <p className="text-red-500 text-xs italic">
              {errors.duration?.message}
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="inputs">Insumos utilizados</label>
            <input
              type="text"
              {...register("inputsUsed")}
              className="w-full p-2 border rounded"
            />
            <p className="text-red-500 text-xs italic">
              {errors.inputsUsed?.message}
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="plot">Parcela</label>
            <input
              type="text"
              {...register("plot")}
              className="w-full p-2 border rounded"
            />
            <p className="text-red-500 text-xs italic">
              {errors.plot?.message}
            </p>
          </div>
          <button
            type="submit"
            disabled={true} // TODO: no funciona, arreglar funcion submit
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-md px-6 py-2 my-6 float-right"
          >
            Agregar
          </button>
        </form>
      </Modal>
    </section>
  );
};

export default Activities;
