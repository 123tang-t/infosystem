import { Get } from '@/utils/request'
import { GetParams } from '@/interface/public'
// import { Menu } from '@/interface/menuManage'

// 获取菜单列表
export const RequestGetMenuList = (params: GetParams) => {
    let query = `?Page=${params.Page || 1}`
    query += `&PageSize=${params.PageSize || 20}`
    query += `$Name=${params.Name || ''}`
    return Get(`/menu/list${query}`)
}
