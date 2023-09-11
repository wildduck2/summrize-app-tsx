import React, { useContext, useRef, useState } from 'react'
import { storeContext } from '../../../services/store'
import { copy, tick } from '../../../assets'

function SideBar() {
    const ctx = useContext(storeContext)
    const [sidebar, setSidebar] = useState<boolean>(false)
    const sideBareRef = useRef() as React.MutableRefObject<HTMLDivElement>
    const layoutRef = useRef() as React.MutableRefObject<HTMLDivElement>

    // toggling the sidebar when click
    const showSideBarHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        setSidebar(!sidebar)
        sideBareRef.current.classList.toggle('show-sideBar')
        layoutRef.current.classList.toggle('show-layoutt')
    }

    // copy the text to clipboard
    const copyToTheClipboard = (
        e: React.MouseEvent<HTMLImageElement>
    ): void => {
        const altText = e.currentTarget.innerText || ''

        const img = e.currentTarget.querySelector('img') as HTMLImageElement

        if (altText) {
            navigator.clipboard.writeText(altText)

            img.src = tick
        }

        setTimeout(() => {
            img.src = copy
        }, 2000)
    }

    // manging toggling the summary information card
    const openSummaryHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const tab = e.currentTarget.nextSibling as HTMLDivElement
        const layout = document.querySelector('.layout') as HTMLDivElement

        tab.classList.add('show-summaryy')
        layout.classList.add('show-layoutt')
    }

    const closeSummaryHandler = () => {
        const tab = document.querySelectorAll('.tab')
        const layout = document.querySelector('.layout') as HTMLDivElement

        tab.forEach((t) => t.classList.remove('show-summaryy'))
        layout.classList.remove('show-layoutt')
    }

    return (
        <>
            <div
                className='fixed w-[40px] h-[40px] p-[1rem] bg-slate-300 gird justify-center items-center rounded-full bottom-6 left-6 cursor-pointer hover:bg-orange-400 hover:fill-white transition-all z-[53]'
                onClick={showSideBarHandler}
            >
                <svg
                    className='absolute pointer-events-none top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'
                    width={24}
                    viewBox='0 0 24 24'
                >
                    <path d='M20.0833 15.1998L21.2854 15.9211C21.5221 16.0632 21.5989 16.3703 21.4569 16.6071C21.4146 16.6774 21.3557 16.7363 21.2854 16.7786L12.5144 22.0411C12.1977 22.2311 11.8021 22.2311 11.4854 22.0411L2.71451 16.7786C2.47772 16.6365 2.40093 16.3294 2.54301 16.0926C2.58523 16.0222 2.64413 15.9633 2.71451 15.9211L3.9166 15.1998L11.9999 20.0498L20.0833 15.1998ZM20.0833 10.4998L21.2854 11.2211C21.5221 11.3632 21.5989 11.6703 21.4569 11.9071C21.4146 11.9774 21.3557 12.0363 21.2854 12.0786L11.9999 17.6498L2.71451 12.0786C2.47772 11.9365 2.40093 11.6294 2.54301 11.3926C2.58523 11.3222 2.64413 11.2633 2.71451 11.2211L3.9166 10.4998L11.9999 15.3498L20.0833 10.4998ZM12.5144 1.30852L21.2854 6.57108C21.5221 6.71315 21.5989 7.02028 21.4569 7.25707C21.4146 7.32745 21.3557 7.38635 21.2854 7.42857L11.9999 12.9998L2.71451 7.42857C2.47772 7.2865 2.40093 6.97937 2.54301 6.74258C2.58523 6.6722 2.64413 6.6133 2.71451 6.57108L11.4854 1.30852C11.8021 1.11851 12.1977 1.11851 12.5144 1.30852ZM11.9999 3.33221L5.88723 6.99983L11.9999 10.6674L18.1126 6.99983L11.9999 3.33221Z'></path>
                </svg>
            </div>

            <div
                className='w-0 bg-[#ededed] fixed left-0 h-[100vh] py-[3rem] opacity-0  text-slate-700 font-medium text-[1.2rem] z-[52] overflow-x-hidden transition-all max-[600px]:max-w-[100vw]'
                ref={sideBareRef}
            >
                <div>{/* <h4>HI, Ahmed Ayob</h4> */}</div>
                <div>
                    <h4>Article History</h4>

                    <div className='grid gap-3 mt-4'>
                        {ctx.Allurl.map((url, index) => {
                            return (
                                <>
                                    <div
                                        onClick={openSummaryHandler}
                                        className='grid gap-3 whitespace-nowrap border border-gray-500 rounded-md '
                                        key={index}
                                    >
                                        <div className='flex items-center  max-w-[390px] justify-between overflow-hidden px-2 py-1 '>
                                            <h2 className='overflow-hidden max-w-[337px] text-[.9rem]'>
                                                {url}
                                            </h2>
                                            <svg
                                                className='ml-3 w-[25px] fill-gray-700'
                                                viewBox='0 0 24 24'
                                            >
                                                <path d='M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z'></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div
                                        key={index + 'A'}
                                        className='tab fixed bg-white left-[50%] p-[3rem] pt-[5rem] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full max-h-[600px] max-w-[900px] rounded-md z-[60] shadow-gray-600 shadow-md grid opacity-0 pointer-events-none transition-all max-[800px]:max-w-[90vw] max-[800px]:p-[1rem]'
                                    >
                                        <div
                                            className='absolute right-[1.5rem] top-[1.5rem] cursor-pointer'
                                            onClick={closeSummaryHandler}
                                        >
                                            <svg
                                                className='fill-slate-700 pointer-events-none'
                                                height='1em'
                                                viewBox='0 0 384 512'
                                            >
                                                <path d='M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z' />
                                            </svg>
                                        </div>
                                        <div
                                            className='flex items-center justify-between px-4 py-2 mb-6 w-full max-w-[900px]border-gray-300 border rounded-md cursor-pointer max-[400px]:max-w-[80vw] max-[800px]:max-w-[100vw]  max-[800px]:max-h-[50px] max-[800px]:translate-y-[53px]'
                                            onClick={copyToTheClipboard}
                                        >
                                            <h4 className='flex items-center justify-between gap-2'>
                                                <span className='font-semibold text-slate-900 text-[1.2rem] max-[800px]:text-[1rem]'>
                                                    URL:
                                                </span>{' '}
                                                <span className='text-slate-700 text-[1rem] whitespace-nowrap max-w-[690px] overflow-hidden max-[400px]:max-w-[50vw]'>
                                                    {url}
                                                </span>
                                            </h4>

                                            <img
                                                className='w-full max-w-[20px] pointer-events-none'
                                                src={copy}
                                                alt='copy__icon'
                                            />
                                        </div>
                                        <div
                                            className='px-4 py-4 w-full max-w-[900px]border-gray-300 border rounded-md cursor-pointer'
                                            onClick={copyToTheClipboard}
                                        >
                                            <p>
                                                <span className='flex items-center justify-between'>
                                                    <span className='font-semibold text-slate-900 text-[1.2rem] max-[800px]:text-[1rem]'>
                                                        The summary:
                                                    </span>{' '}
                                                    <img
                                                        className='w-full max-w-[20px] pointer-events-none'
                                                        src={copy}
                                                        alt='copy__icon'
                                                    />
                                                </span>
                                                <span className='block mt-4 text-slate-700 max-h-[290px] overflow-y-scroll text-[1rem]'>
                                                    {ctx.Allsummary[index]
                                                        .replace(/["\\{}]/g, '')
                                                        .replace(
                                                            'summary:',
                                                            ''
                                                        )}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                        <div
                            className='layout fixed  left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full bg-black z-50 opacity-[0] pointer-events-none transition-all'
                            onClick={closeSummaryHandler}
                        ></div>
                    </div>
                </div>
            </div>
            <div
                className='layout fixed  left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full bg-black z-50 opacity-[0] pointer-events-none transition-all'
                ref={layoutRef}
                onClick={showSideBarHandler}
            ></div>
        </>
    )
}

export default SideBar
