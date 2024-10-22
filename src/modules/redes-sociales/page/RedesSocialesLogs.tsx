import React, { useEffect, useState } from "react";
import { Header } from "@/dashboard";
import { rsRouterLinks } from "../routes";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ChartsTypeRSLogs } from "../components/ChartsTypeRSLogs";
import { Table } from "@/components/ui/table";
import { ChartsUsersRSLogs } from "../components/ChartsUsersRSLogs";
import { ChartsStatusRSLogs } from "../components/ChartsStatusRSLogs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

  // Paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [logsPerPage] = useState<number>(10);

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
    setFilteredLogs(newFilteredLogs);
  }, [selectedNetwork, logs]);

  // Calcular los logs actuales
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  // Funciones de paginación
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <Header headerContent={[rsRouterLinks[0], rsRouterLinks[1]]} />
      <h1>Redes Sociales Logs</h1>

      {error && <div className="error">{error}</div>}

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

      <Table>
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
      </Table>

      {/* Paginación */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={prevPage} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index + 1}>
              <PaginationLink
                href="#"
                onClick={() => paginate(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" onClick={nextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <ChartsTypeRSLogs />
        <ChartsUsersRSLogs />
        <ChartsStatusRSLogs />
      </div>
    </>
  );
};
