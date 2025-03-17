import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <section className='text-center flex flex-col justify-center items-center h-96'>
            <h1 className='text-4xl font-bold mb-4'>404 Not Found</h1>
            <p className='text-2l mb-5'>This page does not exist</p>
            <Link
                to='/'
                className='text-white bg-amber-700 hover:bg-amber-900 rounded-md px-3 py-2 mt-4'
            >
            Go Back
        </Link>
    </section>
    );
}