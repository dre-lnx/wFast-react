import React from "react";
import { ErrorMessage,useField } from "formik";

const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    console.log(field, meta)
    return (
        <div class="form-floating mb-3">
        <input
          type={props.type}
          autoComplete="off"
          className={`form-control ${meta.touched && meta.error && 'is-invalid'}`}
          id="floatingInput"
          placeholder={props.name}
          name={props.name}
          {...field}
        />
        <label for="floatingInput">{label}</label>
        <ErrorMessage name={field.name} className="fields-warning"/>
      </div>
    )
}

export default TextField