import { useCabeceoLogs } from "../../hooks";
import CustomSelect from "./CustomSelect";

export const SelectFiles = () => {
	const {
		selectedFolder,
		dateFile,
		files,
		selectedFile,
		handleSelectedFile,
	} = useCabeceoLogs();

	return (
		dateFile && selectedFolder && files.data.length > 0 &&
		<CustomSelect
			data={files.data}
			isLoading={files.isLoading}
			hasError={files.hasError}
			error={files.error}
			selectedItem={selectedFile}
			onSelect={handleSelectedFile}
			placeholder="Selecciona un archivo log"
		/>
	);
};