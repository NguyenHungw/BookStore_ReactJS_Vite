
import React, { useState } from 'react';
import { Button, Form, Input, Row,Col, notification, message } from 'antd';
import { registerUserAPI } from '../../services/api.service';
import Password from 'antd/es/input/Password';

const RegisterPage = () =>{
      

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log('Success:', values);
        const res = await registerUserAPI(values.fullname,values.email,values.password,values.phone)
        if(res.data){
          notification.success({
            message:"Đăng ký",
            description:"Đăng ký thành công"
          })

        }else{
          notification.error({
            message:"Error",
            description:JSON.stringify(res.error || "Lỗi không xác định")
          })
        }


      };

      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
// console.log("check fullname>>>",fullname)
    return (

       <Row justify={"center"} >
                <Col xs={24} md={6}>
         <Form
         form={form}
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 800,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    // onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
  <b><center>Đăng ký người dùng mới</center> </b>

   <Form.Item
      label="FullName"
      name="fullname"
      rules={[
        {
          required: true,
          message: 'Please input your fullname!',
        },
      ]}
    >
      <Input
    //   value={fullname}
    //   onChange={(e)=>{setfullname(e.target.value)}}
       />

    </Form.Item>

    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input
        // value={email}
        // onChange={(e)=>{setemail(e.target.value)}}
       />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password 
        // value={password}
        // onChange={(e)=>{setpassword(e.target.value)}}
      />
    </Form.Item>

    <Form.Item
      label="Phone"
      name="phone"
      rules={[
        {
          required: true,
          message: 'Please input your Phone!',
        },
      ]}
    >
      <Input
    //   value={phone}
    //   onChange={(e)=>{setphone(e.target.value)}}
       />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
    <Row justify={'center'} >
    <Button onClick={() => { form.submit() }} type="primary">register</Button>
    Đã có tài khoản?
    </Row>
    
      {/* <Button type="primary" htmlType="submit">
        Đăng Ký
      </Button> */}
    </Form.Item>
  </Form>
  </Col>
  </Row>
    )
}
export default RegisterPage;