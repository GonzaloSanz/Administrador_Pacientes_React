import { toast } from "react-toastify";
import formatDate from "../helpers/formatDate";
import { usePatientStore } from "../stores/store";
import { Patient } from "../types";
import PatientDetailItem from "./PatientDetailItem";

type PatientDetailsProps = {
    patient: Patient
}

const PatientDetails = ({ patient }: PatientDetailsProps) => {

    const { deletePatient, getPatientById } = usePatientStore();

    const handleClick = () => {
        deletePatient(patient.id);
        toast.success('¡Paciente eliminado con éxito!');
    }

    return (
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            <PatientDetailItem label="ID" data={patient.id} />
            <PatientDetailItem label="Nombre" data={patient.name} />
            <PatientDetailItem label="Propietario" data={patient.caretaker} />
            <PatientDetailItem label="Email" data={patient.email} />
            <PatientDetailItem label="Fecha Alta" data={formatDate(patient.date)} />
            <PatientDetailItem label="Síntomas" data={patient.symptoms} />

            <div className="flex flex-col lg:flex-row justify-between gap-3 mt-10">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-bold uppercase rounded-lg"
                    onClick={() => getPatientById(patient.id)}
                >
                    Editar
                </button>

                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 transition-all text-white font-bold uppercase rounded-lg"
                    onClick={handleClick}
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default PatientDetails;