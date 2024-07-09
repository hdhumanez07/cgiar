import { TPlotSchema } from "../schemas/plot.schema";

const API_URL = import.meta.env.VITE_API_URL;

const addPlot = async (plot: TPlotSchema, token: string) => {
  const response = await fetch(`${API_URL}/plots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(plot),
  });
  return response.json();
};

const getPlots = async (token: string, name?: string) => {
  const queryParams = name ? `?name=${name}` : "";
  const response = await fetch(`${API_URL}/plots${queryParams}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

const deletePlot = async (id: string, token: string) => {
  const response = await fetch(`${API_URL}/plots/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export { addPlot, getPlots, deletePlot };
