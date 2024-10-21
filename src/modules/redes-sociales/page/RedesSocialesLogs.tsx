import React, { useEffect, useState } from "react";
import { Header } from "@/dashboard";
import { rsRouterLinks } from "../routes";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Table } from "@/components/ui/table";

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/panel-reportes/data.json", {
                    method: "GET",
                    headers: {
                        "Accept": "application/json", 
                    },
                });
                
                console.log("Response status:", response.status); // Agregado para depuración
                if (!response.ok) {
                    throw new Error("Error al cargar los datos");
                }
                const data: Log[] = await response.json();
                console.log("Datos cargados:", data);
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
        const newFilteredLogs = selectedNetwork === "Todas"
            ? logs
            : logs.filter(log => log.socialmedia.type === selectedNetwork.toLowerCase());
        setFilteredLogs(newFilteredLogs);
    }, [selectedNetwork, logs]);

    return (
        <>
            <Header headerContent={[rsRouterLinks[0], rsRouterLinks[1]]} />
            <h1>Redes Sociales Logs</h1>

            {error && <div className="error">{error}</div>}

            <div className="grid grid-cols-3 gap-4 mb-6">
                <Card>
                    <CardHeader>Número de Acciones Realizadas</CardHeader>
                    <CardContent>{logs.length} Acciones</CardContent>
                </Card>
                <Card>
                    <CardHeader>Usuarios Más Activos</CardHeader>
                    <CardContent>
                        {Array.from(new Set(logs.map(log => log.user.username))).join(", ") || "No hay usuarios activos"}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>Última Actividad Registrada</CardHeader>
                    <CardContent>
                        {logs.length > 0
                            ? new Date(Math.max(...logs.map(log => new Date(log.date).getTime()))).toLocaleString()
                            : "No hay actividades registradas"}
                    </CardContent>
                </Card>
            </div>


            <Table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Usuario</th>
                        <th>Red Social</th>
                        <th>Método</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLogs.map((log, index) => (
                        <tr key={`${log.date}-${index}`}>
                            <td style={{ textAlign: 'center' }}>{new Date(log.date).toLocaleString()}</td>
                            <td style={{ textAlign: 'center' }}>{log.user.username}</td>
                            <td style={{ textAlign: 'center' }}>{log.socialmedia.controller}</td>
                            <td style={{ textAlign: 'center' }}>{log.socialmedia.method}</td>
                            <td style={{ textAlign: 'center' }}>{log.socialmedia.active ? "Activo" : "Inactivo"}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};
