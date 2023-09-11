import { logo } from '../../../assets'
export const Header = () => {
    return (
        <>
            <header className='fixed bg-white py-4 w-[100%]  grid justify-items-between max-w-[1024px] px-[1rem] min-[320px]:px-[1.5rem]'>
                <nav className='flex items-center justify-between max-w-[1024px]'>
                    <img
                        className='w-[100%] max-w-[100px]'
                        src={logo}
                        alt='logo'
                    />

                    <a
                        href='https://github.com/thecoder512'
                        target='_blank'
                        className='bg-black text-[.9rem] text-white font-semibold rounded-md py-2 px-4'
                    >
                        GitHub
                    </a>
                </nav>
            </header>
        </>
    )
}
