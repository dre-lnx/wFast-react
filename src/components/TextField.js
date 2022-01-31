import React from "react";
import { ErrorMessage,useField } from "formik";

const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    console.log(field, meta)
    return (
        <div className="form-floating mb-3 ipt">
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
        <span className="invalid-warn">
        <ErrorMessage name={field.name}/>
        </span>
      </div>
    )
}

export default TextField