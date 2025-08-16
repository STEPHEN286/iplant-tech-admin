import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, Plus, Minus } from "lucide-react"
import { useWaitlist } from "@/hooks/use-waitlist"

export default function SummaryCard({ title, value, change, icon: Icon, iconColor, valueColor }) {
  const isPositive = Number.parseFloat(change) >= 0
  const changeColor = isPositive ? "text-green-600" : "text-red-600"
  const ChangeIcon = isPositive ? Plus : Minus

  return (
    <Card className="bg-white text-gray-900 gap-1 border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        {Icon && <Icon className={`h-4 w-4 ${iconColor}`} />}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
        <p className={`text-xs text-gray-500 flex items-center`}>
          {/* <ChangeIcon className="h-3 w-3 mr-1" /> */}
          {change}
        </p>
      </CardContent>
    </Card>
  )
}




export function SummaryCardForDashboard({ title, value, change, icon: Icon, iconColor  }) {
  const isPositive = Number.parseFloat(change) >= 0
  const changeColor = isPositive ? "text-green-600" : "text-red-600"
  const ChangeIcon = isPositive ? Plus : Minus

  return (
    <Card className="bg-white gap-0 text-gray-900 border-gray-200   w-full max-w-full  ">
      <CardHeader className="flex  flex-row items-center justify-between space-y-0 ">
        <CardTitle className="text-sm m-0 p-0 font-medium text-gray-500">{title}</CardTitle>
        {/* {Icon && <Icon className={`h-4 w-4 ${iconColor}`} />} */}
      </CardHeader>
      <CardContent className=" m-0" >
        <div className="flex flex-row items-center justify-between">
            <div className="md:text-2xl font-bold">{value}</div>
            {Icon && <Icon className={`h-5 w-5 ${iconColor}`} />}
        </div>
        <p className={`text-xs ${changeColor} flex items-center`}>
          <ChangeIcon className="h-3 w-3 mr-1" />
          {change}
        </p>
      </CardContent>
    </Card>
  )
}
export function SummaryCardForWaitlist({ title, value, change, icon: Icon, iconColor }) {
  const isPositive = Number.parseFloat(change) >= 0
  const changeColor = isPositive ? "text-green-600" : "text-red-600"
  const ChangeIcon = isPositive ? Plus : Minus

  return (
    <Card className="bg-white gap-0 text-gray-900 border-gray-200">
      <CardHeader className="flex  flex-row items-center justify-between space-y-0 ">
        <CardTitle className="text-sm m-0 p-0 font-medium text-gray-500">{title}</CardTitle>
        {/* {Icon && <Icon className={`h-4 w-4 ${iconColor}`} />} */}
      </CardHeader>
      <CardContent className=" m-0" >
        <div className="flex flex-row items-center justify-between">
            <div className="text-2xl font-bold">{value}</div>
            {Icon && <Icon className={`h-5 w-5 ${iconColor}`} />}
        </div>
        <p className={`text-xs ${changeColor} flex items-center`}>
          {/* <ChangeIcon className="h-3 w-3 mr-1" /> */}
          {change}
        </p>
      </CardContent>
    </Card>
  )
}
