import React, { useEffect, useState } from "react";
import { Header } from "@/dashboard";
import { rsRouterLinks } from "../routes";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ChartsTypeRSLogs } from "../components/ChartsTypeRSLogs";
import { ChartsUsersRSLogs } from "../components/ChartsUsersRSLogs";
import { ChartsStatusRSLogs } from "../components/ChartsStatusRSLogs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { DataTablePagination } from "@/shared";

interface Log {
  id: number;
  date: string;
  user: {
    username: string;
  };
  socialmedia: {
    controller: string;
    method: string;
    active: boolean;
    type: string;
  };
}

export const RedesSocialesLogs: React.FC = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<string>("Todas");
  const [logs, setLogs] = useState<Log[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<Log[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const [rangeDate, setRangeDate] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [logsPerPage, setLogsPerPage] = useState<number>(10); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/panel-reportes/data.json", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        const data: Log[] = await response.json();
        setLogs(data);
        setFilteredLogs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const newFilteredLogs =
      selectedNetwork === "Todas"
        ? logs
        : logs.filter((log) => log.socialmedia.type === selectedNetwork.toLowerCase());

    if (rangeDate.from && rangeDate.to) {
      const startDate = new Date(rangeDate.from).getTime();
      const endDate = new Date(rangeDate.to).getTime();
      setFilteredLogs(newFilteredLogs.filter(log => {
        const logDate = new Date(log.date).getTime();
        return logDate >= startDate && logDate <= endDate;
      }));
    } else {
      setFilteredLogs(newFilteredLogs);
    }
  }, [selectedNetwork, logs, rangeDate]);

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleDateChange = (range: { from: Date | null; to: Date | null }) => {
    setRangeDate(range);
  };

  const handleDownloadReport = () => {
    const filteredData = filteredLogs.map(log => ({
      id: log.id,
      date: log.date,
      username: log.user.username,
      controller: log.socialmedia.controller,
      method: log.socialmedia.method,
      status: log.socialmedia.active ? "Activo" : "Inactivo",
    }));

    const csvContent = [
      ["ID", "Fecha", "Usuario", "Red Social", "Método", "Estado"],
      ...filteredData.map(log => [
        log.id,
        log.date,
        log.username,
        log.controller,
        log.method,
        log.status,
      ])
    ]
      .map(e => e.join(",")) 
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Header headerContent={[rsRouterLinks[0], rsRouterLinks[1]]} />
      <h1>Redes Sociales Logs</h1>

      {error && <div className="error">{error}</div>}

      <div className="mb-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"outline"} className="mr-2">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {rangeDate.from && rangeDate.to
                ? `${format(rangeDate.from, "LLL dd, y")} - ${format(rangeDate.to, "LLL dd, y")}`
                : "Selecciona un rango de fechas"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              selected={rangeDate}
              onSelect={handleDateChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <Button onClick={handleDownloadReport} disabled={!rangeDate.from || !rangeDate.to}>
          Descargar Reporte
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>Número de Peticiones Realizadas</CardHeader>
          <CardContent>{logs.length} Peticiones</CardContent>
        </Card>
        <Card>
          <CardHeader>Usuarios Más Activos</CardHeader>
          <CardContent>
            {Array.from(new Set(logs.map((log) => log.user.username))).join(", ") ||
              "No hay usuarios activos"}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Última Actividad Registrada</CardHeader>
          <CardContent>
            {logs.length > 0
              ? new Date(
                  Math.max(...logs.map((log) => new Date(log.date).getTime()))
                ).toLocaleString()
              : "No hay actividades registradas"}
          </CardContent>
        </Card>
      </div>

      <table>
        <thead>
          <tr>
            <th>Número de Petición</th>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Red Social</th>
            <th>Método</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {currentLogs.map((log, index) => (
            <tr key={`${log.date}-${index}`}>
              <td style={{ textAlign: "center" }}>{indexOfFirstLog + index + 1}</td>
              <td style={{ textAlign: "center" }}>{new Date(log.date).toLocaleString()}</td>
              <td style={{ textAlign: "center" }}>{log.user.username}</td>
              <td style={{ textAlign: "center" }}>{log.socialmedia.controller}</td>
              <td style={{ textAlign: "center" }}>{log.socialmedia.method}</td>
              <td style={{ textAlign: "center" }}>{log.socialmedia.active ? "Activo" : "Inactivo"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <DataTablePagination
        total={filteredLogs.length}
        table={{
          getFilteredRowModel: () => ({ rows: filteredLogs }),
          getState: () => ({ pagination: { pageSize: logsPerPage, pageIndex: currentPage - 1 } }),
          setPageSize: setLogsPerPage,
          getPageCount: () => totalPages,
          setPageIndex: (index: number) => setCurrentPage(index + 1),
          getCanPreviousPage: () => currentPage > 1,
          getCanNextPage: () => currentPage < totalPages,
          nextPage: nextPage,
          previousPage: prevPage,
        }}
      />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <ChartsTypeRSLogs />
        <ChartsUsersRSLogs />
        <ChartsStatusRSLogs />
      </div>
    </>
  );
};
