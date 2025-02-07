
import Statistics from '../../../components/dashboard/Admin/Main/Statistics'
import ProductsAlmostFinished from '../../../components/dashboard/Admin/Main/ProductsAlmostFinished'
import ProductsFinished from '../../../components/dashboard/Admin/Main/ProductsFinished'
import TopSellingProducts from '../../../components/dashboard/Admin/Main/TopSellingProducts'
import SalesChart from '../../../components/dashboard/Admin/Main/SalesChart'

export default function Main() {
  return (
    <>
            <Statistics/>
            <section className='StatisticsProduct'>
              <ProductsAlmostFinished />
              <ProductsFinished />
              <TopSellingProducts />
            </section>
            <SalesChart/>
    </>
  )
}
