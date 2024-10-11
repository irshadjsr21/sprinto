import React, { forwardRef } from "react";
import {
  Form,
  FormItemProps,
  Input,
  InputNumber,
  Select,
  DatePicker,
} from "antd";

const { Option } = Select;

export interface FormField {
  type: "text" | "number" | "dropdown" | "date" | "textarea";
  name: string;
  label: string;
  placeholder?: string;
  rules?: FormItemProps["rules"];
  options?: { label: string; value: string | number }[];
}

export interface FormBuilderProps {
  formDetails: FormField[];
  onSubmit: (values: Record<string, any>) => void;
  initialValues?: Record<string, any>;
}

export interface FormBuilderRef {
  submit: () => void;
  reset: () => void;
  setFieldsValue: (values: Record<string, any>) => void;
}

export const FormBuilder = forwardRef<FormBuilderRef, FormBuilderProps>(
  function FormBuilderInternal({ formDetails, onSubmit, initialValues }, ref) {
    const [form] = Form.useForm();

    const renderFormItem = (item: FormField) => {
      switch (item.type) {
        case "text":
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              rules={item.rules}
            >
              <Input placeholder={item.placeholder} />
            </Form.Item>
          );
        case "textarea":
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              rules={item.rules}
            >
              <Input.TextArea placeholder={item.placeholder} />
            </Form.Item>
          );
        case "number":
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              rules={item.rules}
            >
              <InputNumber
                placeholder={item.placeholder}
                style={{ width: "100%" }}
              />
            </Form.Item>
          );
        case "dropdown":
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              rules={item.rules}
            >
              <Select placeholder={item.placeholder}>
                {item.options?.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          );
        case "date":
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              rules={item.rules}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          );
        default:
          return null;
      }
    };

    const handleFinish = (values: any) => {
      onSubmit(values);
    };

    React.useImperativeHandle(
      ref,
      () => ({
        submit: () => {
          form.submit();
        },
        reset: () => {
          form.resetFields();
        },
        setFieldsValue: (values: Record<string, any>) => {
          form.setFieldsValue(values);
        },
      }),
      [form]
    );

    return (
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        preserve={false}
        initialValues={initialValues}
      >
        {formDetails.map((item) => renderFormItem(item))}
      </Form>
    );
  }
);
