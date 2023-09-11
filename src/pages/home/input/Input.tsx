import { FormEvent, useContext, useRef, useState } from 'react'
import { linkIcon, loader, copy, tick } from '../../../assets'
import { ArticleApi } from '../../../services/article'
import { articleTypes, storeContext } from '../../../services/store'

interface articleData {
    url: string
    summary: string
}

function Input() {
    const [article, setArticle] = useState<articleData>({
        url: '',
        summary: '',
    })

    const [active, setActive] = useState<boolean>(false)
    const [done, setDone] = useState<boolean>(false)
    const [click, setClick] = useState<boolean>(false)

    const ctx = useContext(storeContext) as articleTypes

    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>

    const inputChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setArticle({ ...article, url: e.target.value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        ctx.CheckingDone!(false)
        ctx.CheckingActive!(true)

        ArticleApi(article.url, ctx)
        inputRef.current.value = ''
    }

    const copyToTheClipboard = (
        e: React.MouseEvent<HTMLImageElement>
    ): void => {
        const altText = e.currentTarget.innerText || ''

        const img = e.currentTarget.querySelector('img') as HTMLImageElement

        if (altText) {
            navigator.clipboard.writeText(altText)

            img.src = tick
            setClick(true)
        }

        setTimeout(() => {
            img.src = copy
            setClick(false)
        }, 2000)
    }

    return (
        <>
            <form
                className='relative flex items-center justify-between w-full gap-2 max-w-[600px] rounded-md border border-gray-200 bg-white py-1 px-3 pr-0 text-sm shadow-lg font-satoshi font-medium max-[500px]:mb-6 mb-[4rem]'
                onSubmit={handleSubmit}
            >
                <img
                    src={linkIcon}
                    alt=''
                />
                <input
                    className='block w-full focus:border-black focus:outline-none focus:ring-0'
                    type='url'
                    required
                    placeholder='Paste the article link'
                    value={article.url}
                    onChange={inputChangeHandle}
                    ref={inputRef}
                />
                <button
                    type='submit'
                    className='hover:border-gray-700 hover:text-gray-700 inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded border transition  font-sans text-sm font-medium text-gray-400 peer-focus:border-gray-700 peer-focus:text-gray-700 p-1'
                >
                    <svg
                        width={20}
                        height={20}
                        className='fill-gray-700 '
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                    >
                        <path d='M13.9999 19.0003L5.00003 19.0004L5 17.0004L11.9999 17.0003L12 6.82845L8.05027 10.7782L6.63606 9.36396L13 3L19.364 9.36396L17.9498 10.7782L14 6.8284L13.9999 19.0003Z'></path>
                    </svg>
                </button>
            </form>

            {ctx.active ? (
                <img
                    className='w-8'
                    src={loader}
                    alt=''
                />
            ) : (
                ''
            )}

            {ctx.done ? (
                <div
                    className='flex items-center justify-between px-4 py-2 mb-6 max-[400px]:max-w-[330px] whitespace-nowrap overflow-hidden min-[400px]:w-full max-w-[900px]border-gray-300 border rounded-md cursor-pointer '
                    onClick={copyToTheClipboard}
                >
                    <h4 className='flex items-center justify-between'>
                        <span className='font-semibold text-slate-900 text-[1.2rem] max-[800px]:text-[1rem] '>
                            URL:
                        </span>{' '}
                        <span className=' text-slate-700 overflow-hidden w-[245px]'>
                            {ctx.Allurl[0]}
                        </span>
                    </h4>

                    <img
                        className=' w-full max-w-[20px] h-[20px] ml-1 pointer-events-none'
                        src={copy}
                        alt='copy__icon'
                    />
                </div>
            ) : (
                ''
            )}

            {ctx.done ? (
                <div
                    className='px-4 py-4 w-full max-w-[900px]  border-gray-300 border rounded-md cursor-pointer'
                    onClick={copyToTheClipboard}
                >
                    <p className=''>
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
                        <span className='block mt-4 text-slate-700 max-h-[240px] overflow-y-scroll'>
                            {ctx.Allsummary[0]
                                .replace(/["\\{}]/g, '')
                                .replace('summary:', '')}
                        </span>
                    </p>
                </div>
            ) : (
                ``
            )}
        </>
    )
}

export default Input
