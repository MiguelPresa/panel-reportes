import { useCabeceoLogs } from "../../hooks";
import CustomSelect from "./CustomSelect";

export const SelectFolders = () => {
	const {
		selectedFolder,
		handleSelectedFolder,
		folders,
	} = useCabeceoLogs();

	return (
		<CustomSelect
			data={folders.data}
			isLoading={folders.isLoading}
			hasError={folders.hasError}
			error={folders.error}
			selectedItem={selectedFolder}
			onSelect={handleSelectedFolder}
			placeholder="Selecciona un modelo"
		/>
	);
};