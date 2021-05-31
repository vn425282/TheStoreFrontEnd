import React from "react";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { Form, Input, Button } from "antd";
import { registerUser } from "../../../_actions/user_actions";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 8
        }
    }
};

function RegisterPage(props) {
    const dispatch = useDispatch();
    return (
        <Formik
            initialValues={{
                email: "",
                fullName: "",
                password: "",
                confirmPassword: "",
                phoneNumber: "",
                address: "",
                image: ""
            }}
            validationSchema={Yup.object().shape({
                fullName: Yup.string().required("Last Name is required"),
                phoneNumber: Yup.string().required("Phone Number is required"),
                address: Yup.string().required("Address is required"),
                email: Yup.string()
                    .email("Email is invalid")
                    .required("Email is required"),
                password: Yup.string()
                    .min(8, "Password must be at least 8 characters")
                    .max(50, "Password must be maximum 50 characters")
                    .required("Password is required"),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref("password"), null], "Passwords must match")
                    .required("Confirm Password is required")
            })}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    const dataToSubmit = {
                        email: values.email,
                        password: values.password,
                        fullName: values.fullName,
                        confirmPassword: values.confirmPassword,
                        address: values.address,
                        phoneNumber: values.phoneNumber,
                        image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
                    };

                    dispatch(registerUser(dataToSubmit)).then((response) => {
                        console.log(response);
                        if (response.payload.data && response.payload.data.errors) {
                            alert(response.payload.data.errors[0].msg);
                        } else {
                            props.history.push("/login");
                        }
                    });

                    setSubmitting(false);
                }, 500);
            }}
        >
            {(props) => {
                const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit
                } = props;
                return (
                    <div className="app">
                        <h2>Sign up</h2>
                        <Form
                            style={{ minWidth: "375px" }}
                            {...formItemLayout}
                            onSubmit={handleSubmit}
                        >
                            <Form.Item required label="Full name">
                                <Input
                                    id="fullName"
                                    placeholder="Enter your full name"
                                    type="text"
                                    value={values.fullName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.fullName && touched.fullName
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                />
                                {errors.fullName && touched.fullName && (
                                    <div className="input-feedback">{errors.fullName}</div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Address">
                                <Input
                                    id="address"
                                    placeholder="Enter your Address"
                                    type="text"
                                    value={values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.address && touched.address
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                />
                                {errors.address && touched.address && (
                                    <div className="input-feedback">{errors.address}</div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Phone Number">
                                <Input
                                    id="phoneNumber"
                                    placeholder="Enter your Phone Number"
                                    type="text"
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.phoneNumber && touched.phoneNumber
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                />
                                {errors.phoneNumber && touched.phoneNumber && (
                                    <div className="input-feedback">{errors.phoneNumber}</div>
                                )}
                            </Form.Item>

                            <Form.Item
                                required
                                label="Email"
                                hasFeedback
                                validateStatus={
                                    errors.email && touched.email ? "error" : "success"
                                }
                            >
                                <Input
                                    id="email"
                                    placeholder="Enter your Email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.email && touched.email
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                />
                                {errors.email && touched.email && (
                                    <div className="input-feedback">{errors.email}</div>
                                )}
                            </Form.Item>

                            <Form.Item
                                required
                                label="Password"
                                hasFeedback
                                validateStatus={
                                    errors.password && touched.password ? "error" : "success"
                                }
                            >
                                <Input
                                    id="password"
                                    placeholder="Enter your password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.password && touched.password
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                />
                                {errors.password && touched.password && (
                                    <div className="input-feedback">{errors.password}</div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Confirm" hasFeedback>
                                <Input
                                    id="confirmPassword"
                                    placeholder="Enter your confirmPassword"
                                    type="password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.confirmPassword && touched.confirmPassword
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                />
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <div className="input-feedback">{errors.confirmPassword}</div>
                                )}
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
}

export default RegisterPage;
