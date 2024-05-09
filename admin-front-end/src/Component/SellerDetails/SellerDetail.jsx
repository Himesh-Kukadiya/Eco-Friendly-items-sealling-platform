import '../../assets/css/MainSection.css'
import SellerDetailTable from './SellerDetailTable'

const BoxKeeperDetail = () => {
    return (
        <main className="main-container">
            <div className="main-title">
                <p className="font-weight-bold">Sellers List</p>
            </div>
            <SellerDetailTable />
        </main>
    )
}

export default BoxKeeperDetail