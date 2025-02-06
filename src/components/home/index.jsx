import { Button, Checkbox, Col, Divider, Drawer, InputNumber, Pagination, Rate, Row, Tabs } from "antd";
import { Form } from 'antd';
import { useEffect, useState } from "react";
import { getAllBooksYesPage, getBookCategory } from "../../services/api.service";
 import './home.scss';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [form] = Form.useForm();
  const [listCategory,setListCategory] = useState(null)
  const [current,setCurrent] = useState(1)
  const [pageSize,setPageSize] = useState(5)
  const [total,setTotal] = useState(0)
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=-sold");
  const [listBook,setListBook] = useState(null)
  const [range,setRange] = useState(null)
  const navigate = useNavigate();

  useEffect(()=>{
    const initCategory = async()=>{
      const res = await getBookCategory()
      if(res && res?.data){
        const d = res.data.map(item => {
          return {label:item,value:item}
        })
        setListCategory(d)
      }

    }
    initCategory()

  },[])
  const handleOnchangePage = (pagination, filters, sorter, extra) =>{
    if (pagination && pagination.current) {
      if (+pagination.current !== +current) { //current la gia tri page hien tai react dang luu
        setCurrent(+pagination.current) //"5" =>5
      }
    }
    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== +pageSize) { //current la gia tri page hien tai react dang luu
        setPageSize(+pagination.pageSize) //"5" =>5
      }
    }
    if(sorter && sorter.field){
      const q = sorter.order === 'ascend' ? `sort=${sorter.field}` : `sort=-${sorter.field}`;
      setSortQuery(q);
    }
  }

  useEffect(()=>{
    fetchBook()
    
  },[pageSize,current,total,sortQuery,filter])

  const fetchBook = async() =>{
    let query=`current=${current}&pageSize=${pageSize}`;
    if(filter){
      
      query +=`&${filter}`;
      // query +=`&${'category='}${filter.category}`;
       console.log('check filter query1 ',filter)
    }
    if(sortQuery){
      query += `&${sortQuery}`;
    }

    const res = await getAllBooksYesPage(query);
    if (res && res.data) {
        setListBook(res.data.result);
        setTotal(res.data.meta.total)
    }
    // console.log('check query>>',query)
  }
  const onFinish = (values) =>{
    console.log("check values>>",values)
    if(values?.range?.from >= 0 && values?.range?.from >= 0){
      let f = `price>=${values?.range?.from}&price<=${values?.range?.to}`;
      if(values?.category?.length){ 
        const cate = values?.category?.join(',')
      
        f +=`&category=${cate}` 
      }
      setRange(f)
      setFilter(f)
    }
  }
  const handleChangeFilter = (changedValues,values) => {
    //danh muc sp category
    console.log("check changedValues >>",changedValues ,values)
    setFilter(changedValues)

    console.log('check filte2>>>>',filter)
    if(changedValues.category){
      const cate = values.category
      console.log('chếch cate',cate)
      if(cate && cate.length>0){
        const f = cate.join(',');
        if(range){
          //ktra nếu form khoảng số tiền đã được điền thì lưu vào state trước đó r nếu đã gán thì cắt chuỗi ra và gán lại
          const result = range.split('&category=')[0]; // Cắt từ đầu đến trước "category"
          setFilter(`category=${f}&${result}`)
        }else{
          setFilter(`category=${f}`)
        }
      }else{
        setFilter('')
      }
    }
    if(!filter){
      fetchBook()
    }
  }
    const onChange = (key) => {
        console.log(key);
        setSortQuery(key)
      };
      const items = [
        {
          key: 'sort=-sold',
          label: 'Phổ biến',
          children: <></>,
        },
        {
          key: 'sort=-updatedAt',
          label: 'Hàng mới',
          children: <></>,
        },
        {
          key: 'sort=price',
          label: 'Từ Thấp Đến Cao',
          children: <></>,
        },
        {
          key: 'sort=-price',
          label: 'Từ Cao Đến Thâp',
          children: <></>,
        },
      ];
      const nonAccentVietnamese = (str) => {
        str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str;
    }
    const convertSlug = (str) => {
      str = nonAccentVietnamese(str);
      str = str.replace(/^\s+|\s+$/g, ''); // trim
      str = str.toLowerCase();

      // remove accents, swap ñ for n, etc
      const from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
      const to = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
      for (let i = 0, l = from.length; i < l; i++) {
          str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }

      str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
          .replace(/\s+/g, '-') // collapse whitespace and replace by -
          .replace(/-+/g, '-'); // collapse dashes

      return str;
  }

  const handleRedirectBook = (book) => {
    const slug = convertSlug(book.mainText);
    navigate(`/book/${slug}?id=${book._id}`)
}
    return(
    <div style={{ background: '#efefef', padding: "20px 0" }}>
    <div className="homepage-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
    
    <Row>
      <Col span={6} style={{borderRadius:'5px',paddingLeft:'8px',marginRight:'20px',backgroundColor:'white'}}>
       {/* <div style={{padding:'20px',background:'#fff',borderRadius:5}}></div> */}
       <Form
        onFinish = {onFinish}
        onValuesChange={(changedValues, values) => handleChangeFilter(changedValues, values)}
        form = {form}
       >
        <Form.Item
        name="category"
        label="Danh mục sản phẩm"
        labelCol={{ span: 24 }}
    >
        <Checkbox.Group>
    <Row>
    {listCategory?.map((item, index) => {
      return (
          <Col span={24} key={`index-${index}`} style={{ padding: '7px 0' }}>
              <Checkbox value={item.value} >
                  {item.label}
              </Checkbox>
          </Col>
      )
  })}
        
    </Row>
  </Checkbox.Group>
  </Form.Item>
  <Divider/>
  <Row gutter={[20,20]}>
  <Col span={11} >

  <Form.Item
      // label="Từ"
      name={['range','from']}
    >
      <InputNumber 
      name='from'
      placeholder="Từ" 
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      style={{ width: '100%' }}  src=""
      />
    </Form.Item>

  </Col>
  <div>
  ={'>'}
  </div>
 
  <Col span={11}>


  <Form.Item
      // label="Đến"
      name={['range','to']}
    >
      <InputNumber 
      name="to"
      placeholder="Đến" 
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      style={{ width: '100%' }}  
      />
    </Form.Item>
    
    </Col>
    
    </Row>
    <div>
        <Button onClick={() => form.submit()}
            style={{ width: "100%" }} type='primary'>Áp dụng</Button>
    </div>
    <Drawer/>

    <Form.Item
      label='Đánh giá'
      labelCol={{span:24}}
    >
     <div>
        <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
        <span className="ant-rate-text"></span> 
    </div>
    <div>
        <Rate value={4} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
        <span className="ant-rate-text">trở lên</span>
    </div>
    <div>
        <Rate value={3} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
        <span className="ant-rate-text">trở lên</span>
    </div>
    <div>
        <Rate value={2} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
        <span className="ant-rate-text">trở lên</span>
    </div>
    <div>
        <Rate value={1} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
        <span className="ant-rate-text">trở lên</span>
    </div>
    </Form.Item>
    </Form>

      </Col>
      <Col span={16} style={{borderRadius:'5px', paddingLeft:'8px',backgroundColor:'white'}} >
      <Tabs 
      defaultActiveKey="1" 
      items={items} 
      onChange={onChange} 
      />
<Row className="customize-row">
      {listBook?.map((item,index)=>{
        return(
          <div className="column" key={`book-${index}`} onClick={()=>{handleRedirectBook(item)}}>
            <div className="wrapper">
              <div className="thumbnail">
              <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.thumbnail}`} alt="thumbnail book" />
              </div>
              <div className='text' title={item.mainText}>{item.mainText}</div>
              <div className='price'>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.price ?? 0)}
              </div>
              <div className='rating'>
                  <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                  <span>Đã bán {item.sold}</span>
              </div>
            </div>
          </div>
        )
      })}

      <div style={{marginTop:30}}></div>
     
      </Row>
      <Row style={{display:'flex',justifyContent:'center'}}>
        <Pagination 
          current={current}
          total={total}
          pageSize={pageSize}
          responsive
          onChange={(p, s) => handleOnchangePage({ current: p, pageSize: s })}
        />
      </Row>
      </Col>
    </Row>
    </div>
    </div>
    )
}

export default Home;