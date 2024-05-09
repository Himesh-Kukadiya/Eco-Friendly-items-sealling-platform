import '../../assets/css/MainSection.css'
import OrdersDetailsTable from './OrderDetailsTable';

const BoxBookingDetail = () => {
    return (
        <main className="main-container">
            <div className="main-title">
                <p className="font-weight-bold">Orders List</p>
            </div>
            <OrdersDetailsTable maxHeight={470} />
        </main>
    )
}

export default BoxBookingDetail