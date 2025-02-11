import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Layout() {
    return (
        <div className='bg-gray-900 min-h-screen w-full flex flex-col justify-between items-center p-4'>
            <Header />
            <div className='flex flex-wrap justify-center space-x-2 md:space-x-4 my-4 w-[90%] md:w-[70%]'>
                <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-900 text-sm md:text-base">
                    FP32
                </Link>
                <Link to="/double" className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-800 text-sm md:text-base">
                    FP64
                </Link>
            </div>
            <main className='flex-grow w-full flex justify-center px-2 md:px-4'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
export default Layout