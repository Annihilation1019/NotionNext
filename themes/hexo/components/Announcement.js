import { useGlobal } from '@/lib/global'
import dynamic from 'next/dynamic'
import { siteConfig } from '@/lib/config' // 用户新增

const NotionPage = dynamic(() => import('@/components/NotionPage'))

const Announcement = ({ post, className }) => {
  const { locale } = useGlobal()
  if (post?.blockMap) {
    return <div className={className}>
        <section id='announcement-wrapper' className="dark:text-gray-300 border dark:border-black rounded-xl lg:p-6 p-4 bg-white dark:bg-hexo-black-gray">
        <div><i className='mr-2 fas fa-bullhorn' />{locale.COMMON.ANNOUNCEMENT}</div>
        {/* 用户新增运行天数 */}
        <div className='text-center text-gray-600 dark:text-gray-400 mt-2'>
          {(() => {
            const targetDate = new Date(siteConfig('HEXO_SITE_CREATE_TIME'))
            const today = new Date()
            const diffTime = today.getTime() - targetDate.getTime()
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            return <>🎉 本站已运行 <span className='font-bold'>{diffDays}</span> 天 🎉</>
          })()}
        </div>
        {/* ------------- */}
            {post && (<div id="announcement-content">
            <NotionPage post={post} className='text-center' />
        </div>)}
        </section>
    </div>
  } else {
    return <></>
  }
}
export default Announcement
