import { NavLink } from "react-router-dom";

export default function Navbar() {
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        isActive
          ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
          : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';
          
    return (
        <nav className="bg-amber-500 border-b border-amber-600">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className='flex h-24 items-center justify-between'>
                    <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
                        <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
                            <h4 className="text-white text-2xl font-bold ml-2">
                                Accounting
                            </h4>
                        </NavLink>
                        <div className='md:ml-auto'>
                            <div className='flex space-x-2'>
                                <NavLink to='/' className={linkClass}>
                                    Головна
                                </NavLink>
                                <NavLink to='/employees' className={linkClass}>
                                    Працівники
                                </NavLink>
                                
                                <NavLink to='/add-employee' className={linkClass}>
                                    Новий працівник
                                </NavLink>
                                <NavLink to='/salaries' className={linkClass}>
                                    Запис зарплати
                                </NavLink>
                                
                                <NavLink to='/add-salary' className={linkClass}>
                                    Новий запис зарплати
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}