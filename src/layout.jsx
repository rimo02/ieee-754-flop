import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Layout() {
    return (
        <div className='bg-gray-900 min-h-screen w-full flex-col flex justify-between items-center p-4'>
            <Header />
            <div className='flex space-x-4 my-4 w-[70%] justify-center'>
                <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-900">FP32</Link>
                <Link to="/double" className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-800">FP64</Link>
            </div>
            <main className='flex-grow w-full flex justify-center my-2'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout
