import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotPermitted = () => {
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

    const handleBackHome = () => {
        navigate('/'); // Điều hướng về trang chủ
    };

    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary" onClick={handleBackHome}>Back Home</Button>} // Gọi hàm khi bấm nút
        />
    );
}

export default NotPermitted;
