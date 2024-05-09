import '../../assets/css/MainSection.css'
import ProductDetailsTable from './ProductDetailsTable'

const BoxDetail = () => {
    return (
        <main className="main-container">
            <div className="main-title">
                <p className="font-weight-bold">Product List</p>
            </div>
            <ProductDetailsTable />
        </main>
    )
}

export default BoxDetail