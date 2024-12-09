import { useState } from "react"

const useForm = (initialForm) => {
    const [formState, setFormState] = useState(initialForm);
    const [errorsState, setErrorsState] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState((prevFormState) => ({
            ...prevFormState,
            [name]: value
        }));

        // Limpiar errores al modificar el campo
        setErrorsState((prevErrorsState) => ({
            ...prevErrorsState,
            [name]: null
        }));
    };

    const resetForm = () => {
        setFormState(initialForm);
        setErrorsState({});
        setSuccessMessage('');
    };

    // Lógica de formulario y estados
    return {
        formState,
        errorsState,
        successMessage,
        handleChange,
        setErrorsState,
        setSuccessMessage,
        resetForm,
    };
};

export default useForm;
