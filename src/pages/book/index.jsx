import { useLocation } from "react-router-dom"
import ViewDetails from "../../components/book/ViewDetails"

const BookPage = ( )=> {
    let location = useLocation()
    console.log('check location>>>>',location)
    let params = new URLSearchParams(location.search)
    const id = params?.get('id')
    console.log('check id>>',id)
    return(
        <>
            <ViewDetails/>
        </>
        
    )
}

export default BookPage