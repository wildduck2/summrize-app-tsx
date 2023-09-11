import { Header } from '../../components/layouts/header/header'
import SideBar from '../../components/layouts/sideBar/SideBar'
import HeroText from './heroText/HeroText'
import Input from './input/Input'

function Home() {
    return (
        <>
            <Header />
            <section className='grid justify-items-center max-w-[1024px] px-[1rem] min-[320px]:px-[1.5rem]'>
                <HeroText />
                <Input />
                <SideBar />
            </section>
        </>
    )
}
export default Home
