import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Error from './Error';
import { DraftPatient } from '../types';
import { usePatientStore } from '../stores/store';
import { toast } from 'react-toastify';

const PatientForm = () => {
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<DraftPatient>();

    const { addPatient, activeId, patients, updatePatient } = usePatientStore();

    useEffect(() => {
        if(activeId) {
            const activePatient = patients.filter(patient => patient.id === activeId)[0];

            setValue('name', activePatient.name);
            setValue('caretaker', activePatient.caretaker);
            setValue('email', activePatient.email);
            setValue('date', activePatient.date);
            setValue('symptoms', activePatient.symptoms);

        }
    }, [activeId]);

    const registerPatient = (data: DraftPatient) => {

        if(activeId) {
            updatePatient(data);
            toast.success('¡Paciente editado con éxito!');
        } else {
            addPatient(data);
            toast.success('¡Paciente registrado con éxito!');
        }

        // Reiniciar el formulario
        reset();
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form
                className="bg-white shadow-md rounded-lg py-6 px-5 mb-10"
                noValidate
                onSubmit={handleSubmit(registerPatient)}
            >
                <div className="mb-5 flex flex-col gap-1">
                    <label htmlFor="name" className="text-sm uppercase font-bold ml-1">
                        Paciente
                    </label>
                    <input
                        id="name"
                        className="w-full px-3 py-2 border border-gray-100"
                        type="text"
                        placeholder="Nombre del Paciente"
                        {...register('name', {
                            required: 'El nombre del paciente es obligatorio',
                            maxLength: {
                                value: 20,
                                message: 'El máximo de caracteres permitidos es 20'
                            }
                        })}
                    />
                    {errors.name && <Error msg={errors?.name?.message?.toString() ?? ''} />}
                </div>

                <div className="mb-5 flex flex-col gap-1">
                    <label htmlFor="caretaker" className="text-sm uppercase font-bold ml-1">
                        Propietario
                    </label>
                    <input
                        id="caretaker"
                        className="w-full px-3 py-2 border border-gray-100"
                        type="text"
                        placeholder="Nombre del Propietario"
                        {...register('caretaker', {
                            required: 'El propietario es obligatorio',
                            maxLength: {
                                value: 20,
                                message: 'El máximo de caracteres permitidos es 20'
                            }
                        })}
                    />
                    {errors.caretaker && <Error msg={errors?.caretaker?.message?.toString() ?? ''} />}
                </div>

                <div className="mb-5 flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm uppercase font-bold ml-1">
                        Email
                    </label>
                    <input
                        id="email"
                        className="w-full px-3 py-2 border border-gray-100"
                        type="email"
                        placeholder="Email de Registro"
                        {...register("email", {
                            required: "El Email es Obligatorio",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email No Válido'
                            }
                        })}
                    />
                    {errors.email && <Error msg={errors?.email?.message?.toString() ?? ''} />}
                </div>

                <div className="mb-5 flex flex-col gap-1">
                    <label htmlFor="date" className="text-sm uppercase font-bold ml-1">
                        Fecha Alta
                    </label>
                    <input
                        id="date"
                        className="w-full px-3 py-2 border border-gray-100"
                        type="date"
                        {...register('date', {
                            required: 'La fecha de alta es obligatoria'
                        })}
                    />
                    {errors.date && <Error msg={errors?.date?.message?.toString() ?? ''} />}
                </div>

                <div className="mb-5 flex flex-col gap-1">
                    <label htmlFor="symptoms" className="text-sm uppercase font-bold ml-1">
                        Síntomas
                    </label>
                    <textarea
                        id="symptoms"
                        className="w-full px-3 py-2 border border-gray-100"
                        placeholder="Síntomas del paciente"
                        {...register('symptoms', {
                            required: 'Los síntomas son obligatorios'
                        })}
                    ></textarea>
                    {errors.symptoms && <Error msg={errors?.symptoms?.message?.toString() ?? ''} />}
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full px-3 py-2 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value={activeId ? 'Guardar Cambios' : 'Registrar Paciente'}
                />
            </form>
        </div>
    )
}

export default PatientForm;