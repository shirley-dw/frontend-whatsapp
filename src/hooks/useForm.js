import { useState } from "react";

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

    const validateForm = () => {
        const errors = {};

        if (!formState.contact_name) {
            errors.contact_name = 'El nombre es obligatorio';
        }

        if (!formState.contact_email) {
            errors.contact_email = 'El correo es obligatorio';
        }

        if (!formState.contact_phone) {
            errors.contact_phone = 'El teléfono es obligatorio';
        }

        setErrorsState(errors);
        return Object.keys(errors).length === 0;
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
        validateForm
    };
};

export default useForm;
