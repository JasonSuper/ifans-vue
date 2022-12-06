import hasRole from '@/directive/permission/hasRole'
import hasPermi from '@/directive/permission/hasPermi'

export default function directive(app: any){
  app.directive('hasRole', hasRole)
  app.directive('hasPermi', hasPermi)
}