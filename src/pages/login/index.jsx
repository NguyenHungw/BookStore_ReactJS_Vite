import { Button, Col, Form, Input, notification, Row } from "antd";
import { loginUserAPI } from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";

const LoginPage = () =>{
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        
            console.log('Success:', values);
            
            const res = await loginUserAPI(values.email, values.password);
           
            // Kiểm tra phản hồi từ API để hiển thị thông báo thành công
            if (res?.data ) {
                notification.success({
                    message: "Đăng nhập",
                    description: "Đăng nhập thành công"
                });
                localStorage.setItem("access_token",res.data.access_token)
                dispatch(doLoginAction(res.data.user))
                navigate("/")
            } else {
                notification.error({
                    message: "Error login",
                    description: JSON.stringify(res.error || "Lỗi không xác định")
                });
            }
      
    };
    
    return (

       <Row justify={"center"}>
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
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    // onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
  <b><center>Đăng Nhập</center> </b>



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
       
      />
    </Form.Item>

  

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
    <Row justify={'center'} >
    <Button onClick={() => { form.submit() }} type="primary">Login</Button>
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

export default LoginPage;