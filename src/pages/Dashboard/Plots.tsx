import { useEffect, useState } from "react";
import { IPlot } from "../../interfaces/plot.interface";
import { addPlot, deletePlot, getPlots } from "../../services/plot.service";
import useAuth from "../../context/useAuth";
import toast, { Toaster } from "react-hot-toast";
import Table from "../../components/Table";
import Modal from "../../components/modal/Modal";
import { PLOTS_HEADER_TABLE } from "../../utils/constants/table";
import { TPlotSchema, plotSchema } from "../../schemas/plot.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { doAlert } from "../../utils/alert";

const Plots: React.FC = () => {
  const { auth, search } = useAuth();
  const { token } = auth;
  const [plots, setPlots] = useState<Array<IPlot>>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPlotSchema>({
    resolver: zodResolver(plotSchema),
  });

  const onDeletePlot = (id: string) => {
    deletePlot(id, token).then((data) => {
      if (!data.success) {
        return toast.error(data.info);
      }
      const filteredPlots = plots.filter((plot) => plot.id !== id);
      setPlots(filteredPlots);
    });
  };

  const onSubmit = (data: TPlotSchema) => {
    addPlot(data, token).then((response) => {
      if (!response.success) {
        return doAlert(response.info, response.success);
      }
      setPlots([...plots, response.data]);
      toast.success("Plot registrado correctamente");
    });
  };

  useEffect(() => {
    getPlots(token, search).then((response) => setPlots(response.data));
  }, [token, search]);

  return (
    <section className="h-screen">
      <Toaster />
      <Table
        title="Mis plots de finca"
        description="Lista de plots registrados"
        header={PLOTS_HEADER_TABLE}
      >
        {plots.map((plot, index) => (
          <tr
            key={plot.id}
            className={`${index % 2 === 1 ? "bg-gray-50" : ""}`}
          >
            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
              {plot.id}
            </td>
            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
              {plot.location.latitude}, {plot.location.longitude}
            </td>
            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
              {plot.size} ha
            </td>
            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
              {plot.currentCropType}
            </td>
            <td className="p-4 whitespace-nowrap text-gray-600">
              <button
                className="bg-red-600 text-white font-bold rounded-md px-2 py-1"
                onClick={() => onDeletePlot(plot.id as string)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </Table>

      <Modal titleBtn="Agregar Plot" header="Plots de la Finca" isForm={true}>
        <form className="my-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="latitude">Latitud</label>
            <input
              type="text"
              {...register("location.latitude")}
              className="w-full p-2 border rounded"
            />
            <p className="text-red-500 text-xs italic">
              {errors.location?.latitude?.message}
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="longitude">Longitud</label>
            <input
              type="text"
              {...register("location.longitude")}
              className="w-full p-2 border rounded"
            />
            <p className="text-red-500 text-xs italic">
              {errors.location?.longitude?.message}
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="size">Tamaño (ha)</label>
            <input
              type="number"
              {...register("size", { valueAsNumber: true })}
              className="w-full p-2 border rounded"
            />
            <p className="text-red-500 text-xs italic">
              {errors.size?.message}
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="crop_type">Tipo de Cultivo</label>
            <input
              type="text"
              {...register("currentCropType")}
              className="w-full p-2 border rounded"
            />
            <p className="text-red-500 text-xs italic">
              {errors.currentCropType?.message}
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

export default Plots;
